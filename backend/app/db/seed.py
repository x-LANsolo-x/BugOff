import asyncio
from sqlalchemy import select
from app.db.base import AsyncSessionLocal
from app.models import Recipe, RecipeStep

async def seed_recipes():
    async with AsyncSessionLocal() as session:
        print("🌱 Starting database seeding...")
        
        # Check if we already have recipes
        result = await session.execute(select(Recipe))
        if result.scalars().first():
            print("⚠️ Recipes already exist. Skipping seed.")
            return

        # Recipe 1: Maggi Noodles
        maggi = Recipe(
            name="Maggi Noodles",
            difficulty="easy",
            estimated_time_min=10
        )
        session.add(maggi)
        await session.flush()
        
        maggi_steps = [
            RecipeStep(recipe_id=maggi.id, step_number=1, instruction="Boil 1.5 cups of water in a pan", expected_state="Water boiling"),
            RecipeStep(recipe_id=maggi.id, step_number=2, instruction="Add Maggi noodle cake and tastemaker", expected_state="Noodles added to water"),
            RecipeStep(recipe_id=maggi.id, step_number=3, instruction="Cook for 2 minutes, stirring occasionally", expected_state="Noodles softened"),
            RecipeStep(recipe_id=maggi.id, step_number=4, instruction="Serve hot", expected_state="Ready to serve"),
        ]
        session.add_all(maggi_steps)
        print("✓ Added Maggi Noodles")
        
        # Recipe 2: Scrambled Eggs
        eggs = Recipe(
            name="Scrambled Eggs",
            difficulty="easy",
            estimated_time_min=8
        )
        session.add(eggs)
        await session.flush()
        
        egg_steps = [
            RecipeStep(recipe_id=eggs.id, step_number=1, instruction="Beat 2 eggs in a bowl with salt and pepper", expected_state="Eggs beaten"),
            RecipeStep(recipe_id=eggs.id, step_number=2, instruction="Heat butter in a pan on medium heat", expected_state="Butter melted"),
            RecipeStep(recipe_id=eggs.id, step_number=3, instruction="Pour eggs into the pan", expected_state="Eggs in pan"),
            RecipeStep(recipe_id=eggs.id, step_number=4, instruction="Stir gently until eggs are cooked but still soft", expected_state="Eggs cooked"),
            RecipeStep(recipe_id=eggs.id, step_number=5, instruction="Serve immediately", expected_state="Ready to serve"),
        ]
        session.add_all(egg_steps)
        print("✓ Added Scrambled Eggs")
        
        # Recipe 3: Grilled Cheese
        cheese = Recipe(
            name="Grilled Cheese Sandwich",
            difficulty="easy",
            estimated_time_min=10
        )
        session.add(cheese)
        await session.flush()
        
        cheese_steps = [
            RecipeStep(recipe_id=cheese.id, step_number=1, instruction="Butter one side of two slices of bread", expected_state="Bread buttered"),
            RecipeStep(recipe_id=cheese.id, step_number=2, instruction="Place cheese between slices, butter side out", expected_state="Sandwich assembled"),
            RecipeStep(recipe_id=cheese.id, step_number=3, instruction="Grill in pan until golden brown", expected_state="Side 1 golden"),
            RecipeStep(recipe_id=cheese.id, step_number=4, instruction="Flip and grill other side", expected_state="Side 2 golden"),
        ]
        session.add_all(cheese_steps)
        print("✓ Added Grilled Cheese")

        await session.commit()
        print("\n✅ Seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_recipes())
