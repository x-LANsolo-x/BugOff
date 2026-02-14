# ChefMentor X – AI/ML Strategy & Implementation Guide

**Version:** 1.0  
**Last Updated:** February 12, 2026  
**Status:** Approved for Implementation

---

## 1. Overview

ChefMentor X uses a **multi-model AI strategy** with fallback mechanisms to provide:
- Real-time cooking guidance
- Recipe generation and optimization
- Visual dish analysis
- Voice interaction (hands-free cooking)
- Natural language Q&A

### Core Principles
1. **Cost Optimization:** Maximize use of free tiers
2. **Reliability:** Fallback systems prevent single point of failure
3. **Safety:** Food safety validation on all AI outputs
4. **Performance:** < 3 second response times for guidance

---

## 2. AI Model Selection

### 2.1 Primary Text Model: Google Gemini

**Model:** `gemini-1.5-flash` (default) or `gemini-1.5-pro` (complex queries)

**Free Tier Limits:**
- 15 requests per minute (RPM)
- 1 million tokens per minute (TPM)
- 1,500 requests per day (RPD)

**Use Cases:**
- Recipe generation from dish names
- Step-by-step cooking guidance
- Real-time Q&A during cooking
- Intent parsing for voice commands
- Adding visual cues to recipe steps
- Safety validation of user actions

**API Integration:**
```python
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content(prompt)
```

**Pricing (if exceed free tier):**
- Flash: $0.075 per 1M input tokens, $0.30 per 1M output tokens
- Pro: $1.25 per 1M input tokens, $5.00 per 1M output tokens

---

### 2.2 Fallback Text Model: Groq

**Model:** `llama-3.1-70b-versatile` or `mixtral-8x7b-32768`

**Free Tier Limits:**
- Very generous (100+ requests per minute)
- Fast inference (<1 second for most queries)

**Use Cases:**
- Fallback when Gemini rate-limited
- Fallback when Gemini API fails
- High-speed responses for simple queries

**API Integration:**
```python
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

response = client.chat.completions.create(
    model="llama-3.1-70b-versatile",
    messages=[{"role": "user", "content": prompt}]
)
```

**Pricing (if exceed free tier):**
- Check Groq pricing page (currently very generous free tier)

---

### 2.3 Vision Model: Gemini 1.5 Pro Vision

**Model:** `gemini-1.5-pro` (multimodal)

**Use Cases:**
- Analyze uploaded dish photos (Failed Dish Analysis)
- Identify cooking issues (undercooked, burnt, presentation)
- Provide visual feedback and improvement tips

**Free Tier:** Included in Gemini free tier limits

**API Integration:**
```python
import PIL.Image

model = genai.GenerativeModel('gemini-1.5-pro')

image = PIL.Image.open('dish_photo.jpg')
prompt = "Analyze this dish. Identify any issues and provide improvement suggestions."

response = model.generate_content([prompt, image])
```

**Fallback Strategy:**
- If vision fails → ask user to describe the dish in text
- Use text-only analysis with Gemini/Groq

---

## 3. Fallback & Reliability Strategy

### 3.1 Multi-Tier Fallback System

```
User Request
    ↓
[1] Try Gemini 1.5 Flash
    ↓ (if rate limited or fails)
[2] Try Groq Llama 3.1
    ↓ (if still fails)
[3] Return cached/pre-generated response
    ↓ (if no cache available)
[4] Graceful error message + queue for retry
```

### 3.2 Implementation (Python FastAPI)

```python
from typing import Optional
import asyncio

class AIService:
    def __init__(self):
        self.gemini = genai.GenerativeModel('gemini-1.5-flash')
        self.groq = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.cache = {}  # Redis in production
    
    async def get_cooking_guidance(self, prompt: str, context: dict) -> str:
        """Get AI guidance with fallback strategy"""
        
        # Try Gemini first
        try:
            response = await self._call_gemini(prompt, context)
            if response:
                return response
        except Exception as e:
            logger.warning(f"Gemini failed: {e}")
        
        # Fallback to Groq
        try:
            response = await self._call_groq(prompt, context)
            if response:
                return response
        except Exception as e:
            logger.error(f"Groq failed: {e}")
        
        # Check cache for similar queries
        cached = self._get_cached_response(prompt)
        if cached:
            return cached + "\n\n(Using cached response - limited connectivity)"
        
        # Final fallback
        return "I'm having trouble connecting right now. Please check your connection or try again."
    
    async def _call_gemini(self, prompt: str, context: dict) -> Optional[str]:
        """Call Gemini API with timeout"""
        try:
            response = self.gemini.generate_content(
                prompt,
                generation_config={"temperature": 0.7, "max_output_tokens": 500}
            )
            return response.text
        except Exception as e:
            raise e
    
    async def _call_groq(self, prompt: str, context: dict) -> Optional[str]:
        """Call Groq API with timeout"""
        response = self.groq.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful cooking mentor."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
        return response.choices[0].message.content
```

