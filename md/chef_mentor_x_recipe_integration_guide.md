# ChefMentor X – Recipe Integration Guide

**Version:** 1.0  
**Last Updated:** February 12, 2026  
**Status:** Approved for Implementation

---

## 1. Overview

This document specifies how ChefMentor X acquires, processes, and stores recipe data from multiple sources.

### Recipe Sources Strategy
1. **User Input:** User provides 5 dish names (e.g., "Chicken Biryani", "Maggi", etc.)
2. **RecipeDB API:** Primary source for structured recipe data
3. **FlavorDB API:** Ingredient pairing and flavor profiles
4. **AI Generation:** Gemini generates recipes if not found in databases
5. **PostgreSQL Storage:** All recipes stored locally for fast access

---

## 2. Recipe Data Sources

### 2.1 RecipeDB API

**API Details:**
- **URL:** https://cosylab.iiitd.edu.in/recipedb/
- **Documentation:** https://cosylab.iiitd.edu.in/recipedb/
- **Type:** Academic research database
- **Coverage:** 118,000+ recipes from various cuisines
- **Data Quality:** Structured, curated data
- **Authentication:** API key required (free for research/education)

**API Endpoints:**
```bash
# Search recipes by name
GET /recipedb/api/v1/search?q={dish_name}&limit=5

# Get recipe by ID
GET /recipedb/api/v1/recipe/{recipe_id}

# Get recipes by cuisine
GET /recipedb/api/v1/cuisine/{cuisine_type}
```

**Example Request:**
```python
import httpx

async def search_recipedb(dish_name: str) -> dict:
    """Search RecipeDB for recipe"""
    
    url = "https://cosylab.iiitd.edu.in/recipedb/api/v1/search"
    params = {
        "q": dish_name,
        "limit": 5
    }
    headers = {
        "Authorization": f"Bearer {RECIPE_DB_API_KEY}"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()
```

**Example Response:**
```json
{
  "results": [
    {
      "id": "R12345",
      "name": "Chicken Biryani",
      "cuisine": "Indian",
      "course": "Main Course",
      "diet": "Non-Vegetarian",
      "prep_time": 30,
      "cook_time": 60,
      "servings": 4,
      "ingredients": [
        {
          "name": "basmati rice",
          "quantity": 2,
          "unit": "cups"
        },
        {
          "name": "chicken",
          "quantity": 500,
          "unit": "grams"
        }
      ],
      "instructions": [
        "Wash and soak rice for 30 minutes",
        "Marinate chicken with yogurt and spices",
        "Cook rice until 70% done",
        "Layer rice and chicken, cook on dum"
      ]
    }
  ]
}
```

---

### 2.2 FlavorDB API

**API Details:**
- **URL:** https://cosylab.iiitd.edu.in/flavordb/
- **Documentation:** https://cosylab.iiitd.edu.in/flavordb/
- **Type:** Food pairing database
- **Coverage:** 1,000+ ingredients, flavor compounds
- **Use Case:** Find complementary ingredients, validate recipe combinations

**API Endpoints:**
```bash
# Get ingredient details
GET /flavordb/api/v1/ingredient/{ingredient_name}

# Get ingredient pairings
GET /flavordb/api/v1/pairings/{ingredient_name}

# Get flavor profile
GET /flavordb/api/v1/flavor/{ingredient_name}
```

**Example Request:**
```python
async def get_ingredient_pairings(ingredient: str) -> list:
    """Get complementary ingredients from FlavorDB"""
    
    url = f"https://cosylab.iiitd.edu.in/flavordb/api/v1/pairings/{ingredient}"
    headers = {
        "Authorization": f"Bearer {FLAVOR_DB_API_KEY}"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data["pairings"]
```

**Example Response:**
```json
{
  "ingredient": "chicken",
  "pairings": [
    {"name": "garlic", "score": 0.95},
    {"name": "lemon", "score": 0.89},
    {"name": "rosemary", "score": 0.87},
    {"name": "thyme", "score": 0.85}
  ]
}
```

