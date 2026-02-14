"""
ChefMentor X – AI Vision Service with Groq Fallback

Multi-tier AI for dish failure analysis:
1. Gemini 2.5 Flash Vision (primary)
2. Groq Llama Vision (fallback - text-based analysis from URL)
3. Static response (last resort)
"""

import google.generativeai as genai
from groq import Groq
from app.core.config import settings
import requests
from PIL import Image
from io import BytesIO
import asyncio
from functools import partial
import json


class AIVisionService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        self.groq = Groq(api_key=settings.GROQ_API_KEY)

    async def analyze_dish_failure(self, image_url: str, context: dict = None) -> dict:
        """
        Analyzes an image of a failed dish to determine what went wrong.
        Accepts optional context questions (heat, timing, modifications).
        Falls back: Gemini Vision → Groq text → static.
        """
        context_text = ""
        if context:
            context_text = "\n\nAdditional context from the cook:"
            if context.get("heat_level"):
                context_text += f"\n- Heat level used: {context['heat_level']}"
            if context.get("timing"):
                context_text += f"\n- Timing: {context['timing']}"
            if context.get("modifications"):
                context_text += f"\n- Modifications made: {context['modifications']}"
            if context.get("notes"):
                context_text += f"\n- Notes: {context['notes']}"

        base_prompt = f"""Look at this failed dish.{context_text}

1. Diagnose the root cause of the failure (e.g., burnt, undercooked, broken sauce, curdled).
2. Explain WHY it happened in 2-3 sentences, considering any context provided.
3. Provide 3 specific, actionable tips to fix it next time.
4. Rate the severity: minor (easily fixable), moderate, or major (need to restart).

Format your response as valid JSON:
{{
    "root_cause": "brief diagnosis",
    "explanation": "detailed why it happened",
    "tips": ["tip 1", "tip 2", "tip 3"],
    "severity": "minor|moderate|major",
    "confidence": 0.85
}}"""

        # Tier 1: Gemini Vision (can see the image)
        try:
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(None, requests.get, image_url)
            image_data = Image.open(BytesIO(response.content))

            ai_response = await loop.run_in_executor(
                None,
                partial(self.model.generate_content, [base_prompt, image_data])
            )

            result = self._parse_json(ai_response.text)
            if result:
                result["ai_provider"] = "gemini"
                return result
        except Exception as e:
            print(f"⚠️ Gemini Vision failed: {e}")

        # Tier 2: Groq text-based analysis (describe what might have gone wrong)
        try:
            groq_prompt = f"""A user uploaded an image of a failed cooking dish.
{context_text}

Based on the context clues provided, diagnose what likely went wrong.
Since you cannot see the image, use the context to make educated guesses.

{base_prompt}"""

            loop = asyncio.get_event_loop()
            groq_response = await loop.run_in_executor(
                None,
                partial(
                    self.groq.chat.completions.create,
                    model="llama-3.3-70b-versatile",
                    messages=[{"role": "user", "content": groq_prompt}],
                    max_tokens=500,
                    temperature=0.3,
                )
            )

            result = self._parse_json(groq_response.choices[0].message.content)
            if result:
                result["ai_provider"] = "groq"
                return result
        except Exception as e:
            print(f"⚠️ Groq Vision fallback failed: {e}")

        # Tier 3: Static fallback
        return {
            "root_cause": "Analysis Unavailable",
            "explanation": "Our AI services are temporarily unavailable. Based on common failures: check your cooking temperature, timing, and ingredient proportions.",
            "tips": [
                "Ensure correct temperature — use a thermometer if possible",
                "Follow timing guidelines closely on your next attempt",
                "Check ingredient ratios — too much/little of one ingredient causes most failures"
            ],
            "severity": "moderate",
            "confidence": 0.3,
            "ai_provider": "fallback"
        }

    def _parse_json(self, text: str) -> dict:
        """Safely parse JSON from AI response, handling markdown blocks."""
        try:
            text = text.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()
            return json.loads(text)
        except (json.JSONDecodeError, IndexError):
            return None
