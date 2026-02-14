from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.base import get_db
from app.models.recipe import Recipe
from app.services.recipedb import RecipeDBService
from app.services.flavordb import FlavorDBService
from app.services.recipe_generator import RecipeGeneratorService

router = APIRouter()

@router.get("/test-flavor/{ingredient}")
async def test_flavor(ingredient: str):
    """Temporary endpoint to test FlavorDB connection"""
    service = FlavorDBService()
    return await service.get_pairings(ingredient)

@router.get("")
async def list_recipes(
    query: str = Query(None, description="Search term for AI generation"),
    page: int = 1, 
    limit: int = 10,
    source: str = Query("local", enum=["local", "recipedb", "ai"]),
    db: AsyncSession = Depends(get_db)
):
    """
    List recipes.
    - source='local': Returns curated/seeded recipes from our DB.
    - source='recipedb': Proxies request to external RecipeDB API.
    - source='ai': Generates a new recipe on the fly using Gemini.
    """
    if source == "local":
        stmt = select(Recipe).limit(limit).offset((page-1)*limit)
        if query:
            # Simple case-insensitive search
            stmt = stmt.where(Recipe.name.ilike(f"%{query}%"))
        
        result = await db.execute(stmt)
        recipes = result.scalars().all()
        return {"source": "local", "data": recipes}
    
    elif source == "ai":
        if not query:
            raise HTTPException(status_code=400, detail="Query parameter required for AI generation")
        
        service = RecipeGeneratorService(db)
        # Generate and save to DB
        recipe = await service.generate_from_name(query)
        return {"source": "ai", "data": [recipe]}
    
    else:
        # Call External API
        service = RecipeDBService()
        data = await service.search_recipes(page=page, limit=limit)
        return {"source": "recipedb", "data": data}

@router.get("/{recipe_id}")
async def get_recipe(recipe_id: str, db: AsyncSession = Depends(get_db)):
    """Get single recipe details from Local DB"""
    result = await db.execute(select(Recipe).where(Recipe.id == recipe_id))
    recipe = result.scalar_one_or_none()
    if recipe:
        return recipe
    raise HTTPException(status_code=404, detail="Recipe not found")
