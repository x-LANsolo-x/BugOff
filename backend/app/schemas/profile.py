from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ProfileBase(BaseModel):
    cooking_habits: Dict[str, Any] = {}
    # Example: {"diet": "vegan", "allergies": ["nuts"], "skill_level": "beginner"}

class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    user_id: str
    updated_at: Any

    class Config:
        from_attributes = True
