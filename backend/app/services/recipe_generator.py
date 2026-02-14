import google.generativeai as genai
from app.core.config import settings
from app.models.recipe import Recipe, RecipeStep, DifficultyLevel
from sqlalchemy.ext.asyncio import AsyncSession
import json
import uuid

class RecipeGeneratorService:
    def __init__(self, db: AsyncSession):
        self.db = db
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def generate_from_name(self, dish_name: str) -> Recipe:
        """
        Generates a full recipe from a dish name using AI, saves it to DB, and returns it.
        """
        prompt = f"""
        Create a detailed cooking recipe for "{dish_name}".
        
        Return ONLY valid JSON in this exact format:
        {{
            "name": "{dish_name}",
            "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED",
            "estimated_time_min": 30,
            "steps": [
                {{
                    "step_number": 1,
                    "instruction": "Detailed instruction...",
                    "expected_state": "Visual cue (e.g. onions are translucent)"
                }}
            ]
        }}
        
        Use exactly one of these difficulty values: BEGINNER, INTERMEDIATE, ADVANCED
        """
        
        try:
            response = await self.model.generate_content_async(prompt)
            # Clean markdown
            clean_text = response.text.replace('```json', '').replace('```', '').strip()
            data = json.loads(clean_text)
            
            # Map difficulty to database enum values
            difficulty_map = {
                'easy': DifficultyLevel.BEGINNER,
                'medium': DifficultyLevel.INTERMEDIATE, 
                'hard': DifficultyLevel.ADVANCED,
                'expert': DifficultyLevel.EXPERT,
                'beginner': DifficultyLevel.BEGINNER,
                'intermediate': DifficultyLevel.INTERMEDIATE,
                'advanced': DifficultyLevel.ADVANCED,
                'BEGINNER': DifficultyLevel.BEGINNER,
                'INTERMEDIATE': DifficultyLevel.INTERMEDIATE,
                'ADVANCED': DifficultyLevel.ADVANCED,
                'EXPERT': DifficultyLevel.EXPERT
            }
            difficulty = difficulty_map.get(data.get('difficulty', 'INTERMEDIATE'), DifficultyLevel.INTERMEDIATE)
            
            # Create DB Objects (matching actual database schema)
            recipe = Recipe(
                title=data['name'],
                difficulty=difficulty,
                prep_time_minutes=data.get('estimated_time_min', 30),
                cook_time_minutes=0,
                total_time_minutes=data.get('estimated_time_min', 30),
                servings=4,
                cuisine_type="General",
                meal_type="Main Course",
                is_active=True,
                is_featured=False,
                ai_generated=True,
                ai_model="gemini-2.5-flash"
            )
            self.db.add(recipe)
            await self.db.flush() # Get ID
            
            # Create Steps
            for step_data in data['steps']:
                step = RecipeStep(
                    recipe_id=recipe.id,
                    step_number=step_data['step_number'],
                    instruction=step_data['instruction'],
                    timer_required=False
                )
                self.db.add(step)
            
            await self.db.commit()
            await self.db.refresh(recipe)
            return recipe
            
        except Exception as e:
            print(f"Recipe Generation Error: {e}")
            raise e
