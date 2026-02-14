from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.profile import UserProfile
from app.schemas.profile import ProfileUpdate

class ProfileService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_profile(self, user_id: str) -> UserProfile:
        result = await self.db.execute(select(UserProfile).where(UserProfile.user_id == user_id))
        profile = result.scalar_one_or_none()
        
        if not profile:
            # Auto-create empty profile if missing
            profile = UserProfile(user_id=user_id, cooking_habits={})
            self.db.add(profile)
            await self.db.commit()
            await self.db.refresh(profile)
            
        return profile

    async def update_profile(self, user_id: str, data: ProfileUpdate) -> UserProfile:
        profile = await self.get_profile(user_id)
        
        # Merge new habits with existing ones
        current_habits = profile.cooking_habits or {}
        current_habits.update(data.cooking_habits)
        
        # SQLAlchemy needs explicit reassignment for JSON updates sometimes
        profile.cooking_habits = dict(current_habits)
        
        await self.db.commit()
        await self.db.refresh(profile)
        return profile