---

### 2.3 AI Recipe Generation (Gemini)

**When to Use:**
- Recipe not found in RecipeDB
- User wants custom variations
- Need to add visual cues and detailed guidance

**Generation Prompt Template:**
```python
RECIPE_GENERATION_PROMPT = """
You are a professional chef and recipe developer. Generate a detailed recipe for:

DISH NAME: {dish_name}
SERVINGS: {servings}
DIETARY RESTRICTIONS: {dietary_restrictions}

Provide a complete recipe in JSON format with:
1. Ingredient list with precise measurements
2. Step-by-step instructions (8-12 steps)
3. Visual cues for each step (what to look for)
4. Estimated time for each step
5. Critical steps that need special attention
6. Equipment needed
7. Cooking tips

IMPORTANT SAFETY RULES:
- Always specify safe cooking temperatures for meat
- Include food safety warnings where appropriate
- Mention allergens clearly

Return JSON in this exact format:
{{
  "title": "string",
  "description": "brief description",
  "cuisine": "cuisine type",
  "difficulty": "beginner|intermediate|advanced",
  "prep_time": minutes,
  "cook_time": minutes,
  "total_time": minutes,
  "servings": number,
  "ingredients": [
    {{
      "name": "string",
      "amount": number,
      "unit": "string",
      "notes": "optional preparation notes"
    }}
  ],
  "equipment": ["list of required equipment"],
  "steps": [
    {{
      "step_number": 1,
      "instruction": "detailed instruction",
      "visual_cue": "what the food should look like",
      "estimated_time": minutes,
      "timer_required": true/false,
      "timer_duration": minutes or null,
      "critical_step": true/false,
      "temperature": "temperature if applicable",
      "tips": "optional cooking tip"
    }}
  ],
  "nutrition": {{
    "calories": number,
    "protein": "string",
    "carbs": "string",
    "fat": "string"
  }},
  "tags": ["tag1", "tag2"],
  "allergens": ["list of allergens"],
  "storage": "storage instructions",
  "reheating": "reheating instructions"
}}
"""
```

**Implementation:**
```python
async def generate_recipe_with_ai(
    dish_name: str,
    servings: int = 4,
    dietary_restrictions: list = None
) -> dict:
    """Generate recipe using Gemini AI"""
    
    prompt = RECIPE_GENERATION_PROMPT.format(
        dish_name=dish_name,
        servings=servings,
        dietary_restrictions=dietary_restrictions or "None"
    )
    
    # Try Gemini first
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.7,
                "response_mime_type": "application/json"
            }
        )
        
        recipe_data = json.loads(response.text)
        return recipe_data
        
    except Exception as e:
        logger.error(f"Gemini recipe generation failed: {e}")
        
        # Fallback to Groq
        return await generate_recipe_with_groq(dish_name, servings)
```

---

## 3. Recipe Processing Pipeline

### 3.1 Complete Recipe Acquisition Flow

```
User provides dish name: "Chicken Biryani"
    ↓
[STEP 1] Search RecipeDB
    ↓
    ├─ Found? → Use RecipeDB data → Go to STEP 4
    └─ Not found? → Go to STEP 2
    ↓
[STEP 2] Query FlavorDB for ingredient suggestions
    ↓
[STEP 3] Generate recipe with Gemini AI
    ├─ Use FlavorDB data for ingredient validation
    └─ Generate complete structured recipe
    ↓
[STEP 4] Enhance recipe with AI
    ├─ Add visual cues
    ├─ Add cooking tips
    ├─ Add timers
    ├─ Identify critical steps
    └─ Add safety warnings
    ↓
[STEP 5] Validate recipe
    ├─ Safety check (temperatures, allergens)
    ├─ Completeness check (all required fields)
    └─ Quality check (reasonable times, amounts)
    ↓
[STEP 6] Store in PostgreSQL
    ↓
[STEP 7] Return to user
```

### 3.2 Implementation

