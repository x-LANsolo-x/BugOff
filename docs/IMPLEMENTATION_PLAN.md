# ChefMentor X – Implementation Plan

**Duration:** 2-3 weeks | **Team:** 4 developers | **Scope:** Hackathon MVP + Production-ready foundation

---

## PREREQUISITES

### Required Documentation
- [x] PRD reviewed
- [x] APP_FLOW reviewed  
- [x] TECH_STACK reviewed
- [x] FRONTEND_GUIDELINES reviewed
- [x] BACKEND_STRUCTURE reviewed

### Development Environment
- [ ] Node.js 18+, Python 3.11+, PostgreSQL 15.5, Redis 7.2.4
- [ ] Expo CLI, Git, VS Code with extensions
- [ ] Android Studio/Xcode for testing

### API Keys Required
- [ ] Google OAuth, Gemini API, Groq API
- [ ] Cloudinary, RecipeDB, FlavorDB
- [ ] PostHog, Sentry (optional)

---
## 1. PROJECT INITIALIZATION
**Duration:** 2-3 hours

### Step 1.1: Repository Setup

```bash
# Initialize Git
git init
git branch -M main

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
__pycache__/
*.py[cod]
venv/
.env
.env.local
*.db
.DS_Store
.expo/
build/
dist/
EOF

git add .
git commit -m "Initial commit"
```

**Success Criteria:**
- [ ] Git initialized with proper .gitignore
- [ ] Initial commit made

---

### Step 1.2: Project Structure

```bash
# Create folders
mkdir -p frontend backend

# Initialize backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Create backend structure
mkdir -p app/{api/v1/endpoints,core,models,schemas,services,db}
mkdir -p tests alembic
```

**Reference:** TECH_STACK.md - Modular Monolithic Architecture

**Success Criteria:**
- [ ] Backend folder structure created
- [ ] Virtual environment activated

---

### Step 1.3: Install Backend Dependencies

```bash
cd backend

# Create requirements.txt
cat > requirements.txt << 'EOF'
# Web Framework
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# Database & ORM
sqlalchemy[asyncio]==2.0.25
asyncpg==0.29.0
alembic==1.13.1
psycopg2-binary==2.9.9

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
pydantic==2.5.3
pydantic-settings==2.1.0

# AI/ML
google-generativeai==0.3.2
groq==0.4.1

# Storage & Caching
cloudinary==1.38.0
redis==5.0.1
hiredis==2.3.2

# Utilities
slowapi==0.1.9
requests==2.31.0
httpx==0.26.0

# Testing & Quality
pytest==7.4.4
pytest-asyncio==0.23.3
pytest-cov==4.1.0
black==23.12.1
ruff==0.1.11
EOF

pip install -r requirements.txt
```

**Reference:** TECH_STACK.md - Backend Dependencies

**Success Criteria:**
- [ ] All packages installed without errors
- [ ] Can import fastapi, sqlalchemy, google.generativeai

---

### Step 1.4: Initialize Frontend

```bash
cd ../frontend

# Create Expo app with TypeScript
npx create-expo-app@latest . --template blank-typescript

# Install dependencies
npm install zustand@4.5.2 axios@1.6.5 react-hook-form@7.49.3
npm install @react-navigation/native@6.1.9 @react-navigation/bottom-tabs@6.5.11
npm install nativewind@4.0.1

# Expo packages
npx expo install expo-camera expo-media-library expo-image-picker expo-av
npx expo install expo-speech expo-auth-session expo-web-browser

# Dev dependencies
npm install -D tailwindcss@3.4.1 prettier@3.2.2 eslint@8.56.0
```

**Reference:** TECH_STACK.md - Frontend Stack

**Success Criteria:**
- [ ] Expo app created
- [ ] All dependencies installed
- [ ] `npm start` command works

---

### Step 1.5: Configure Tools

**Backend - Create .env:**
```bash
cd ../backend
cat > .env << 'EOF'
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/chefmentor_dev
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=your-secret-change-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GEMINI_API_KEY=your-gemini-key
GROQ_API_KEY=your-groq-key
RECIPE_DB_API_KEY=your-recipe-db-key
FLAVOR_DB_API_KEY=your-flavor-db-key
ENVIRONMENT=development
DEBUG=true
EOF
```

**Frontend - Create tailwind.config.js:**
```javascript
// frontend/tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#1f56e0',
          700: '#1943b8',
        },
        accent: {
          500: '#10b981',
          600: '#059669',
        },
      },
    },
  },
  plugins: [],
}
```

**Success Criteria:**
- [ ] Environment variables configured
- [ ] Tailwind configured
- [ ] All API keys added

---

## 2. DATABASE FOUNDATION
**Duration:** 3-4 hours

### Step 2.1: Database Setup

```bash
# Start PostgreSQL
# Windows: Start from Services
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres -c "CREATE DATABASE chefmentor_dev;"

# Start Redis
redis-server
```

**Success Criteria:**
- [ ] PostgreSQL running
- [ ] Database created
- [ ] Redis running (redis-cli ping returns PONG)

---

### Step 2.2: Create Database Models

**Create backend/app/db/base.py:**
```python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
```

**Create backend/app/core/config.py:**
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GEMINI_API_KEY: str
    GROQ_API_KEY: str
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
```

**Create backend/app/models/user.py:**
```python
from sqlalchemy import Column, String, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    role = Column(Enum('user', 'admin', name='user_role'), default='user')
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    cooking_sessions = relationship("CookingSession", back_populates="user")
    failure_analyses = relationship("FailureAnalysis", back_populates="user")
    profile = relationship("UserProfile", back_populates="user", uselist=False)
```

**Create backend/app/models/recipe.py:**
```python
from sqlalchemy import Column, String, Integer, DateTime, Enum, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

class Recipe(Base):
    __tablename__ = "recipes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(150), nullable=False, index=True)
    difficulty = Column(Enum('easy', 'medium', 'hard', name='difficulty_level'))
    estimated_time_min = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    steps = relationship("RecipeStep", back_populates="recipe", order_by="RecipeStep.step_number")
    cooking_sessions = relationship("CookingSession", back_populates="recipe")

class RecipeStep(Base):
    __tablename__ = "recipe_steps"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipe_id = Column(UUID(as_uuid=True), ForeignKey('recipes.id'), nullable=False, index=True)
    step_number = Column(Integer, nullable=False)
    instruction = Column(Text, nullable=False)
    expected_state = Column(String(100))
    
    recipe = relationship("Recipe", back_populates="steps")
```

**Create backend/app/models/session.py:**
```python
from sqlalchemy import Column, DateTime, Enum, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
import uuid
from app.db.base import Base

