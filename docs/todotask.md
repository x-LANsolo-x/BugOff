# ChefMentor X - Complete TODO Task List

**Project:** ChefMentor X - AI Cooking Mentor App  
**Team Size:** 4 Developers  
**Timeline:** 4 Weeks (MVP)  
**Target:** Hackathon Demo + Production-ready Mobile App

---

## 📋 Quick Navigation

- [Phase 0: Pre-Development Setup](#phase-0-pre-development-setup)
- [Phase 1: Design & UI Mockups](#phase-1-design--ui-mockups)
- [Phase 2: Project Initialization](#phase-2-project-initialization)
- [Phase 3: Database Setup](#phase-3-database-setup)
- [Phase 4: Backend API Development](#phase-4-backend-api-development)
- [Phase 5: AI/ML Integration](#phase-5-aiml-integration)
- [Phase 6: Frontend Foundation](#phase-6-frontend-foundation)
- [Phase 7: Frontend Implementation](#phase-7-frontend-implementation)
- [Phase 8: Testing & Bug Fixes](#phase-8-testing--bug-fixes)
- [Phase 9: Deployment & Launch](#phase-9-deployment--launch)

---

## 🎯 Project Overview

**What We're Building:**
- Native Mobile App (iOS + Android)
- Two main features: "Cook a Dish" (live voice guidance) + "Analyze Failed Dish" (AI diagnosis)
- Backend API with AI integration
- PostgreSQL database + Redis caching
- Google Gemini AI for guidance and failure analysis

**Key Technologies:**
- Frontend: React Native + Expo
- Backend: FastAPI (Python)
- Database: PostgreSQL + Redis
- AI: Google Gemini + Groq (fallback)
- Storage: Cloudinary
- Deployment: Railway (backend) + EAS (mobile app)

---

# PHASE 0: PRE-DEVELOPMENT SETUP

**Duration:** 1-2 days  
**Responsible:** All team members  
**Goal:** Set up development environment, get API keys, organize team

---

## 🖥️ Environment Setup

### Developer Machine Setup

#### Install Required Software
- [ ] **Node.js 18+**
  - Download: https://nodejs.org/
  - Verify: `node --version` (should be 18.x or higher)
- [ ] **Python 3.11+**
  - Download: https://www.python.org/downloads/
  - Verify: `python --version` (should be 3.11 or higher)
- [ ] **PostgreSQL 15.5**
  - Download: https://www.postgresql.org/download/
  - Verify: `psql --version`
- [ ] **Redis 7.2.4**
  - Windows: https://github.com/microsoftarchive/redis/releases
  - Mac: `brew install redis`
  - Linux: `sudo apt-get install redis-server`
  - Verify: `redis-cli --version`
- [ ] **Git**
  - Download: https://git-scm.com/
  - Configure: `git config --global user.name "Your Name"`
  - Configure: `git config --global user.email "your@email.com"`

#### Install Development Tools
- [ ] **VS Code** (recommended IDE)
  - Download: https://code.visualstudio.com/
  - Install extensions:
    - [ ] Python (by Microsoft)
    - [ ] Pylance
    - [ ] ESLint
    - [ ] Prettier - Code formatter
    - [ ] React Native Tools
    - [ ] Markdown PDF (for documentation)
- [ ] **Postman or Insomnia** (API testing)
  - Postman: https://www.postman.com/downloads/
  - Insomnia: https://insomnia.rest/download
- [ ] **Android Studio** (for Android testing)
  - Download: https://developer.android.com/studio
  - Or **Xcode** (for iOS testing, Mac only)
- [ ] **Expo CLI**
  - Install: `npm install -g expo-cli`
  - Verify: `expo --version`
- [ ] **Expo Go App** on your phone
  - iOS: Download from App Store
  - Android: Download from Play Store

---

## 🔑 API Keys & Accounts

### Create Accounts & Get API Keys

#### Google Cloud Platform
- [ ] Go to https://console.cloud.google.com/
- [ ] Create new project: "ChefMentor X"
- [ ] Enable APIs:
  - [ ] Google OAuth 2.0 API
  - [ ] Create OAuth credentials
  - [ ] Add authorized redirect URIs
- [ ] **Copy Client ID**
- [ ] **Copy Client Secret**
- [ ] Save to password manager

#### Google Gemini AI
- [ ] Go to https://ai.google.dev/
- [ ] Sign in with Google account
- [ ] Get API Key
- [ ] **Copy Gemini API Key**
- [ ] Test in API playground
- [ ] Save to password manager

#### Groq AI (Fallback)
- [ ] Go to https://console.groq.com/
- [ ] Create account
- [ ] Generate API key
- [ ] **Copy Groq API Key**
- [ ] Save to password manager

#### Cloudinary (Image Storage)
- [ ] Go to https://cloudinary.com/
- [ ] Create free account
- [ ] Go to Dashboard
- [ ] **Copy Cloud Name**
- [ ] **Copy API Key**
- [ ] **Copy API Secret**
- [ ] Save to password manager

#### Railway (Backend Hosting)
- [ ] Go to https://railway.app/
- [ ] Sign up with GitHub
- [ ] Create new project
- [ ] Note: Will configure later during deployment

#### Expo EAS (Mobile App Deployment)
- [ ] Go to https://expo.dev/
- [ ] Create account
- [ ] Install EAS CLI: `npm install -g eas-cli`
- [ ] Login: `eas login`

#### Optional Services
- [ ] **Sentry** (Error tracking)
  - https://sentry.io/
  - Create account, get DSN
- [ ] **PostHog** (Analytics)
  - https://posthog.com/
  - Create account, get API key

---

## 👥 Team Organization

### Team Roles & Responsibilities

#### Assign Team Members
- [ ] **Developer 1: Backend Lead**
  - Responsible for: Database, API endpoints, server logic
  - Primary focus: Python/FastAPI
- [ ] **Developer 2: AI/ML Integration**
  - Responsible for: Gemini/Groq integration, AI prompts, caching
  - Primary focus: AI services, API integration
- [ ] **Developer 3: Frontend Lead**
  - Responsible for: React Native app, UI components, navigation
  - Primary focus: Mobile app development
- [ ] **Developer 4: Testing & DevOps**
  - Responsible for: Testing, deployment, CI/CD
  - Primary focus: Quality assurance, infrastructure

### Communication Setup
- [ ] Create team Slack/Discord channel
- [ ] Schedule daily standup time (recommend 9:00 AM)
- [ ] Set up GitHub notifications
- [ ] Create shared Google Drive/Notion for docs
- [ ] Exchange contact information

### Code Standards Agreement
- [ ] Review code style guide together
- [ ] Agree on Git workflow (feature branches)
- [ ] Agree on commit message format
- [ ] Set up code review process
- [ ] Agree on PR approval requirements

---

## 📚 Documentation Review

### Read Key Documents (in md/ folder)
- [ ] Read: `chef_mentor_x_final_prd_v_2_two_tab_experience.md` (Product requirements)
- [ ] Read: `chef_mentor_x_technology_stack_tech_stack.md` (Tech stack details)
- [ ] Read: `chef_mentor_x_application_flow_app_flow.md` (User flows)
- [ ] Read: `IMPLEMENTATION_PLAN.md` (Implementation details)
- [ ] Discuss any questions as team

---

## ✅ PHASE 0 COMPLETION CHECKLIST

Before moving to Phase 1, ensure:
- [ ] All 4 developers have complete development environment
- [ ] All API keys collected and stored securely
- [ ] Team roles assigned
- [ ] Communication channels set up
- [ ] Everyone has read core documentation
- [ ] First team meeting completed

**Estimated Time:** 1-2 days  
**Next Phase:** Phase 1 - Design & UI Mockups

---

# PHASE 1: DESIGN & UI MOCKUPS

**Duration:** 3-5 days  
**Responsible:** Developer 3 (Frontend lead) + All team reviews  
**Goal:** Create complete UI designs in Google Stitch, finalize logo, build design system

---

## 🎨 Day 1-2: Create UI Designs in Stitch

### Setup Stitch
- [ ] Go to https://stitch.withgoogle.com/
- [ ] Sign in with Google account
- [ ] Create new project: "ChefMentor X"

### Design Core Screens (Use prompts from documentation)

#### Authentication Screens
- [ ] **Splash Screen**
  - Prompt: See documentation for exact prompt
  - Elements: Logo, "Try Demo Mode" button, "Sign In" button
  - Export screenshot
- [ ] **Login Screen**
  - Prompt: See documentation
  - Elements: Google sign-in button
  - Export screenshot

#### Cook a Dish Flow
- [ ] **Recipe List Screen** ⭐ (Main "Cook" tab)
  - Prompt: See documentation
  - Elements: 5 recipe cards, search bar, bottom tabs
  - Export screenshot
- [ ] **Recipe Detail Screen**
  - Prompt: See documentation
  - Elements: Recipe info, ingredients, steps, "Start Cooking" button
  - Export screenshot
- [ ] **Live Cooking Screen** ⭐⭐⭐ (MOST IMPORTANT!)
  - Prompt: See documentation
  - Elements: Camera view, step indicator, AI guidance card, control buttons
  - Export screenshot
- [ ] **Cooking Completion Screen**
  - Prompt: See documentation
  - Elements: Success message, stats, feedback options
  - Export screenshot
- [ ] **Pause/Resume Overlay**
  - Prompt: See documentation
  - Elements: Modal with resume/restart/end options
  - Export screenshot

#### Analyze Failed Dish Flow
- [ ] **Analyze Upload Screen** (Main "Analyze" tab)
  - Prompt: See documentation
  - Elements: Upload area, camera/gallery buttons, tips
  - Export screenshot
- [ ] **Analysis Loading Screen**
  - Prompt: See documentation
  - Elements: Loading indicator, progress steps
  - Export screenshot
- [ ] **Analysis Results Screen**
  - Prompt: See documentation
  - Elements: Root cause, explanation, fix suggestions
  - Export screenshot

#### Supporting Screens
- [ ] **Profile Screen**
  - Prompt: See documentation
  - Elements: User info, stats, settings link
  - Export screenshot
- [ ] **Settings Screen**
  - Prompt: See documentation
  - Elements: Toggle switches, preferences
  - Export screenshot
- [ ] **Error Screen** (Network error)
  - Prompt: See documentation
  - Elements: Error message, retry button
  - Export screenshot
- [ ] **Permission Request Screen** (Camera access)
  - Prompt: See documentation
  - Elements: Permission explanation, enable button
  - Export screenshot

### Review & Iterate
- [ ] Review all generated designs
- [ ] Adjust colors if needed (blue #1f56e0, green #10b981)
- [ ] Ensure consistency across screens
- [ ] Get team feedback
- [ ] Regenerate any screens that need improvement

---

## 🎨 Day 3: Create Logo & Branding

### Logo Design

#### Generate Logo Options
- [ ] Use logo prompt from documentation
- [ ] Generate in Google Stitch or DALL-E/Midjourney
- [ ] Create 3-5 variations
- [ ] Test readability at small sizes (60px)

#### Select Final Logo
- [ ] Team voting on best option
- [ ] Ensure works on light and dark backgrounds
- [ ] Test on actual phone mockup

#### Export Logo Assets
- [ ] **1024x1024px** - App Store icon (PNG, no transparency)
- [ ] **512x512px** - Play Store icon (PNG)
- [ ] **180x180px** - iOS app icon (PNG)
- [ ] **192x192px** - Android app icon (PNG)
- [ ] **432x432px** - Android adaptive icon (PNG)
- [ ] **32x32px** - Favicon (PNG/ICO)
- [ ] **SVG version** - For web/marketing (vector)

#### Logo Variations
- [ ] Icon only (square, no text)
- [ ] Icon + "ChefMentor X" text (horizontal)
- [ ] Light background version
- [ ] Dark background version
- [ ] Monochrome version

### Create Assets Folder
```
designs/
├── logo/
│   ├── app-icon-1024.png
│   ├── app-icon-512.png
│   ├── app-icon-180.png
│   ├── app-icon-192.png
│   ├── favicon-32.png
│   ├── logo-full.svg
│   ├── logo-light.png
│   └── logo-dark.png
└── screenshots/
    ├── splash-screen.png
    ├── recipe-list.png
    ├── recipe-detail.png
    ├── live-cooking.png
    └── ... (all screens)
```

- [ ] Create folder structure above
- [ ] Save all logo files
- [ ] Save all screen screenshots

---

## 📐 Day 4: Build Design System

### Extract Design Tokens from Stitch

#### Colors
- [ ] Document all colors used:
  ```
  Primary Colors:
  - Primary Blue: #1f56e0
  - Primary Blue Dark: #1943b8
  - Accent Green: #10b981
  - Accent Green Dark: #059669
  
  Difficulty Colors:
  - Easy (Green): #10b981
  - Medium (Yellow): #f59e0b
  - Hard (Red): #dc2626
  
  Neutrals:
  - White: #ffffff
  - Gray 50: #fafafa
  - Gray 100: #f4f4f5
  - Gray 400: #a1a1aa
  - Gray 700: #3f3f46
  - Gray 900: #18181b
  
  Semantic:
  - Background: #fafafa
  - Surface: #ffffff
  - Text: #18181b
  - Text Secondary: #71717a
  - Success: #10b981
  - Warning: #f59e0b
  - Error: #dc2626
  ```

#### Typography
- [ ] Document font sizes:
  ```
  Heading 1: 32px, Bold (700)
  Heading 2: 24px, Bold (700)
  Heading 3: 20px, Semibold (600)
  Body: 16px, Regular (400)
  Small: 14px, Regular (400)
  Button: 16px, Semibold (600)
  Caption: 12px, Regular (400)
  ```

#### Spacing System
- [ ] Document spacing scale:
  ```
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  ```

#### Border Radius
- [ ] Document border radius values:
  ```
  sm: 4px (small elements)
  md: 8px (buttons)
  lg: 12px (cards)
  xl: 16px (modals)
  full: 9999px (pills, circular)
  ```

#### Shadows
- [ ] Document shadow styles:
  ```
  Card Shadow:
  - shadowColor: #000
  - shadowOpacity: 0.1
  - shadowRadius: 4
  - elevation: 3
  
  Modal Shadow:
  - shadowColor: #000
  - shadowOpacity: 0.2
  - shadowRadius: 8
  - elevation: 5
  ```

### Create Design System Document
- [ ] Create `designs/design-system.md`
- [ ] Include all colors, typography, spacing
- [ ] Include component specifications
- [ ] Include usage guidelines
- [ ] Add visual examples (screenshots)

---

## 🔗 Day 5: Create Interactive Prototype

### Link Screens in Stitch
- [ ] Create flow: Splash → Recipe List
- [ ] Create flow: Recipe List → Recipe Detail → Live Cooking → Completion
- [ ] Create flow: Splash → Analyze → Upload → Loading → Results
- [ ] Add navigation between tabs
- [ ] Add back button navigation

### Test User Flows
- [ ] Test "Cook a Dish" complete flow
- [ ] Test "Analyze Failed Dish" flow
- [ ] Test navigation feels natural
- [ ] Ensure no dead ends

### Share Prototype
- [ ] Get shareable link from Stitch
- [ ] Share with team for feedback
- [ ] Test on actual phone (open link on mobile)
- [ ] Note any issues or improvements

### Gather Feedback
- [ ] Each team member reviews prototype
- [ ] Note design improvements needed
- [ ] Prioritize changes (must-have vs nice-to-have)
- [ ] Make final adjustments

---

## 📤 Export & Organize

### Final Exports
- [ ] Screenshot all final screens (high resolution)
- [ ] Export any Stitch-generated code snippets
- [ ] Save color palette as image
- [ ] Export typography scale as image

### Organize Files
```
designs/
├── final/
│   ├── 01-splash-screen.png
│   ├── 02-login-screen.png
│   ├── 03-recipe-list.png
│   ├── 04-recipe-detail.png
│   ├── 05-live-cooking.png
│   ├── 06-completion.png
│   ├── 07-analyze-upload.png
│   ├── 08-analysis-loading.png
│   ├── 09-analysis-results.png
│   ├── 10-profile.png
│   ├── 11-settings.png
│   └── ... (all screens)
├── logo/
│   └── ... (all logo files)
├── design-system.md
├── color-palette.png
└── stitch-prototype-link.txt
```

- [ ] Create folder structure
- [ ] Number screens in order of user flow
- [ ] Save Stitch prototype link in text file

### Create Design Handoff Document
- [ ] Create `designs/design-handoff.md`
- [ ] Include links to all screens
- [ ] Include design system reference
- [ ] Include component specifications
- [ ] Include interaction notes (animations, transitions)
- [ ] Include accessibility notes (contrast ratios, tap targets)

---

## ✅ PHASE 1 COMPLETION CHECKLIST

Before moving to Phase 2, ensure:
- [ ] All 15+ screens designed in Stitch
- [ ] Logo finalized and exported in all sizes
- [ ] Design system documented
- [ ] Interactive prototype created and tested
- [ ] All assets exported and organized
- [ ] Team approval on all designs
- [ ] Design handoff document complete

**Deliverables:**
- ✅ Complete UI mockups (15+ screens)
- ✅ Logo in all required sizes
- ✅ Design system documentation
- ✅ Interactive prototype link
- ✅ Design handoff document

**Estimated Time:** 3-5 days  
**Next Phase:** Phase 2 - Project Initialization

---

# PHASE 2: PROJECT INITIALIZATION

**Duration:** 1 day  
**Responsible:** Developer 4 (DevOps) + Developer 1 (Backend)  
**Goal:** Set up Git repo, create project structure, install all dependencies

---

## 🗂️ Step 2.1: Initialize Git Repository

### Create GitHub Repository
- [ ] Go to https://github.com/
- [ ] Click "New Repository"
- [ ] Repository name: `chefmentor-x`
- [ ] Description: "AI-powered cooking mentor mobile app"
- [ ] Visibility: Private (or Public if open-source)
- [ ] Initialize with README: ✓
- [ ] Add .gitignore: Python + Node
- [ ] License: MIT (or your choice)
- [ ] Create repository

### Clone Repository Locally
```bash
git clone https://github.com/YOUR_USERNAME/chefmentor-x.git
cd chefmentor-x
```
- [ ] Clone repo to local machine
- [ ] Verify clone successful: `git status`

### Set Up Git Configuration
- [ ] Create `.gitignore` file (if not auto-generated)
```gitignore
# Node modules
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Python
__pycache__/
*.py[cod]
*$py.class
.Python
venv/
env/
*.so
*.egg-info/

# Environment variables
.env
.env.local
.env.production

# Database
*.db
*.sqlite

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Expo
.expo/
dist/
.expo-shared/

# Build artifacts
build/
*.apk
*.ipa
*.aab

# Secrets
secrets/
*.pem
```

### Set Up Branch Strategy
- [ ] Create `develop` branch: `git checkout -b develop`
- [ ] Push develop branch: `git push -u origin develop`
- [ ] Set up branch protection on GitHub:
  - [ ] Go to Settings → Branches
  - [ ] Add rule for `main` branch
  - [ ] Require pull request reviews before merging
  - [ ] Require status checks to pass

### Add Team Members
- [ ] Go to Settings → Collaborators
- [ ] Invite all 4 team members
- [ ] Grant appropriate permissions

### Initial Commit
```bash
git add .
git commit -m "Initial project setup"
git push origin develop
```
- [ ] Make initial commit
- [ ] Verify on GitHub

---

## 📁 Step 2.2: Create Project Structure

### Create Root Folder Structure
```bash
mkdir backend frontend docs designs
```

```
chefmentor-x/
├── backend/          # Python FastAPI backend
├── frontend/         # React Native mobile app
├── docs/             # Documentation
├── designs/          # Design files and mockups
├── .gitignore
└── README.md
```

- [ ] Create folders: backend, frontend, docs, designs
- [ ] Move design files to `designs/` folder
- [ ] Move markdown docs to `docs/` folder

### Create Backend Structure
```bash
cd backend
mkdir -p app/api/v1/endpoints
mkdir -p app/core
mkdir -p app/models
mkdir -p app/schemas
mkdir -p app/services/ai
mkdir -p app/db
mkdir -p app/utils
mkdir -p tests
mkdir -p alembic
```

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       └── endpoints/
│   │           ├── __init__.py
│   │           ├── auth.py
│   │           ├── demo.py
│   │           ├── recipes.py
│   │           ├── cooking.py
│   │           └── failure.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── security.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── recipe.py
│   │   ├── session.py
│   │   └── profile.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── recipe.py
│   │   ├── cooking.py
│   │   └── failure.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── cooking.py
│   │   ├── failure.py
│   │   ├── storage.py
│   │   ├── cache.py
│   │   └── ai/
│   │       ├── __init__.py
│   │       ├── gemini_service.py
│   │       └── groq_service.py
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   └── seed.py
│   └── utils/
│       ├── __init__.py
│       └── validators.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_models.py
│   ├── test_auth.py
│   └── test_recipes.py
├── alembic/
├── requirements.txt
├── .env.example
├── .env
├── pyproject.toml
└── README.md
```

- [ ] Create all backend folders
- [ ] Create empty `__init__.py` files in each Python package

### Create Frontend Structure (Will be populated by Expo)
```bash
cd ../frontend
```

- [ ] Note: Will initialize with Expo in next step
- [ ] Frontend structure will be created automatically

---

## 🔧 Step 2.3: Install Backend Dependencies

### Create Python Virtual Environment
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

- [ ] Create virtual environment
- [ ] Activate virtual environment
- [ ] Verify: `which python` (should point to venv)

### Create requirements.txt
Create `backend/requirements.txt`:
```txt
# Web Framework
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# Database & ORM
sqlalchemy[asyncio]==2.0.25
asyncpg==0.29.0
alembic==1.13.1
psycopg2-binary==2.9.9

# Authentication & Security
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
pydantic==2.5.3
pydantic-settings==2.1.0

# AI/ML
google-generativeai==0.3.2
groq==0.4.1

# File Storage
cloudinary==1.38.0

# Rate Limiting
slowapi==0.1.9

# Caching
redis==5.0.1
hiredis==2.3.2

# HTTP Client
requests==2.31.0
httpx==0.26.0

# Testing
pytest==7.4.4
pytest-asyncio==0.23.3
pytest-cov==4.1.0

# Code Quality
black==23.12.1
ruff==0.1.11

# CORS
python-cors==1.0.0
```

- [ ] Create requirements.txt file
- [ ] Review all packages listed

### Install Dependencies
```bash
pip install -r requirements.txt
```

- [ ] Install all packages
- [ ] Wait for installation to complete (may take 5-10 minutes)
- [ ] Verify no error messages

### Verify Installations
```bash
python -c "import fastapi; print('FastAPI:', fastapi.__version__)"
python -c "import sqlalchemy; print('SQLAlchemy:', sqlalchemy.__version__)"
python -c "import google.generativeai; print('Gemini SDK installed')"
```

- [ ] Test FastAPI imports
- [ ] Test SQLAlchemy imports
- [ ] Test Gemini SDK imports
- [ ] All should print without errors

### Create .env.example Template
Create `backend/.env.example`:
```env
# Database
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/chefmentor_dev
REDIS_URL=redis://localhost:6379/0

# Authentication
JWT_SECRET=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# AI/ML APIs
GEMINI_API_KEY=your-gemini-api-key
GROQ_API_KEY=your-groq-api-key

# Recipe APIs (Optional)
RECIPE_DB_API_KEY=
FLAVOR_DB_API_KEY=

# Analytics (Optional)
POSTHOG_API_KEY=
POSTHOG_HOST=

# Error Tracking (Optional)
SENTRY_DSN=

# Environment
ENVIRONMENT=development
DEBUG=true
```

- [ ] Create .env.example file
- [ ] Copy to .env: `cp .env.example .env`

### Fill in .env with Actual Keys
- [ ] Edit `.env` file
- [ ] Add actual DATABASE_URL (will create DB in Phase 3)
- [ ] Add actual REDIS_URL
- [ ] Generate JWT_SECRET: `openssl rand -base64 32`
- [ ] Add GOOGLE_CLIENT_ID from Phase 0
- [ ] Add GOOGLE_CLIENT_SECRET from Phase 0
- [ ] Add CLOUDINARY credentials from Phase 0
- [ ] Add GEMINI_API_KEY from Phase 0
- [ ] Add GROQ_API_KEY from Phase 0
- [ ] Save .env file
- [ ] **IMPORTANT:** Never commit .env to Git!

### Create pyproject.toml (Code Formatting)
Create `backend/pyproject.toml`:
```toml
[tool.black]
line-length = 100
target-version = ['py311']
include = '\.pyi?$'

[tool.ruff]
line-length = 100
target-version = "py311"
select = ["E", "F", "W", "I"]
ignore = []

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = "test_*.py"
python_functions = "test_*"
asyncio_mode = "auto"
```

- [ ] Create pyproject.toml
- [ ] Configure black (code formatter)
- [ ] Configure ruff (linter)
- [ ] Configure pytest

---

## 📱 Step 2.4: Install Frontend Dependencies

### Initialize Expo App
```bash
cd ../frontend
npx create-expo-app@latest . --template blank-typescript
```

- [ ] Run Expo create command
- [ ] Choose blank TypeScript template
- [ ] Wait for initialization (5-10 minutes)
- [ ] Verify package.json created

### Create Frontend Folder Structure
```bash
mkdir -p src/screens
mkdir -p src/components
mkdir -p src/navigation
mkdir -p src/services
mkdir -p src/store
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/constants
```

```
frontend/
├── src/
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── CookScreen.tsx
│   │   ├── RecipeDetailScreen.tsx
│   │   ├── LiveCookingScreen.tsx
│   │   ├── CompletionScreen.tsx
│   │   ├── AnalyzeScreen.tsx
│   │   ├── AnalysisLoadingScreen.tsx
│   │   ├── AnalysisResultsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── Input.tsx
│   │   └── StepIndicator.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── demoService.ts
│   │   ├── recipeService.ts
│   │   ├── cookingService.ts
│   │   └── failureService.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── cookingStore.ts
│   │   └── recipeStore.ts
│   ├── types/
│   │   ├── recipe.ts
│   │   ├── cooking.ts
│   │   └── api.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── constants/
│       ├── designTokens.ts
│       └── theme.ts
├── assets/
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
├── App.tsx
├── app.config.js
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

- [ ] Create all source folders
- [ ] Note: Will create files in Phase 6-7

### Install Core Dependencies
```bash
npm install zustand@4.5.2
npm install axios@1.6.5
npm install react-hook-form@7.49.3
npm install @react-navigation/native@6.1.9
npm install @react-navigation/bottom-tabs@6.5.11
npm install nativewind@4.0.1
```

- [ ] Install state management (Zustand)
- [ ] Install HTTP client (Axios)
- [ ] Install form handling
- [ ] Install navigation
- [ ] Install styling (NativeWind)

### Install Expo Packages
```bash
npx expo install expo-camera
npx expo install expo-media-library
npx expo install expo-image-picker
npx expo install expo-av
npx expo install expo-speech
npx expo install expo-auth-session
npx expo install expo-web-browser
```

- [ ] Install camera access
- [ ] Install media library
- [ ] Install image picker
- [ ] Install audio/video (expo-av)
- [ ] Install text-to-speech
- [ ] Install OAuth session
- [ ] Install web browser (for OAuth)

### Install Dev Dependencies
```bash
npm install -D tailwindcss@3.4.1
npm install -D prettier@3.2.2
npm install -D eslint@8.56.0
npm install -D jest@29.7.0
npm install -D @testing-library/react-native@12.4.3
npm install -D @types/react@18.2.0
npm install -D typescript@5.3.3
```

- [ ] Install TailwindCSS
- [ ] Install Prettier (code formatter)
- [ ] Install ESLint (linter)
- [ ] Install Jest (testing)
- [ ] Install React Native Testing Library
- [ ] Install TypeScript types

### Verify Installation
```bash
npm list --depth=0
```

- [ ] Check all packages installed
- [ ] No vulnerability warnings (or acceptable only)

---

## ⚙️ Step 2.5: Configure Frontend Tools

### Configure TailwindCSS
Create `frontend/tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#dbe7ff',
          500: '#1f56e0',
          600: '#1943b8',
          700: '#162f6b',
        },
        accent: {
          500: '#10b981',
          600: '#059669',
        },
        difficulty: {
          easy: '#10b981',
          medium: '#f59e0b',
          hard: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] Create tailwind.config.js
- [ ] Add custom colors from design system

### Configure ESLint
Create `frontend/.eslintrc.js`:
```javascript
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
  },
};
```

- [ ] Create .eslintrc.js
- [ ] Configure for Expo + Prettier

### Configure Prettier
Create `frontend/.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

- [ ] Create .prettierrc
- [ ] Set code formatting rules

### Update app.config.js
Edit `frontend/app.config.js`:
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
    assetBundlePatterns: ["**/*"],
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
      permissions: [
        "CAMERA",
        "RECORD_AUDIO",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    extra: {
      apiUrl: process.env.API_URL || "http://localhost:8000"
    }
  }
};
```

- [ ] Update app name and slug
- [ ] Set bundle identifiers
- [ ] Add required permissions
- [ ] Configure API URL

### Replace App Icons
- [ ] Copy logo files from designs/logo/ to frontend/assets/
- [ ] Rename to icon.png, splash.png, adaptive-icon.png
- [ ] Verify correct sizes

---

## ✅ Step 2.6: Verify Setup

### Test Backend
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python -c "import fastapi; print('✅ FastAPI ready')"
python -c "import sqlalchemy; print('✅ SQLAlchemy ready')"
python -c "import google.generativeai; print('✅ Gemini SDK ready')"
```

- [ ] All imports work without errors
- [ ] Virtual environment activated

### Test Frontend
```bash
cd ../frontend
npm start
```

- [ ] Expo dev server starts
- [ ] QR code appears
- [ ] Can scan with Expo Go app on phone
- [ ] App loads on phone (even if blank screen)
- [ ] Press Ctrl+C to stop

### Test Linting & Formatting
```bash
# Backend
cd backend
black --check app/
ruff check app/

# Frontend
cd ../frontend
npm run lint
```

- [ ] Black check passes (or shows what would be formatted)
- [ ] Ruff check passes (or shows issues)
- [ ] ESLint runs without critical errors

### Commit Initial Setup
```bash
cd ..
git add .
git commit -m "feat: complete project initialization

- Set up backend with FastAPI
- Set up frontend with Expo
- Install all dependencies
- Configure linting and formatting
- Add environment configuration"
git push origin develop
```

- [ ] Add all files to Git
- [ ] Commit with descriptive message
- [ ] Push to develop branch
- [ ] Verify on GitHub

---

## ✅ PHASE 2 COMPLETION CHECKLIST

Before moving to Phase 3, ensure:
- [ ] Git repository created and cloned
- [ ] All team members have access
- [ ] Backend folder structure complete
- [ ] Frontend initialized with Expo
- [ ] All backend dependencies installed
- [ ] All frontend dependencies installed
- [ ] Configuration files created (.env, tailwind, etc.)
- [ ] Backend imports work
- [ ] Frontend app runs on phone
- [ ] All changes committed to Git

**Deliverables:**
- ✅ Complete project structure
- ✅ All dependencies installed
- ✅ Development environment working
- ✅ Git repository with initial commit

**Estimated Time:** 1 day (6-8 hours)  
**Next Phase:** Phase 3 - Database Setup

---

# PHASE 3: DATABASE SETUP

**Duration:** 1-2 days  
**Responsible:** Developer 1 (Backend lead)  
**Goal:** Set up PostgreSQL, create database models, run migrations, seed initial data

---

## 🗄️ Step 3.1: Database Installation & Setup

### Start PostgreSQL Service

#### Windows:
- [ ] Open Services (search "Services" in Start menu)
- [ ] Find "postgresql-x64-15" service
- [ ] Right-click → Start
- [ ] Set to "Automatic" startup

#### Mac:
```bash
brew services start postgresql@15
```
- [ ] Start PostgreSQL service
- [ ] Verify: `brew services list`

#### Linux:
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```
- [ ] Start PostgreSQL
- [ ] Enable auto-start

### Create Database
```bash
# Access PostgreSQL
psql -U postgres

# In psql console:
CREATE DATABASE chefmentor_dev;
\l  -- List databases (verify creation)
\q  -- Exit
```

- [ ] Open psql console
- [ ] Create `chefmentor_dev` database
- [ ] Verify database created
- [ ] Exit psql

### Test Database Connection
```bash
psql -U postgres -d chefmentor_dev -c "SELECT version();"
```

- [ ] Test connection works
- [ ] Should show PostgreSQL version

### Update .env File
Edit `backend/.env`:
```env
DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/chefmentor_dev
```

- [ ] Update DATABASE_URL with correct password
- [ ] Test connection string is correct

---

## 🔴 Step 3.2: Setup Redis

### Start Redis Service

#### Windows:
- [ ] Open Command Prompt as Administrator
- [ ] Navigate to Redis installation folder
- [ ] Run: `redis-server.exe`
- [ ] Keep terminal open (or install as service)

#### Mac:
```bash
brew services start redis
```
- [ ] Start Redis service

#### Linux:
```bash
sudo systemctl start redis
sudo systemctl enable redis
```
- [ ] Start Redis service

### Test Redis Connection
```bash
redis-cli ping
```

- [ ] Should return: `PONG`
- [ ] Verify Redis is running

### Update .env File
Edit `backend/.env`:
```env
REDIS_URL=redis://localhost:6379/0
```

- [ ] Verify REDIS_URL is correct
- [ ] Save .env file

---

## 📊 Step 3.3: Create Database Models

### Create Database Base Setup

Create `backend/app/db/base.py`:
```python
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,
    future=True
)

AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
```

- [ ] Create db/base.py file
- [ ] Add database engine configuration
- [ ] Add session factory
- [ ] Add get_db dependency

### Create Core Config

Create `backend/app/core/config.py`:
```python
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    REDIS_URL: str
    
    # Authentication
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    
    # AI/ML
    GEMINI_API_KEY: str
    GROQ_API_KEY: str
    
    # File Storage
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"


settings = Settings()
```

- [ ] Create core/config.py file
- [ ] Add Settings class with all env vars
- [ ] Test settings load: `python -c "from app.core.config import settings; print(settings.DATABASE_URL)"`

### Create User Models

Create `backend/app/models/user.py`:
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
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    cooking_sessions = relationship("CookingSession", back_populates="user")
    failure_analyses = relationship("FailureAnalysis", back_populates="user")
    profile = relationship("UserProfile", back_populates="user", uselist=False)
```

- [ ] Create models/user.py file
- [ ] Add User model with all fields
- [ ] Add relationships

### Create Recipe Models

Create `backend/app/models/recipe.py`:
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
    
    # Relationships
    steps = relationship("RecipeStep", back_populates="recipe", order_by="RecipeStep.step_number")
    cooking_sessions = relationship("CookingSession", back_populates="recipe")


class RecipeStep(Base):
    __tablename__ = "recipe_steps"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipe_id = Column(UUID(as_uuid=True), ForeignKey('recipes.id'), nullable=False, index=True)
    step_number = Column(Integer, nullable=False)
    instruction = Column(Text, nullable=False)
    expected_state = Column(String(100))
    
    # Relationships
    recipe = relationship("Recipe", back_populates="steps")
```

- [ ] Create models/recipe.py file
- [ ] Add Recipe model
- [ ] Add RecipeStep model
- [ ] Add relationships between them

### Create Session Models

Create `backend/app/models/session.py`:
```python
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
import uuid
from app.db.base import Base


class DemoSession(Base):
    __tablename__ = "demo_sessions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, default=lambda: datetime.utcnow() + timedelta(hours=24), nullable=False)
    
    # Relationships
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
    status = Column(Enum('in_progress', 'completed', 'abandoned', name='session_status'), default='in_progress')
    
    # Relationships
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
    
    # Relationships
    user = relationship("User", back_populates="failure_analyses")
    demo_session = relationship("DemoSession", back_populates="failure_analyses")
```

- [ ] Create models/session.py file
- [ ] Add DemoSession model (24-hour expiry)
- [ ] Add CookingSession model
- [ ] Add FailureAnalysis model

### Create Profile Model

Create `backend/app/models/profile.py`:
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
    
    # Relationships
    user = relationship("User", back_populates="profile")
```

- [ ] Create models/profile.py file
- [ ] Add UserProfile model with JSONB field

### Create Models __init__.py

Create `backend/app/models/__init__.py`:
```python
from app.models.user import User
from app.models.recipe import Recipe, RecipeStep
from app.models.session import DemoSession, CookingSession, FailureAnalysis
from app.models.profile import UserProfile

__all__ = [
    "User",
    "Recipe",
    "RecipeStep",
    "DemoSession",
    "CookingSession",
    "FailureAnalysis",
    "UserProfile"
]
```

- [ ] Create models/__init__.py
- [ ] Import all models
- [ ] Verify all models import without errors

### Test Models
```bash
cd backend
source venv/bin/activate
python -c "from app.models import User, Recipe; print('✅ Models import successfully')"
```

- [ ] Test imports work
- [ ] No syntax errors

---

## 🔄 Step 3.4: Initialize Alembic Migrations

### Initialize Alembic
```bash
cd backend
alembic init alembic
```

- [ ] Run alembic init command
- [ ] Verify alembic/ folder created
- [ ] Verify alembic.ini created

### Configure Alembic

Edit `backend/alembic/env.py`:
```python
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.base import Base
from app.core.config import settings
import app.models  # Import all models

# this is the Alembic Config object
config = context.config

# Override sqlalchemy.url with our settings
config.set_main_option(
    'sqlalchemy.url',
    settings.DATABASE_URL.replace('+asyncpg', '')  # Use sync driver for migrations
)

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set target metadata
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
```

- [ ] Edit alembic/env.py
- [ ] Import Base and models
- [ ] Set target_metadata
- [ ] Configure database URL from settings

### Create Initial Migration
```bash
alembic revision --autogenerate -m "Initial schema with users, recipes, sessions"
```

- [ ] Generate migration
- [ ] Check generated file in alembic/versions/
- [ ] Review migration (should create all tables)

### Run Migration
```bash
alembic upgrade head
```

- [ ] Apply migration to database
- [ ] Should see "Running upgrade ... -> ..., Initial schema"
- [ ] No errors

### Verify Tables Created
```bash
psql -U postgres -d chefmentor_dev -c "\dt"
```

- [ ] Should list all tables:
  - [ ] users
  - [ ] user_profiles
  - [ ] recipes
  - [ ] recipe_steps
  - [ ] demo_sessions
  - [ ] cooking_sessions
  - [ ] failure_analyses
  - [ ] alembic_version

---

## 🌱 Step 3.5: Seed Initial Data

### Create Seed Script

Create `backend/app/db/seed.py`:
```python
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import AsyncSessionLocal
from app.models import Recipe, RecipeStep


async def seed_recipes():
    async with AsyncSessionLocal() as session:
        print("🌱 Starting database seeding...")
        
        # Recipe 1: Maggi Noodles
        maggi = Recipe(
            name="Maggi Noodles",
            difficulty="easy",
            estimated_time_min=10
        )
        session.add(maggi)
        await session.flush()
        
        maggi_steps = [
            RecipeStep(recipe_id=maggi.id, step_number=1, instruction="Boil 1.5 cups of water in a pan", expected_state="Water boiling"),
            RecipeStep(recipe_id=maggi.id, step_number=2, instruction="Add Maggi noodle cake and tastemaker", expected_state="Noodles added to water"),
            RecipeStep(recipe_id=maggi.id, step_number=3, instruction="Cook for 2 minutes, stirring occasionally", expected_state="Noodles softened"),
            RecipeStep(recipe_id=maggi.id, step_number=4, instruction="Serve hot", expected_state="Ready to serve"),
        ]
        session.add_all(maggi_steps)
        print("✓ Added Maggi Noodles recipe")
        
        # Recipe 2: Scrambled Eggs
        eggs = Recipe(
            name="Scrambled Eggs",
            difficulty="easy",
            estimated_time_min=8
        )
        session.add(eggs)
        await session.flush()
        
        egg_steps = [
            RecipeStep(recipe_id=eggs.id, step_number=1, instruction="Beat 2 eggs in a bowl with salt and pepper", expected_state="Eggs beaten and mixed"),
            RecipeStep(recipe_id=eggs.id, step_number=2, instruction="Heat butter in a pan on medium heat", expected_state="Butter melted and bubbling"),
            RecipeStep(recipe_id=eggs.id, step_number=3, instruction="Pour eggs into the pan", expected_state="Eggs in pan"),
            RecipeStep(recipe_id=eggs.id, step_number=4, instruction="Stir gently until eggs are cooked but still soft (2-3 minutes)", expected_state="Eggs scrambled and cooked"),
            RecipeStep(recipe_id=eggs.id, step_number=5, instruction="Remove from heat and serve immediately", expected_state="Ready to serve"),
        ]
        session.add_all(egg_steps)
        print("✓ Added Scrambled Eggs recipe")
        
        # Recipe 3: Simple Dal
        dal = Recipe(
            name="Simple Dal",
            difficulty="medium",
            estimated_time_min=25
        )
        session.add(dal)
        await session.flush()
        
        dal_steps = [
            RecipeStep(recipe_id=dal.id, step_number=1, instruction="Rinse 1 cup dal and add to pressure cooker with 3 cups water", expected_state="Dal in pressure cooker"),
            RecipeStep(recipe_id=dal.id, step_number=2, instruction="Add turmeric and salt, pressure cook for 3 whistles", expected_state="Dal cooking in pressure cooker"),
            RecipeStep(recipe_id=dal.id, step_number=3, instruction="Heat oil in a pan, add cumin seeds", expected_state="Cumin seeds crackling"),
            RecipeStep(recipe_id=dal.id, step_number=4, instruction="Add chopped onions, cook until golden brown", expected_state="Onions golden"),
            RecipeStep(recipe_id=dal.id, step_number=5, instruction="Add cooked dal to the pan and simmer for 5 minutes", expected_state="Dal simmering"),
            RecipeStep(recipe_id=dal.id, step_number=6, instruction="Garnish with coriander leaves and serve hot", expected_state="Ready to serve"),
        ]
        session.add_all(dal_steps)
        print("✓ Added Simple Dal recipe")
        
        # Recipe 4: Grilled Cheese Sandwich
        sandwich = Recipe(
            name="Grilled Cheese Sandwich",
            difficulty="easy",
            estimated_time_min=10
        )
        session.add(sandwich)
        await session.flush()
        
        sandwich_steps = [
            RecipeStep(recipe_id=sandwich.id, step_number=1, instruction="Butter one side of each bread slice", expected_state="Bread buttered"),
            RecipeStep(recipe_id=sandwich.id, step_number=2, instruction="Place cheese between bread slices, buttered side out", expected_state="Sandwich assembled"),
            RecipeStep(recipe_id=sandwich.id, step_number=3, instruction="Heat pan on medium heat", expected_state="Pan heated"),
            RecipeStep(recipe_id=sandwich.id, step_number=4, instruction="Place sandwich in pan, cook until golden brown (2-3 minutes)", expected_state="First side golden"),
            RecipeStep(recipe_id=sandwich.id, step_number=5, instruction="Flip sandwich and cook other side until golden", expected_state="Both sides golden"),
            RecipeStep(recipe_id=sandwich.id, step_number=6, instruction="Remove from pan and serve hot", expected_state="Ready to serve"),
        ]
        session.add_all(sandwich_steps)
        print("✓ Added Grilled Cheese Sandwich recipe")
        
        # Recipe 5: Simple Pasta
        pasta = Recipe(
            name="Simple Pasta",
            difficulty="medium",
            estimated_time_min=20
        )
        session.add(pasta)
        await session.flush()
        
        pasta_steps = [
            RecipeStep(recipe_id=pasta.id, step_number=1, instruction="Boil water in a large pot with salt", expected_state="Water boiling"),
            RecipeStep(recipe_id=pasta.id, step_number=2, instruction="Add pasta and cook for 8-10 minutes", expected_state="Pasta cooking"),
            RecipeStep(recipe_id=pasta.id, step_number=3, instruction="Heat olive oil in a pan, add minced garlic", expected_state="Garlic cooking"),
            RecipeStep(recipe_id=pasta.id, step_number=4, instruction="Add canned tomatoes, salt, and Italian herbs", expected_state="Sauce simmering"),
            RecipeStep(recipe_id=pasta.id, step_number=5, instruction="Drain pasta and add to the sauce", expected_state="Pasta mixed with sauce"),
            RecipeStep(recipe_id=pasta.id, step_number=6, instruction="Toss well and serve with grated cheese", expected_state="Ready to serve"),
        ]
        session.add_all(pasta_steps)
        print("✓ Added Simple Pasta recipe")
        
        await session.commit()
        print("\n✅ Successfully seeded 5 recipes with all steps!")


if __name__ == "__main__":
    asyncio.run(seed_recipes())
```

- [ ] Create db/seed.py file
- [ ] Add all 5 recipes with steps
- [ ] Review recipe data

### Run Seed Script
```bash
cd backend
source venv/bin/activate
python -m app.db.seed
```

- [ ] Run seed script
- [ ] Should see success messages for each recipe
- [ ] No errors

### Verify Seeded Data
```bash
psql -U postgres -d chefmentor_dev -c "SELECT name, difficulty FROM recipes;"
psql -U postgres -d chefmentor_dev -c "SELECT COUNT(*) FROM recipe_steps;"
```

- [ ] Should list 5 recipes
- [ ] Should have ~25-27 total steps
- [ ] Verify data looks correct

### Test Query from Python
```bash
python -c "
import asyncio
from app.db.base import AsyncSessionLocal
from app.models import Recipe
from sqlalchemy import select

async def test():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Recipe))
        recipes = result.scalars().all()
        print(f'Found {len(recipes)} recipes:')
        for r in recipes:
            print(f'  - {r.name}')

asyncio.run(test())
"
```

- [ ] Should list 5 recipes
- [ ] Confirms database connection working

---

## ✅ PHASE 3 COMPLETION CHECKLIST

Before moving to Phase 4, ensure:
- [ ] PostgreSQL running and database created
- [ ] Redis running and accessible
- [ ] All database models created
- [ ] Alembic migrations initialized
- [ ] Initial migration applied successfully
- [ ] All tables created in database
- [ ] 5 recipes seeded with steps
- [ ] Can query database from Python
- [ ] No errors in any step

**Deliverables:**
- ✅ Working PostgreSQL database
- ✅ All tables created via migrations
- ✅ 5 starter recipes with steps seeded
- ✅ Database connection working from Python

**Test Database:**
```bash
# Quick verification
psql -U postgres -d chefmentor_dev -c "
SELECT 
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM recipes) as recipes,
    (SELECT COUNT(*) FROM recipe_steps) as steps;
"
# Should show: users=0, recipes=5, steps=~25
```

**Estimated Time:** 1-2 days  
**Next Phase:** Phase 4 - Backend API Development

---

# PHASE 4: BACKEND API DEVELOPMENT

**Duration:** 4-5 days  
**Responsible:** Developer 1 (Backend lead) + Developer 2 (AI integration)  
**Goal:** Build all REST API endpoints, implement business logic, test with Postman

---

## 🚀 Day 1: Core Setup & Authentication

### Step 4.1: Create FastAPI Application

Create `backend/app/main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title="ChefMentor X API",
    version="1.0.0",
    debug=settings.DEBUG,
    description="AI-powered cooking mentor backend API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": "1.0.0"
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ChefMentor X API",
        "docs": "/docs",
        "health": "/health"
    }
```

- [ ] Create app/main.py file
- [ ] Add FastAPI app instance
- [ ] Add CORS middleware
- [ ] Add health check endpoint

### Test Basic API
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

- [ ] Start server
- [ ] Open http://localhost:8000
- [ ] Check /health endpoint works
- [ ] Open http://localhost:8000/docs (Swagger UI)
- [ ] Press Ctrl+C to stop

### Step 4.2: Create Authentication Service

Create `backend/app/core/security.py`:
```python
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt


def verify_token(token: str) -> dict:
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        return None
```

- [ ] Create core/security.py
- [ ] Add JWT token creation
- [ ] Add token verification

Create `backend/app/schemas/auth.py`:
```python
from pydantic import BaseModel, EmailStr


class GoogleAuthRequest(BaseModel):
    id_token: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    name: str
```

- [ ] Create schemas/auth.py
- [ ] Add request/response schemas

Create `backend/app/services/auth.py`:
```python
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException
from app.core.config import settings
from app.core.security import create_access_token
from app.models import User


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def google_login(self, token: str) -> dict:
        """Authenticate user with Google OAuth"""
        try:
            # Verify Google ID token
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )
            
            # Validate claims
            if idinfo['aud'] != settings.GOOGLE_CLIENT_ID:
                raise ValueError('Invalid audience')
            
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Invalid issuer')
            
            email = idinfo['email']
            name = idinfo.get('name', email.split('@')[0])
            email_verified = idinfo.get('email_verified', False)
            
            if not email_verified:
                raise ValueError('Email not verified')
            
            # Find or create user
            result = await self.db.execute(
                select(User).where(User.email == email)
            )
            user = result.scalar_one_or_none()
            
            if not user:
                user = User(email=email, name=name)
                self.db.add(user)
                await self.db.commit()
                await self.db.refresh(user)
            
            # Create JWT token
            access_token = create_access_token(
                data={
                    "sub": str(user.id),
                    "email": user.email,
                    "role": user.role
                }
            )
            
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user_id": str(user.id),
                "email": user.email,
                "name": user.name
            }
            
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")
```

- [ ] Create services/auth.py
- [ ] Implement Google OAuth verification
- [ ] Implement user creation/retrieval
- [ ] Return JWT token

Create `backend/app/api/v1/endpoints/auth.py`:
```python
from fastapi import APIRouter, Depends
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
    """
    Login with Google OAuth
    
    - Verifies Google ID token
    - Creates user if doesn't exist
    - Returns JWT access token
    """
    auth_service = AuthService(db)
    return await auth_service.google_login(auth_data.id_token)
```

- [ ] Create api/v1/endpoints/auth.py
- [ ] Add Google login endpoint
- [ ] Test in Postman (will need actual Google token)

---

## 📋 Day 2: Demo & Recipe Endpoints

### Step 4.3: Demo Session Endpoints

Create `backend/app/schemas/demo.py`:
```python
from pydantic import BaseModel
from datetime import datetime


class DemoSessionResponse(BaseModel):
    demo_session_id: str
    expires_at: datetime
    message: str = "Demo session created. Valid for 24 hours."
```

- [ ] Create schemas/demo.py

Create `backend/app/api/v1/endpoints/demo.py`:
```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.models import DemoSession
from app.schemas.demo import DemoSessionResponse

router = APIRouter()


@router.post("/start", response_model=DemoSessionResponse)
async def start_demo(db: AsyncSession = Depends(get_db)):
    """
    Create a demo session
    
    - No authentication required
    - Expires after 24 hours
    - Allows trying app without signup
    """
    demo = DemoSession()
    db.add(demo)
    await db.commit()
    await db.refresh(demo)
    
    return {
        "demo_session_id": str(demo.id),
        "expires_at": demo.expires_at
    }
```

- [ ] Create api/v1/endpoints/demo.py
- [ ] Add demo start endpoint
- [ ] Test in Postman

### Step 4.4: Recipe Endpoints

Create `backend/app/schemas/recipe.py`:
```python
from pydantic import BaseModel
from typing import List


class RecipeStepSchema(BaseModel):
    step_number: int
    instruction: str
    expected_state: str | None = None
    
    class Config:
        from_attributes = True


class RecipeBase(BaseModel):
    id: str
    name: str
    difficulty: str
    estimated_time_min: int
    
    class Config:
        from_attributes = True


class RecipeDetail(RecipeBase):
    steps: List[RecipeStepSchema]


class RecipeListResponse(BaseModel):
    recipes: List[RecipeBase]
    total: int
```

- [ ] Create schemas/recipe.py
- [ ] Add all recipe schemas

Create `backend/app/api/v1/endpoints/recipes.py`:
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.db.base import get_db
from app.models import Recipe
from app.schemas.recipe import RecipeListResponse, RecipeDetail, RecipeBase

router = APIRouter()


@router.get("", response_model=RecipeListResponse)
async def list_recipes(db: AsyncSession = Depends(get_db)):
    """
    List all available recipes
    
    Returns basic recipe info without steps
    """
    result = await db.execute(select(Recipe))
    recipes = result.scalars().all()
    
    return {
        "recipes": [RecipeBase.from_orm(r) for r in recipes],
        "total": len(recipes)
    }


@router.get("/{recipe_id}", response_model=RecipeDetail)
async def get_recipe(
    recipe_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Get recipe details with all steps
    
    - recipe_id: UUID of the recipe
    """
    result = await db.execute(
        select(Recipe)
        .options(selectinload(Recipe.steps))
        .where(Recipe.id == recipe_id)
    )
    recipe = result.scalar_one_or_none()
    
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    return RecipeDetail.from_orm(recipe)
```

- [ ] Create api/v1/endpoints/recipes.py
- [ ] Add list recipes endpoint
- [ ] Add get recipe by ID endpoint
- [ ] Test both endpoints in Postman

---

## 🍳 Day 3: Cooking Session Endpoints

### Step 4.5: Cooking Session API

Create `backend/app/schemas/cooking.py`:
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
    started_at: str


class StepEventRequest(BaseModel):
    session_id: str
    current_step: int
    image_data: Optional[str] = None


class StepEventResponse(BaseModel):
    guidance: str
    warnings: list = []
    next_step: int
    is_final_step: bool = False
```

- [ ] Create schemas/cooking.py
- [ ] Add all cooking session schemas

Create `backend/app/services/cooking.py`:
```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException
from app.models import CookingSession, Recipe, RecipeStep
from datetime import datetime


class CookingService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def start_session(self, data: dict) -> dict:
        """Start a new cooking session"""
        # Validate recipe exists
        result = await self.db.execute(
            select(Recipe).where(Recipe.id == data['recipe_id'])
        )
        recipe = result.scalar_one_or_none()
        if not recipe:
            raise HTTPException(status_code=404, detail="Recipe not found")
        
        # Create session
        session = CookingSession(
            recipe_id=data['recipe_id'],
            user_id=data.get('user_id'),
            demo_session_id=data.get('demo_session_id'),
            status='in_progress'
        )
        self.db.add(session)
        await self.db.commit()
        await self.db.refresh(session)
        
        return {
            "session_id": str(session.id),
            "recipe_id": str(session.recipe_id),
            "status": session.status,
            "started_at": session.started_at.isoformat()
        }
    
    async def process_step_event(self, data: dict) -> dict:
        """Process step progression and return guidance"""
        # Get session
        result = await self.db.execute(
            select(CookingSession)
            .options(selectinload(CookingSession.recipe).selectinload(Recipe.steps))
            .where(CookingSession.id == data['session_id'])
        )
        session = result.scalar_one_or_none()
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Get current step
        current_step_num = data['current_step']
        steps = sorted(session.recipe.steps, key=lambda s: s.step_number)
        
        if current_step_num > len(steps):
            return {
                "guidance": "You've completed all steps! Well done!",
                "warnings": [],
                "next_step": current_step_num,
                "is_final_step": True
            }
        
        current_step = steps[current_step_num - 1]
        
        # TODO: AI integration in Phase 5
        # For now, return basic guidance
        guidance = f"{current_step.instruction}"
        
        return {
            "guidance": guidance,
            "warnings": [],
            "next_step": current_step_num + 1,
            "is_final_step": current_step_num >= len(steps)
        }
    
    async def complete_session(self, session_id: str) -> dict:
        """Mark cooking session as completed"""
        result = await self.db.execute(
            select(CookingSession).where(CookingSession.id == session_id)
        )
        session = result.scalar_one_or_none()
        
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session.status = 'completed'
        session.completed_at = datetime.utcnow()
        await self.db.commit()
        
        return {"status": "completed", "session_id": str(session.id)}
```

- [ ] Create services/cooking.py
- [ ] Implement start_session
- [ ] Implement process_step_event (basic, no AI yet)
- [ ] Implement complete_session

Create `backend/app/api/v1/endpoints/cooking.py`:
```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.cooking import (
    StartCookingRequest,
    CookingSessionResponse,
    StepEventRequest,
    StepEventResponse
)
from app.services.cooking import CookingService

router = APIRouter()


@router.post("/start", response_model=CookingSessionResponse)
async def start_cooking(
    data: StartCookingRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Start a new cooking session
    
    - Requires either user_id or demo_session_id
    - Creates new cooking session
    - Returns session ID
    """
    service = CookingService(db)
    return await service.start_session(data.dict())


@router.post("/step-event", response_model=StepEventResponse)
async def handle_step_event(
    data: StepEventRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Handle step boundary event
    
    - Returns AI guidance for current step
    - Optional: Accepts image for visual verification
    """
    service = CookingService(db)
    return await service.process_step_event(data.dict())


@router.post("/{session_id}/complete")
async def complete_cooking(
    session_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Mark cooking session as completed
    """
    service = CookingService(db)
    return await service.complete_session(session_id)
```

- [ ] Create api/v1/endpoints/cooking.py
- [ ] Add start cooking endpoint
- [ ] Add step event endpoint
- [ ] Add complete session endpoint
- [ ] Test complete flow in Postman

---

## 📸 Day 4: File Upload & Failure Analysis

### Step 4.6: Setup Cloudinary

Create `backend/app/services/storage.py`:
```python
import cloudinary
import cloudinary.uploader
from app.core.config import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET
)


class StorageService:
    @staticmethod
    async def upload_image(file_data, folder: str = "chefmentor/failures") -> dict:
        """Upload image to Cloudinary"""
        try:
            result = cloudinary.uploader.upload(
                file_data,
                folder=folder,
                resource_type="auto",
                transformation=[
                    {"width": 1024, "height": 1024, "crop": "limit"},
                    {"quality": "auto:good"}
                ]
            )
            
            return {
                "url": result['secure_url'],
                "public_id": result['public_id'],
                "format": result['format']
            }
        except Exception as e:
            raise Exception(f"Image upload failed: {str(e)}")
    
    @staticmethod
    async def delete_image(public_id: str) -> bool:
        """Delete image from Cloudinary"""
        try:
            result = cloudinary.uploader.destroy(public_id)
            return result.get('result') == 'ok'
        except Exception:
            return False
```

- [ ] Create services/storage.py
- [ ] Configure Cloudinary
- [ ] Add upload_image method
- [ ] Add delete_image method

### Step 4.7: File Validation

Create `backend/app/utils/validators.py`:
```python
from fastapi import UploadFile, HTTPException
import magic


ALLOWED_TYPES = {
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/quicktime'
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


async def validate_file(file: UploadFile) -> bytes:
    """Validate uploaded file"""
    # Read file content
    content = await file.read()
    
    # Check size
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Max size: {MAX_FILE_SIZE / 1024 / 1024}MB"
        )
    
    # Verify actual file type (magic number, not extension)
    mime_type = magic.from_buffer(content, mime=True)
    if mime_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: {mime_type}. Allowed: {ALLOWED_TYPES}"
        )
    
    return content
```

- [ ] Create utils/validators.py
- [ ] Add file validation
- [ ] Install python-magic: `pip install python-magic-bin` (Windows) or `python-magic` (Mac/Linux)

### Step 4.8: Failure Analysis Service

Create `backend/app/schemas/failure.py`:
```python
from pydantic import BaseModel
from typing import List


class FailureAnalysisResponse(BaseModel):
    analysis_id: str
    root_cause: str
    explanation: str
    suggestions: List[str]
    confidence: float = 0.0
```

- [ ] Create schemas/failure.py

Create `backend/app/services/failure.py`:
```python
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import UploadFile
from app.models import FailureAnalysis
from app.services.storage import StorageService


class FailureAnalysisService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.storage = StorageService()
    
    async def analyze(
        self,
        file: UploadFile,
        user_id: str = None,
        demo_session_id: str = None
    ) -> dict:
        """Analyze failed dish from uploaded image"""
        
        # Upload to Cloudinary
        file_data = await file.read()
        upload_result = await self.storage.upload_image(file_data)
        media_url = upload_result['url']
        
        # TODO: AI analysis in Phase 5
        # For now, return placeholder
        root_cause = "Analysis pending - AI integration in Phase 5"
        explanation = "Placeholder response. Real AI analysis will be added in Phase 5."
        suggestions = [
            "AI suggestion 1 (coming soon)",
            "AI suggestion 2 (coming soon)",
            "AI suggestion 3 (coming soon)"
        ]
        
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
            "suggestions": suggestions,
            "confidence": 0.0
        }
```

- [ ] Create services/failure.py
- [ ] Add analyze method (placeholder for AI)
- [ ] Upload to Cloudinary
- [ ] Save to database

Create `backend/app/api/v1/endpoints/failure.py`:
```python
from fastapi import APIRouter, Depends, File, UploadFile, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.failure import FailureAnalysisResponse
from app.services.failure import FailureAnalysisService
from app.utils.validators import validate_file
from typing import Optional

router = APIRouter()


@router.post("/analyze", response_model=FailureAnalysisResponse)
async def analyze_failure(
    file: UploadFile = File(...),
    user_id: Optional[str] = Form(None),
    demo_session_id: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    """
    Analyze a failed dish
    
    - Upload image/video of failed dish
    - Get AI-powered diagnosis
    - Receive suggestions to fix
    """
    # Validate file
    await validate_file(file)
    
    # Analyze
    service = FailureAnalysisService(db)
    return await service.analyze(file, user_id, demo_session_id)
```

- [ ] Create api/v1/endpoints/failure.py
- [ ] Add analyze endpoint
- [ ] Test file upload in Postman

---

## 🔗 Day 5: API Router & Documentation

### Step 4.9: Create API Router

Create `backend/app/api/v1/__init__.py`:
```python
from fastapi import APIRouter
from app.api.v1.endpoints import auth, demo, recipes, cooking, failure

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(demo.router, prefix="/demo", tags=["Demo Mode"])
api_router.include_router(recipes.router, prefix="/recipes", tags=["Recipes"])
api_router.include_router(cooking.router, prefix="/cooking", tags=["Cooking Sessions"])
api_router.include_router(failure.router, prefix="/failure", tags=["Failure Analysis"])
```

- [ ] Create api/v1/__init__.py
- [ ] Import all routers
- [ ] Create main api_router
- [ ] Include all sub-routers with prefixes and tags

Update `backend/app/main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import api_router  # Add this import

app = FastAPI(
    title="ChefMentor X API",
    version="1.0.0",
    debug=settings.DEBUG,
    description="AI-powered cooking mentor backend API"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")  # Add this line

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": "1.0.0"
    }

@app.get("/")
async def root():
    return {
        "message": "ChefMentor X API",
        "docs": "/docs",
        "health": "/health"
    }
```

- [ ] Update main.py
- [ ] Import api_router
- [ ] Include router with /api/v1 prefix

### Step 4.10: Test Complete API

Start server:
```bash
uvicorn app.main:app --reload
```

- [ ] Start server
- [ ] Open http://localhost:8000/docs
- [ ] Verify all endpoints listed
- [ ] Test each endpoint:
  - [ ] GET /health
  - [ ] POST /api/v1/demo/start
  - [ ] GET /api/v1/recipes
  - [ ] GET /api/v1/recipes/{id}
  - [ ] POST /api/v1/cooking/start
  - [ ] POST /api/v1/cooking/step-event
  - [ ] POST /api/v1/cooking/{id}/complete
  - [ ] POST /api/v1/failure/analyze
  - [ ] POST /api/v1/auth/google (will fail without real token - OK for now)

### Create Postman Collection

- [ ] Open Postman
- [ ] Create new collection: "ChefMentor X API"
- [ ] Add requests for all endpoints
- [ ] Save environment variables (base_url, demo_session_id, etc.)
- [ ] Export collection as JSON
- [ ] Save to `backend/postman/ChefMentor_X_API.postman_collection.json`

### Add API Documentation

Update endpoint docstrings to improve Swagger docs:
- [ ] Add detailed descriptions
- [ ] Add example request/response
- [ ] Add parameter descriptions
- [ ] Review docs at /docs

---

## ✅ PHASE 4 COMPLETION CHECKLIST

Before moving to Phase 5, ensure:
- [ ] FastAPI app running
- [ ] All endpoints implemented:
  - [ ] Authentication (Google OAuth)
  - [ ] Demo sessions
  - [ ] Recipes (list, detail)
  - [ ] Cooking sessions (start, step-event, complete)
  - [ ] Failure analysis (upload, analyze)
- [ ] File upload working
- [ ] Cloudinary integration working
- [ ] All endpoints tested in Postman
- [ ] API documentation complete at /docs
- [ ] No critical errors

**Deliverables:**
- ✅ Complete REST API with all endpoints
- ✅ Authentication working (JWT)
- ✅ Recipe CRUD operations
- ✅ Cooking session management
- ✅ File upload functional
- ✅ API documentation (Swagger)
- ✅ Postman collection for testing

**Test Complete Flow:**
```bash
# 1. Create demo session
curl -X POST http://localhost:8000/api/v1/demo/start

# 2. Get recipes
curl http://localhost:8000/api/v1/recipes

# 3. Start cooking
curl -X POST http://localhost:8000/api/v1/cooking/start \
  -H "Content-Type: application/json" \
  -d '{"recipe_id": "UUID_HERE", "demo_session_id": "UUID_HERE"}'

# 4. Process step
curl -X POST http://localhost:8000/api/v1/cooking/step-event \
  -H "Content-Type: application/json" \
  -d '{"session_id": "UUID_HERE", "current_step": 1}'
```

**Estimated Time:** 4-5 days  
**Next Phase:** Phase 5 - AI/ML Integration

---

# PHASE 5: AI/ML INTEGRATION

**Duration:** 2-3 days  
**Responsible:** Developer 2 (AI/ML lead)  
**Goal:** Integrate Google Gemini and Groq AI, add intelligent cooking guidance and failure analysis

---

## 🤖 Day 1: Setup AI Services

### Step 5.1: Create Gemini Service

Create `backend/app/services/ai/gemini_service.py`:
```python
import google.generativeai as genai
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)


class GeminiService:
    def __init__(self):
        self.text_model = genai.GenerativeModel('gemini-1.5-flash')
        self.vision_model = genai.GenerativeModel('gemini-1.5-pro')
    
    async def analyze_cooking_step(self, step_info: dict, image_data: str = None) -> str:
        """Generate cooking guidance for a specific step"""
        prompt = f"""
You are a patient, encouraging cooking mentor helping a beginner cook.

Current Step: {step_info['step_number']}
Instruction: {step_info['instruction']}
Expected Outcome: {step_info.get('expected_state', 'N/A')}

Provide brief, actionable guidance in this format:
INSTRUCTION: [Restate the step simply]
TIP: [One critical tip to avoid common mistakes]
CHECK: [How to know this step is complete]

Keep response under 60 words total for voice delivery.
Be encouraging and specific.
"""
        
        try:
            response = self.text_model.generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini text generation failed: {e}")
            return None
    
    async def analyze_failure(self, image_url: str, context: dict = None) -> dict:
        """Analyze failed dish from image"""
        prompt = f"""
Analyze this cooking failure image and provide a structured diagnosis.

{f"Context: {context}" if context else ""}

Provide your analysis in this exact format:

ROOT CAUSE: [One sentence identifying the PRIMARY cause]
EXPLANATION: [2-3 sentences explaining what went wrong and why]
FIX 1: [First specific actionable fix]
FIX 2: [Second specific actionable fix]
FIX 3: [Third specific actionable fix]

Focus on technique, not ingredients. Be specific and helpful.
"""
        
        try:
            # For vision analysis, pass image URL
            response = self.vision_model.generate_content([prompt, {"uri": image_url}])
            return self._parse_failure_response(response.text)
        except Exception as e:
            logger.error(f"Gemini vision analysis failed: {e}")
            return None
    
    def _parse_failure_response(self, text: str) -> dict:
        """Parse AI response into structured format"""
        try:
            lines = text.strip().split('\n')
            result = {
                "root_cause": "",
                "explanation": "",
                "suggestions": []
            }
            
            for line in lines:
                line = line.strip()
                if line.startswith("ROOT CAUSE:"):
                    result["root_cause"] = line.replace("ROOT CAUSE:", "").strip()
                elif line.startswith("EXPLANATION:"):
                    result["explanation"] = line.replace("EXPLANATION:", "").strip()
                elif line.startswith("FIX"):
                    fix = line.split(":", 1)[1].strip() if ":" in line else line
                    result["suggestions"].append(fix)
            
            return result
        except Exception as e:
            logger.error(f"Failed to parse AI response: {e}")
            return {
                "root_cause": "Unable to parse analysis",
                "explanation": text,
                "suggestions": ["Review the full analysis above"]
            }
```

- [ ] Create services/ai/gemini_service.py
- [ ] Initialize Gemini models (text and vision)
- [ ] Add analyze_cooking_step method
- [ ] Add analyze_failure method with vision
- [ ] Add response parsing

### Test Gemini Connection
```python
# Test script: backend/test_gemini.py
import asyncio
import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

async def test():
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Say hello!")
    print("✅ Gemini Response:", response.text)

asyncio.run(test())
```

- [ ] Create test script
- [ ] Run: `python test_gemini.py`
- [ ] Verify connection works
- [ ] Delete test script

---

### Step 5.2: Create Groq Service (Fallback)

Create `backend/app/services/ai/groq_service.py`:
```python
from groq import Groq
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = "llama-3.1-70b-versatile"
    
    async def generate_guidance(self, prompt: str) -> str:
        """Generate text-only guidance using Groq"""
        try:
            completion = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful cooking mentor. Provide brief, clear guidance."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=200
            )
            
            return completion.choices[0].message.content
        except Exception as e:
            logger.error(f"Groq generation failed: {e}")
            return None
```

- [ ] Create services/ai/groq_service.py
- [ ] Initialize Groq client
- [ ] Add generate_guidance method

### Test Groq Connection
```python
# Test script: backend/test_groq.py
from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.GROQ_API_KEY)
completion = client.chat.completions.create(
    model="llama-3.1-70b-versatile",
    messages=[{"role": "user", "content": "Say hello!"}]
)
print("✅ Groq Response:", completion.choices[0].message.content)
```

- [ ] Create test script
- [ ] Run: `python test_groq.py`
- [ ] Verify connection works
- [ ] Delete test script

---

### Step 5.3: Create Unified AI Service

Create `backend/app/services/ai/__init__.py`:
```python
from app.services.ai.gemini_service import GeminiService
from app.services.ai.groq_service import GroqService
import logging

logger = logging.getLogger(__name__)


class AIService:
    """Unified AI service with automatic fallback"""
    
    def __init__(self):
        self.gemini = GeminiService()
        self.groq = GroqService()
    
    async def get_cooking_guidance(self, step_info: dict, image_data: str = None) -> str:
        """
        Get cooking guidance with fallback
        
        Tries Gemini first (primary)
        Falls back to Groq if Gemini fails
        """
        # Try Gemini
        result = await self.gemini.analyze_cooking_step(step_info, image_data)
        if result:
            logger.info("✅ Guidance from Gemini")
            return result
        
        # Fallback to Groq
        logger.warning("⚠️ Gemini failed, trying Groq fallback")
        prompt = f"Provide cooking guidance for: {step_info['instruction']}"
        result = await self.groq.generate_guidance(prompt)
        
        if result:
            logger.info("✅ Guidance from Groq (fallback)")
            return result
        
        # Ultimate fallback
        logger.error("❌ Both AI services failed")
        return "Continue with the recipe step. AI guidance temporarily unavailable."
    
    async def analyze_failure(self, image_url: str, context: dict = None) -> dict:
        """
        Analyze failure with vision AI
        
        Only Gemini supports vision, no fallback
        """
        result = await self.gemini.analyze_failure(image_url, context)
        
        if result:
            logger.info("✅ Failure analysis from Gemini Vision")
            return result
        
        # Fallback response
        logger.error("❌ Gemini vision analysis failed")
        return {
            "root_cause": "Analysis temporarily unavailable",
            "explanation": "We're unable to analyze the image right now. Please try again later.",
            "suggestions": [
                "Check if the image is clear and well-lit",
                "Try uploading a different angle",
                "Contact support if issue persists"
            ]
        }
```

- [ ] Create services/ai/__init__.py
- [ ] Initialize both AI services
- [ ] Add get_cooking_guidance with fallback logic
- [ ] Add analyze_failure with error handling

---

## 🔗 Day 2: Integrate AI into Endpoints

### Step 5.4: Update Cooking Service with AI

Update `backend/app/services/cooking.py`:
```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException
from app.models import CookingSession, Recipe, RecipeStep
from app.services.ai import AIService  # Add this import
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class CookingService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.ai_service = AIService()  # Add AI service
    
    # ... (keep existing start_session method)
    
    async def process_step_event(self, data: dict) -> dict:
        """Process step progression and return AI guidance"""
        # Get session
        result = await self.db.execute(
            select(CookingSession)
            .options(selectinload(CookingSession.recipe).selectinload(Recipe.steps))
            .where(CookingSession.id == data['session_id'])
        )
        session = result.scalar_one_or_none()
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Get current step
        current_step_num = data['current_step']
        steps = sorted(session.recipe.steps, key=lambda s: s.step_number)
        
        if current_step_num > len(steps):
            return {
                "guidance": "You've completed all steps! Well done! Your dish should be ready to serve.",
                "warnings": [],
                "next_step": current_step_num,
                "is_final_step": True
            }
        
        current_step = steps[current_step_num - 1]
        
        # Prepare step info for AI
        step_info = {
            "step_number": current_step.step_number,
            "instruction": current_step.instruction,
            "expected_state": current_step.expected_state
        }
        
        # Get AI guidance
        try:
            guidance = await self.ai_service.get_cooking_guidance(
                step_info,
                data.get('image_data')
            )
            logger.info(f"✅ AI guidance generated for step {current_step_num}")
        except Exception as e:
            logger.error(f"❌ AI guidance failed: {e}")
            # Fallback to basic instruction
            guidance = current_step.instruction
        
        return {
            "guidance": guidance,
            "warnings": [],
            "next_step": current_step_num + 1,
            "is_final_step": current_step_num >= len(steps)
        }
    
    # ... (keep existing complete_session method)
```

- [ ] Update services/cooking.py
- [ ] Import AIService
- [ ] Call AI in process_step_event
- [ ] Add error handling
- [ ] Test with Postman

---

### Step 5.5: Update Failure Service with AI

Update `backend/app/services/failure.py`:
```python
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import UploadFile
from app.models import FailureAnalysis
from app.services.storage import StorageService
from app.services.ai import AIService  # Add this import
import logging

logger = logging.getLogger(__name__)


class FailureAnalysisService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.storage = StorageService()
        self.ai_service = AIService()  # Add AI service
    
    async def analyze(
        self,
        file: UploadFile,
        user_id: str = None,
        demo_session_id: str = None,
        context: dict = None
    ) -> dict:
        """Analyze failed dish from uploaded image"""
        
        # Upload to Cloudinary
        file_data = await file.read()
        upload_result = await self.storage.upload_image(file_data)
        media_url = upload_result['url']
        
        logger.info(f"📸 Image uploaded: {media_url}")
        
        # Get AI analysis
        try:
            ai_result = await self.ai_service.analyze_failure(media_url, context)
            logger.info("✅ AI analysis completed")
        except Exception as e:
            logger.error(f"❌ AI analysis failed: {e}")
            # Fallback
            ai_result = {
                "root_cause": "Analysis failed",
                "explanation": "Unable to analyze the image at this time.",
                "suggestions": ["Please try again later"]
            }
        
        root_cause = ai_result.get('root_cause', 'Unknown')
        explanation = ai_result.get('explanation', 'No explanation available')
        suggestions = ai_result.get('suggestions', [])
        
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
            "suggestions": suggestions,
            "confidence": 0.85  # Placeholder confidence score
        }
```

- [ ] Update services/failure.py
- [ ] Import AIService
- [ ] Call AI vision analysis
- [ ] Add error handling
- [ ] Test with actual image upload

---

## 🚀 Day 3: Optimization & Testing

### Step 5.6: Add Response Caching

Create `backend/app/services/cache.py`:
```python
import redis
import json
import hashlib
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Initialize Redis
redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)


class AICache:
    """Cache AI responses to reduce API calls"""
    
    def __init__(self):
        self.redis = redis_client
        self.ttl = 3600  # 1 hour
    
    def _generate_key(self, prompt: str, context: dict = None) -> str:
        """Generate cache key from prompt + context"""
        content = f"{prompt}:{json.dumps(context or {}, sort_keys=True)}"
        return f"ai_cache:{hashlib.md5(content.encode()).hexdigest()}"
    
    async def get_or_generate(self, key_data: dict, generator_func):
        """Check cache, or generate and cache"""
        cache_key = self._generate_key(
            key_data.get('prompt', ''),
            key_data.get('context')
        )
        
        # Try cache
        cached = self.redis.get(cache_key)
        if cached:
            logger.info(f"✅ Cache HIT for {cache_key[:20]}...")
            return json.loads(cached)
        
        logger.info(f"❌ Cache MISS for {cache_key[:20]}...")
        
        # Generate new
        response = await generator_func()
        
        if response:
            # Cache for next time
            self.redis.setex(cache_key, self.ttl, json.dumps(response))
            logger.info(f"💾 Cached response for {cache_key[:20]}...")
        
        return response
```

- [ ] Create services/cache.py
- [ ] Initialize Redis client
- [ ] Add caching logic
- [ ] Test Redis connection

### Update AI Service with Caching

Update `backend/app/services/ai/__init__.py`:
```python
from app.services.ai.gemini_service import GeminiService
from app.services.ai.groq_service import GroqService
from app.services.cache import AICache  # Add this
import logging

logger = logging.getLogger(__name__)


class AIService:
    def __init__(self):
        self.gemini = GeminiService()
        self.groq = GroqService()
        self.cache = AICache()  # Add cache
    
    async def get_cooking_guidance(self, step_info: dict, image_data: str = None) -> str:
        """Get cooking guidance with caching"""
        
        # Don't cache if image data provided (unique each time)
        if image_data:
            return await self._generate_guidance(step_info, image_data)
        
        # Check cache for text-only guidance
        cache_key_data = {
            "prompt": f"step_{step_info['step_number']}_{step_info['instruction']}",
            "context": None
        }
        
        async def generate():
            return await self._generate_guidance(step_info, None)
        
        return await self.cache.get_or_generate(cache_key_data, generate)
    
    async def _generate_guidance(self, step_info: dict, image_data: str = None) -> str:
        """Internal method to generate guidance"""
        # Try Gemini
        result = await self.gemini.analyze_cooking_step(step_info, image_data)
        if result:
            logger.info("✅ Guidance from Gemini")
            return result
        
        # Fallback to Groq
        logger.warning("⚠️ Gemini failed, trying Groq fallback")
        prompt = f"Provide cooking guidance for: {step_info['instruction']}"
        result = await self.groq.generate_guidance(prompt)
        
        if result:
            logger.info("✅ Guidance from Groq (fallback)")
            return result
        
        logger.error("❌ Both AI services failed")
        return "Continue with the recipe step. AI guidance temporarily unavailable."
    
    # ... (keep analyze_failure method)
```

- [ ] Update services/ai/__init__.py
- [ ] Add cache integration
- [ ] Only cache text-only requests
- [ ] Test caching works

---

### Step 5.7: Add Rate Limiting

Update `backend/app/api/v1/endpoints/cooking.py`:
```python
from fastapi import APIRouter, Depends
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.cooking import (
    StartCookingRequest,
    CookingSessionResponse,
    StepEventRequest,
    StepEventResponse
)
from app.services.cooking import CookingService

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

# ... (keep existing endpoints)

@router.post("/step-event", response_model=StepEventResponse)
@limiter.limit("10/minute")  # Max 10 AI calls per minute
async def handle_step_event(
    data: StepEventRequest,
    db: AsyncSession = Depends(get_db)
):
    """Handle step boundary event with AI guidance"""
    service = CookingService(db)
    return await service.process_step_event(data.dict())
```

- [ ] Update cooking endpoint
- [ ] Add rate limiting (10 requests/minute)

Update `backend/app/api/v1/endpoints/failure.py`:
```python
@router.post("/analyze", response_model=FailureAnalysisResponse)
@limiter.limit("5/hour")  # More expensive, stricter limit
async def analyze_failure(
    file: UploadFile = File(...),
    user_id: Optional[str] = Form(None),
    demo_session_id: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    """Analyze failure with rate limiting"""
    await validate_file(file)
    service = FailureAnalysisService(db)
    return await service.analyze(file, user_id, demo_session_id)
```

- [ ] Update failure endpoint
- [ ] Add rate limiting (5 requests/hour)

---

### Step 5.8: Optimize for Voice

Create `backend/app/utils/ai_helpers.py`:
```python
import re


def optimize_for_voice(text: str) -> str:
    """
    Optimize AI text for text-to-speech
    
    - Expand abbreviations
    - Add pauses
    - Make numbers voice-friendly
    """
    # Remove markdown formatting
    text = text.replace("**", "")
    text = text.replace("*", "")
    text = re.sub(r'\[([^\]]+)\]', r'\1', text)  # Remove [brackets]
    
    # Expand common cooking abbreviations
    abbreviations = {
        "min": "minutes",
        "sec": "seconds",
        "tbsp": "tablespoon",
        "tsp": "teaspoon",
        "oz": "ounces",
        "lb": "pound",
        "°F": "degrees Fahrenheit",
        "°C": "degrees Celsius",
        "qt": "quart",
        "pt": "pint"
    }
    
    for abbr, full in abbreviations.items():
        text = re.sub(r'\b' + re.escape(abbr) + r'\b', full, text, flags=re.IGNORECASE)
    
    # Add pauses for better comprehension
    text = text.replace(". ", "... ")
    text = text.replace("? ", "?... ")
    text = text.replace("! ", "!... ")
    
    # Make numbers more voice-friendly (add spaces)
    text = re.sub(r'(\d+)', r' \1 ', text)
    text = re.sub(r'\s+', ' ', text)  # Clean up extra spaces
    
    return text.strip()
```

- [ ] Create utils/ai_helpers.py
- [ ] Add optimize_for_voice function

Update cooking service to use optimization:
```python
# In services/cooking.py, update process_step_event
from app.utils.ai_helpers import optimize_for_voice

# After getting AI guidance:
guidance = await self.ai_service.get_cooking_guidance(step_info, data.get('image_data'))
guidance = optimize_for_voice(guidance)  # Add this line
```

- [ ] Import optimize_for_voice
- [ ] Apply to guidance before returning
- [ ] Test voice-optimized output

---

## ✅ PHASE 5 COMPLETION CHECKLIST

Before moving to Phase 6, ensure:
- [ ] Gemini API connected and working
- [ ] Groq API connected and working (fallback)
- [ ] Cooking guidance AI-powered
- [ ] Failure analysis AI-powered with vision
- [ ] Fallback mechanism working
- [ ] Response caching implemented
- [ ] Rate limiting active
- [ ] Voice optimization applied
- [ ] All endpoints tested with real AI responses

**Test AI Integration:**
```bash
# Test cooking guidance
curl -X POST http://localhost:8000/api/v1/cooking/step-event \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "YOUR_SESSION_ID",
    "current_step": 1
  }'
# Should return AI-generated guidance

# Test failure analysis (use Postman for file upload)
# Upload actual image of failed dish
# Should return AI-powered diagnosis
```

**Deliverables:**
- ✅ Gemini AI fully integrated
- ✅ Groq fallback working
- ✅ AI-powered cooking guidance
- ✅ AI-powered failure analysis
- ✅ Caching reducing API calls
- ✅ Rate limiting preventing abuse
- ✅ Voice-optimized responses

**Estimated Time:** 2-3 days  
**Next Phase:** Phase 6 - Frontend Foundation

---

# PHASE 6: FRONTEND FOUNDATION

**Duration:** 2-3 days  
**Responsible:** Developer 3 (Frontend lead)  
**Goal:** Set up React Native architecture, create reusable components, configure navigation and state management

---

## 🎨 Day 1: Setup & Design System

### Step 6.1: Create Design Tokens

Create `frontend/src/constants/designTokens.ts`:
```typescript
export const Colors = {
  // Primary (from design system)
  primary: {
    50: '#eef4ff',
    100: '#dbe7ff',
    500: '#1f56e0',
    600: '#1943b8',
    700: '#162f6b',
  },
  
  // Accent
  accent: {
    500: '#10b981',
    600: '#059669',
  },
  
  // Difficulty badges
  difficulty: {
    easy: '#10b981',
    medium: '#f59e0b',
    hard: '#dc2626',
  },
  
  // Neutrals
  white: '#ffffff',
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    400: '#a1a1aa',
    700: '#3f3f46',
    900: '#18181b',
  },
  
  // Semantic
  background: '#fafafa',
  surface: '#ffffff',
  text: '#18181b',
  textSecondary: '#71717a',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#dc2626',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '700' as const },
  h3: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  small: { fontSize: 14, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
};
```

- [ ] Create constants/designTokens.ts
- [ ] Copy colors from design system
- [ ] Add spacing, typography, shadows

---

### Step 6.2: Create Core UI Components

Create `frontend/src/components/Button.tsx`:
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/designTokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary[500] : Colors.white} />
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
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: Colors.primary[500],
  },
  secondary: {
    backgroundColor: Colors.accent[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary[500],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: Colors.white,
    ...Typography.button,
  },
  outlineText: {
    color: Colors.primary[500],
  },
});
```

- [ ] Create components/Button.tsx
- [ ] Match Stitch design exactly
- [ ] Test all variants

Create `frontend/src/components/RecipeCard.tsx`:
```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/designTokens';

interface RecipeCardProps {
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  time: number;
  onPress: () => void;
}

export default function RecipeCard({ name, difficulty, time, onPress }: RecipeCardProps) {
  const difficultyColor = Colors.difficulty[difficulty];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.emoji}>{getEmoji(name)}</Text>
      <Text style={styles.name}>{name}</Text>
      
      <View style={styles.meta}>
        <View style={[styles.badge, { backgroundColor: difficultyColor }]}>
          <Text style={styles.badgeText}>{difficulty}</Text>
        </View>
        <Text style={styles.time}>⏱ {time} min</Text>
      </View>
      
      <View style={styles.startButton}>
        <Text style={styles.startText}>START</Text>
      </View>
    </TouchableOpacity>
  );
}

function getEmoji(name: string): string {
  if (name.includes('Maggi') || name.includes('Noodles')) return '🍜';
  if (name.includes('Egg')) return '🍳';
  if (name.includes('Dal')) return '🥘';
  if (name.includes('Cheese')) return '🥪';
  if (name.includes('Pasta')) return '🍝';
  return '🍽️';
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  emoji: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  time: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  startButton: {
    backgroundColor: Colors.primary[500],
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  startText: {
    color: Colors.white,
    ...Typography.button,
  },
});
```

- [ ] Create components/RecipeCard.tsx
- [ ] Add difficulty color logic
- [ ] Match Stitch design

---

## 🧭 Day 2: Navigation & State Management

### Step 6.3: Setup Navigation

Create `frontend/src/navigation/AppNavigator.tsx`:
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CookScreen from '../screens/CookScreen';
import AnalyzeScreen from '../screens/AnalyzeScreen';
import { Colors } from '../constants/designTokens';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.primary[500],
          tabBarInactiveTintColor: Colors.gray[400],
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Cook"
          component={CookScreen}
          options={{
            title: 'Cook a Dish',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="restaurant" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Analyze"
          component={AnalyzeScreen}
          options={{
            title: 'Analyze Failed Dish',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

- [ ] Create navigation/AppNavigator.tsx
- [ ] Setup bottom tabs
- [ ] Add icons
- [ ] Install @expo/vector-icons if needed

---

### Step 6.4: Setup State Management

Create `frontend/src/store/authStore.ts`:
```typescript
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  userId: string | null;
  email: string | null;
  name: string | null;
  demoSessionId: string | null;
  setAuth: (token: string, userId: string, email: string, name: string) => void;
  setDemoSession: (sessionId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userId: null,
  email: null,
  name: null,
  demoSessionId: null,
  setAuth: (token, userId, email, name) => set({ token, userId, email, name }),
  setDemoSession: (sessionId) => set({ demoSessionId: sessionId }),
  logout: () => set({ token: null, userId: null, email: null, name: null, demoSessionId: null }),
}));
```

- [ ] Create store/authStore.ts
- [ ] Add authentication state
- [ ] Add demo session state

Create `frontend/src/store/cookingStore.ts`:
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

- [ ] Create store/cookingStore.ts
- [ ] Add cooking session state
- [ ] Add step navigation logic

Create `frontend/src/store/recipeStore.ts`:
```typescript
import { create } from 'zustand';

export interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  estimated_time_min: number;
}

interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  setRecipes: (recipes: Recipe[]) => void;
  selectRecipe: (recipe: Recipe) => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  selectedRecipe: null,
  setRecipes: (recipes) => set({ recipes }),
  selectRecipe: (recipe) => set({ selectedRecipe: recipe }),
}));
```

- [ ] Create store/recipeStore.ts
- [ ] Add recipe list state

---

## 🔌 Day 3: API Services

### Step 6.5: Create API Client

Create `frontend/src/services/api.ts`:
```typescript
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

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

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, logout
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

- [ ] Create services/api.ts
- [ ] Configure base URL
- [ ] Add auth interceptor
- [ ] Add error handling

---

### Step 6.6: Create Service Files

Create `frontend/src/services/demoService.ts`:
```typescript
import apiClient from './api';

export const demoService = {
  async startDemo() {
    const response = await apiClient.post('/demo/start');
    return response.data;
  },
};
```

- [ ] Create services/demoService.ts

Create `frontend/src/services/recipeService.ts`:
```typescript
import apiClient from './api';

export interface Recipe {
  id: string;
  name: string;
  difficulty: string;
  estimated_time_min: number;
}

export interface RecipeDetail extends Recipe {
  steps: RecipeStep[];
}

export interface RecipeStep {
  step_number: number;
  instruction: string;
  expected_state: string | null;
}

export const recipeService = {
  async getRecipes(): Promise<Recipe[]> {
    const response = await apiClient.get('/recipes');
    return response.data.recipes;
  },

  async getRecipeById(id: string): Promise<RecipeDetail> {
    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
  },
};
```

- [ ] Create services/recipeService.ts
- [ ] Add TypeScript interfaces
- [ ] Add API methods

Create `frontend/src/services/cookingService.ts`:
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

- [ ] Create services/cookingService.ts
- [ ] Add all cooking endpoints

Create `frontend/src/services/failureService.ts`:
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
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
```

- [ ] Create services/failureService.ts
- [ ] Add file upload logic

---

## ✅ PHASE 6 COMPLETION CHECKLIST

Before moving to Phase 7, ensure:
- [ ] Design system created (colors, spacing, typography)
- [ ] Core UI components built (Button, RecipeCard)
- [ ] Navigation setup (bottom tabs working)
- [ ] State management configured (Zustand stores)
- [ ] API client configured with interceptors
- [ ] All service files created
- [ ] TypeScript types defined
- [ ] Components render without errors

**Test Foundation:**
```bash
cd frontend
npm start
# Scan QR code with Expo Go
# Should see bottom tabs (even if screens empty)
# No critical errors
```

**Deliverables:**
- ✅ Complete design system
- ✅ Reusable UI components
- ✅ Navigation structure
- ✅ State management
- ✅ API services configured

**Estimated Time:** 2-3 days  
**Next Phase:** Phase 7 - Frontend Implementation

---

# PHASE 7: FRONTEND IMPLEMENTATION

**Duration:** 4-5 days  
**Responsible:** Developer 3 (Frontend) + Developer 4 (Testing)  
**Goal:** Build all screens, implement complete user flows, integrate with backend API

---

## 📱 Day 1-2: Authentication & Recipe Screens

### Step 7.1: Create Splash Screen

Create `frontend/src/screens/SplashScreen.tsx`:
```typescript
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
import { useAuthStore } from '../store/authStore';
import { demoService } from '../services/demoService';
import { Colors, Spacing, Typography } from '../constants/designTokens';

export default function SplashScreen({ navigation }: any) {
  const { setDemoSession } = useAuthStore();

  const handleDemoMode = async () => {
    try {
      const response = await demoService.startDemo();
      setDemoSession(response.demo_session_id);
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Demo mode failed:', error);
      alert('Failed to start demo mode. Please try again.');
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  logo: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxxl,
  },
  buttons: {
    width: '100%',
    gap: Spacing.md,
  },
});
```

- [ ] Create screens/SplashScreen.tsx
- [ ] Add demo mode functionality
- [ ] Match Stitch design
- [ ] Test navigation

### Step 7.2: Create Recipe List Screen

Create `frontend/src/screens/CookScreen.tsx`:
```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { recipeService, Recipe } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import { Colors, Spacing, Typography } from '../constants/designTokens';

export default function CookScreen({ navigation }: any) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await recipeService.getRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
      alert('Failed to load recipes. Please check your connection.');
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
        <ActivityIndicator size="large" color={Colors.primary[500]} />
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
            difficulty={item.difficulty as 'easy' | 'medium' | 'hard'}
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
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...Typography.h2,
    color: Colors.text,
    padding: Spacing.lg,
  },
  list: {
    padding: Spacing.lg,
  },
});
```

- [ ] Create screens/CookScreen.tsx
- [ ] Fetch recipes from API
- [ ] Display in list
- [ ] Add loading state
- [ ] Test with real backend

### Step 7.3: Create Recipe Detail Screen

Create `frontend/src/screens/RecipeDetailScreen.tsx`:
```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { recipeService, RecipeDetail } from '../services/recipeService';
import { cookingService } from '../services/cookingService';
import { useAuthStore } from '../store/authStore';
import { useCookingStore } from '../store/cookingStore';
import Button from '../components/Button';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/designTokens';

export default function RecipeDetailScreen({ route, navigation }: any) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  
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
      alert('Failed to load recipe details.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCooking = async () => {
    if (!recipe) return;
    
    setStarting(true);
    try {
      const session = await cookingService.startSession(recipeId, userId, demoSessionId);
      startSession(session.session_id, recipeId);
      navigation.navigate('LiveCooking', { recipeId });
    } catch (error) {
      console.error('Failed to start cooking:', error);
      alert('Failed to start cooking session.');
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <View style={styles.meta}>
        <Text style={styles.metaText}>Difficulty: {recipe.difficulty}</Text>
        <Text style={styles.metaText}>Time: {recipe.estimated_time_min} min</Text>
      </View>

      <Text style={styles.sectionTitle}>Steps:</Text>
      {recipe.steps.map((step) => (
        <View key={step.step_number} style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{step.step_number}</Text>
          </View>
          <Text style={styles.stepText}>{step.instruction}</Text>
        </View>
      ))}

      <Button 
        title="🎙️ Start Cooking" 
        onPress={handleStartCooking} 
        loading={starting}
        style={styles.startButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  meta: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  metaText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  step: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: Colors.white,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
  startButton: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxxl,
  },
});
```

- [ ] Create screens/RecipeDetailScreen.tsx
- [ ] Display recipe details
- [ ] Start cooking functionality
- [ ] Test navigation flow

---

## 🎙️ Day 3-4: Live Cooking & Voice

### Step 7.4: Create Live Cooking Screen

Create `frontend/src/screens/LiveCookingScreen.tsx`:
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Speech from 'expo-speech';
import { useCookingStore } from '../store/cookingStore';
import { cookingService } from '../services/cookingService';
import Button from '../components/Button';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/designTokens';

export default function LiveCookingScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { sessionId, currentStep, guidance, nextStep, setGuidance, endSession } = useCookingStore();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (guidance) {
      Speech.speak(guidance, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
      });
    }
  }, [guidance]);

  const handleNextStep = async () => {
    if (!sessionId) return;
    
    setLoading(true);
    try {
      const result = await cookingService.sendStepEvent(sessionId, currentStep + 1);
      setGuidance(result.guidance);
      nextStep();
      
      if (result.is_final_step) {
        setTimeout(() => {
          handleComplete();
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to get guidance:', error);
      alert('Failed to get next step guidance.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!sessionId) return;
    
    try {
      await cookingService.completeSession(sessionId);
      endSession();
      navigation.navigate('Completion');
    } catch (error) {
      console.error('Failed to complete session:', error);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.center}><Text>No camera access</Text></View>;
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
            <Button 
              title="Next Step" 
              onPress={handleNextStep} 
              loading={loading}
            />
            <Button 
              title="Complete" 
              onPress={handleComplete} 
              variant="secondary"
            />
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  stepIndicator: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginTop: 40,
  },
  guidanceBox: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  guidanceText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
  controls: {
    gap: Spacing.md,
    marginBottom: 40,
  },
});
```

- [ ] Create screens/LiveCookingScreen.tsx
- [ ] Add camera view
- [ ] Implement voice guidance (TTS)
- [ ] Add step navigation
- [ ] Test complete flow

---

## 📸 Day 5: Analyze Failed Dish

### Step 7.5: Create Analyze Screen

Create `frontend/src/screens/AnalyzeScreen.tsx`:
```typescript
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { failureService } from '../services/failureService';
import { useAuthStore } from '../store/authStore';
import Button from '../components/Button';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/designTokens';

export default function AnalyzeScreen({ navigation }: any) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { userId, demoSessionId } = useAuthStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setAnalyzing(true);
    try {
      const result = await failureService.analyzeFailure(imageUri, userId, demoSessionId);
      navigation.navigate('AnalysisResults', { result });
    } catch (error) {
      console.error('Analysis failed:', error);
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Analyze Failed Dish</Text>

      {!imageUri ? (
        <View style={styles.uploadSection}>
          <Text style={styles.instruction}>Upload a photo of your dish</Text>
          <Button title="📸 Take Photo" onPress={takePhoto} />
          <Button title="🖼️ Choose from Gallery" onPress={pickImage} variant="outline" />
        </View>
      ) : (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button 
            title="🤖 Analyze" 
            onPress={analyzeImage} 
            loading={analyzing}
          />
          <Button 
            title="Choose Different Photo" 
            onPress={pickImage} 
            variant="outline"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  header: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  uploadSection: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  instruction: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
});
```

- [ ] Create screens/AnalyzeScreen.tsx
- [ ] Add image picker
- [ ] Add camera functionality
- [ ] Upload and analyze

### Step 7.6: Create Analysis Results Screen

Create `frontend/src/screens/AnalysisResultsScreen.tsx`:
```typescript
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/designTokens';

export default function AnalysisResultsScreen({ route, navigation }: any) {
  const { result } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>✅ Analysis Complete</Text>

      <View style={styles.resultCard}>
        <Text style={styles.label}>🔴 ROOT CAUSE</Text>
        <Text style={styles.rootCause}>{result.root_cause}</Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.label}>📝 WHAT HAPPENED</Text>
        <Text style={styles.value}>{result.explanation}</Text>
      </View>

      <View style={styles.resultCard}>
        <Text style={styles.label}>✅ HOW TO FIX</Text>
        {result.suggestions.map((suggestion: string, index: number) => (
          <Text key={index} style={styles.suggestion}>
            {index + 1}. {suggestion}
          </Text>
        ))}
      </View>

      <Button 
        title="Analyze Another Dish" 
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  header: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  resultCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  label: {
    ...Typography.small,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  rootCause: {
    ...Typography.h3,
    color: Colors.error,
  },
  value: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
  suggestion: {
    ...Typography.body,
    color: Colors.text,
    marginTop: Spacing.sm,
    lineHeight: 24,
  },
  button: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxxl,
  },
});
```

- [ ] Create screens/AnalysisResultsScreen.tsx
- [ ] Display AI analysis
- [ ] Show suggestions
- [ ] Test complete flow

---

## ✅ PHASE 7 COMPLETION CHECKLIST

Before moving to Phase 8, ensure:
- [ ] All screens implemented
- [ ] Navigation working between screens
- [ ] API integration complete
- [ ] Camera functionality working
- [ ] Voice guidance (TTS) working
- [ ] Image upload working
- [ ] AI responses displaying correctly
- [ ] Can complete full cooking flow
- [ ] Can complete failure analysis flow
- [ ] No critical bugs

**Test Complete User Flows:**
1. Demo Mode Flow:
   - [ ] Open app → Try Demo Mode → Recipe List → Recipe Detail → Start Cooking → Complete
2. Analyze Flow:
   - [ ] Analyze Tab → Upload Image → Get Analysis → View Results

**Deliverables:**
- ✅ Complete working mobile app
- ✅ All screens functional
- ✅ Backend integration working
- ✅ Voice and camera features working

**Estimated Time:** 4-5 days  
**Next Phase:** Phase 8 - Testing & Bug Fixes

---

# PHASE 8: TESTING & BUG FIXES

**Duration:** 3-4 days  
**Responsible:** Developer 4 (Testing lead) + All team  
**Goal:** Comprehensive testing, bug fixes, optimization, quality assurance

---

## 🧪 Day 1: Backend Testing

### Step 8.1: Unit Tests

Create `backend/tests/test_models.py`:
```python
import pytest
from app.models import User, Recipe, RecipeStep, DemoSession


def test_user_creation():
    """Test user model creation"""
    user = User(
        email="test@example.com",
        name="Test User",
        role="user"
    )
    assert user.email == "test@example.com"
    assert user.name == "Test User"
    assert user.role == "user"


def test_recipe_with_steps():
    """Test recipe with steps relationship"""
    recipe = Recipe(
        name="Test Recipe",
        difficulty="easy",
        estimated_time_min=10
    )
    
    step1 = RecipeStep(
        recipe=recipe,
        step_number=1,
        instruction="Step 1 instruction"
    )
    
    assert len(recipe.steps) == 1
    assert recipe.steps[0].instruction == "Step 1 instruction"


def test_demo_session_expiry():
    """Test demo session has 24-hour expiry"""
    from datetime import datetime, timedelta
    
    demo = DemoSession()
    expected_expiry = demo.created_at + timedelta(hours=24)
    
    # Allow 1 second tolerance
    assert abs((demo.expires_at - expected_expiry).total_seconds()) < 1
```

- [ ] Create tests/test_models.py
- [ ] Add model tests
- [ ] Run: `pytest tests/test_models.py -v`

Create `backend/tests/test_auth.py`:
```python
import pytest
from httpx import AsyncClient
from app.main import app


@pytest.mark.asyncio
async def test_health_check():
    """Test health check endpoint"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"


@pytest.mark.asyncio
async def test_demo_session_creation():
    """Test demo session creation"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/api/v1/demo/start")
        assert response.status_code == 200
        data = response.json()
        assert "demo_session_id" in data
        assert "expires_at" in data
```

- [ ] Create tests/test_auth.py
- [ ] Add API endpoint tests
- [ ] Run: `pytest tests/test_auth.py -v`

### Run All Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app --cov-report=html
```

- [ ] Run complete test suite
- [ ] Check coverage report (target: 70%+)
- [ ] Fix any failing tests

---

## 📱 Day 2: Frontend Testing

### Step 8.2: Component Tests

Create `frontend/src/__tests__/Button.test.tsx`:
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button title="Click Me" onPress={() => {}} />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading indicator when loading', () => {
    const { queryByText } = render(
      <Button title="Click Me" onPress={() => {}} loading={true} />
    );
    
    expect(queryByText('Click Me')).toBeNull();
  });

  it('is disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={onPressMock} disabled={true} />
    );
    
    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
```

- [ ] Create __tests__/Button.test.tsx
- [ ] Add component tests
- [ ] Run: `npm test`

### Run Frontend Tests
```bash
cd frontend
npm test -- --coverage
```

- [ ] Run test suite
- [ ] Check coverage
- [ ] Fix failing tests

---

## 🔄 Day 3: Integration & E2E Testing

### Step 8.3: Manual Testing Checklist

**Cook a Dish Flow:**
- [ ] Open app
- [ ] Tap "Try Demo Mode"
- [ ] Demo session created successfully
- [ ] Navigate to "Cook a Dish" tab
- [ ] Recipe list displays 5 recipes
- [ ] Each recipe card shows: name, difficulty, time
- [ ] Tap "Scrambled Eggs" recipe
- [ ] Recipe detail screen shows:
  - [ ] Recipe name
  - [ ] Difficulty and time
  - [ ] Ingredients list
  - [ ] Steps (numbered 1-5)
  - [ ] "Start Cooking" button
- [ ] Tap "Start Cooking"
- [ ] Camera permission requested
- [ ] Grant camera permission
- [ ] Live cooking screen shows:
  - [ ] Camera preview
  - [ ] Step indicator "Step 1"
  - [ ] AI guidance text
  - [ ] Voice speaks guidance
- [ ] Tap "Next Step"
- [ ] Step advances to "Step 2"
- [ ] New AI guidance received
- [ ] Voice speaks new guidance
- [ ] Repeat for all 5 steps
- [ ] Tap "Complete" on last step
- [ ] Session marked complete
- [ ] Navigate back to recipe list

**Analyze Failed Dish Flow:**
- [ ] Navigate to "Analyze" tab
- [ ] Upload screen shows
- [ ] Tap "Choose from Gallery"
- [ ] Photo picker opens
- [ ] Select image of failed dish
- [ ] Image preview shows
- [ ] Tap "Analyze"
- [ ] Loading screen shows with progress
- [ ] Analysis completes (5-10 seconds)
- [ ] Results screen shows:
  - [ ] Root cause
  - [ ] Explanation (2-3 sentences)
  - [ ] 3 fix suggestions
- [ ] All text is readable and helpful
- [ ] Tap "Analyze Another Dish"
- [ ] Returns to upload screen

**Error Scenarios:**
- [ ] Turn off WiFi → App shows network error
- [ ] Deny camera permission → App shows permission message
- [ ] Upload invalid file type → Shows error
- [ ] Backend offline → Graceful error handling

---

### Step 8.4: Performance Testing

**Test on Real Devices:**
- [ ] Test on Android phone (low-end)
- [ ] Test on Android phone (high-end)
- [ ] Test on iPhone (if available)
- [ ] Test on tablet

**Performance Metrics:**
- [ ] App launches in < 3 seconds
- [ ] Recipe list loads in < 2 seconds
- [ ] AI guidance returns in < 5 seconds
- [ ] Image upload completes in < 10 seconds
- [ ] AI analysis completes in < 15 seconds
- [ ] No UI freezing during operations
- [ ] Smooth scrolling in recipe list
- [ ] Camera preview is smooth (30fps)

---

## 🐛 Day 4: Bug Fixes & Optimization

### Step 8.5: Bug Tracking & Fixes

**Create Bug List:**
- [ ] Document all bugs found
- [ ] Prioritize: Critical → High → Medium → Low
- [ ] Assign to team members

**Critical Bugs (Must Fix):**
- [ ] App crashes
- [ ] Cannot complete cooking flow
- [ ] Cannot upload images
- [ ] AI responses not working
- [ ] Authentication failures

**High Priority (Should Fix):**
- [ ] UI misalignment
- [ ] Missing error messages
- [ ] Voice not playing
- [ ] Camera not working
- [ ] Incorrect navigation

**Medium Priority (Nice to Fix):**
- [ ] Slow loading times
- [ ] Minor UI inconsistencies
- [ ] Spelling errors
- [ ] Missing loading states

**Fix All Critical & High Priority Bugs**

---

### Step 8.6: Code Quality

**Backend Code Review:**
```bash
cd backend
black app/ tests/
ruff check app/ tests/
```

- [ ] Format code with Black
- [ ] Check with Ruff linter
- [ ] Fix any linting errors
- [ ] Remove commented code
- [ ] Add docstrings to functions

**Frontend Code Review:**
```bash
cd frontend
npm run lint
npm run format
```

- [ ] Run ESLint
- [ ] Format with Prettier
- [ ] Fix warnings
- [ ] Remove console.logs (production)
- [ ] Add TypeScript types where missing

---

### Step 8.7: Optimization

**Backend Optimizations:**
- [ ] Add database indexes (already in models)
- [ ] Enable Redis caching (already implemented)
- [ ] Optimize AI prompts (shorter, clearer)
- [ ] Add connection pooling (already configured)
- [ ] Remove unused dependencies

**Frontend Optimizations:**
- [ ] Optimize images (compress large assets)
- [ ] Remove unused imports
- [ ] Lazy load screens if needed
- [ ] Reduce bundle size
- [ ] Test app performance

**Database Optimizations:**
```sql
-- Add indexes (if not already added)
CREATE INDEX IF NOT EXISTS idx_cooking_sessions_user ON cooking_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_cooking_sessions_demo ON cooking_sessions(demo_session_id);
CREATE INDEX IF NOT EXISTS idx_recipe_steps_recipe ON recipe_steps(recipe_id);
```

- [ ] Verify indexes exist
- [ ] Run VACUUM on PostgreSQL
- [ ] Check query performance

---

## ✅ PHASE 8 COMPLETION CHECKLIST

Before moving to Phase 9, ensure:
- [ ] All backend unit tests passing (70%+ coverage)
- [ ] All frontend component tests passing
- [ ] Manual testing checklist 100% complete
- [ ] Both user flows work end-to-end
- [ ] No critical bugs remaining
- [ ] All high-priority bugs fixed
- [ ] Code formatted and linted
- [ ] Performance acceptable on test devices
- [ ] App feels polished and professional

**Quality Gates:**
- [ ] Backend tests: ✅ Pass
- [ ] Frontend tests: ✅ Pass
- [ ] Manual testing: ✅ Pass
- [ ] Performance: ✅ Acceptable
- [ ] No crashes: ✅ Verified
- [ ] Code quality: ✅ Good

**Test Metrics:**
```
Backend Test Coverage: ___% (target: 70%+)
Frontend Test Coverage: ___% (target: 60%+)
Critical Bugs: ___ (target: 0)
High Priority Bugs: ___ (target: 0)
Performance Score: ___/10 (target: 7+)
```

**Deliverables:**
- ✅ Fully tested application
- ✅ All critical bugs fixed
- ✅ Optimized performance
- ✅ Clean, quality code
- ✅ Test coverage reports
- ✅ Bug fix documentation

**Estimated Time:** 3-4 days  
**Next Phase:** Phase 9 - Deployment & Launch

---

# PHASE 9: DEPLOYMENT & LAUNCH

**Duration:** 2-3 days  
**Responsible:** Developer 4 (DevOps) + All team  
**Goal:** Deploy backend to production, build mobile apps, launch MVP

---

## 🚀 Day 1: Backend Deployment

### Step 9.1: Prepare for Production

**Update Environment Variables:**

Edit `backend/.env.production`:
```env
# Production Database (Railway will provide)
DATABASE_URL=postgresql+asyncpg://user:pass@host:port/db
REDIS_URL=redis://host:port/db

# Strong Production Secrets
JWT_SECRET=<generate-new-256-bit-secret>
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15

# Production API Keys
GOOGLE_CLIENT_ID=<production-client-id>
GOOGLE_CLIENT_SECRET=<production-client-secret>
GEMINI_API_KEY=<production-api-key>
GROQ_API_KEY=<production-api-key>
CLOUDINARY_CLOUD_NAME=<production-cloud>
CLOUDINARY_API_KEY=<production-key>
CLOUDINARY_API_SECRET=<production-secret>

# Environment
ENVIRONMENT=production
DEBUG=false

# Optional
SENTRY_DSN=<your-sentry-dsn>
POSTHOG_API_KEY=<your-posthog-key>
```

- [ ] Generate new JWT_SECRET: `openssl rand -base64 32`
- [ ] Use production API keys (not dev keys)
- [ ] Set DEBUG=false
- [ ] Never commit .env.production to Git!

**Create Dockerfile:**

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Run migrations and start server
CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

- [ ] Create Dockerfile
- [ ] Test locally: `docker build -t chefmentor-backend .`

---

### Step 9.2: Deploy to Railway

**Setup Railway Project:**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Link to project
railway link
```

- [ ] Install Railway CLI
- [ ] Create Railway account
- [ ] Initialize project
- [ ] Link local repo

**Add PostgreSQL Database:**
- [ ] Go to Railway dashboard
- [ ] Click "New" → "Database" → "PostgreSQL"
- [ ] Database automatically linked
- [ ] DATABASE_URL environment variable set automatically

**Add Redis:**
- [ ] Click "New" → "Database" → "Redis"
- [ ] Redis automatically linked
- [ ] REDIS_URL environment variable set automatically

**Add Environment Variables:**
- [ ] Go to Variables tab in Railway
- [ ] Add all production environment variables:
  - [ ] JWT_SECRET
  - [ ] GOOGLE_CLIENT_ID
  - [ ] GOOGLE_CLIENT_SECRET
  - [ ] GEMINI_API_KEY
  - [ ] GROQ_API_KEY
  - [ ] CLOUDINARY_CLOUD_NAME
  - [ ] CLOUDINARY_API_KEY
  - [ ] CLOUDINARY_API_SECRET
  - [ ] ENVIRONMENT=production
  - [ ] DEBUG=false

**Deploy:**
```bash
railway up
```

- [ ] Run deployment command
- [ ] Wait for build (5-10 minutes)
- [ ] Check logs: `railway logs`
- [ ] Verify deployment successful

**Get Production URL:**
- [ ] Go to Settings → Domains
- [ ] Generate domain or add custom domain
- [ ] Note URL: `https://your-app.railway.app`

---

### Step 9.3: Verify Backend Deployment

**Test Production API:**
```bash
# Test health check
curl https://your-app.railway.app/health

# Test demo creation
curl -X POST https://your-app.railway.app/api/v1/demo/start

# Test recipes
curl https://your-app.railway.app/api/v1/recipes
```

- [ ] Health check returns 200
- [ ] Demo creation works
- [ ] Recipes endpoint returns 5 recipes
- [ ] API docs accessible: https://your-app.railway.app/docs

**Run Database Migrations:**
```bash
railway run alembic upgrade head
```

- [ ] Migrations run successfully
- [ ] All tables created

**Seed Production Database:**
```bash
railway run python -m app.db.seed
```

- [ ] 5 recipes seeded
- [ ] Verify in Railway database viewer

---

## 📱 Day 2: Mobile App Deployment

### Step 9.4: Prepare Frontend for Production

**Update API URL:**

Edit `frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = __DEV__
  ? 'http://localhost:8000/api/v1'
  : 'https://your-app.railway.app/api/v1';  // Update with your Railway URL
```

- [ ] Replace with actual production URL
- [ ] Test in development mode first

**Update app.config.js:**

Edit `frontend/app.config.js`:
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
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/your-project-id"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.chefmentor.x",
      buildNumber: "1.0.0"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.chefmentor.x",
      versionCode: 1,
      permissions: [
        "CAMERA",
        "RECORD_AUDIO",
        "READ_EXTERNAL_STORAGE"
      ]
    },
    extra: {
      eas: {
        projectId: "your-project-id-here"
      }
    }
  }
};
```

- [ ] Update version number
- [ ] Verify bundle identifiers
- [ ] Check permissions

---

### Step 9.5: Build with EAS

**Initialize EAS:**
```bash
cd frontend
npm install -g eas-cli
eas login
eas build:configure
```

- [ ] Install EAS CLI
- [ ] Login to Expo account
- [ ] Configure build

**Configure Build Profiles:**

Edit `frontend/eas.json`:
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

- [ ] Create/update eas.json
- [ ] Configure build profiles

**Build for Android (Preview):**
```bash
eas build --platform android --profile preview
```

- [ ] Start build (takes 10-20 minutes)
- [ ] Wait for completion
- [ ] Download APK when ready
- [ ] Install on Android device
- [ ] Test complete app

**Build for Android (Production):**
```bash
eas build --platform android --profile production
```

- [ ] Build App Bundle (AAB) for Play Store
- [ ] Wait for completion
- [ ] Download AAB file

**Build for iOS (if Mac available):**
```bash
# Requires Apple Developer account ($99/year)
eas build --platform ios --profile production
```

- [ ] Build IPA for App Store
- [ ] Requires Apple Developer membership
- [ ] Download IPA when ready

---

### Step 9.6: Test Production Build

**Test APK on Real Device:**
- [ ] Install APK on Android phone
- [ ] Open app
- [ ] Test demo mode
- [ ] Complete cooking flow
- [ ] Test failure analysis
- [ ] Verify camera works
- [ ] Verify voice works
- [ ] Test all features
- [ ] No crashes
- [ ] Performance good

**Critical Checks:**
- [ ] App connects to production backend
- [ ] API calls successful
- [ ] AI guidance working
- [ ] Image upload working
- [ ] All features functional
- [ ] No development artifacts visible
- [ ] App feels polished

---

## 🎉 Day 3: Launch & Documentation

### Step 9.7: Create App Store Listings

**Google Play Store (Android):**

Prepare assets:
- [ ] App Icon: 512x512 PNG
- [ ] Feature Graphic: 1024x500 PNG
- [ ] Screenshots: At least 2 (phone), 7-inch and 10-inch (tablet)
- [ ] Privacy Policy URL
- [ ] App description (short and full)

**App Description:**
```
Short Description (80 chars):
AI-powered cooking mentor with live voice guidance and failure analysis