```python
class RecipeService:
    def __init__(self):
        self.recipedb_client = RecipeDBClient()
        self.flavordb_client = FlavorDBClient()
        self.ai_service = AIService()
        self.db = Database()
    
    async def get_or_create_recipe(self, dish_name: str) -> Recipe:
        """
        Main recipe acquisition method
        Returns recipe from database, APIs, or AI generation
        """
        
        # Check if already in our database
        existing = await self.db.recipes.find_one({"title": dish_name})
        if existing:
            logger.info(f"Recipe '{dish_name}' found in local database")
            return Recipe(**existing)
        
        # Try RecipeDB
        logger.info(f"Searching RecipeDB for '{dish_name}'")
        recipedb_results = await self.recipedb_client.search(dish_name)
        
        if recipedb_results and len(recipedb_results) > 0:
            # Use first result
            raw_recipe = recipedb_results[0]
            logger.info(f"Found recipe in RecipeDB: {raw_recipe['name']}")
            
            # Enhance with AI
            enhanced = await self.enhance_recipe_with_ai(raw_recipe)
            
        else:
            # Recipe not found, generate with AI
            logger.info(f"Recipe not found in RecipeDB, generating with AI")
            
            # Get ingredient suggestions from FlavorDB
            base_ingredient = self._extract_main_ingredient(dish_name)
            pairings = await self.flavordb_client.get_pairings(base_ingredient)
            
            # Generate recipe
            enhanced = await self.ai_service.generate_recipe(
                dish_name=dish_name,
                suggested_pairings=pairings
            )
        
        # Validate recipe
        validated = await self.validate_recipe(enhanced)
        
        # Store in database
        recipe = Recipe(**validated)
        await self.db.recipes.insert_one(recipe.dict())
        logger.info(f"Stored recipe '{dish_name}' in database")
        
        return recipe
    
    async def enhance_recipe_with_ai(self, raw_recipe: dict) -> dict:
        """Add AI enhancements to existing recipe"""
        
        prompt = f"""
        Enhance this recipe with detailed cooking guidance:
        
        {json.dumps(raw_recipe, indent=2)}
        
        Add:
        1. Visual cues for each step
        2. Estimated time for each step
        3. Timer recommendations
        4. Critical step identification
        5. Cooking tips
        6. Safety warnings
        
        Return enhanced recipe in the same JSON structure.
        """
        
        response = await self.ai_service.get_cooking_guidance(prompt, {})
        enhanced = json.loads(response)
        
        return enhanced
    
    async def validate_recipe(self, recipe: dict) -> dict:
        """Validate recipe for safety and completeness"""
        
        errors = []
        
        # Check required fields
        required = ["title", "ingredients", "steps"]
        for field in required:
            if field not in recipe:
                errors.append(f"Missing required field: {field}")
        
        # Check ingredient amounts
        for ing in recipe.get("ingredients", []):
            if "amount" not in ing or ing["amount"] <= 0:
                errors.append(f"Invalid amount for ingredient: {ing.get('name')}")
        
        # Check cooking temperatures for meat
        meat_keywords = ["chicken", "beef", "pork", "turkey", "fish"]
        has_meat = any(
            keyword in recipe.get("title", "").lower() 
            for keyword in meat_keywords
        )
        
        if has_meat:
            # Ensure temperature mentioned in steps
            temp_mentioned = any(
                "temperature" in step.get("instruction", "").lower()
                or step.get("temperature")
                for step in recipe.get("steps", [])
            )
            
            if not temp_mentioned:
                logger.warning(f"Recipe contains meat but no temperature specified")
                # Add safety warning
                recipe["safety_notes"] = recipe.get("safety_notes", [])
                recipe["safety_notes"].append(
                    "Ensure meat reaches safe internal temperature"
                )
        
        if errors:
            raise ValueError(f"Recipe validation failed: {errors}")
        
        return recipe
    
    def _extract_main_ingredient(self, dish_name: str) -> str:
        """Extract main ingredient from dish name"""
        # Simple heuristic: first noun is usually main ingredient
        common_ingredients = [
            "chicken", "beef", "pork", "fish", "shrimp", "lamb",
            "potato", "tomato", "pasta", "rice", "noodles"
        ]
        
        dish_lower = dish_name.lower()
        for ingredient in common_ingredients:
            if ingredient in dish_lower:
                return ingredient
        
        # Default: use first word
        return dish_name.split()[0].lower()
```

