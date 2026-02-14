# ChefMentor X – Testing Strategy

**Version:** 1.0  
**Last Updated:** February 12, 2026  
**Status:** Approved for Implementation

---

## 1. Overview

This document defines the testing strategy for ChefMentor X MVP, balancing quality assurance with speed to market.

### Testing Philosophy
- **Focused Testing:** 50%+ unit test coverage on critical business logic
- **Manual E2E:** For complex user flows (cooking sessions)
- **AI Validation:** Specific tests for AI response quality and safety
- **Performance Testing:** Ensure sub-3-second response times
- **No Automated E2E:** Deferred to post-MVP

---

## 2. Testing Pyramid

```
           ╱╲
          ╱  ╲
         ╱ E2E ╲  ← Manual only (5 test recipes)
        ╱────────╲
       ╱          ╲
      ╱ Integration ╲  ← API endpoints, DB integration
     ╱──────────────╲
    ╱                ╲
   ╱  Unit Tests      ╲  ← 50%+ coverage on core logic
  ╱────────────────────╲
```

**Distribution:**
- **Unit Tests:** 70% of test effort
- **Integration Tests:** 20% of test effort
- **Manual E2E Tests:** 10% of test effort

---

## 3. Unit Testing

### 3.1 Backend (Python + Pytest)

**Framework:** pytest + pytest-asyncio + pytest-cov

**Coverage Target:** 50%+ overall, 80%+ on critical modules

**What to Test:**
- ✅ Business logic (recipe processing, session management)
- ✅ AI service (fallback logic, safety validation)
- ✅ Authentication (JWT generation, validation)
- ✅ Data validation (recipe schema, user input)
- ✅ Helper functions (utilities, formatters)

**What NOT to Test:**
- ❌ Third-party libraries (FastAPI, SQLAlchemy internals)
- ❌ Simple CRUD operations (unless complex logic)
- ❌ Obvious getters/setters

**Example Test Structure:**
```python
# tests/test_recipe_service.py

import pytest
from app.services.recipe_service import RecipeService
from app.models import Recipe

@pytest.fixture
async def recipe_service():
    """Fixture for recipe service with mocked dependencies"""
    return RecipeService(
        db=MockDatabase(),
        ai_service=MockAIService(),
        cache=MockCache()
    )

class TestRecipeService:
    @pytest.mark.asyncio
    async def test_get_recipe_from_cache(self, recipe_service):
        """Test recipe retrieval from cache"""
        recipe_id = "test-recipe-123"
        
        # Arrange
        expected_recipe = Recipe(id=recipe_id, title="Test Recipe")
        recipe_service.cache.set(recipe_id, expected_recipe)
        
        # Act
        result = await recipe_service.get_recipe(recipe_id)
        
        # Assert
        assert result.id == recipe_id
        assert result.title == "Test Recipe"
    
    @pytest.mark.asyncio
    async def test_recipe_validation_rejects_invalid_data(self, recipe_service):
        """Test recipe validation catches errors"""
        invalid_recipe = {
            "title": "Test",
            # Missing required fields: ingredients, steps
        }
        
        with pytest.raises(ValueError) as exc_info:
            await recipe_service.validate_recipe(invalid_recipe)
        
        assert "Missing required field" in str(exc_info.value)
    
    @pytest.mark.asyncio
    async def test_ai_fallback_when_gemini_fails(self, recipe_service):
        """Test fallback to Groq when Gemini fails"""
        # Simulate Gemini failure
        recipe_service.ai_service.gemini_enabled = False
        
        response = await recipe_service.get_ai_guidance("What's next?")
        
        # Should use Groq fallback
        assert response is not None
        assert recipe_service.ai_service.last_used_model == "groq"
```

**Run Tests:**
```bash
# Run all tests with coverage
pytest tests/ -v --cov=app --cov-report=html

# Run specific test file
pytest tests/test_recipe_service.py -v

# Run tests matching pattern
pytest tests/ -k "test_recipe" -v
```

---

### 3.2 Frontend (React Native + Jest)

**Framework:** Jest + React Native Testing Library

**Coverage Target:** 40%+ (lower priority for MVP)

