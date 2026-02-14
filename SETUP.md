# ChefMentor X - Complete Setup Guide

> **Complete installation guide for setting up ChefMentor X on any system (Windows, macOS, Linux)**

This guide will help you set up the entire ChefMentor X project from scratch, whether you're cloning from GitHub or starting fresh.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start (5 Minutes)](#quick-start-5-minutes)
- [Detailed Setup Instructions](#detailed-setup-instructions)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Environment Configuration](#4-environment-configuration)
  - [5. Database Setup](#5-database-setup)
  - [6. Verification](#6-verification)
- [Platform-Specific Instructions](#platform-specific-instructions)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

| Software | Version | Download Link | Verification Command |
|----------|---------|---------------|---------------------|
| **Python** | 3.10.x - 3.11.x | [python.org](https://www.python.org/downloads/) | `python --version` |
| **Node.js** | v18+ (v20+ recommended) | [nodejs.org](https://nodejs.org/) | `node --version` |
| **npm** | v9+ (comes with Node.js) | Included with Node.js | `npm --version` |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) | `git --version` |
| **PostgreSQL** | v14+ | [postgresql.org](https://www.postgresql.org/download/) | `psql --version` |
| **Redis** | v6+ | [redis.io](https://redis.io/download/) | `redis-server --version` |

### Optional but Recommended

- **Docker** & **Docker Compose** (for containerized database setup)
- **VS Code** or **PyCharm** (recommended IDEs)
- **Postman** or **Thunder Client** (for API testing)

---

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/chefmentor-x.git
cd chefmentor-x

# 2. Backend setup
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

# 3. Frontend setup
cd ../frontend
npm install

# 4. Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys

# 5. Verify installation
cd ..
python backend/venv/Scripts/python.exe --version  # Windows
python backend/venv/bin/python --version          # macOS/Linux
node --version
```

---

## 🔧 Detailed Setup Instructions

### 1. Clone Repository

#### Option A: Clone from GitHub

```bash
# HTTPS
git clone https://github.com/YOUR_USERNAME/chefmentor-x.git
cd chefmentor-x

# SSH (if you have SSH keys configured)
git clone git@github.com:YOUR_USERNAME/chefmentor-x.git
cd chefmentor-x
```

#### Option B: Download ZIP

1. Go to the GitHub repository
2. Click "Code" → "Download ZIP"
3. Extract to your desired location
4. Open terminal/command prompt in the extracted folder

---

### 2. Backend Setup

#### Step 2.1: Create Virtual Environment

**Windows:**
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

**Verification:** Your terminal should show `(venv)` prefix.

#### Step 2.2: Install Python Dependencies

```bash
# Make sure virtual environment is activated
pip install --upgrade pip
pip install -r requirements.txt
```

**Expected Output:** Installation of ~50 packages including:
- FastAPI, Uvicorn, SQLAlchemy
- Google Generative AI (Gemini)
- Groq (Whisper STT)
- Cloudinary, Redis, Alembic
- Pytest and testing tools

#### Step 2.3: Verify Backend Installation

```bash
# Windows
python -c "import fastapi; import sqlalchemy; import uvicorn; print('✅ Backend dependencies installed successfully')"

# macOS/Linux
python3 -c "import fastapi; import sqlalchemy; import uvicorn; print('✅ Backend dependencies installed successfully')"
```

---

### 3. Frontend Setup

#### Step 3.1: Navigate to Frontend Directory

```bash
cd ../frontend  # If coming from backend directory
# OR
cd frontend     # If at project root
```

#### Step 3.2: Install Node Dependencies

```bash
# Install all dependencies
npm install

# If you encounter peer dependency warnings (React 19 vs 18 conflicts)
npm install --legacy-peer-deps
```

**Expected Output:** Installation of ~535 packages including:
- Expo SDK
- React Navigation
- Zustand (state management)
- Expo Camera, Speech, Image Picker
- TailwindCSS, Jest, TypeScript

#### Step 3.3: Create .npmrc (if needed)

If you encounter persistent peer dependency errors:

```bash
# Windows
echo legacy-peer-deps=true > .npmrc

# macOS/Linux
echo "legacy-peer-deps=true" > .npmrc
```

#### Step 3.4: Verify Frontend Installation

```bash
npm list --depth=0 2>/dev/null | grep -E "expo|zustand|navigation"

# Or simply check if key packages exist
ls node_modules/@react-navigation
ls node_modules/zustand
ls node_modules/expo-camera
```

---

### 4. Environment Configuration

#### Step 4.1: Create .env File

```bash
cd ../backend  # Navigate to backend directory

# Copy example file (if it exists)
cp .env.example .env

# Or create new .env file
touch .env  # macOS/Linux
type nul > .env  # Windows
```

#### Step 4.2: Configure Environment Variables

Open `backend/.env` in your text editor and add:

```env
# Database
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/chefmentor_dev
REDIS_URL=redis://localhost:6379/0

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# File Storage - Cloudinary
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

#### Step 4.3: Obtain API Keys

You'll need to obtain the following API keys:

##### **Gemini API Key** (Required - AI Cooking Guidance)
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with Google account
3. Click "Get API Key"
4. Copy and paste into `GEMINI_API_KEY`

##### **Groq API Key** (Required - Voice Recognition)
1. Go to [Groq Console](https://console.groq.com/)
2. Create account or sign in
3. Navigate to API Keys
4. Create new key
5. Copy and paste into `GROQ_API_KEY`

##### **Cloudinary** (Required - Image Storage)
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard
4. Copy Cloud Name, API Key, API Secret
5. Paste into respective fields

##### **Google OAuth** (Required - Authentication)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "Google+ API"
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure consent screen
6. Add authorized redirect URIs:
   - `http://localhost:8000/auth/google/callback`
   - `exp://localhost:19000` (for Expo)
7. Copy Client ID and Client Secret

##### **JWT Secret** (Required - Generate Secure Key)

```bash
# Generate a secure random key
python -c "import secrets; print(secrets.token_hex(32))"
```

---

### 5. Database Setup

You have two options: Local installation or Cloud services.

#### Option A: Local Installation

##### **PostgreSQL Setup**

**Windows:**
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run installer (remember the password you set!)
3. Open pgAdmin or psql
4. Create database:
```sql
CREATE DATABASE chefmentor_dev;
```

**macOS (with Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
psql postgres
CREATE DATABASE chefmentor_dev;
\q
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql
CREATE DATABASE chefmentor_dev;
\q
```

##### **Redis Setup**

**Windows:**
1. Download from [Memurai](https://www.memurai.com/) (Redis for Windows)
2. Install and start service

**macOS (with Homebrew):**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
```

#### Option B: Cloud Services (Recommended for Easy Setup)

##### **PostgreSQL (Railway - Free Tier)**
1. Go to [railway.app](https://railway.app/)
2. Sign up with GitHub
3. New Project → Provision PostgreSQL
4. Copy connection string
5. Update `DATABASE_URL` in `.env`

##### **Redis (Upstash - Free Tier)**
1. Go to [upstash.com](https://upstash.com/)
2. Create account
3. Create Redis database
4. Copy connection string
5. Update `REDIS_URL` in `.env`

#### Option C: Docker (Cross-Platform)

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: chefmentor_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

Run databases:
```bash
docker-compose up -d
```

---

### 6. Verification

Run this comprehensive health check:

#### Backend Verification

```bash
cd backend

# Windows
venv\Scripts\python.exe --version
venv\Scripts\python.exe -c "import fastapi; import sqlalchemy; import uvicorn; print('✅ Backend OK')"

# macOS/Linux
source venv/bin/activate
python --version
python -c "import fastapi; import sqlalchemy; import uvicorn; print('✅ Backend OK')"
```

#### Frontend Verification

```bash
cd frontend
node --version
npm --version
npm list --depth=0 | grep expo
```

#### Database Verification

```bash
# PostgreSQL
psql -h localhost -U postgres -d chefmentor_dev -c "SELECT version();"

# Redis
redis-cli ping
# Should return: PONG
```

#### Full System Health Check

**Windows:**
```powershell
Write-Host "=== ChefMentor X Health Check ===" -ForegroundColor Cyan
Write-Host "`n[Backend]" -ForegroundColor Yellow
backend\venv\Scripts\python.exe --version
Write-Host "`n[Frontend]" -ForegroundColor Yellow
node --version
npm --version
Write-Host "`n[Git]" -ForegroundColor Yellow
git status
Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
```

**macOS/Linux:**
```bash
echo "=== ChefMentor X Health Check ==="
echo -e "\n[Backend]"
backend/venv/bin/python --version
echo -e "\n[Frontend]"
node --version
npm --version
echo -e "\n[Git]"
git status
echo -e "\n✅ Setup Complete!"
```

---

## 🖥️ Platform-Specific Instructions

### Windows-Specific Setup

#### PowerShell Execution Policy
If you get "cannot be loaded because running scripts is disabled":
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Path Issues
Add Python and Node to PATH if not accessible:
1. Search "Environment Variables" in Windows
2. Edit System Environment Variables
3. Add Python and Node.js installation directories

### macOS-Specific Setup

#### Homebrew Installation
If you don't have Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Xcode Command Line Tools
```bash
xcode-select --install
```

### Linux-Specific Setup

#### Python 3.10 on Ubuntu 20.04
```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev
```

#### Node.js via NodeSource
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: `python: command not found`
**Solution:**
- Windows: Use `py` instead of `python`
- macOS/Linux: Use `python3` instead of `python`
- Check if Python is in PATH

#### Issue: Virtual environment not activating
**Solution:**
```bash
# Recreate virtual environment
rm -rf venv  # or rmdir /s venv on Windows
python -m venv venv

# Windows
venv\Scripts\activate.bat  # CMD
venv\Scripts\Activate.ps1  # PowerShell

# macOS/Linux
source venv/bin/activate
```

#### Issue: `pip install` fails with SSL errors
**Solution:**
```bash
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org -r requirements.txt
```

#### Issue: React Native peer dependency conflicts
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
echo "legacy-peer-deps=true" > .npmrc
npm install
```

#### Issue: PostgreSQL connection refused
**Solution:**
- Check if PostgreSQL service is running
- Verify port 5432 is not in use
- Check firewall settings
- Update DATABASE_URL with correct credentials

#### Issue: Redis connection failed
**Solution:**
```bash
# Check if Redis is running
redis-cli ping

# Start Redis service
# Windows (Memurai): net start memurai
# macOS: brew services start redis
# Linux: sudo systemctl start redis-server
```

#### Issue: Port already in use
**Solution:**
```bash
# Find process using port (e.g., 8000)
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

#### Issue: Expo not starting
**Solution:**
```bash
cd frontend
# Clear cache
npx expo start -c

# Reset project
rm -rf .expo node_modules
npm install
npx expo start
```

---

## 📱 Running the Application

### Backend (API Server)

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run with uvicorn (once backend code is implemented)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Access API docs at: `http://localhost:8000/docs`

### Frontend (Mobile App)

```bash
cd frontend

# Start Expo dev server
npm start
# or
npx expo start

# Run on specific platform
npm run android  # Android
npm run ios      # iOS (macOS only)
npm run web      # Web browser
```

### Full Stack Development

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

**Terminal 3 (Databases - if using Docker):**
```bash
docker-compose up
```

---

## 📚 Next Steps

After successful setup, proceed with:

1. **Phase 1: Backend Development**
   - Create `backend/app/` folder structure
   - Implement database models
   - Set up Alembic migrations
   - Create API endpoints

2. **Phase 2: Frontend Development**
   - Set up navigation structure
   - Create screen components
   - Implement state management
   - Connect to backend API

3. **Phase 3: Testing**
   - Write unit tests
   - Integration testing
   - E2E testing with Detox

Refer to the following documentation:
- `docs/IMPLEMENTATION_PLAN.md` - Complete development roadmap
- `docs/PROJECT_TIMELINE_GANTT.md` - Timeline and milestones
- `md/chef_mentor_x_technology_stack_tech_stack.md` - Technology details
- `md/chef_mentor_x_testing_strategy.md` - Testing approach

---

## 🆘 Getting Help

### Resources
- **Documentation**: Check the `/docs` and `/md` folders
- **UI Prototypes**: See `/stitch` folder for all screens
- **Issues**: Create an issue on GitHub
- **Community**: Join our Discord/Slack (if available)

### Quick Reference

```bash
# Check installation
python --version && node --version && git --version

# Activate virtual environment
source backend/venv/bin/activate  # macOS/Linux
backend\venv\Scripts\activate     # Windows

# Install/Update dependencies
cd backend && pip install -r requirements.txt
cd frontend && npm install

# Run health check
git status
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

Built with:
- FastAPI, React Native, Expo
- Google Gemini AI, Groq Whisper
- Cloudinary, PostgreSQL, Redis

---

**Last Updated:** February 14, 2026  
**Version:** 1.0.0  
**Maintained by:** ChefMentor X Team
