from sqlalchemy import Column, String, Integer, DateTime, Enum, ForeignKey, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

class Recipe(Base):
    __tablename__ = "recipes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Core Fields
    name = Column(String(255), nullable=False, index=True)
    difficulty = Column(String(50)) # easy, medium, hard
    estimated_time_min = Column(Integer)
    
    # External API Links (RecipeDB)
    external_id = Column(String(100), index=True, nullable=True) # ID from RecipeDB
    source_url = Column(Text, nullable=True)
    image_url = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    steps = relationship("RecipeStep", back_populates="recipe", order_by="RecipeStep.step_number", cascade="all, delete-orphan")
    cooking_sessions = relationship("CookingSession", back_populates="recipe")

class RecipeStep(Base):
    __tablename__ = "recipe_steps"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipe_id = Column(UUID(as_uuid=True), ForeignKey('recipes.id'), nullable=False, index=True)
    
    step_number = Column(Integer, nullable=False)
    instruction = Column(Text, nullable=False)
    expected_state = Column(String(255)) # e.g. "Onions are golden brown"
    
    # Relationships
    recipe = relationship("Recipe", back_populates="steps")
