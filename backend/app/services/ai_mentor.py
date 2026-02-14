"""
ChefMentor X – AI Service with Groq Fallback

Multi-tier AI fallback:
1. Gemini 2.5 Flash (primary)
2. Groq Llama 3 (fallback)
3. Cached/static response (last resort)
"""

import google.generativeai as genai
from groq import Groq
from app.core.config import settings
import asyncio
from functools import partial
import json


class AIMentorService:
    def __init__(self):
        # Initialize Gemini (primary)
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.gemini = genai.GenerativeModel('gemini-2.5-flash')
        
        # Initialize Groq (fallback)
        self.groq = Groq(api_key=settings.GROQ_API_KEY)

    # ── Step Guidance ──────────────────────────────────

    async def get_step_guidance(self, step_instruction: str) -> str:
        """
        Generates a short, helpful mentoring tip for the cooking step.
        Falls back through: Gemini → Groq → static.
        """
        prompt = f"""You are a professional chef mentor. 
The user is on this step: "{step_instruction}".

Give one short, encouraging tip (max 20 words) to help them succeed at this specific step. 
Focus on technique or sensory cues (smell, look).
Do not repeat the instruction."""

        # Tier 1: Gemini
        try:
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None,
                partial(self.gemini.generate_content, prompt)
            )
            return response.text.strip()
        except Exception as e:
            print(f"⚠️ Gemini failed: {e}")

        # Tier 2: Groq (Llama 3)
        try:
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None,
                partial(
                    self.groq.chat.completions.create,
                    model="llama-3.3-70b-versatile",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=50,
                    temperature=0.7,
                )
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"⚠️ Groq fallback failed: {e}")

        # Tier 3: Static fallback
        return "Keep going, you're doing great! Trust the process."

    # ── Voice Intent Parsing ───────────────────────────

    async def parse_voice_intent(self, text: str) -> dict:
        """
        Classifies voice command into structured intent.
        Falls back through: Gemini → Groq → regex.
        """
        prompt = f"""
User said: "{text}"

Classify into one of these intents:
- NEXT (go to next step)
- PREV (go back)
- REPEAT (repeat instruction)
- TIMER (set a timer)
- PAUSE (pause cooking)
- RESUME (resume cooking)
- INGREDIENT (asking about ingredients)
- HELP (asking for help or available commands)
- UNKNOWN (none of above)

Return ONLY a valid JSON object like:
{{"intent": "TIMER", "duration_seconds": 600}}
or
{{"intent": "NEXT"}}

No explanation, just JSON.
"""

        # Tier 1: Gemini
        try:
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None,
                partial(self.gemini.generate_content, prompt)
            )
            result_text = self._clean_json(response.text)
            return json.loads(result_text)
        except Exception as e:
            print(f"⚠️ Gemini intent parse failed: {e}")

        # Tier 2: Groq
        try:
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None,
                partial(
                    self.groq.chat.completions.create,
                    model="llama-3.3-70b-versatile",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=100,
                    temperature=0.0,
                )
            )
            result_text = self._clean_json(response.choices[0].message.content)
            return json.loads(result_text)
        except Exception as e:
            print(f"⚠️ Groq intent parse failed: {e}")

        # Tier 3: Regex fallback
        return self._regex_intent(text)

    # ── Food Safety Validation ─────────────────────────

    async def validate_food_safety(self, instruction: str) -> dict:
        """
        Checks cooking instruction for food safety concerns.
        Returns {"safe": bool, "warnings": [str]}
        """
        prompt = f"""You are a food safety expert. Check this cooking instruction for safety:
"{instruction}"

Return JSON: {{"safe": true/false, "warnings": ["list of warnings if unsafe"]}}
If safe, return: {{"safe": true, "warnings": []}}
Only flag genuine dangers (undercooked meat, cross-contamination, allergens).
JSON only, no explanation."""

        try:
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None,
                partial(self.gemini.generate_content, prompt)
            )
            result_text = self._clean_json(response.text)
            return json.loads(result_text)
        except Exception as e:
            print(f"Food safety check error: {e}")
            return {"safe": True, "warnings": []}

    # ── Helpers ────────────────────────────────────────

    def _clean_json(self, text: str) -> str:
        """Remove markdown code blocks from response."""
        text = text.strip()
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        return text.strip()

    def _regex_intent(self, text: str) -> dict:
        """Simple regex-based intent parsing as last resort."""
        import re
        lower = text.lower().strip()

        if re.match(r'^(next|go next|next step)', lower):
            return {"intent": "NEXT"}
        if re.match(r'^(back|previous|prev|go back)', lower):
            return {"intent": "PREV"}
        if re.match(r'^(repeat|again|say that again)', lower):
            return {"intent": "REPEAT"}
        if re.match(r'^(pause|stop|wait)', lower):
            return {"intent": "PAUSE"}
        if re.match(r'^(resume|continue|go)', lower):
            return {"intent": "RESUME"}
        if re.match(r'^(help|commands|what can)', lower):
            return {"intent": "HELP"}

        timer_match = re.search(r'(\d+)\s*(min|sec|minute|second)', lower)
        if timer_match or 'timer' in lower:
            if timer_match:
                val = int(timer_match.group(1))
                unit = timer_match.group(2)
                secs = val * 60 if unit.startswith('min') else val
                return {"intent": "TIMER", "duration_seconds": secs}
            return {"intent": "TIMER", "duration_seconds": 300}

        return {"intent": "UNKNOWN", "error": "Could not determine intent"}