Full Description:
ChefMentor X is your personal AI cooking coach that helps you cook with confidence.

🎙️ LIVE VOICE GUIDANCE
Get step-by-step instructions spoken aloud while you cook. No need to touch your phone with messy hands!

🔍 FAILURE ANALYSIS
Upload a photo of your failed dish and get AI-powered diagnosis with actionable fixes.

✨ FEATURES:
• Voice-guided cooking for 5 starter recipes
• Real-time AI assistance
• Camera-based progress tracking
• Personalized cooking tips
• Beginner-friendly approach
• Free demo mode - no signup required

Perfect for beginners who want to learn cooking with an intelligent, patient mentor by their side.
```

- [ ] Write descriptions
- [ ] Take screenshots
- [ ] Prepare graphics

**App Store Categories:**
- Primary: Food & Drink
- Secondary: Education

---

### Step 9.8: Submit to Stores

**Google Play Store Submission:**
- [ ] Go to https://play.google.com/console
- [ ] Create new app
- [ ] Fill app details
- [ ] Upload AAB file
- [ ] Add screenshots
- [ ] Set pricing (Free)
- [ ] Fill content rating questionnaire
- [ ] Add privacy policy
- [ ] Submit for review
- [ ] Wait 1-3 days for approval

**iOS App Store (if applicable):**
- [ ] Go to https://appstoreconnect.apple.com
- [ ] Create new app
- [ ] Upload IPA via Transporter
- [ ] Fill app information
- [ ] Add screenshots
- [ ] Submit for review
- [ ] Wait 1-7 days for approval

---

### Step 9.9: Create Documentation

**Create README.md:**
```markdown
# ChefMentor X