**What to Test:**
- ✅ Custom hooks (useCookingSession, useVoiceCommands)
- ✅ State management (Zustand stores)
- ✅ Utility functions (formatters, validators)
- ✅ Critical components (CookingStep, TimerDisplay)

**Example Test:**
```typescript
// __tests__/hooks/useCookingSession.test.ts

import { renderHook, act } from '@testing-library/react-hooks';
import { useCookingSession } from '@/hooks/useCookingSession';

describe('useCookingSession', () => {
  it('should advance to next step', () => {
    const { result } = renderHook(() => useCookingSession());
    
    act(() => {
      result.current.startSession('recipe-123');
    });
    
    expect(result.current.currentStep).toBe(1);
    
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.currentStep).toBe(2);
  });
  
  it('should not advance beyond last step', () => {
    const { result } = renderHook(() => useCookingSession());
    
    // Mock recipe with 5 steps
    act(() => {
      result.current.startSession('recipe-123');
      result.current.setTotalSteps(5);
      result.current.setCurrentStep(5);
    });
    
    act(() => {
      result.current.nextStep();
    });
    
    expect(result.current.currentStep).toBe(5);
  });
});
```

**Run Tests:**
```bash
# Run all frontend tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 4. Integration Testing

### 4.1 API Endpoint Tests

**Framework:** pytest + httpx.AsyncClient (FastAPI TestClient)

**What to Test:**
- ✅ All API endpoints (request/response)
- ✅ Authentication flows (JWT)
- ✅ Database integration (CRUD operations)
- ✅ Error responses (4xx, 5xx)
- ✅ Rate limiting
- ✅ File uploads

**Example:**
```python
# tests/integration/test_api_recipes.py

import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_get_recipe_endpoint():
    """Test GET /api/recipes/{id} endpoint"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Create test recipe first
        recipe_id = await create_test_recipe()
        
        # Test GET
        response = await client.get(f"/api/recipes/{recipe_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == recipe_id
        assert "title" in data
        assert "ingredients" in data
        assert "steps" in data

@pytest.mark.asyncio
async def test_create_cooking_session_requires_auth():
    """Test POST /api/sessions requires authentication"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/sessions",
            json={"recipe_id": "test-recipe"}
        )
        
        assert response.status_code == 401
        assert "unauthorized" in response.json()["detail"].lower()