---

## 4. AI Safety & Validation

### 4.1 Pre-Prompt Safety Instructions

**System Prompt Template:**
```
You are ChefMentor, an expert cooking assistant. Your role is to provide safe, 
accurate cooking guidance.

CRITICAL SAFETY RULES:
1. Never suggest leaving perishable food at room temperature for >2 hours
2. Always recommend proper internal cooking temperatures:
   - Chicken: 165°F (74°C)
   - Beef/Pork: 145°F (63°C) + 3 min rest
   - Ground meat: 160°F (71°C)
3. Always emphasize handwashing before cooking
4. Never suggest raw egg consumption for high-risk individuals
5. Warn about cross-contamination between raw meat and other foods

If you're unsure about food safety, say "For safety, please check with a food 
safety resource" rather than guessing.

Now, respond to the user's cooking question:
{user_prompt}
```

### 4.2 Post-Processing Validation

**Blocked Terms (Auto-Reject Response):**
```python
DANGEROUS_PATTERNS = [
    r"raw chicken.*safe",
    r"room temperature.*\d+ hours",
    r"skip.*washing hands",
    r"undercooked.*okay",
    r"mold.*safe to eat"
]

def validate_safety(ai_response: str) -> tuple[bool, str]:
    """Check if AI response contains dangerous advice"""
    
    for pattern in DANGEROUS_PATTERNS:
        if re.search(pattern, ai_response, re.IGNORECASE):
            logger.critical(f"UNSAFE AI RESPONSE BLOCKED: {ai_response}")
            return False, "I can't provide that guidance for safety reasons. Please consult a food safety expert."
    
    return True, ai_response
```

### 4.3 Temperature Validation

```python
SAFE_TEMPS = {
    "chicken": 165,
    "turkey": 165,
    "pork": 145,
    "beef": 145,
    "ground_meat": 160,
    "fish": 145,
    "eggs": 160
}

def validate_cooking_temp(food_type: str, temp_f: int) -> bool:
    """Validate recommended cooking temperature"""
    if food_type in SAFE_TEMPS:
        return temp_f >= SAFE_TEMPS[food_type]
    return True  # Unknown food types pass
```

### 4.4 Human Review Queue

**Flag for Review:**
- Any response blocked by safety filters
- User reports of bad advice
- Responses with low confidence scores

**Implementation:**
```python
async def flag_for_review(
    response: str, 
    reason: str, 
    user_id: str,
    session_id: str
):
    """Add AI response to human review queue"""
    await db.audit_logs.create({
        "event_type": "ai_response_flagged",
        "user_id": user_id,
        "session_id": session_id,
        "response_text": response,
        "flag_reason": reason,
        "reviewed": False
    })
```

---

## 5. Recipe Generation Pipeline

### 5.1 Recipe Generation Flow

```
User provides dish name (e.g., "Chicken Biryani")
    ↓
[1] Query RecipeDB API for existing recipe
    ↓ (if found)
[2] Fetch structured recipe data
    ↓
[3] Enhance with Gemini (add visual cues, tips, timings)
    ↓
[4] Store in PostgreSQL
    ↓
[5] Return to user

(if not found in RecipeDB)
    ↓
[1] Query FlavorDB for ingredient combinations
    ↓
[2] Use Gemini to generate complete recipe
    ↓
[3] Validate recipe (safety, completeness)
    ↓
[4] Store in PostgreSQL
    ↓
[5] Return to user
```

### 5.2 Recipe Enhancement Prompt

```python
RECIPE_ENHANCEMENT_PROMPT = """
You are a professional chef. Enhance this recipe with detailed guidance:

ORIGINAL RECIPE:
{raw_recipe}

ENHANCEMENTS NEEDED:
1. Add visual cues for each step (e.g., "onions should be golden brown", "mixture should be thick enough to coat spoon")
2. Add estimated time for each step
3. Identify critical steps that need special attention
4. Add timer recommendations
5. Suggest equipment needed
6. Add difficulty level (beginner/intermediate/advanced)

Return enhanced recipe in this JSON format:
{
  "title": "string",
  "difficulty": "beginner|intermediate|advanced",
  "prep_time": minutes,
  "cook_time": minutes,
  "servings": number,
  "ingredients": [...],
  "steps": [
    {
      "step_number": 1,
      "instruction": "detailed instruction",
      "visual_cue": "what to look for",
      "estimated_time": minutes,
      "timer_required": true/false,
      "timer_duration": minutes,
      "critical_step": true/false
    }
  ],
  "equipment": [...],
  "tags": [...]
}
"""
```

---

## 6. Voice AI Integration

### 6.1 Text-to-Speech (TTS)