AI-powered cooking mentor with live voice guidance and failure analysis.

## Features
- 🎙️ Live voice-guided cooking
- 🤖 AI-powered assistance
- 📸 Failure analysis from images
- 👨‍🍳 Beginner-friendly approach

## Tech Stack
- Frontend: React Native + Expo
- Backend: FastAPI (Python)
- Database: PostgreSQL + Redis
- AI: Google Gemini + Groq

## Getting Started
[Installation instructions]

## Demo
Try it: [App Store Link] | [Play Store Link]

## Team
Built by [Your Team Name]
```

- [ ] Create README.md
- [ ] Add project description
- [ ] Add setup instructions
- [ ] Add team info

**Create User Guide:**
- [ ] Create `docs/USER_GUIDE.md`
- [ ] Explain how to use app
- [ ] Add screenshots
- [ ] FAQ section

**Create API Documentation:**
- [ ] Backend API docs at /docs (already done)
- [ ] Create `docs/API.md` with examples
- [ ] Document all endpoints

---

### Step 9.10: Post-Launch Monitoring

**Setup Monitoring:**
- [ ] Check Sentry for errors (if configured)
- [ ] Monitor Railway logs
- [ ] Check PostHog analytics (if configured)
- [ ] Monitor API usage

**Create Monitoring Dashboard:**
Track:
- [ ] Daily Active Users (DAU)
- [ ] Cooking sessions completed
- [ ] Failure analyses performed
- [ ] API error rate
- [ ] Average response time
- [ ] Crash rate

**First Week Goals:**
- [ ] 50+ demo sessions
- [ ] 30+ completed cooking sessions
- [ ] 20+ failure analyses
- [ ] < 1% crash rate
- [ ] Average 4+ star rating

---

## 🎊 Launch Day Checklist

**Final Pre-Launch:**
- [ ] Backend deployed and stable
- [ ] Database seeded with recipes
- [ ] Mobile app built (APK/AAB)
- [ ] All features tested
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Documentation complete

**Launch:**
- [ ] Submit to Google Play Store
- [ ] Submit to iOS App Store (if applicable)
- [ ] Share with team
- [ ] Test live production build
- [ ] Monitor for issues

**Post-Launch (First 24 hours):**
- [ ] Monitor error logs
- [ ] Check API performance
- [ ] Respond to any issues immediately
- [ ] Monitor user feedback
- [ ] Fix critical bugs ASAP

---

## ✅ PHASE 9 COMPLETION CHECKLIST

Project is COMPLETE when:
- [ ] Backend deployed to Railway
- [ ] Backend accessible via public URL
- [ ] Database migrations run
- [ ] Production data seeded
- [ ] Mobile app built (APK/AAB)
- [ ] App tested on real devices
- [ ] App submitted to stores
- [ ] Documentation complete
- [ ] Monitoring setup
- [ ] Team can demo app

**Final Deliverables:**
- ✅ Live backend API
- ✅ Production database
- ✅ Mobile app (Android APK/AAB)
- ✅ Mobile app (iOS IPA) - optional
- ✅ App store listings
- ✅ Complete documentation
- ✅ Monitoring dashboard
- ✅ Public demo available

**Production URLs:**
```
Backend API: https://your-app.railway.app
API Docs: https://your-app.railway.app/docs
Android App: [Play Store Link]
iOS App: [App Store Link]
```

---

## 🎯 PROJECT SUCCESS METRICS

**Technical Metrics:**
- [ ] Backend uptime: 99%+
- [ ] API response time: < 2s average
- [ ] AI response time: < 10s average
- [ ] App crash rate: < 1%
- [ ] Test coverage: 70%+ backend, 60%+ frontend

**User Metrics:**
- [ ] 50+ demo sessions in first week
- [ ] 70%+ complete cooking flow
- [ ] 4+ star average rating
- [ ] Positive user feedback

**Business Metrics:**
- [ ] MVP completed on time
- [ ] Within budget
- [ ] Team satisfied
- [ ] Ready for next phase

---

## 🚀 NEXT STEPS (Post-MVP)

**Immediate (Week 1-2):**
- [ ] Monitor user feedback
- [ ] Fix critical bugs
- [ ] Collect user testimonials
- [ ] Plan v1.1 features

**Short-term (Month 1-2):**
- [ ] Add more recipes (10+ total)
- [ ] Improve AI prompts
- [ ] Add user profiles
- [ ] Implement cooking history
- [ ] Add recipe favorites

**Long-term (Month 3-6):**
- [ ] AR visual overlays
- [ ] Community features
- [ ] Advanced voice commands
- [ ] Multi-language support
- [ ] Premium features

---

## 🎉 CONGRATULATIONS!

**You've successfully completed ChefMentor X MVP!**

Total Timeline: 4 weeks
Phases Completed: 10
Features Delivered: 100%

**What you built:**
✅ AI-powered cooking mentor
✅ Live voice guidance
✅ Failure analysis with vision AI
✅ Cross-platform mobile app
✅ Production-ready backend
✅ Complete documentation

**Team Achievement:**
🏆 Hackathon-ready demo
🏆 Startup-ready foundation
🏆 Scalable architecture
🏆 Real-world AI integration

**Time to celebrate! 🎊👨‍🍳🚀**

---