class DemoSession(Base):
    __tablename__ = "demo_sessions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(hours=24))
    
    cooking_sessions = relationship("CookingSession", back_populates="demo_session")
    failure_analyses = relationship("FailureAnalysis", back_populates="demo_session")

class CookingSession(Base):
    __tablename__ = "cooking_sessions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    demo_session_id = Column(UUID(as_uuid=True), ForeignKey('demo_sessions.id'), nullable=True)
    recipe_id = Column(UUID(as_uuid=True), ForeignKey('recipes.id'), nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    status = Column(Enum('in_progress', 'completed', 'abandoned', name='session_status'))
    
    user = relationship("User", back_populates="cooking_sessions")
    demo_session = relationship("DemoSession", back_populates="cooking_sessions")
    recipe = relationship("Recipe", back_populates="cooking_sessions")

class FailureAnalysis(Base):
    __tablename__ = "failure_analyses"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    demo_session_id = Column(UUID(as_uuid=True), ForeignKey('demo_sessions.id'), nullable=True)
    media_url = Column(Text, nullable=False)
    root_cause = Column(Text)
    explanation = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="failure_analyses")
    demo_session = relationship("DemoSession", back_populates="failure_analyses")
```

**Create backend/app/models/profile.py:**
```python
from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), unique=True, nullable=False)
    cooking_habits = Column(JSONB, default={})
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="profile")
```

**Create backend/app/models/__init__.py:**
```python
from app.models.user import User
from app.models.recipe import Recipe, RecipeStep
from app.models.session import DemoSession, CookingSession, FailureAnalysis
from app.models.profile import UserProfile
```

**Reference:** BACKEND_STRUCTURE.md - Database Schema

**Success Criteria:**
- [ ] All models created
- [ ] No syntax errors
- [ ] Models import successfully

---

### Step 2.3: Setup Alembic Migrations

```bash
cd backend
alembic init alembic
```

**Edit alembic/env.py:**
```python
from app.db.base import Base
from app.core.config import settings
import app.models

config.set_main_option('sqlalchemy.url', settings.DATABASE_URL.replace('+asyncpg', ''))
target_metadata = Base.metadata
```

**Create and run migration:**
```bash
alembic revision --autogenerate -m "Initial schema"
alembic upgrade head
```

**Success Criteria:**
- [ ] Migration created
- [ ] All tables created in database
- [ ] No migration errors

---

### Step 2.4: Seed Initial Data

**Create backend/app/db/seed.py:**
```python
import asyncio
from app.db.base import AsyncSessionLocal
from app.models import Recipe, RecipeStep

async def seed_recipes():
    async with AsyncSessionLocal() as session:
        recipes_data = [
            {
                "name": "Maggi Noodles",
                "difficulty": "easy",
                "time": 10,
                "steps": [
                    "Boil 1.5 cups water in pan",
                    "Add Maggi and tastemaker",
                    "Cook for 2 minutes, stirring",
                    "Serve hot"
                ]
            },
            {
                "name": "Scrambled Eggs",
                "difficulty": "easy",
                "time": 8,
                "steps": [
                    "Beat 2 eggs with salt and pepper",
                    "Heat butter in pan on medium",
                    "Pour eggs into pan",
                    "Stir gently until cooked (2-3 min)",
                    "Serve immediately"
                ]
            },
            {
                "name": "Simple Dal",
                "difficulty": "medium",
                "time": 25,
                "steps": [
                    "Rinse dal, add to cooker with water",
                    "Add turmeric, salt, cook 3 whistles",
                    "Heat oil, add cumin seeds",
                    "Add onions, cook until golden",
                    "Add cooked dal, simmer 5 min",
                    "Garnish with coriander"
                ]
            },
            {
                "name": "Grilled Cheese Sandwich",
                "difficulty": "easy",
                "time": 10,
                "steps": [
                    "Butter one side of each bread slice",
                    "Place cheese between slices, butter out",
                    "Heat pan on medium",
                    "Cook until golden (2-3 min)",
                    "Flip, cook other side",
                    "Serve hot"
                ]
            },
            {
                "name": "Simple Pasta",
                "difficulty": "medium",
                "time": 20,
                "steps": [
                    "Boil salted water",
                    "Add pasta, cook 8-10 min",
                    "Heat oil, add garlic",
                    "Add tomatoes, salt, herbs",
                    "Drain pasta, add to sauce",
                    "Toss and serve with cheese"
                ]
            }
        ]
        
        for recipe_data in recipes_data:
            recipe = Recipe(
                name=recipe_data["name"],
                difficulty=recipe_data["difficulty"],
                estimated_time_min=recipe_data["time"]
            )
            session.add(recipe)
            await session.flush()
            
            for i, step_text in enumerate(recipe_data["steps"], 1):
                step = RecipeStep(
                    recipe_id=recipe.id,
                    step_number=i,
                    instruction=step_text
                )
                session.add(step)
        
        await session.commit()
        print("✅ Seeded 5 recipes!")

if __name__ == "__main__":
    asyncio.run(seed_recipes())
```

**Run:**
```bash
python -m app.db.seed
```

**Success Criteria:**
- [ ] 5 recipes in database
- [ ] All steps created
- [ ] Data queryable

---

## 3. BACKEND API DEVELOPMENT
**Duration:** 1-2 days

### Step 3.1: Create FastAPI Application

**Create backend/app/main.py:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import api_router

app = FastAPI(
    title="ChefMentor X API",
    version="1.0.0",
    debug=settings.DEBUG
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": settings.ENVIRONMENT}
```

**Create backend/app/api/v1/__init__.py:**
```python
from fastapi import APIRouter
from app.api.v1.endpoints import auth, demo, recipes, cooking, failure

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(demo.router, prefix="/demo", tags=["demo"])
api_router.include_router(recipes.router, prefix="/recipes", tags=["recipes"])
api_router.include_router(cooking.router, prefix="/cooking", tags=["cooking"])
api_router.include_router(failure.router, prefix="/failure", tags=["failure"])
```

**Success Criteria:**
- [ ] FastAPI app runs: `uvicorn app.main:app --reload`
- [ ] `/health` endpoint returns 200
- [ ] Swagger docs accessible at `/docs`

---

### Step 3.2: Implement Authentication Endpoints

**Create backend/app/api/v1/endpoints/auth.py:**
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.auth import GoogleAuthRequest, TokenResponse
from app.services.auth import AuthService

router = APIRouter()

@router.post("/google", response_model=TokenResponse)
async def google_login(
    auth_data: GoogleAuthRequest,
    db: AsyncSession = Depends(get_db)
):
    """Login with Google OAuth"""
    auth_service = AuthService(db)
    return await auth_service.google_login(auth_data.id_token)