---

## 4. Recipe Data Schema

### 4.1 PostgreSQL Schema

```sql
-- recipes table
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    difficulty VARCHAR(50) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    prep_time INTEGER, -- minutes
    cook_time INTEGER, -- minutes
    total_time INTEGER, -- minutes
    servings INTEGER,
    source VARCHAR(100), -- 'recipedb', 'ai_generated', 'user_uploaded'
    source_id VARCHAR(255), -- external ID if from API
    equipment JSONB, -- array of equipment
    tags JSONB, -- array of tags
    allergens JSONB, -- array of allergens
    nutrition JSONB, -- nutrition info object
    storage_instructions TEXT,
    reheating_instructions TEXT,
    safety_notes JSONB, -- array of safety warnings
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ingredients table
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2),
    unit VARCHAR(50),
    notes TEXT,
    order_index INTEGER -- display order
);

-- steps table
CREATE TABLE steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    instruction TEXT NOT NULL,
    visual_cue TEXT,
    estimated_time INTEGER, -- minutes
    timer_required BOOLEAN DEFAULT FALSE,
    timer_duration INTEGER, -- seconds
    critical_step BOOLEAN DEFAULT FALSE,
    temperature VARCHAR(50),
    tips TEXT,
    order_index INTEGER
);

-- indexes
CREATE INDEX idx_recipes_title ON recipes(title);
CREATE INDEX idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX idx_ingredients_recipe ON ingredients(recipe_id);
CREATE INDEX idx_steps_recipe ON steps(recipe_id);
```

### 4.2 SQLAlchemy Models

```python
from sqlalchemy import Column, String, Integer, Boolean, Text, TIMESTAMP, ForeignKey, JSON, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime

class Recipe(Base):
    __tablename__ = "recipes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    cuisine = Column(String(100), index=True)
    difficulty = Column(String(50))
    prep_time = Column(Integer)
    cook_time = Column(Integer)
    total_time = Column(Integer)
    servings = Column(Integer)
    source = Column(String(100))
    source_id = Column(String(255))
    equipment = Column(JSON)
    tags = Column(JSON)
    allergens = Column(JSON)
    nutrition = Column(JSON)
    storage_instructions = Column(Text)
    reheating_instructions = Column(Text)
    safety_notes = Column(JSON)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    ingredients = relationship("Ingredient", back_populates="recipe", cascade="all, delete-orphan")
    steps = relationship("Step", back_populates="recipe", cascade="all, delete-orphan")

class Ingredient(Base):
    __tablename__ = "ingredients"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipe_id = Column(UUID(as_uuid=True), ForeignKey("recipes.id"), nullable=False)
    name = Column(String(255), nullable=False)
    amount = Column(Numeric(10, 2))
    unit = Column(String(50))
    notes = Column(Text)
    order_index = Column(Integer)
    
    # Relationships
    recipe = relationship("Recipe", back_populates="ingredients")

class Step(Base):
    __tablename__ = "steps"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipe_id = Column(UUID(as_uuid=True), ForeignKey("recipes.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    instruction = Column(Text, nullable=False)
    visual_cue = Column(Text)
    estimated_time = Column(Integer)
    timer_required = Column(Boolean, default=False)
    timer_duration = Column(Integer)
    critical_step = Column(Boolean, default=False)
    temperature = Column(String(50))
    tips = Column(Text)
    order_index = Column(Integer)
    
    # Relationships
    recipe = relationship("Recipe", back_populates="steps")
```

---

## 5. Recipe Caching Strategy

### 5.1 Multi-Layer Cache

