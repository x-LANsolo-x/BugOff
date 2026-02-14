# ChefMentor X - Complete Testing Environment Setup Script
# Run this script to set up everything for visual testing

Write-Host "🚀 ChefMentor X - Testing Environment Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command($command) {
    try {
        if (Get-Command $command -ErrorAction Stop) {
            return $true
        }
    }
    catch {
        return $false
    }
}

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

$allGood = $true

if (-not (Test-Command "python")) {
    Write-Host "❌ Python not found. Please install Python 3.9+" -ForegroundColor Red
    $allGood = $false
} else {
    $pythonVersion = python --version
    Write-Host "✅ $pythonVersion found" -ForegroundColor Green
}

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js not found. Please install Node.js 16+" -ForegroundColor Red
    $allGood = $false
} else {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ npm not found. Please install npm" -ForegroundColor Red
    $allGood = $false
} else {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion found" -ForegroundColor Green
}

if (-not $allGood) {
    Write-Host ""
    Write-Host "❌ Missing prerequisites. Please install required software first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🔧 Setting up Backend..." -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan

# Backend setup
cd backend

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt --quiet

# Check .env file
if (-not (Test-Path ".env.development")) {
    Write-Host "⚠️  Creating .env.development file..." -ForegroundColor Yellow
    Copy-Item .env.example .env.development
    Write-Host "⚠️  IMPORTANT: Edit backend/.env.development with your API keys!" -ForegroundColor Red
    Write-Host "   Required keys: GROQ_API_KEY, GEMINI_API_KEY, RECIPE_DB_API_KEY" -ForegroundColor Red
}

# Database setup
Write-Host "Setting up database..." -ForegroundColor Yellow
if (-not (Test-Path "chefmentorx.db")) {
    alembic upgrade head
    Write-Host "✅ Database initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Database already exists" -ForegroundColor Green
}

# Seed data
Write-Host "Seeding test data..." -ForegroundColor Yellow
python seed_recipes.py

Write-Host "✅ Backend setup complete!" -ForegroundColor Green

cd ..

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🎨 Setting up Frontend..." -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan

cd frontend-v1

# Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies (this may take a few minutes)..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
}

cd ..

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Create test result file
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$testResultFile = "test_results_$timestamp.md"

Write-Host "📝 Created test results template: $testResultFile" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend/.env.development with your API keys" -ForegroundColor White
Write-Host "2. Open TWO terminal windows:" -ForegroundColor White
Write-Host ""
Write-Host "   Terminal 1 - Backend:" -ForegroundColor Cyan
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000" -ForegroundColor White
Write-Host ""
Write-Host "   Terminal 2 - Frontend:" -ForegroundColor Cyan
Write-Host "   cd frontend-v1" -ForegroundColor White
Write-Host "   npx expo start" -ForegroundColor White
Write-Host ""
Write-Host "3. Follow the VISUAL_TESTING_GUIDE.md for testing procedures" -ForegroundColor White
Write-Host ""
Write-Host "📖 Quick Links:" -ForegroundColor Yellow
Write-Host "   - Backend API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "   - Testing Guide: VISUAL_TESTING_GUIDE.md" -ForegroundColor White
Write-Host "   - Test Results: $testResultFile" -ForegroundColor White
Write-Host ""
Write-Host "Happy Testing! 🎉" -ForegroundColor Green
