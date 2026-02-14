#!/bin/bash

# ChefMentor X - Complete Testing Environment Setup Script (Linux/Mac)
# Run this script to set up everything for visual testing

echo "🚀 ChefMentor X - Testing Environment Setup"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

allGood=true

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 not found. Please install Python 3.9+${NC}"
    allGood=false
else
    pythonVersion=$(python3 --version)
    echo -e "${GREEN}✅ $pythonVersion found${NC}"
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 16+${NC}"
    allGood=false
else
    nodeVersion=$(node --version)
    echo -e "${GREEN}✅ Node.js $nodeVersion found${NC}"
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm${NC}"
    allGood=false
else
    npmVersion=$(npm --version)
    echo -e "${GREEN}✅ npm $npmVersion found${NC}"
fi

if [ "$allGood" = false ]; then
    echo ""
    echo -e "${RED}❌ Missing prerequisites. Please install required software first.${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}=========================================${NC}"
echo -e "${YELLOW}🔧 Setting up Backend...${NC}"
echo -e "${CYAN}=========================================${NC}"

# Backend setup
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${YELLOW}Activating virtual environment...${NC}"
source venv/bin/activate

# Install dependencies
echo -e "${YELLOW}Installing Python dependencies...${NC}"
pip install -r requirements.txt --quiet

# Check .env file
if [ ! -f ".env.development" ]; then
    echo -e "${YELLOW}⚠️  Creating .env.development file...${NC}"
    cp .env.example .env.development
    echo -e "${RED}⚠️  IMPORTANT: Edit backend/.env.development with your API keys!${NC}"
    echo -e "${RED}   Required keys: GROQ_API_KEY, GEMINI_API_KEY, RECIPE_DB_API_KEY${NC}"
fi

# Database setup
echo -e "${YELLOW}Setting up database...${NC}"
if [ ! -f "chefmentorx.db" ]; then
    alembic upgrade head
    echo -e "${GREEN}✅ Database initialized${NC}"
else
    echo -e "${GREEN}✅ Database already exists${NC}"
fi

# Seed data
echo -e "${YELLOW}Seeding test data...${NC}"
python seed_recipes.py

echo -e "${GREEN}✅ Backend setup complete!${NC}"

cd ..

echo ""
echo -e "${CYAN}=========================================${NC}"
echo -e "${YELLOW}🎨 Setting up Frontend...${NC}"
echo -e "${CYAN}=========================================${NC}"

cd frontend-v1

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing npm dependencies (this may take a few minutes)...${NC}"
    npm install
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

cd ..

echo ""
echo -e "${CYAN}=========================================${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${CYAN}=========================================${NC}"
echo ""

# Create test result file
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")
testResultFile="test_results_$timestamp.md"

echo -e "${CYAN}📝 Created test results template: $testResultFile${NC}"
echo ""

echo -e "${YELLOW}🚀 Next Steps:${NC}"
echo -e "${NC}1. Edit backend/.env.development with your API keys"
echo "2. Open TWO terminal windows:"
echo ""
echo -e "${CYAN}   Terminal 1 - Backend:${NC}"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo -e "${CYAN}   Terminal 2 - Frontend:${NC}"
echo "   cd frontend-v1"
echo "   npx expo start"
echo ""
echo "3. Follow the VISUAL_TESTING_GUIDE.md for testing procedures"
echo ""
echo -e "${YELLOW}📖 Quick Links:${NC}"
echo "   - Backend API Docs: http://localhost:8000/docs"
echo "   - Testing Guide: VISUAL_TESTING_GUIDE.md"
echo "   - Test Results: $testResultFile"
echo ""
echo -e "${GREEN}Happy Testing! 🎉${NC}"
