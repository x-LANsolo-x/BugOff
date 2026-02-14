from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), unique=True, nullable=False)
    
    # Skill level from onboarding
    skill_level = Column(String(50), default='beginner')  # beginner, home_cook, advanced, expert
    
    # Store preferences (Dietary, Allergies, etc.)
    cooking_habits = Column(JSONB, default={})
    dietary_preferences = Column(JSONB, default=[])  # vegetarian, vegan, gluten-free, etc.
    
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="profile")
