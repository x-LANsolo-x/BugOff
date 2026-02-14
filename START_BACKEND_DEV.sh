#!/bin/bash

# ChefMentor X - Start Backend for Development (Mobile Testing)
# This script starts the backend with proper network configuration

echo "╔════════════════════════════════════════════════════════╗"
echo "║  ChefMentor X - Starting Backend for Mobile Testing   ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Navigate to backend directory
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo "📝 Copying .env.example to .env..."
    cp .env.example .env
    echo ""
    echo "⚡ ACTION REQUIRED:"
    echo "   Edit backend/.env and fill in your API keys"
    echo "   Then run this script again."
    echo ""
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo ""
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/installed.flag" ]; then
    echo "📥 Installing dependencies..."
    pip install -r requirements.txt
    touch venv/installed.flag
    echo ""
fi

# Get local IP address
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ipconfig getifaddr en0)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    LOCAL_IP=$(hostname -I | awk '{print $1}')
else
    LOCAL_IP="localhost"
fi

echo "🌐 Local IP Address: $LOCAL_IP"
echo ""
echo "📱 Mobile devices should connect to: http://$LOCAL_IP:8000"
echo "🖥️  Web/Simulator can use: http://localhost:8000"
echo ""
echo "🔓 CORS is configured for development (permissive mode)"
echo "✅ Accepting connections from local network (192.168.x.x, 10.0.x.x)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Starting server..."
echo "Press Ctrl+C to stop"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the server with network binding
# IMPORTANT: --host 0.0.0.0 allows connections from other devices
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