```
Request for recipe
    ↓
[Layer 1] In-Memory Cache (Python dict)
    ├─ Hit → Return immediately
    └─ Miss → Check Layer 2
    ↓
[Layer 2] Redis Cache (24 hour TTL)
    ├─ Hit → Return + update Layer 1
    └─ Miss → Check Layer 3
    ↓
[Layer 3] PostgreSQL Database
    ├─ Hit → Return + update Layer 2 & 1
    └─ Miss → Fetch from APIs/Generate
```

### 5.2 Implementation

```python
from redis import asyncio as aioredis
import json

class RecipeCacheService:
    def __init__(self):
        self.memory_cache = {}  # In-memory cache
        self.redis = aioredis.from_url(os.getenv("REDIS_URL"))
        self.db = Database()
    
    async def get_recipe(self, recipe_id: str) -> Recipe:
        """Get recipe with multi-layer caching"""
        
        # Layer 1: Memory
        if recipe_id in self.memory_cache:
            logger.debug(f"Recipe {recipe_id} found in memory cache")
            return self.memory_cache[recipe_id]
        
        # Layer 2: Redis
        redis_key = f"recipe:{recipe_id}"
        cached_json = await self.redis.get(redis_key)
        
        if cached_json:
            logger.debug(f"Recipe {recipe_id} found in Redis")
            recipe_data = json.loads(cached_json)
            recipe = Recipe(**recipe_data)
            
            # Update memory cache
            self.memory_cache[recipe_id] = recipe
            return recipe
        
        # Layer 3: Database
        recipe = await self.db.recipes.find_one({"id": recipe_id})
        
        if recipe:
            logger.debug(f"Recipe {recipe_id} found in database")
            recipe_obj = Recipe(**recipe)
            
            # Update caches
            await self.redis.setex(redis_key, 86400, json.dumps(recipe))
            self.memory_cache[recipe_id] = recipe_obj
            
            return recipe_obj
        
        # Not found
        raise RecipeNotFoundError(f"Recipe {recipe_id} not found")
    
    async def invalidate_cache(self, recipe_id: str):
        """Clear cached recipe after update"""
        if recipe_id in self.memory_cache:
            del self.memory_cache[recipe_id]
        
        await self.redis.delete(f"recipe:{recipe_id}")
```

---

## 6. Initial 5 Recipe Setup

### 6.1 User-Provided Dish Names

**Process:**
1. User provides 5 dish names during onboarding or setup
2. System fetches/generates all 5 recipes
3. Recipes stored in database
4. User can start cooking immediately

**Example Dish Names:**
```python
INITIAL_RECIPES = [
    "Chicken Biryani",
    "Maggi Noodles",
    "Scrambled Eggs",
    "Vegetable Stir Fry",
    "Chocolate Chip Cookies"
]
```

### 6.2 Batch Recipe Import

```python
async def initialize_user_recipes(user_id: str, dish_names: list[str]):
    """
    Import initial recipes for new user
    """
    
    recipes = []
    
    for dish_name in dish_names:
        try:
            logger.info(f"Fetching recipe for: {dish_name}")
            recipe = await recipe_service.get_or_create_recipe(dish_name)
            
            # Associate with user
            await db.user_recipes.insert_one({
                "user_id": user_id,
                "recipe_id": recipe.id,
                "added_at": datetime.utcnow(),
                "source": "initial_setup"
            })
            
            recipes.append(recipe)
            
        except Exception as e:
            logger.error(f"Failed to fetch recipe '{dish_name}': {e}")
            # Continue with other recipes
    
    logger.info(f"Initialized {len(recipes)} recipes for user {user_id}")
    return recipes
```

---

## 7. API Rate Limiting & Error Handling

### 7.1 Rate Limits

**RecipeDB:**
- Assume: 60 requests/minute (verify with provider)
- Strategy: Cache aggressively, batch requests

**FlavorDB:**
- Assume: 60 requests/minute
- Strategy: Cache pairing data (rarely changes)

**Gemini AI:**
- Free tier: 15 RPM, 1M TPM, 1500 RPD
- Strategy: Use Groq fallback, cache generated recipes