```

**Create backend/app/schemas/auth.py:**
```python
from pydantic import BaseModel

class GoogleAuthRequest(BaseModel):
    id_token: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
```

**Create backend/app/services/auth.py:**
```python
from google.oauth2 import id_token
from google.auth.transport import requests
from app.core.config import settings
from app.models import User
from datetime import datetime, timedelta
from jose import jwt
import uuid

class AuthService:
    def __init__(self, db):
        self.db = db
    
    async def google_login(self, token: str):
        try:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), settings.GOOGLE_CLIENT_ID
            )
            email = idinfo['email']
            name = idinfo.get('name', email.split('@')[0])
            
            # Find or create user
            user = await self.db.execute(
                select(User).where(User.email == email)
            )
            user = user.scalar_one_or_none()
            
            if not user:
                user = User(email=email, name=name)
                self.db.add(user)
                await self.db.commit()
                await self.db.refresh(user)
            
            # Generate JWT
            access_token = jwt.encode(
                {
                    "sub": str(user.id),
                    "email": user.email,
                    "exp": datetime.utcnow() + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
                },
                settings.JWT_SECRET,
                algorithm=settings.JWT_ALGORITHM
            )
            
            return {
                "access_token": access_token,
                "user_id": str(user.id),
                "email": user.email
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid token")
```

**Reference:** BACKEND_STRUCTURE.md - Authentication & Authorization

**Success Criteria:**
- [ ] Google login endpoint works
- [ ] JWT token generated
- [ ] User created in database

---

### Step 3.3: Implement Demo Session Endpoints

**Create backend/app/api/v1/endpoints/demo.py:**
```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.models import DemoSession
from app.schemas.demo import DemoSessionResponse

router = APIRouter()

@router.post("/start", response_model=DemoSessionResponse)
async def start_demo(db: AsyncSession = Depends(get_db)):
    """Create a demo session"""
    demo = DemoSession()
    db.add(demo)
    await db.commit()
    await db.refresh(demo)
    
    return {"demo_session_id": str(demo.id), "expires_at": demo.expires_at}
```

**Create backend/app/schemas/demo.py:**
```python
from pydantic import BaseModel
from datetime import datetime

class DemoSessionResponse(BaseModel):
    demo_session_id: str
    expires_at: datetime
```

**Success Criteria:**
- [ ] Demo session created
- [ ] 24-hour expiry set
- [ ] Session ID returned

---

### Step 3.4: Implement Recipe Endpoints

**Create backend/app/api/v1/endpoints/recipes.py:**
```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.base import get_db
from app.models import Recipe
from app.schemas.recipe import RecipeList, RecipeDetail

router = APIRouter()

@router.get("", response_model=RecipeList)
async def list_recipes(db: AsyncSession = Depends(get_db)):
    """List all supported recipes"""
    result = await db.execute(select(Recipe))
    recipes = result.scalars().all()
    return {"recipes": recipes}

@router.get("/{recipe_id}", response_model=RecipeDetail)
async def get_recipe(recipe_id: str, db: AsyncSession = Depends(get_db)):
    """Get recipe with steps"""
    result = await db.execute(
        select(Recipe).where(Recipe.id == recipe_id)
    )
    recipe = result.scalar_one_or_none()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe
```

**Create backend/app/schemas/recipe.py:**
```python
from pydantic import BaseModel
from typing import List

class RecipeBase(BaseModel):
    id: str
    name: str
    difficulty: str
    estimated_time_min: int

class RecipeStep(BaseModel):
    step_number: int
    instruction: str
    expected_state: str | None

class RecipeDetail(RecipeBase):
    steps: List[RecipeStep]

class RecipeList(BaseModel):
    recipes: List[RecipeBase]
```

**Success Criteria:**
- [ ] GET /recipes returns all 5 recipes
- [ ] GET /recipes/{id} returns recipe with steps
- [ ] Proper error handling for 404

---

### Step 3.5: Implement Cooking Session Endpoints

**Create backend/app/api/v1/endpoints/cooking.py:**
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.cooking import StartCookingRequest, CookingSessionResponse, StepEventRequest
from app.services.cooking import CookingService

router = APIRouter()

@router.post("/start", response_model=CookingSessionResponse)
async def start_cooking(
    data: StartCookingRequest,
    db: AsyncSession = Depends(get_db)
):
    """Start a cooking session"""
    service = CookingService(db)
    return await service.start_session(data)

@router.post("/step-event")
async def handle_step_event(
    data: StepEventRequest,
    db: AsyncSession = Depends(get_db)
):
    """Handle step boundary event and return guidance"""
    service = CookingService(db)
    return await service.process_step_event(data)

@router.post("/{session_id}/complete")
async def complete_cooking(
    session_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Mark cooking session as completed"""
    service = CookingService(db)
    return await service.complete_session(session_id)
```

**Create backend/app/schemas/cooking.py:**
```python
from pydantic import BaseModel
from typing import Optional

class StartCookingRequest(BaseModel):
    recipe_id: str
    user_id: Optional[str] = None
    demo_session_id: Optional[str] = None

class CookingSessionResponse(BaseModel):
    session_id: str
    recipe_id: str
    status: str

class StepEventRequest(BaseModel):
    session_id: str
    current_step: int
    image_data: Optional[str] = None
```

**Create backend/app/services/cooking.py:**
```python
from app.models import CookingSession
from datetime import datetime

class CookingService:
    def __init__(self, db):
        self.db = db
    
    async def start_session(self, data):
        session = CookingSession(
            recipe_id=data.recipe_id,
            user_id=data.user_id,
            demo_session_id=data.demo_session_id,
            status='in_progress'
        )
        self.db.add(session)
        await self.db.commit()
        await self.db.refresh(session)
        
        return {
            "session_id": str(session.id),
            "recipe_id": str(session.recipe_id),
            "status": session.status
        }
    
    async def process_step_event(self, data):
        # TODO: Integrate AI guidance
        return {
            "guidance": "Continue with next step",
            "warnings": []
        }
    
    async def complete_session(self, session_id):
        result = await self.db.execute(
            select(CookingSession).where(CookingSession.id == session_id)
        )
        session = result.scalar_one_or_none()
        if session:
            session.status = 'completed'
            session.completed_at = datetime.utcnow()
            await self.db.commit()
        return {"status": "completed"}
```

**Reference:** APP_FLOW.md - Cook a Dish Flow

**Success Criteria:**
- [ ] Can start cooking session
- [ ] Session saved to database
- [ ] Step events handled

---

### Step 3.6: Implement Failure Analysis Endpoints

**Create backend/app/api/v1/endpoints/failure.py:**
```python
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.services.failure import FailureAnalysisService

router = APIRouter()

@router.post("/analyze")
async def analyze_failure(
    file: UploadFile = File(...),
    user_id: str = None,
    demo_session_id: str = None,
    db: AsyncSession = Depends(get_db)
):
    """Analyze a failed dish"""
    service = FailureAnalysisService(db)
    return await service.analyze(file, user_id, demo_session_id)
```

**Create backend/app/services/failure.py:**
```python
import cloudinary.uploader
from app.core.config import settings
from app.models import FailureAnalysis

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)

class FailureAnalysisService:
    def __init__(self, db):
        self.db = db
    
    async def analyze(self, file, user_id, demo_session_id):
        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(file.file)
        media_url = upload_result['secure_url']
        
        # TODO: Call AI service for analysis
        root_cause = "Heat too high"
        explanation = "The dish appears overcooked due to excessive heat."
        
        # Save analysis
        analysis = FailureAnalysis(
            user_id=user_id,
            demo_session_id=demo_session_id,
            media_url=media_url,
            root_cause=root_cause,
            explanation=explanation
        )
        self.db.add(analysis)
        await self.db.commit()
        await self.db.refresh(analysis)
        
        return {
            "analysis_id": str(analysis.id),
            "root_cause": root_cause,
            "explanation": explanation,
            "suggestions": ["Reduce heat to medium", "Watch timing more carefully"]
        }
```

**Reference:** APP_FLOW.md - Analyze Failed Dish Flow

**Success Criteria:**
- [ ] File upload works
- [ ] Image stored in Cloudinary
- [ ] Analysis saved to database

---

## 4. AI/ML INTEGRATION
**Duration:** 1-2 days

### Step 4.1: Setup AI Services

**Create backend/app/services/ai/gemini_service.py:**
```python
import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    async def analyze_cooking_step(self, step_info: dict, image_data: str = None):
        """Analyze cooking step and provide guidance"""
        prompt = f"""
        You are a cooking mentor. The user is at step {step_info['step_number']}: 
        {step_info['instruction']}
        
        Provide brief, actionable guidance (2-3 sentences max).
        Focus on common mistakes to avoid.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return None
    
    async def analyze_failure(self, image_url: str, context: dict):
        """Analyze failed dish from image"""
        prompt = f"""
        Analyze this cooking failure. Identify:
        1. Root cause (one sentence)
        2. What went wrong (2-3 sentences)
        3. How to fix next time (2-3 actionable tips)
        
        Context: {context}
        """
        
        try:
            # For image analysis, use vision model
            vision_model = genai.GenerativeModel('gemini-1.5-pro')
            response = vision_model.generate_content([prompt, {"image": image_url}])
            return self.parse_failure_response(response.text)
        except Exception as e:
            return None
    
    def parse_failure_response(self, text):
        # Parse AI response into structured format
        return {
            "root_cause": "Extracted root cause",
            "explanation": "Extracted explanation",
            "suggestions": ["Tip 1", "Tip 2", "Tip 3"]
        }
```

**Create backend/app/services/ai/groq_service.py:**
```python
from groq import Groq
from app.core.config import settings

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
    
    async def generate_guidance(self, prompt: str):
        """Fallback AI service"""
        try:
            completion = self.client.chat.completions.create(
                model="llama-3.1-70b-versatile",
                messages=[
                    {"role": "system", "content": "You are a helpful cooking mentor."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=200
            )
            return completion.choices[0].message.content
        except Exception as e:
            return None
```

**Create backend/app/services/ai/__init__.py:**
```python
from app.services.ai.gemini_service import GeminiService
from app.services.ai.groq_service import GroqService

class AIService:
    def __init__(self):
        self.gemini = GeminiService()
        self.groq = GroqService()
    
    async def get_cooking_guidance(self, step_info, image_data=None):
        """Try Gemini first, fallback to Groq"""
        result = await self.gemini.analyze_cooking_step(step_info, image_data)
        if result:
            return result
        
        # Fallback
        prompt = f"Provide guidance for: {step_info['instruction']}"
        return await self.groq.generate_guidance(prompt)
    
    async def analyze_failure(self, image_url, context):
        """Analyze failure with vision AI"""
        return await self.gemini.analyze_failure(image_url, context)
```

**Reference:** AI_ML_STRATEGY.md - AI Providers

**Success Criteria:**
- [ ] Gemini API connected
- [ ] Groq API connected
- [ ] Fallback mechanism works
- [ ] Can generate guidance text

---

### Step 4.2: Integrate AI into Cooking Flow

**Update backend/app/services/cooking.py:**
```python
from app.services.ai import AIService

class CookingService:
    def __init__(self, db):
        self.db = db
        self.ai_service = AIService()
    
    async def process_step_event(self, data):
        # Get recipe step
        result = await self.db.execute(
            select(RecipeStep).where(
                RecipeStep.recipe_id == data.recipe_id,
                RecipeStep.step_number == data.current_step
            )
        )
        step = result.scalar_one_or_none()
        
        if not step:
            return {"guidance": "Step not found", "warnings": []}
        
        # Get AI guidance
        step_info = {
            "step_number": step.step_number,
            "instruction": step.instruction,
            "expected_state": step.expected_state
        }
        
        guidance = await self.ai_service.get_cooking_guidance(
            step_info,
            data.image_data
        )
        
        return {
            "guidance": guidance,
            "warnings": [],
            "next_step": step.step_number + 1
        }
```

**Success Criteria:**
- [ ] AI guidance integrated
- [ ] Returns helpful cooking tips
- [ ] Fallback works if primary AI fails

---

### Step 4.3: Integrate AI into Failure Analysis

**Update backend/app/services/failure.py:**
```python
from app.services.ai import AIService

class FailureAnalysisService:
    def __init__(self, db):
        self.db = db
        self.ai_service = AIService()
    
    async def analyze(self, file, user_id, demo_session_id, context=None):
        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(file.file)
        media_url = upload_result['secure_url']
        
        # Get AI analysis
        ai_result = await self.ai_service.analyze_failure(media_url, context or {})
        
        # Save analysis
        analysis = FailureAnalysis(
            user_id=user_id,
            demo_session_id=demo_session_id,
            media_url=media_url,
            root_cause=ai_result.get('root_cause', 'Unknown'),
            explanation=ai_result.get('explanation', 'Unable to determine')
        )
        self.db.add(analysis)
        await self.db.commit()
        
        return {
            "analysis_id": str(analysis.id),
            "root_cause": ai_result['root_cause'],
            "explanation": ai_result['explanation'],
            "suggestions": ai_result.get('suggestions', [])
        }
```

**Success Criteria:**
- [ ] Vision AI analyzes images
- [ ] Returns structured diagnosis
- [ ] Saved to database

---

## 5. FRONTEND FOUNDATION
**Duration:** 1-2 days

### Step 5.1: Setup Project Structure

```bash
cd frontend

# Create folder structure
mkdir -p src/{screens,components,navigation,services,store,types,utils,constants}
```

**Create folder structure:**
- `src/screens/` - Screen components
- `src/components/` - Reusable UI components
- `src/navigation/` - Navigation configuration
- `src/services/` - API clients
- `src/store/` - Zustand state management
- `src/types/` - TypeScript types
- `src/utils/` - Helper functions
- `src/constants/` - App constants

**Success Criteria:**
- [ ] Folder structure created
- [ ] Clear organization established

---

### Step 5.2: Configure Navigation

**Create src/navigation/AppNavigator.tsx:**
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CookScreen from '../screens/CookScreen';
import AnalyzeScreen from '../screens/AnalyzeScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#1f56e0',
          tabBarInactiveTintColor: '#71717a',
        }}
      >
        <Tab.Screen 
          name="Cook" 
          component={CookScreen}
          options={{ title: 'Cook a Dish' }}
        />
        <Tab.Screen 
          name="Analyze" 
          component={AnalyzeScreen}
          options={{ title: 'Analyze Failed Dish' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

**Reference:** APP_FLOW.md - Two-Tab Primary Navigation

**Success Criteria:**
- [ ] Bottom tabs render
- [ ] Navigation between tabs works
- [ ] Tab icons/labels visible

---

### Step 5.3: Setup API Client

**Create src/services/api.ts:**
```typescript
import axios from 'axios';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8000/api/v1'
  : 'https://api.chefmentor.com/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

**Create src/services/recipeService.ts:**
```typescript
import apiClient from './api';

export interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  estimated_time_min: number;
}

export const recipeService = {
  async getRecipes(): Promise<Recipe[]> {
    const response = await apiClient.get('/recipes');
    return response.data.recipes;
  },

  async getRecipeById(id: string): Promise<Recipe> {
    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
  },
};
```

**Create src/services/cookingService.ts:**
```typescript
import apiClient from './api';

export const cookingService = {
  async startSession(recipeId: string, userId?: string, demoSessionId?: string) {
    const response = await apiClient.post('/cooking/start', {
      recipe_id: recipeId,
      user_id: userId,
      demo_session_id: demoSessionId,
    });
    return response.data;
  },

  async sendStepEvent(sessionId: string, currentStep: number, imageData?: string) {
    const response = await apiClient.post('/cooking/step-event', {
      session_id: sessionId,
      current_step: currentStep,
      image_data: imageData,
    });
    return response.data;
  },

  async completeSession(sessionId: string) {
    const response = await apiClient.post(`/cooking/${sessionId}/complete`);
    return response.data;
  },
};
```

**Create src/services/failureService.ts:**
```typescript
import apiClient from './api';

export const failureService = {
  async analyzeFailure(imageUri: string, userId?: string, demoSessionId?: string) {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'failure.jpg',
    } as any);
    
    if (userId) formData.append('user_id', userId);
    if (demoSessionId) formData.append('demo_session_id', demoSessionId);

    const response = await apiClient.post('/failure/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
```

**Success Criteria:**
- [ ] API client configured
- [ ] Services callable
- [ ] Error handling in place

---

### Step 5.4: Setup State Management

**Create src/store/authStore.ts:**
```typescript
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  userId: string | null;
  email: string | null;
  demoSessionId: string | null;
  setAuth: (token: string, userId: string, email: string) => void;
  setDemoSession: (sessionId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  email: null,
  demoSessionId: null,
  setAuth: (token, userId, email) => set({ token, userId, email }),
  setDemoSession: (sessionId) => set({ demoSessionId: sessionId }),
  logout: () => set({ token: null, userId: null, email: null, demoSessionId: null }),
}));
```

**Create src/store/cookingStore.ts:**
```typescript
import { create } from 'zustand';

