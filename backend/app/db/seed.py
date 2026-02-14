"""
ChefMentor X – Database Seed Script

Run with:
    python -m app.db.seed

Seeds 12 diverse recipes across all difficulty levels and cuisines.
"""

import asyncio
from sqlalchemy import select
from app.db.base import AsyncSessionLocal
from app.models import Recipe, RecipeStep
from app.models.recipe import DifficultyLevel


RECIPES = [
    # ── BEGINNER ─────────────────────────────────────
    {
        "title": "Maggi Noodles",
        "name": "Maggi Noodles",
        "description": "Quick and delicious instant noodles with vegetables",
        "difficulty": DifficultyLevel.BEGINNER,
        "prep_time_minutes": 2,
        "cook_time_minutes": 5,
        "total_time_minutes": 7,
        "servings": 1,
        "cuisine_type": "Indian",
        "meal_type": "Snack",
        "steps": [
            ("Boil 1.5 cups of water in a pan", "Water boiling", "Use a medium saucepan for even heat."),
            ("Add Maggi noodle cake and tastemaker", "Noodles added to water", "Break the cake in half for faster cooking."),
            ("Cook for 2 minutes, stirring occasionally", "Noodles softened", "Stir gently to avoid breaking noodles."),
            ("Serve hot with chopped coriander", "Ready to serve", "A squeeze of lime adds great flavor!"),
        ],
    },
    {
        "title": "Scrambled Eggs",
        "name": "Scrambled Eggs",
        "description": "Fluffy and creamy scrambled eggs — a breakfast essential",
        "difficulty": DifficultyLevel.BEGINNER,
        "prep_time_minutes": 2,
        "cook_time_minutes": 6,
        "total_time_minutes": 8,
        "servings": 1,
        "cuisine_type": "American",
        "meal_type": "Breakfast",
        "steps": [
            ("Beat 3 eggs in a bowl with salt and pepper", "Eggs beaten", "Whisk vigorously for 30 seconds for extra fluffiness."),
            ("Heat 1 tbsp butter in a non-stick pan on medium-low", "Butter melted", "Low heat is key — high heat makes eggs rubbery."),
            ("Pour eggs into the pan, let sit for 30 seconds", "Eggs setting", "Don't stir immediately — let curds form naturally."),
            ("Gently fold eggs with a spatula until soft-set", "Eggs cooked", "Remove while still slightly wet — carry-over heat finishes them."),
            ("Serve immediately on warm toast", "Ready to serve", "Garnish with chives for restaurant quality."),
        ],
    },
    {
        "title": "Grilled Cheese Sandwich",
        "name": "Grilled Cheese Sandwich",
        "description": "Classic grilled cheese with golden crispy bread and melty cheese",
        "difficulty": DifficultyLevel.BEGINNER,
        "prep_time_minutes": 3,
        "cook_time_minutes": 7,
        "total_time_minutes": 10,
        "servings": 1,
        "cuisine_type": "American",
        "meal_type": "Lunch",
        "steps": [
            ("Butter one side of two slices of bread", "Bread buttered", "Use room temperature butter for even spreading."),
            ("Place cheese between the slices, butter side out", "Sandwich assembled", "Use a mix of cheddar + mozzarella for the best melt."),
            ("Grill in a pan on medium heat until golden, ~3 min", "Side 1 golden", "Press gently with a spatula for even browning."),
            ("Flip carefully and grill the other side, ~2 min", "Both sides golden", "Cover with a lid briefly to help cheese melt faster."),
        ],
    },
    {
        "title": "Classic French Toast",
        "name": "Classic French Toast",
        "description": "Sweet cinnamon French toast with maple syrup",
        "difficulty": DifficultyLevel.BEGINNER,
        "prep_time_minutes": 5,
        "cook_time_minutes": 10,
        "total_time_minutes": 15,
        "servings": 2,
        "cuisine_type": "French",
        "meal_type": "Breakfast",
        "steps": [
            ("Whisk 2 eggs, 1/3 cup milk, 1 tsp cinnamon, 1 tsp vanilla", "Egg mixture ready", "Add a pinch of nutmeg for extra warmth."),
            ("Dip bread slices into the mixture, coating both sides", "Bread coated", "Use thick-cut bread (brioche works best) — let it soak 10 seconds per side."),
            ("Melt butter in a skillet over medium heat", "Pan heated", "Don't let the butter brown — reduce heat if it smokes."),
            ("Cook each slice 2-3 minutes per side until golden", "French toast cooked", "Resist the urge to flip too early — let it develop a crust."),
            ("Serve with maple syrup, fresh berries, and powdered sugar", "Ready to serve", "Warm the maple syrup in the microwave for 15 seconds."),
        ],
    },
    # ── INTERMEDIATE ──────────────────────────────────
    {
        "title": "Spicy Ramen Bowl",
        "name": "Spicy Ramen Bowl",
        "description": "Rich miso-based ramen with soft-boiled egg and vegetables",
        "difficulty": DifficultyLevel.INTERMEDIATE,
        "prep_time_minutes": 10,
        "cook_time_minutes": 15,
        "total_time_minutes": 25,
        "servings": 2,
        "cuisine_type": "Japanese",
        "meal_type": "Main Course",
        "steps": [
            ("Soft-boil 2 eggs: boil 6.5 min, ice bath immediately", "Eggs ready", "6.5 minutes gives a perfectly jammy yolk."),
            ("Sauté garlic, ginger, and chili paste in sesame oil", "Aromatics cooked", "Don't burn the garlic — it turns bitter."),
            ("Add 3 cups chicken broth + 2 tbsp miso paste, simmer", "Broth simmering", "Dissolve miso in a small bowl of broth first to avoid lumps."),
            ("Cook ramen noodles per package directions, drain", "Noodles cooked", "Cook noodles separately to keep the broth clear."),
            ("Assemble: noodles in bowl, ladle broth, top with egg, scallions, nori", "Ready to serve", "Halve the egg to show the jammy center."),
        ],
    },
    {
        "title": "Chicken Tikka Masala",
        "name": "Chicken Tikka Masala",
        "description": "Tender chicken in a rich, spiced tomato-cream sauce",
        "difficulty": DifficultyLevel.INTERMEDIATE,
        "prep_time_minutes": 20,
        "cook_time_minutes": 30,
        "total_time_minutes": 50,
        "servings": 4,
        "cuisine_type": "Indian",
        "meal_type": "Main Course",
        "steps": [
            ("Marinate chicken in yogurt, turmeric, cumin, garam masala for 30 min", "Chicken marinated", "Overnight marination gives the best flavor."),
            ("Grill or pan-sear chicken pieces until charred", "Chicken cooked", "Don't move the pieces too much — let them develop a char."),
            ("Sauté onions, garlic, ginger until soft. Add tomato paste + spices", "Base ready", "Cook the tomato paste for 2 min to remove raw flavor."),
            ("Add crushed tomatoes, simmer for 15 min", "Sauce thickened", "Blend for a smoother sauce if desired."),
            ("Stir in cream and cooked chicken, simmer 5 min", "Dish combined", "Add cream off-heat to prevent curdling."),
            ("Serve with basmati rice and fresh naan", "Ready to serve", "Garnish with fresh cilantro and a swirl of cream."),
        ],
    },
    {
        "title": "Pasta Carbonara",
        "name": "Pasta Carbonara",
        "description": "Authentic Roman carbonara with egg, pecorino, and guanciale",
        "difficulty": DifficultyLevel.INTERMEDIATE,
        "prep_time_minutes": 10,
        "cook_time_minutes": 20,
        "total_time_minutes": 30,
        "servings": 2,
        "cuisine_type": "Italian",
        "meal_type": "Main Course",
        "steps": [
            ("Cook spaghetti in well-salted boiling water until al dente", "Pasta cooking", "Save 1 cup of pasta water before draining."),
            ("Crisp guanciale (or pancetta) in a cold pan on medium heat", "Guanciale crispy", "Start in a cold pan — the fat renders slowly for crispier results."),
            ("Whisk 2 egg yolks + 1 whole egg with grated pecorino", "Egg mixture ready", "The eggs should be at room temperature."),
            ("Toss hot pasta with guanciale fat OFF heat", "Pasta coated", "Remove pan from heat to prevent scrambling the eggs."),
            ("Add egg mixture, toss vigorously with pasta water to emulsify", "Sauce formed", "Add pasta water 1 tbsp at a time until silky."),
            ("Serve immediately with extra pecorino and black pepper", "Ready to serve", "Carbonara waits for no one — serve immediately!"),
        ],
    },
    {
        "title": "Vegetable Stir-Fry",
        "name": "Vegetable Stir-Fry",
        "description": "Colorful vegetables tossed in a savory soy-ginger sauce",
        "difficulty": DifficultyLevel.INTERMEDIATE,
        "prep_time_minutes": 10,
        "cook_time_minutes": 8,
        "total_time_minutes": 18,
        "servings": 2,
        "cuisine_type": "Chinese",
        "meal_type": "Main Course",
        "steps": [
            ("Prep all vegetables: slice bell peppers, broccoli, snap peas, carrots", "Veggies prepped", "Cut everything the same size for even cooking."),
            ("Mix sauce: 2 tbsp soy sauce, 1 tbsp oyster sauce, 1 tsp sesame oil, 1 tsp cornstarch", "Sauce ready", "Shake cornstarch with cold water before adding to prevent lumps."),
            ("Heat wok or large pan until smoking, add 2 tbsp oil", "Wok hot", "A hot wok is the secret to great stir-fry — the 'wok hei'."),
            ("Add vegetables in order: carrots first, then peppers, broccoli, snap peas", "Veggies cooking", "Hard vegetables first, soft vegetables last."),
            ("Pour sauce over, toss for 1 minute until glazed", "Dish sauced", "Don't overcook — vegetables should still have a crunch."),
            ("Serve over steamed rice or noodles", "Ready to serve", "Top with sesame seeds and sliced scallions."),
        ],
    },
    # ── ADVANCED ──────────────────────────────────────
    {
        "title": "Beef Wellington",
        "name": "Beef Wellington",
        "description": "Tender beef fillet wrapped in mushroom duxelles and puff pastry",
        "difficulty": DifficultyLevel.ADVANCED,
        "prep_time_minutes": 45,
        "cook_time_minutes": 30,
        "total_time_minutes": 75,
        "servings": 4,
        "cuisine_type": "British",
        "meal_type": "Main Course",
        "steps": [
            ("Season beef tenderloin, sear all sides in a hot pan", "Beef seared", "Sear for 30 seconds per side — just the surface, not cooking through."),
            ("Brush with Dijon mustard, wrap in plastic, refrigerate 30 min", "Beef cooling", "The mustard adds flavor AND helps the duxelles stick."),
            ("Finely chop mushrooms, cook until all moisture evaporates", "Duxelles ready", "Squeeze mushrooms in a towel to remove excess moisture."),
            ("Layer plastic wrap, prosciutto slices, spread duxelles on top", "Layer assembled", "Overlap prosciutto slices to create a seal."),
            ("Roll beef in the prosciutto-duxelles layer tightly", "Wellington rolled", "Pull plastic wrap tight to create a uniform cylinder."),
            ("Wrap in puff pastry, egg wash, score pattern, chill 15 min", "Pastry wrapped", "Chill before baking — cold pastry puffs better."),
            ("Bake at 425°F for 25-30 min until golden, rest 10 min", "Wellington baked", "Use a meat thermometer: 125°F for medium-rare."),
        ],
    },
    {
        "title": "Homemade Sushi Rolls",
        "name": "Homemade Sushi Rolls",
        "description": "California and spicy tuna maki rolls with sushi rice",
        "difficulty": DifficultyLevel.ADVANCED,
        "prep_time_minutes": 30,
        "cook_time_minutes": 20,
        "total_time_minutes": 50,
        "servings": 4,
        "cuisine_type": "Japanese",
        "meal_type": "Main Course",
        "steps": [
            ("Rinse 2 cups sushi rice until water runs clear, cook per instructions", "Rice cooked", "Rinse at least 5 times — cloudy water means starch."),
            ("Season hot rice with rice vinegar, sugar, salt — fan to cool", "Rice seasoned", "Fan while folding prevents the rice from becoming mushy."),
            ("Prep fillings: slice cucumber, avocado, fish into thin strips", "Fillings ready", "Dip your knife in water between cuts for cleaner slices."),
            ("Place nori on bamboo mat, spread rice leaving 1-inch edge", "Nori prepared", "Wet your hands before touching the rice."),
            ("Add fillings in a line, roll tightly using the mat", "Roll formed", "Apply even pressure — don't squeeze too hard."),
            ("Slice into 6-8 pieces with a wet, sharp knife", "Rolls sliced", "Wipe the knife clean between each cut."),
            ("Serve with soy sauce, wasabi, and pickled ginger", "Ready to serve", "Eat sushi within 30 minutes for the best texture."),
        ],
    },
    # ── EXPERT ──────────────────────────────────────────
    {
        "title": "Croissants from Scratch",
        "name": "Croissants from Scratch",
        "description": "Buttery, flaky French croissants with laminated dough",
        "difficulty": DifficultyLevel.EXPERT,
        "prep_time_minutes": 60,
        "cook_time_minutes": 20,
        "total_time_minutes": 720,
        "servings": 8,
        "cuisine_type": "French",
        "meal_type": "Breakfast",
        "steps": [
            ("Make détrempe: mix flour, sugar, salt, yeast, milk — knead 5 min", "Dough formed", "Don't over-knead — the gluten develops during lamination."),
            ("Refrigerate dough for 1 hour", "Dough chilled", "Cold dough is essential — it keeps butter layers separate."),
            ("Pound cold butter into a flat rectangle", "Butter ready", "The butter should be pliable but cold — not soft."),
            ("Enclose butter in dough, perform first fold (letter fold)", "Fold 1 done", "Keep edges aligned for even layers."),
            ("Refrigerate 30 min, repeat fold 2 more times", "Three folds complete", "You now have 27 layers of butter."),
            ("Roll out final dough, cut into triangles, shape croissants", "Croissants shaped", "Roll from base to tip, curving the ends inward."),
            ("Proof at room temperature for 2 hours until doubled", "Proofed", "Don't rush — proper proofing gives the airy texture."),
            ("Egg wash and bake at 400°F for 15-18 min until deep golden", "Baked", "The deeper the color, the more flavorful the crust."),
        ],
    },
    {
        "title": "Thai Green Curry",
        "name": "Thai Green Curry",
        "description": "Fragrant coconut curry with fresh vegetables and Thai basil",
        "difficulty": DifficultyLevel.INTERMEDIATE,
        "prep_time_minutes": 15,
        "cook_time_minutes": 20,
        "total_time_minutes": 35,
        "servings": 3,
        "cuisine_type": "Thai",
        "meal_type": "Main Course",
        "steps": [
            ("Fry 3 tbsp green curry paste in coconut oil until fragrant, ~2 min", "Paste bloomed", "Cook the paste to release its oils and deepen the flavor."),
            ("Add 1 can coconut milk (thick cream part first), stir to combine", "Sauce base formed", "Scoop the thick cream off the top — this makes the sauce richer."),
            ("Add sliced chicken or tofu, simmer for 8 min", "Protein cooking", "Cut protein into thin strips for faster cooking."),
            ("Add bamboo shoots, bell peppers, Thai eggplant, fish sauce, palm sugar", "Vegetables added", "Balance sweet (sugar) and salty (fish sauce) to taste."),
            ("Stir in remaining coconut milk, Thai basil, and kaffir lime leaves", "Curry complete", "Add basil at the very end — it wilts quickly."),
            ("Serve over jasmine rice with a squeeze of lime", "Ready to serve", "Garnish with red chili slices and extra basil."),
        ],
    },
]


async def seed_recipes():
    async with AsyncSessionLocal() as session:
        print("🌱 Starting database seeding...")

        # Check if we already have recipes
        result = await session.execute(select(Recipe))
        if result.scalars().first():
            print("⚠️  Recipes already exist. Skipping seed.")
            return

        for recipe_data in RECIPES:
            steps_data = recipe_data.pop("steps")

            recipe = Recipe(**recipe_data)
            session.add(recipe)
            await session.flush()

            for i, (instruction, expected_state, ai_tip) in enumerate(steps_data, 1):
                step = RecipeStep(
                    recipe_id=recipe.id,
                    step_number=i,
                    instruction=instruction,
                    expected_state=expected_state,
                    ai_tips=ai_tip,
                )
                session.add(step)

            print(f"  ✓ {recipe_data['title']} ({recipe_data['difficulty'].value})")

        await session.commit()
        print(f"\n✅ Seeded {len(RECIPES)} recipes with detailed steps + AI tips!")


if __name__ == "__main__":
    asyncio.run(seed_recipes())
