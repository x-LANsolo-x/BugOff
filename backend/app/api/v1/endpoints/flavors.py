"""
Flavor pairing endpoints using FlavorDB API
"""
from fastapi import APIRouter, HTTPException
from app.services.flavordb import FlavorDBService

router = APIRouter()

@router.get("/pairings/{ingredient}")
async def get_flavor_pairings(ingredient: str):
    """
    Get flavor pairings for an ingredient from FlavorDB.
    
    Args:
        ingredient: Name of the ingredient (e.g., 'tomato', 'garlic')
    
    Returns:
        List of complementary ingredients and flavor compounds
    """
    service = FlavorDBService()
    pairings = await service.get_pairings(ingredient)
    
    if not pairings:
        raise HTTPException(status_code=404, detail=f"No pairings found for '{ingredient}'")
    
    return {
        "ingredient": ingredient,
        "pairings": pairings
    }

@router.get("/search")
async def search_ingredients(query: str):
    """
    Search for ingredients in FlavorDB.
    
    Args:
        query: Search query for ingredient name
    
    Returns:
        List of matching ingredients
    """
    # This would require additional FlavorDB endpoints
    # For now, return placeholder
    return {
        "query": query,
        "message": "Ingredient search not yet implemented in FlavorDB API"
    }
