from fastapi import APIRouter
from app.api.v1.endpoints import auth, recipes, cooking, failure, voice, profile, demo, sessions

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(recipes.router, prefix="/recipes", tags=["Recipes"])
api_router.include_router(cooking.router, prefix="/cooking", tags=["Cooking"])
api_router.include_router(failure.router, prefix="/failure", tags=["Failure Analysis"])
api_router.include_router(voice.router, prefix="/voice", tags=["Voice AI"])
api_router.include_router(profile.router, prefix="/profile", tags=["User Profile"])
api_router.include_router(demo.router, prefix="/demo", tags=["Demo Sessions"])
api_router.include_router(sessions.router, prefix="/sessions", tags=["Cooking History"])