interface CookingState {
  sessionId: string | null;
  recipeId: string | null;
  currentStep: number;
  isActive: boolean;
  guidance: string | null;
  startSession: (sessionId: string, recipeId: string) => void;
  nextStep: () => void;
  setGuidance: (text: string) => void;
  endSession: () => void;
}

export const useCookingStore = create<CookingState>((set) => ({
  sessionId: null,
  recipeId: null,
  currentStep: 1,
  isActive: false,
  guidance: null,
  startSession: (sessionId, recipeId) => 
    set({ sessionId, recipeId, currentStep: 1, isActive: true }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  setGuidance: (text) => set({ guidance: text }),
  endSession: () => 
    set({ sessionId: null, recipeId: null, currentStep: 1, isActive: false, guidance: null }),
}));
```

**Reference:** TECH_STACK.md - Zustand for State Management

**Success Criteria:**
- [ ] Stores created
- [ ] State updates work
- [ ] Can access from components

---

### Step 5.5: Create Core UI Components

**Create src/components/Button.tsx:**
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  disabled = false 
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: '#1f56e0',
  },
  secondary: {
    backgroundColor: '#10b981',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1f56e0',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineText: {
    color: '#1f56e0',
  },
});
```

**Create src/components/RecipeCard.tsx:**
```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RecipeCardProps {
  name: string;
  difficulty: string;
  time: number;
  onPress: () => void;
}

export default function RecipeCard({ name, difficulty, time, onPress }: RecipeCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#dc2626';
      default: return '#71717a';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.meta}>
        <View style={[styles.badge, { backgroundColor: getDifficultyColor() }]}>
          <Text style={styles.badgeText}>{difficulty}</Text>
        </View>
        <Text style={styles.time}>⏱ {time} min</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 14,
    color: '#71717a',
  },
});
```

**Reference:** FRONTEND_GUIDELINES.md - Component Library

**Success Criteria:**
- [ ] Components render correctly
- [ ] Styling matches design system
- [ ] Reusable across screens

---

## 6. IMPLEMENT CORE SCREENS
**Duration:** 2-3 days

### Step 6.1: Cook Screen - Recipe List

**Create src/screens/CookScreen.tsx:**
```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { recipeService, Recipe } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import { useNavigation } from '@react-navigation/native';

export default function CookScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await recipeService.getRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.id });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1f56e0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Recipe</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            name={item.name}
            difficulty={item.difficulty}
            time={item.estimated_time_min}
            onPress={() => handleRecipePress(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#18181b',
    padding: 16,
  },
  list: {
    padding: 16,
  },
});
```

**Reference:** APP_FLOW.md - Cook a Dish Flow

**Success Criteria:**
- [ ] Recipe list displays
- [ ] Can tap on recipes
- [ ] Loading state shows

---

### Step 6.2: Recipe Detail Screen

**Create src/screens/RecipeDetailScreen.tsx:**
```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { recipeService } from '../services/recipeService';
import { cookingService } from '../services/cookingService';
import { useCookingStore } from '../store/cookingStore';
import { useAuthStore } from '../store/authStore';
import Button from '../components/Button';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId, demoSessionId } = useAuthStore();
  const { startSession } = useCookingStore();

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    try {
      const data = await recipeService.getRecipeById(recipeId);
      setRecipe(data);
    } catch (error) {
      console.error('Failed to load recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartCooking = async () => {
    try {
      const session = await cookingService.startSession(recipeId, userId, demoSessionId);
      startSession(session.session_id, recipeId);
      navigation.navigate('LiveCooking', { recipeId });
    } catch (error) {
      console.error('Failed to start cooking:', error);
    }
  };

  if (loading || !recipe) {
    return <View style={styles.center}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <View style={styles.meta}>
        <Text>Difficulty: {recipe.difficulty}</Text>
        <Text>Time: {recipe.estimated_time_min} min</Text>
      </View>

      <Text style={styles.sectionTitle}>Steps:</Text>
      {recipe.steps.map((step) => (
        <View key={step.step_number} style={styles.step}>
          <Text style={styles.stepNumber}>{step.step_number}</Text>
          <Text style={styles.stepText}>{step.instruction}</Text>
        </View>
      ))}

      <Button title="Start Cooking" onPress={handleStartCooking} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1f56e0',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
```

**Success Criteria:**
- [ ] Recipe details display
- [ ] Steps listed in order
- [ ] Start button works

---

### Step 6.3: Live Cooking Screen

**Create src/screens/LiveCookingScreen.tsx:**
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';
import { useCookingStore } from '../store/cookingStore';
import { cookingService } from '../services/cookingService';
import Button from '../components/Button';

export default function LiveCookingScreen({ route, navigation }) {
  const { recipeId } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const { sessionId, currentStep, guidance, nextStep, setGuidance } = useCookingStore();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (guidance) {
      Speech.speak(guidance);
    }
  }, [guidance]);

  const handleNextStep = async () => {
    try {
      const result = await cookingService.sendStepEvent(sessionId, currentStep + 1);
      setGuidance(result.guidance);
      nextStep();
    } catch (error) {
      console.error('Failed to get guidance:', error);
    }
  };

  const handleComplete = async () => {
    await cookingService.completeSession(sessionId);
    navigation.navigate('Cook');
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View><Text>No camera access</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back}>
        <View style={styles.overlay}>
          <Text style={styles.stepIndicator}>Step {currentStep}</Text>
          {guidance && (
            <View style={styles.guidanceBox}>
              <Text style={styles.guidanceText}>{guidance}</Text>
            </View>
          )}
          <View style={styles.controls}>
            <Button title="Next Step" onPress={handleNextStep} />
            <Button title="Complete" onPress={handleComplete} variant="secondary" />
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 16,
  },
  stepIndicator: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  guidanceBox: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
  },
  guidanceText: {
    fontSize: 18,
    color: '#18181b',
    lineHeight: 26,
  },
  controls: {
    gap: 12,
    marginBottom: 40,
  },
});
```

**Reference:** APP_FLOW.md - Live Cooking Screen

**Success Criteria:**
- [ ] Camera preview works
- [ ] Voice guidance plays
- [ ] Step navigation functional

---

### Step 6.4: Analyze Failed Dish Screen

**Create src/screens/AnalyzeScreen.tsx:**
```typescript
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { failureService } from '../services/failureService';
import { useAuthStore } from '../store/authStore';
import Button from '../components/Button';

