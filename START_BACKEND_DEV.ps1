# ChefMentor X - Start Backend for Development (Mobile Testing)
# PowerShell script for Windows users

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ChefMentor X - Starting Backend for Mobile Testing   ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Navigate to backend directory
Set-Location backend

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "⚠️  No .env file found!" -ForegroundColor Yellow
    Write-Host "📝 Copying .env.example to .env..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host ""
    Write-Host "⚡ ACTION REQUIRED:" -ForegroundColor Red
    Write-Host "   Edit backend\.env and fill in your API keys"
    Write-Host "   Then run this script again."
    Write-Host ""
    exit 1
}

# Check if virtual environment exists
if (-not (Test-Path venv)) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Cyan
    python -m venv venv
    Write-Host ""
}

# Activate virtual environment
Write-Host "🔧 Activating virtual environment..." -ForegroundColor Cyan
& venv\Scripts\Activate.ps1

# Install dependencies if needed
if (-not (Test-Path venv\installed.flag)) {
    Write-Host "📥 Installing dependencies..." -ForegroundColor Cyan
    pip install -r requirements.txt
    New-Item -Path venv\installed.flag -ItemType File
    Write-Host ""
}

# Get local IP address
$LOCAL_IP = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*" -ErrorAction SilentlyContinue).IPAddress
if (-not $LOCAL_IP) {
    $LOCAL_IP = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Ethernet*" -ErrorAction SilentlyContinue).IPAddress
}
if (-not $LOCAL_IP) {
    $LOCAL_IP = "localhost"
}

Write-Host "🌐 Local IP Address: $LOCAL_IP" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Mobile devices should connect to: http://$LOCAL_IP:8000" -ForegroundColor Cyan
Write-Host "🖥️  Web/Simulator can use: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔓 CORS is configured for development (permissive mode)" -ForegroundColor Yellow
Write-Host "✅ Accepting connections from local network (192.168.x.x, 10.0.x.x)" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Starting server..." -ForegroundColor White
Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Check if port 8000 is already in use
$PortInUse = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
if ($PortInUse) {
    Write-Host "⚠️  Port 8000 is already in use!" -ForegroundColor Red
    Write-Host "   Kill the process or use a different port" -ForegroundColor Yellow
    exit 1
}

# Start the server with network binding
# IMPORTANT: --host 0.0.0.0 allows connections from other devices
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
