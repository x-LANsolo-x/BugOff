from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, demo, recipes, sessions, analysis, flavors, cooking

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(demo.router, prefix="/demo", tags=["Demo Sessions"])
api_router.include_router(recipes.router, prefix="/recipes", tags=["Recipes"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["Cooking Sessions"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["Failure Analysis"])
api_router.include_router(flavors.router, prefix="/flavors", tags=["Flavor Pairings"])
api_router.include_router(cooking.router, prefix="/cooking", tags=["Cooking"])
