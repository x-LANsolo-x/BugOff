from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.profile import ProfileResponse, ProfileUpdate
from app.services.profile import ProfileService
from app.api.deps import get_current_user

router = APIRouter()


@router.get("", response_model=ProfileResponse)
async def get_my_profile(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get current user's profile (extracted from JWT)"""
    service = ProfileService(db)
    return await service.get_profile(current_user["sub"])


@router.put("", response_model=ProfileResponse)
async def update_my_profile(
    data: ProfileUpdate,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update cooking habits/preferences"""
    service = ProfileService(db)
    return await service.update_profile(current_user["sub"], data)