### 7.2 Error Handling

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
async def fetch_from_recipedb_with_retry(dish_name: str):
    """Fetch with automatic retry on failure"""
    try:
        return await recipedb_client.search(dish_name)
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 429:
            # Rate limited
            logger.warning("RecipeDB rate limit hit, waiting...")
            raise  # Will trigger retry
        elif e.response.status_code >= 500:
            # Server error
            logger.error(f"RecipeDB server error: {e}")
            raise
        else:
            # Client error, don't retry
            logger.error(f"RecipeDB client error: {e}")
            return None
```

---

## 8. Testing Strategy

### 8.1 Unit Tests

```python
import pytest

class TestRecipeService:
    @pytest.mark.asyncio
    async def test_fetch_from_recipedb(self):
        """Test fetching recipe from RecipeDB"""
        recipe = await recipe_service.get_or_create_recipe("Chicken Biryani")
        assert recipe.title
        assert len(recipe.ingredients) > 0
        assert len(recipe.steps) > 0
    
    @pytest.mark.asyncio
    async def test_ai_generation_fallback(self):
        """Test AI generation when recipe not in database"""
        recipe = await recipe_service.get_or_create_recipe("Obscure Rare Dish XYZ")
        assert recipe.source == "ai_generated"
        assert recipe.title
    
    @pytest.mark.asyncio
    async def test_recipe_validation(self):
        """Test recipe validation catches errors"""
        invalid_recipe = {"title": "Test"}  # Missing required fields
        
        with pytest.raises(ValueError):
            await recipe_service.validate_recipe(invalid_recipe)
```

### 8.2 Integration Tests

```python
@pytest.mark.asyncio
async def test_complete_recipe_pipeline():
    """Test full recipe acquisition pipeline"""
    
    dish_names = ["Pasta Carbonara", "Chicken Curry", "Pancakes"]
    
    for dish in dish_names:
        recipe = await recipe_service.get_or_create_recipe(dish)
        
        # Verify stored in database
        db_recipe = await db.recipes.find_one({"id": recipe.id})
        assert db_recipe is not None
        
        # Verify cache populated
        cached = await cache_service.get_recipe(str(recipe.id))
        assert cached.title == recipe.title
```

---

## 9. Monitoring & Metrics

### 9.1 Metrics to Track

```python
from prometheus_client import Counter, Histogram

recipe_fetch_total = Counter(
    'recipe_fetch_total',
    'Total recipe fetches',
    ['source']  # recipedb, flavordb, ai_generated, cache
)

recipe_fetch_duration = Histogram(
    'recipe_fetch_duration_seconds',
    'Recipe fetch duration',
    ['source']
)

recipe_generation_errors = Counter(
    'recipe_generation_errors_total',
    'Recipe generation errors',
    ['error_type']
)
```

### 9.2 Logging

```python
import logging

logger = logging.getLogger("recipe_service")

# Log all recipe acquisitions
logger.info(f"Recipe '{dish_name}' fetched from {source} in {duration}s")

# Log errors
logger.error(f"Failed to fetch recipe '{dish_name}': {error}")

# Log cache hits
logger.debug(f"Cache hit for recipe {recipe_id}")
```

---

## 10. Implementation Checklist

- [ ] Set up RecipeDB API credentials
- [ ] Set up FlavorDB API credentials
- [ ] Implement RecipeDB client
- [ ] Implement FlavorDB client
- [ ] Implement AI recipe generation with Gemini
- [ ] Create recipe database schema
- [ ] Implement recipe validation logic
- [ ] Implement multi-layer caching
- [ ] Add error handling and retries
- [ ] Write unit tests for all components
- [ ] Write integration tests
- [ ] Set up monitoring metrics
- [ ] Test with 5 initial recipe dishes
- [ ] Document API rate limits
- [ ] Create recipe admin panel (optional)

---

**Document Owner:** Backend Team  
**Review Cycle:** Every sprint  
**Last Reviewed:** February 12, 2026