**Primary:** Piper TTS (Open Source)
- Docs: https://github.com/rhasspy/piper
- Models: Multiple voices (male/female), natural quality
- Runs locally (no API calls, offline capable)

**Installation:**
```bash
pip install piper-tts
```

**Usage:**
```python
from piper import PiperVoice

voice = PiperVoice.load("en_US-lessac-medium")
audio = voice.synthesize("Step 1: Preheat your oven to 350 degrees")
```

**Fallback:** expo-speech (device native TTS)

---

### 6.2 Speech-to-Text (STT)

**Primary:** Whisper.cpp (OpenAI Whisper optimized)
- Docs: https://github.com/ggerganov/whisper.cpp
- Models: tiny, base, small, medium (trade-off: speed vs accuracy)
- Runs locally or via API wrapper

**Installation:**
```bash
# Install whisper.cpp Python bindings
pip install whisper-cpp-python
```

**Usage:**
```python
from whispercpp import Whisper

whisper = Whisper.from_pretrained("base")
result = whisper.transcribe("audio_file.wav")
print(result["text"])
```

**Alternative:** Vosk (faster, smaller models)
```python
from vosk import Model, KaldiRecognizer

model = Model("model_path")
recognizer = KaldiRecognizer(model, 16000)
# Process audio stream
```

---

### 6.3 Voice Command Intent Parsing

**Use Gemini for NLU (Natural Language Understanding):**

```python
VOICE_INTENT_PROMPT = """
User said: "{voice_input}"

Classify this into one of these intents:
- NEXT_STEP: User wants to move to next step
- PREVIOUS_STEP: User wants to go back
- REPEAT: User wants to hear current step again
- PAUSE: User wants to pause cooking
- RESUME: User wants to resume cooking
- START_TIMER: User wants to start a timer
- TIMER_STATUS: User asks about timer status
- INGREDIENT_QUERY: User asks about ingredient amount
- GENERAL_QUESTION: User has a cooking question
- FINISH: User wants to finish cooking
- HELP: User needs help
- UNKNOWN: Cannot determine intent

Return JSON: {"intent": "INTENT_NAME", "parameters": {...}}

Examples:
"next step" → {"intent": "NEXT_STEP", "parameters": {}}
"how much salt?" → {"intent": "INGREDIENT_QUERY", "parameters": {"ingredient": "salt"}}
"set a timer for 5 minutes" → {"intent": "START_TIMER", "parameters": {"duration": 5}}
"""

async def parse_voice_intent(voice_input: str) -> dict:
    """Parse voice command into actionable intent"""
    prompt = VOICE_INTENT_PROMPT.format(voice_input=voice_input)
    response = await ai_service.get_cooking_guidance(prompt, {})
    return json.loads(response)
```

---

## 7. Performance Optimization

### 7.1 Response Time Targets

| Operation | Target | Max Acceptable |
|-----------|--------|----------------|
| Text guidance | < 2 seconds | 3 seconds |
| Image analysis | < 5 seconds | 8 seconds |
| Voice TTS | < 500ms | 1 second |
| Voice STT | < 1 second | 2 seconds |
| Recipe generation | < 10 seconds | 15 seconds |

### 7.2 Caching Strategy

**Cache These:**
- Common cooking questions (Redis, 24 hour TTL)
- Recipe data (PostgreSQL + Redis)
- AI-enhanced recipes (PostgreSQL, permanent)
- Voice command intents (in-memory, 1 hour TTL)

**Don't Cache:**
- User-specific guidance
- Real-time step navigation
- Photo analysis results

```python
from redis import asyncio as aioredis

class CachedAIService:
    def __init__(self):
        self.redis = aioredis.from_url(os.getenv("REDIS_URL"))
    
    async def get_cached_or_generate(self, prompt: str, cache_key: str) -> str:
        """Check cache first, generate if miss"""
        
        # Check cache
        cached = await self.redis.get(cache_key)
        if cached:
            return cached.decode()
        
        # Generate
        response = await ai_service.get_cooking_guidance(prompt, {})
        
        # Cache for 24 hours
        await self.redis.setex(cache_key, 86400, response)
        
        return response
```

### 7.3 Rate Limiting for AI Calls

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/ai/guidance")
@limiter.limit("20/minute")  # Max 20 AI calls per minute per user
async def get_ai_guidance(request: Request):
    # Handle AI request
    pass