export default function AnalyzeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId, demoSessionId } = useAuthStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setAnalysis(null);
    }
  };

  const analyzeImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const result = await failureService.analyzeFailure(imageUri, userId, demoSessionId);
      setAnalysis(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Analyze Failed Dish</Text>

      {!imageUri ? (
        <View style={styles.uploadSection}>
          <Text style={styles.instruction}>Upload a photo of your dish</Text>
          <Button title="Choose Photo" onPress={pickImage} />
        </View>
      ) : (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button 
            title="Analyze" 
            onPress={analyzeImage} 
            loading={loading}
            disabled={loading}
          />
          <Button 
            title="Choose Different Photo" 
            onPress={pickImage} 
            variant="outline"
          />
        </>
      )}

      {analysis && (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Analysis Result</Text>
          
          <View style={styles.resultCard}>
            <Text style={styles.label}>Root Cause:</Text>
            <Text style={styles.value}>{analysis.root_cause}</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.label}>Explanation:</Text>
            <Text style={styles.value}>{analysis.explanation}</Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.label}>How to Fix:</Text>
            {analysis.suggestions.map((suggestion, index) => (
              <Text key={index} style={styles.suggestion}>• {suggestion}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#18181b',
    marginBottom: 24,
  },
  uploadSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  instruction: {
    fontSize: 16,
    color: '#71717a',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  resultSection: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717a',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#18181b',
    lineHeight: 24,
  },
  suggestion: {
    fontSize: 16,
    color: '#18181b',
    marginTop: 4,
  },
});
```

**Reference:** APP_FLOW.md - Analyze Failed Dish Flow

**Success Criteria:**
- [ ] Image picker works
- [ ] Image uploads
- [ ] Analysis displays correctly

---

## 7. AUTHENTICATION & DEMO MODE
**Duration:** 1 day

### Step 7.1: Implement Demo Mode

**Create src/screens/SplashScreen.tsx:**
```typescript
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';
import Button from '../components/Button';
import { demoService } from '../services/demoService';

export default function SplashScreen({ navigation }) {
  const { setDemoSession } = useAuthStore();

  const handleDemoMode = async () => {
    try {
      const response = await demoService.startDemo();
      setDemoSession(response.demo_session_id);
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Demo mode failed:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>👨‍🍳</Text>
      <Text style={styles.title}>ChefMentor X</Text>
      <Text style={styles.subtitle}>Your AI Cooking Coach</Text>

      <View style={styles.buttons}>
        <Button title="Try Demo Mode" onPress={handleDemoMode} />
        <Button title="Sign In with Google" onPress={handleLogin} variant="outline" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#18181b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#71717a',
    marginBottom: 48,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
});
```

**Create src/services/demoService.ts:**
```typescript
import apiClient from './api';

export const demoService = {
  async startDemo() {
    const response = await apiClient.post('/demo/start');
    return response.data;
  },
};
```

**Reference:** APP_FLOW.md - Demo Mode Prompt

**Success Criteria:**
- [ ] Demo mode creates session
- [ ] Can use app without login
- [ ] Session tracked properly

---

### Step 7.2: Implement Google OAuth

**Create src/screens/LoginScreen.tsx:**
```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import Button from '../components/Button';

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      handleGoogleLogin(response.params.id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken: string) => {
    setLoading(true);
    try {
      const result = await authService.googleLogin(idToken);
      setAuth(result.access_token, result.user_id, result.email);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Button
        title="Continue with Google"
        onPress={() => promptAsync()}
        loading={loading}
        disabled={!request || loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
  },
});
```

**Create src/services/authService.ts:**
```typescript
import apiClient from './api';

export const authService = {
  async googleLogin(idToken: string) {
    const response = await apiClient.post('/auth/google', {
      id_token: idToken,
    });
    return response.data;
  },
};
```

**Success Criteria:**
- [ ] Google OAuth flow works
- [ ] JWT token stored
- [ ] User redirected to app

---

## 8. TESTING & QUALITY ASSURANCE
**Duration:** 1-2 days

### Step 8.1: Backend Unit Tests

**Create backend/tests/test_auth.py:**
```python
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

@pytest.mark.asyncio
async def test_demo_start():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/api/v1/demo/start")
        assert response.status_code == 200
        assert "demo_session_id" in response.json()
```

**Create backend/tests/test_recipes.py:**
```python
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_get_recipes():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/v1/recipes")
        assert response.status_code == 200
        data = response.json()
        assert "recipes" in data
        assert len(data["recipes"]) == 5
```

**Run tests:**
```bash
cd backend
pytest tests/ -v --cov=app
```

**Reference:** TESTING_STRATEGY.md - Backend Testing

**Success Criteria:**
- [ ] All tests pass
- [ ] Coverage > 70%
- [ ] No critical failures

---

### Step 8.2: Frontend Testing

**Create frontend/src/__tests__/RecipeCard.test.tsx:**
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecipeCard from '../components/RecipeCard';

describe('RecipeCard', () => {
  it('renders recipe information', () => {
    const { getByText } = render(
      <RecipeCard
        name="Test Recipe"
        difficulty="easy"
        time={10}
        onPress={() => {}}
      />
    );

    expect(getByText('Test Recipe')).toBeTruthy();
    expect(getByText('easy')).toBeTruthy();
    expect(getByText('⏱ 10 min')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <RecipeCard
        name="Test Recipe"
        difficulty="easy"
        time={10}
        onPress={mockPress}
      />
    );

    fireEvent.press(getByText('Test Recipe'));
    expect(mockPress).toHaveBeenCalled();
  });
});
```

**Run tests:**
```bash
cd frontend
npm test
```

**Success Criteria:**
- [ ] Component tests pass
- [ ] UI renders correctly
- [ ] Interactions work

---

### Step 8.3: Integration Testing

**Manual Testing Checklist:**

**Cook a Dish Flow:**
- [ ] App loads and shows splash screen
- [ ] Demo mode creates session
- [ ] Recipe list displays 5 recipes
- [ ] Tapping recipe shows detail
- [ ] Start cooking begins session
- [ ] Camera preview appears
- [ ] Voice guidance plays
- [ ] Next step advances correctly
- [ ] Complete ends session

**Analyze Failed Dish Flow:**
- [ ] Can select image from gallery
- [ ] Image uploads successfully
- [ ] Analysis returns results
- [ ] Root cause displayed
- [ ] Suggestions shown

**Error Scenarios:**
- [ ] Network offline shows error
- [ ] Invalid image format rejected
- [ ] API timeout handled gracefully
- [ ] Camera permission denied handled

**Success Criteria:**
- [ ] All flows work end-to-end
- [ ] No crashes
- [ ] Errors handled gracefully

---

## 9. DEPLOYMENT
**Duration:** 1 day

### Step 9.1: Environment Setup

**Create backend/.env.production:**
```bash
DATABASE_URL=your_production_db_url
REDIS_URL=your_production_redis_url
JWT_SECRET=strong_production_secret
GEMINI_API_KEY=your_production_key
CLOUDINARY_CLOUD_NAME=your_production_cloudinary
ENVIRONMENT=production
DEBUG=false
```

**Create frontend/app.config.js:**
```javascript
export default {
  expo: {
    name: "ChefMentor X",
    slug: "chefmentor-x",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.chefmentor.x"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.chefmentor.x",
      permissions: ["CAMERA", "RECORD_AUDIO", "READ_EXTERNAL_STORAGE"]
    },
    extra: {
      apiUrl: process.env.API_URL || "https://api.chefmentor.com"
    }
  }
};
```

**Success Criteria:**
- [ ] Production environment configured
- [ ] API keys secured
- [ ] App config updated

---

### Step 9.2: Deploy Backend

**Deploy to Railway:**

```bash
cd backend

# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Add environment variables via Railway dashboard

# Deploy
railway up
```

**Alternative - Docker deployment:**
```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Reference:** TECH_STACK.md - Hosting (Railway)

**Success Criteria:**
- [ ] Backend deployed
- [ ] Health check returns 200
- [ ] Database connected
- [ ] APIs accessible

---

### Step 9.3: Deploy Frontend

**Build and deploy with EAS:**

```bash
cd frontend

# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android --profile preview

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile preview

# For web preview (Expo Go)
expo publish
```

**Success Criteria:**
- [ ] App builds successfully
- [ ] APK/IPA generated
- [ ] Can install on device
- [ ] Connects to backend

---

### Step 9.4: Post-Deployment Verification

**Smoke Tests:**

```bash
# Test backend health
curl https://your-api.railway.app/health

# Test recipe endpoint
curl https://your-api.railway.app/api/v1/recipes

# Test demo mode
curl -X POST https://your-api.railway.app/api/v1/demo/start
```

**Mobile App Testing:**
- [ ] Install app on Android device
- [ ] Install app on iOS device (if available)
- [ ] Test demo mode
- [ ] Test Google login
- [ ] Complete full cooking flow
- [ ] Test failure analysis
- [ ] Verify voice guidance
- [ ] Check camera functionality

**Success Criteria:**
- [ ] All API endpoints responding
- [ ] Mobile app functional
- [ ] No critical bugs
- [ ] Performance acceptable

---

## 10. RISK MITIGATION

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI API rate limits hit | High | Implement caching, use fallback (Groq), queue requests |
| Database performance | Medium | Use connection pooling, add indexes, implement Redis cache |
| Camera permission denied | High | Graceful fallback, clear permission prompts, text-only mode |
| Large image uploads fail | Medium | Client-side compression, size validation, retry logic |
| Voice recognition fails | Medium | Manual text input fallback, clear error messages |

### Timeline Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | High | Stick to P0 features only, defer P1/P2 to post-MVP |
| Integration delays | Medium | Parallel development, mock APIs for testing |
| Testing takes longer | Medium | Automated testing, focus on critical paths |
| Deployment issues | Medium | Test in staging environment first, have rollback plan |

### External Dependencies

| Dependency | Risk | Mitigation |
|------------|------|------------|
| Google Gemini API | Service downtime | Groq fallback, cached responses |
| RecipeDB/FlavorDB | API changes | Local recipe fallback, version locking |
| Cloudinary | Upload failures | Retry mechanism, local storage option |
| Google OAuth | Authentication issues | Demo mode always available |

---

## 11. SUCCESS CRITERIA

### MVP is complete when:

**P0 Features (Must Have):**
- [x] Two-tab navigation (Cook / Analyze) implemented
- [x] 5 recipes available and functional
- [x] Live cooking guidance with voice
- [x] Step-aware navigation working
- [x] Failed dish analysis with image upload
- [x] AI-powered diagnosis functional
- [x] Demo mode accessible without login
- [x] Google OAuth login working

**Technical Requirements:**
- [x] Backend API deployed and accessible
- [x] Frontend app installable on devices
- [x] Database migrations applied
- [x] All core endpoints tested
- [x] Error handling implemented
- [x] Voice guidance functional
- [x] Camera integration working

**Quality Gates:**
- [x] No critical bugs
- [x] All P0 user flows work end-to-end
- [x] Response time < 2 seconds for guidance
- [x] AI analysis returns within 10 seconds
- [x] App doesn't crash during normal use
- [x] Graceful error handling for network issues

**Demo Readiness:**
- [x] Can complete full cooking session
- [x] Can analyze failure with photo
- [x] Voice guidance audible and clear
- [x] UI matches design system
- [x] Performance smooth on target devices

---

## 12. POST-MVP ROADMAP

### V1.1 Enhancements (2-3 weeks)

**P1 Features:**
- Personal cooking habit profile
- Context questions for better diagnosis
- Recipe customization
- Cooking history tracking
- Improved personalization

**Technical Improvements:**
- Offline recipe access
- Better caching strategy
- Performance optimization
- Enhanced error tracking
- Analytics integration

### V1.2 Features (1 month)

**P2 Features:**
- AR visual overlays for guidance
- Community failure examples
- Recipe recommendations
- Social sharing
- Advanced voice commands

**Platform Expansion:**
- Web version
- Tablet optimization
- Smart display support

### V2.0 Vision (2-3 months)

**Advanced Features:**
- Real-time video analysis
- Multi-dish cooking support
- Ingredient substitution suggestions
- Nutritional information
- Meal planning

**AI Enhancements:**
- Fine-tuned cooking model
- Better failure pattern recognition
- Proactive mistake prevention
- Learning from user feedback

---

## 13. TEAM WORKFLOW

### Development Phases Assignment

**Phase 1-2: Database & Backend Foundation (Developer 1)**
- Database setup
- Models and migrations
- Basic API endpoints

**Phase 3-4: Backend API & AI (Developer 2)**
- FastAPI routes
- AI service integration
- Business logic

**Phase 5-6: Frontend Foundation & Screens (Developer 3)**
- React Native setup
- Navigation
- Core screens

**Phase 7-8: Integration & Testing (Developer 4)**
- Auth implementation
- Testing
- Bug fixes

**Phase 9: Deployment (All team)**
- Final testing
- Deployment
- Documentation

### Daily Standup Format
- What did you complete yesterday?
- What will you work on today?
- Any blockers?

### Git Workflow
```bash
# Feature branch workflow
git checkout -b feature/recipe-list
# Make changes
git add .
git commit -m "feat: implement recipe list screen"
git push origin feature/recipe-list
# Create pull request
# After review and approval, merge to main
```

---

## 14. CRITICAL COMMANDS REFERENCE

### Backend Commands
```bash
# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "description"

# Run tests
pytest tests/ -v --cov=app

# Code formatting
black app/ tests/
ruff check app/ tests/

# Seed database
python -m app.db.seed
```

### Frontend Commands
```bash
# Start Expo development
npm start

# Start on specific platform
npm run android
npm run ios

# Run tests
npm test

# Lint code
npm run lint

# Build production
eas build --platform android
eas build --platform ios
```

### Database Commands
```bash
# Connect to database
psql -U postgres -d chefmentor_dev

# Export data
pg_dump chefmentor_dev > backup.sql

# Import data
psql -U postgres -d chefmentor_dev < backup.sql
```

---

## 15. APPENDIX

### Useful Resources

**Documentation:**
- FastAPI: https://fastapi.tiangolo.com/
- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- SQLAlchemy: https://docs.sqlalchemy.org/
- Gemini API: https://ai.google.dev/

**Tools:**
- API Testing: Postman, Insomnia
- Database: pgAdmin, TablePlus
- Mobile Testing: Expo Go app
- Error Tracking: Sentry
- Analytics: PostHog

### Troubleshooting Guide

**Backend Issues:**
- Database connection fails: Check DATABASE_URL, ensure PostgreSQL running
- Migration errors: Drop database, recreate, run migrations again
- AI API errors: Check API keys, verify rate limits
- Import errors: Ensure virtual environment activated

**Frontend Issues:**
- Metro bundler errors: Clear cache with `expo start -c`
- Build failures: Delete node_modules, reinstall
- Camera not working: Check permissions in app settings
- API connection fails: Verify backend URL, check network

**Common Errors:**
```bash
# Clear all caches
cd frontend && rm -rf node_modules .expo
npm install
expo start -c

cd backend && rm -rf __pycache__
alembic downgrade -1
alembic upgrade head
```

---

**End of Implementation Plan**

**Total Estimated Duration:** 2-3 weeks for MVP
**Team Size:** 4 developers
**Target:** Hackathon demo + Production-ready foundation

**Next Steps:**
1. Set up development environment (all team members)
2. Assign phases to team members
3. Create GitHub repository
4. Begin Phase 1: Project Initialization
5. Daily standups at 9 AM
6. Weekly demo on Fridays

Good luck! 🚀👨‍🍳