@pytest.mark.asyncio
async def test_ai_guidance_endpoint():
    """Test POST /api/ai/guidance"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Get auth token
        token = await get_test_auth_token()
        
        response = await client.post(
            "/api/ai/guidance",
            json={
                "question": "How do I know when the onions are caramelized?",
                "session_id": "test-session"
            },
            headers={"Authorization": f"Bearer {token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert len(data["response"]) > 0
```

**Test Database Setup:**
```python
# tests/conftest.py

import pytest
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from app.database import Base

@pytest.fixture(scope="function")
async def test_db():
    """Create test database for each test"""
    engine = create_async_engine("postgresql+asyncpg://test:test@localhost/chefmentor_test")
    
    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield engine
    
    # Drop all tables after test
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    
    await engine.dispose()
```

---

### 4.2 Database Tests

**What to Test:**
- ✅ Database migrations (Alembic)
- ✅ Model relationships (Recipe → Ingredients → Steps)
- ✅ Constraints (foreign keys, unique constraints)
- ✅ Cascading deletes
- ✅ Indexes performance

**Example:**
```python
@pytest.mark.asyncio
async def test_recipe_cascade_delete(test_db):
    """Test deleting recipe also deletes ingredients and steps"""
    async with AsyncSession(test_db) as session:
        # Create recipe with ingredients and steps
        recipe = Recipe(title="Test Recipe")
        recipe.ingredients.append(Ingredient(name="Salt", amount=1, unit="tsp"))
        recipe.steps.append(Step(step_number=1, instruction="Mix"))
        
        session.add(recipe)
        await session.commit()
        
        recipe_id = recipe.id
        
        # Delete recipe
        await session.delete(recipe)
        await session.commit()
        
        # Verify ingredients and steps also deleted
        ingredients = await session.execute(
            select(Ingredient).where(Ingredient.recipe_id == recipe_id)
        )
        assert len(ingredients.scalars().all()) == 0
```

---

## 5. AI Testing

### 5.1 AI Response Quality Tests

**What to Test:**
- ✅ Response format (valid JSON, expected structure)
- ✅ Response completeness (all required fields)
- ✅ Response relevance (answers the question)
- ✅ Safety validation (no dangerous advice)
- ✅ Fallback mechanisms (Gemini → Groq)

**Example:**
```python
# tests/test_ai_service.py

class TestAIService:
    @pytest.mark.asyncio
    async def test_recipe_generation_completeness(self):
        """Test AI generates complete recipes"""
        recipe = await ai_service.generate_recipe("Chicken Biryani")
        
        # Required fields
        assert "title" in recipe
        assert "ingredients" in recipe
        assert "steps" in recipe
        
        # Quality checks
        assert len(recipe["ingredients"]) >= 3
        assert len(recipe["steps"]) >= 5
        
        # Each step has required fields
        for step in recipe["steps"]:
            assert "instruction" in step
            assert "step_number" in step
    
    @pytest.mark.asyncio
    async def test_safety_validation_blocks_dangerous_advice(self):
        """Test safety filter blocks unsafe responses"""
        dangerous_response = "You can leave chicken at room temperature overnight"
        
        is_safe, validated = validate_safety(dangerous_response)
        
        assert is_safe is False
        assert "safety" in validated.lower()
    
    @pytest.mark.asyncio
    async def test_fallback_to_groq_on_gemini_failure(self):
        """Test Groq fallback when Gemini fails"""
        # Mock Gemini to raise exception
        with patch.object(ai_service, '_call_gemini', side_effect=Exception("Rate limited")):
            response = await ai_service.get_cooking_guidance("What's next?", {})
            
            # Should still get response from Groq
            assert response is not None
            assert len(response) > 0
    
    @pytest.mark.asyncio
    async def test_ai_response_time_under_3_seconds(self):
        """Test AI responses meet performance targets"""
        start = time.time()
        
        response = await ai_service.get_cooking_guidance("How much salt?", {})
        
        duration = time.time() - start
        assert duration < 3.0  # 3 second max
```

---

### 5.2 Voice AI Tests

**What to Test:**
- ✅ TTS synthesis works
- ✅ STT transcription accuracy
- ✅ Intent parsing correctness
- ✅ Voice command handling

**Example:**
```python
class TestVoiceService:
    def test_tts_generates_audio(self):
        """Test TTS generates valid audio"""
        text = "Step 1: Preheat oven to 350 degrees"
        audio_bytes = tts_service.synthesize(text)
        
        assert audio_bytes is not None
        assert len(audio_bytes) > 0
        assert audio_bytes[:4] == b'RIFF'  # WAV file signature
    
    def test_stt_transcribes_audio(self):
        """Test STT transcribes audio correctly"""
        # Load test audio file
        with open("tests/fixtures/audio/next_step.wav", "rb") as f:
            audio_data = f.read()
        
        transcription = stt_service.transcribe(audio_data)
        
        assert "next" in transcription.lower()
    
    @pytest.mark.asyncio
    async def test_intent_parsing_accuracy(self):
        """Test voice intent classification"""
        test_cases = [
            ("next step", "NEXT_STEP"),
            ("go back", "PREVIOUS_STEP"),
            ("set timer for 5 minutes", "START_TIMER"),
            ("how much salt", "INGREDIENT_QUERY"),
        ]
        
        for voice_text, expected_intent in test_cases:
            result = await voice_service.parse_intent(voice_text, {})
            assert result["intent"] == expected_intent
```

---

## 6. Performance Testing

### 6.1 Load Testing

**Tool:** Locust (Python load testing framework)

**Scenarios:**
- 100 concurrent users browsing recipes
- 50 concurrent cooking sessions
- AI guidance requests under load

**Example:**
```python
# tests/load/locustfile.py

from locust import HttpUser, task, between

class ChefMentorUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        """Login before starting tasks"""
        response = self.client.post("/api/auth/login", json={
            "email": "test@example.com",
            "password": "testpass"
        })
        self.token = response.json()["access_token"]
    
    @task(3)
    def browse_recipes(self):
        """User browses recipes"""
        self.client.get(
            "/api/recipes",
            headers={"Authorization": f"Bearer {self.token}"}
        )
    
    @task(1)
    def start_cooking_session(self):
        """User starts cooking"""
        self.client.post(
            "/api/sessions",
            json={"recipe_id": "test-recipe"},
            headers={"Authorization": f"Bearer {self.token}"}
        )
    
    @task(2)
    def ask_ai_question(self):
        """User asks AI question"""
        self.client.post(
            "/api/ai/guidance",
            json={"question": "How much salt?", "session_id": "test"},
            headers={"Authorization": f"Bearer {self.token}"}
        )
```

**Run Load Test:**
```bash
locust -f tests/load/locustfile.py --host=http://localhost:8000
# Open http://localhost:8089 for UI
```

---

### 6.2 Performance Benchmarks

**Targets:**

| Operation | Target (p95) | Max Acceptable |
|-----------|--------------|----------------|
| Recipe fetch | < 500ms | 1s |
| AI guidance | < 2s | 3s |
| Image analysis | < 5s | 8s |
| Step navigation | < 200ms | 500ms |
| Voice TTS | < 500ms | 1s |
| Voice STT | < 1s | 2s |

**Monitoring:**
```python
from prometheus_client import Histogram
import time

request_duration = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration',
    ['method', 'endpoint']
)

@app.middleware("http")
async def track_performance(request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    
    request_duration.labels(
        method=request.method,
        endpoint=request.url.path
    ).observe(duration)
    
    return response
```

---

## 7. Manual E2E Testing

### 7.1 Test Scenarios

**Critical User Journeys:**

1. **Complete Cooking Flow**
   - Login
   - Select recipe
   - Cook through all steps
   - Use voice commands
   - Set timers
   - Ask AI questions
   - Complete dish
   - Submit for analysis

2. **Voice-Only Cooking**
   - Enable voice mode
   - Navigate entirely by voice
   - Verify all commands work

3. **Offline Cooking**
   - Disconnect from internet
   - Start cached recipe
   - Verify basic navigation works
   - Verify AI features gracefully degrade

4. **Failed Dish Analysis**
   - Upload dish photo
   - Receive AI feedback
   - View improvement suggestions

5. **Error Recovery**
   - Lose connection mid-cooking
   - App crash and recovery
   - Camera failure during photo upload

---

### 7.2 Test Recipe Set

**5 Test Recipes (varied complexity):**

1. **Beginner:** Scrambled Eggs (5 steps, 5 minutes)
2. **Beginner:** Maggi Noodles (6 steps, 10 minutes)
3. **Intermediate:** Vegetable Stir Fry (8 steps, 20 minutes)
4. **Intermediate:** Chocolate Chip Cookies (10 steps, 30 minutes)
5. **Advanced:** Chicken Biryani (12 steps, 90 minutes)

**Test Checklist per Recipe:**
- [ ] Recipe loads correctly
- [ ] All ingredients displayed
- [ ] All steps display correctly
- [ ] Visual cues present
- [ ] Timers work correctly
- [ ] Voice commands work
- [ ] AI questions answered
- [ ] Session saved
- [ ] Can resume if paused
- [ ] Can finish successfully

---

### 7.3 Manual Test Template

```markdown
## Test Case: Complete Cooking Flow

**Tester:** [Name]
**Date:** [Date]
**Recipe:** [Recipe Name]
**Device:** [iOS/Android version]

### Steps:
1. [ ] Login with test account
2. [ ] Navigate to "Cook a Dish" tab
3. [ ] Select test recipe
4. [ ] Verify ingredients list displayed
5. [ ] Click "Start Cooking"
6. [ ] Verify Step 1 displays correctly
7. [ ] Use voice command "next step"
8. [ ] Verify Step 2 displays
9. [ ] Click timer button
10. [ ] Verify timer starts and counts down
11. [ ] Ask AI question via text
12. [ ] Verify AI response received
13. [ ] Continue through all steps
14. [ ] Click "Finish Cooking"
15. [ ] Verify success screen shown

### Results:
- **Pass/Fail:** ______
- **Issues Found:** ______
- **Screenshots:** ______
- **Notes:** ______
```

---

## 8. Testing Tools & Setup

### 8.1 Backend Testing Stack

```txt
# requirements-dev.txt

# Testing
pytest==7.4.4
pytest-asyncio==0.23.3
pytest-cov==4.1.0
pytest-mock==3.12.0
httpx==0.26.0

# Load testing
locust==2.20.0

# Mocking
faker==21.0.0

# Code quality
black==23.12.1
ruff==0.1.11
mypy==1.8.0
```

---

### 8.2 Frontend Testing Stack

```json
{
  "devDependencies": {
    "@testing-library/react-native": "^12.4.3",
    "@testing-library/jest-native": "^5.4.3",
    "@testing-library/react-hooks": "^8.0.1",
    "jest": "^29.7.0",
    "jest-expo": "^50.0.1",
    "@types/jest": "^29.5.11"
  }
}
```

---

### 8.3 CI/CD Integration (GitHub Actions)

```yaml
# .github/workflows/test.yml

name: Test Suite

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run tests
        run: pytest tests/ -v --cov=app --cov-report=xml
        env:
          DATABASE_URL: postgresql://postgres:test@localhost/test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage.xml
  
  frontend-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
```

---

## 9. Test Data Management

### 9.1 Test Fixtures

```python
# tests/fixtures/recipes.py

SAMPLE_RECIPE = {
    "id": "test-recipe-123",
    "title": "Test Scrambled Eggs",
    "difficulty": "beginner",
    "prep_time": 2,
    "cook_time": 5,
    "servings": 2,
    "ingredients": [
        {"name": "eggs", "amount": 3, "unit": "whole"},
        {"name": "butter", "amount": 1, "unit": "tablespoon"},
        {"name": "salt", "amount": 0.5, "unit": "teaspoon"}
    ],
    "steps": [
        {
            "step_number": 1,
            "instruction": "Crack eggs into bowl",
            "visual_cue": "No shell pieces visible",
            "estimated_time": 1,
            "timer_required": False,
            "critical_step": False
        },
        {
            "step_number": 2,
            "instruction": "Heat pan over medium heat, add butter",
            "visual_cue": "Butter melted and foamy",
            "estimated_time": 2,
            "timer_required": False,
            "critical_step": False
        }
    ]
}
```

### 9.2 Test User Accounts

```python
TEST_USERS = [
    {
        "email": "test_beginner@chefmentor.com",
        "password": "Test123!",
        "skill_level": "beginner"
    },
    {
        "email": "test_intermediate@chefmentor.com",
        "password": "Test123!",
        "skill_level": "intermediate"
    }
]
```

---

## 10. Bug Tracking & Reporting

### 10.1 Bug Report Template

```markdown
## Bug Report

**Title:** [Brief description]

**Priority:** Critical / High / Medium / Low

**Environment:**
- Platform: iOS / Android / Web
- Version: [App version]
- Device: [Device model]
- OS Version: [OS version]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**


**Actual Behavior:**


**Screenshots/Logs:**


**Additional Context:**

```

---

## 11. Testing Schedule

### 11.1 During Development

- **Daily:** Run unit tests locally before commits
- **On PR:** Automated CI/CD runs all unit + integration tests
- **Weekly:** Manual E2E test of 1-2 recipes

### 11.2 Pre-Launch

- **Week -2:** Full manual E2E testing of all 5 recipes
- **Week -1:** Load testing with 100 concurrent users
- **Week -1:** Security testing (API auth, file uploads)
- **Launch Day:** Smoke testing in production

---

## 12. Implementation Checklist

- [ ] Set up pytest for backend
- [ ] Set up Jest for frontend
- [ ] Create test database
- [ ] Write unit tests for core services
- [ ] Write integration tests for API endpoints
- [ ] Set up test fixtures
- [ ] Configure CI/CD pipeline (GitHub Actions)
- [ ] Create manual test cases for 5 recipes
- [ ] Set up load testing with Locust
- [ ] Configure code coverage reporting
- [ ] Document bug reporting process
- [ ] Train team on testing practices
- [ ] Conduct first round of manual testing
- [ ] Fix critical bugs
- [ ] Achieve 50%+ code coverage
- [ ] Complete pre-launch testing

---

**Document Owner:** QA Team  
**Review Cycle:** Every sprint  
**Last Reviewed:** February 12, 2026