```

---

## 8. Cost Estimation

### 8.1 Monthly Cost (Within Free Tiers)

**Assumptions:**
- 100 active users
- 5 cooking sessions per user per month
- 10 AI interactions per session
- 1 image analysis per session

**Gemini API:**
- 500 sessions × 10 interactions = 5,000 requests/month
- Average 500 tokens per request = 2.5M tokens/month
- **Cost: FREE** (well within 1M TPM limit with rate spreading)

**Groq API (Fallback):**
- Estimate 10% fallback usage = 500 requests/month
- **Cost: FREE** (within generous free tier)

**Voice (Piper/Whisper):**
- Local processing
- **Cost: FREE**

**Total AI Cost: $0/month** for MVP scale

---

### 8.2 Cost at Scale (1,000 users)

**Gemini API:**
- 5,000 sessions × 10 = 50,000 requests/month
- 25M tokens/month
- Likely exceed free tier → paid usage
- Estimated: **$15-30/month** (depending on Flash vs Pro usage)

**Groq API:**
- Still within free tier
- **Cost: $0**

**Total: ~$20-35/month** for 1,000 active users

---

## 9. Testing & Validation

### 9.1 AI Response Quality Tests

```python
import pytest

class TestAIQuality:
    def test_recipe_generation_completeness(self):
        """Ensure generated recipes have all required fields"""
        recipe = ai_service.generate_recipe("Chicken Biryani")
        assert "ingredients" in recipe
        assert "steps" in recipe
        assert len(recipe["steps"]) > 0
    
    def test_safety_validation(self):
        """Ensure dangerous advice is blocked"""
        response = "You can leave chicken at room temperature overnight"
        is_safe, validated = validate_safety(response)
        assert is_safe == False
    
    def test_response_time(self):
        """Ensure AI responses meet performance targets"""
        start = time.time()
        response = await ai_service.get_cooking_guidance("What's next?", {})
        duration = time.time() - start
        assert duration < 3.0  # 3 second max
```

### 9.2 Manual Test Cases

1. **Recipe Generation:** Generate recipes for 5 different dishes
2. **Safety Validation:** Try to get dangerous advice (should be blocked)
3. **Fallback Testing:** Disable Gemini, ensure Groq takes over
4. **Voice Commands:** Test all 10+ voice commands
5. **Image Analysis:** Upload 5 different dish photos

---

## 10. Monitoring & Observables

### 10.1 Metrics to Track

**AI Performance:**
- `ai_request_duration_seconds` (histogram)
- `ai_requests_total` (counter by model: gemini, groq)
- `ai_errors_total` (counter by model and error type)
- `ai_fallback_total` (counter - how often fallback triggered)
- `ai_cache_hits_total` (counter)
- `ai_cache_misses_total` (counter)

**AI Safety:**
- `ai_responses_blocked_total` (counter - safety violations)
- `ai_responses_flagged_total` (counter - flagged for review)

**Voice:**
- `voice_tts_duration_seconds` (histogram)
- `voice_stt_duration_seconds` (histogram)
- `voice_intent_accuracy` (gauge - if tracked)

### 10.2 Implementation (Prometheus)

```python
from prometheus_client import Counter, Histogram

ai_requests = Counter('ai_requests_total', 'Total AI requests', ['model', 'endpoint'])
ai_duration = Histogram('ai_request_duration_seconds', 'AI request duration', ['model'])
ai_errors = Counter('ai_errors_total', 'AI errors', ['model', 'error_type'])
ai_blocked = Counter('ai_responses_blocked_total', 'Blocked unsafe responses')

async def tracked_ai_call(model_name: str, prompt: str):
    """AI call with metrics tracking"""
    with ai_duration.labels(model=model_name).time():
        try:
            response = await call_ai_model(model_name, prompt)
            ai_requests.labels(model=model_name, endpoint='guidance').inc()
            return response
        except Exception as e:
            ai_errors.labels(model=model_name, error_type=type(e).__name__).inc()
            raise
```

---

## 11. Future Enhancements

### Post-MVP Considerations:

1. **Fine-tuned Models:** Train custom model on cooking data
2. **Multi-language Support:** Expand to Spanish, Hindi, etc.
3. **Video Analysis:** Analyze cooking technique videos
4. **Personalization:** Learn user preferences over time
5. **Dietary Restrictions:** Auto-adjust recipes for allergies, vegan, etc.
6. **Advanced Voice:** Wake word detection ("Hey ChefMentor")
7. **Nutritional Analysis:** Calculate calories, macros automatically

---

## 12. Implementation Checklist

- [ ] Set up Gemini API keys
- [ ] Set up Groq API keys
- [ ] Implement AIService class with fallback logic
- [ ] Add safety validation layer
- [ ] Integrate Piper TTS
- [ ] Integrate Whisper STT
- [ ] Create recipe generation pipeline
- [ ] Implement caching with Redis
- [ ] Add rate limiting
- [ ] Set up monitoring metrics
- [ ] Write AI quality tests
- [ ] Manual test all 5 MVP recipes
- [ ] Document API usage patterns
- [ ] Create runbook for AI failures

---

**Document Owner:** AI/ML Team  
**Review Cycle:** Every sprint  
**Last Reviewed:** February 12, 2026
