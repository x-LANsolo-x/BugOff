from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import api_router
from app.middleware.rate_limiter import setup_rate_limiting
import socket
import re
from typing import List

app = FastAPI(
    title="ChefMentor X API",
    version="1.0.0",
    debug=settings.DEBUG,
    description="AI-powered cooking mentor backend API"
)

# Get local IP for dev logging
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

print(f"🚀 Server running at: http://{local_ip}:8000")
print(f"🌍 Environment: {settings.ENVIRONMENT}")

# ============================================================================
# CORS Configuration - Environment-Aware
# ============================================================================

def get_cors_origins() -> List[str]:
    """
    Returns CORS origins based on environment.
    
    Development: Permissive for local network testing
    Production: Strict whitelist from environment variables
    """
    if settings.ENVIRONMENT == "production":
        # Production: Use strict whitelist from CORS_ORIGINS env var
        if settings.CORS_ORIGINS == "*":
            raise ValueError(
                "SECURITY ERROR: Wildcard CORS (*) is not allowed in production. "
                "Set CORS_ORIGINS to a comma-separated list of allowed origins."
            )
        origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]
        print(f"🔒 Production CORS: {len(origins)} origins whitelisted")
        return origins
    
    else:
        # Development: Permissive configuration for mobile testing
        origins = [
            "http://localhost:8081",      # Expo Web
            "http://localhost:19000",     # Expo Dev Server
            "http://localhost:19006",     # Expo Web Alternative
            f"http://{local_ip}:8000",    # Local IP
            f"http://{local_ip}:8081",    # Expo on local IP
            f"http://{local_ip}:19000",   # Expo dev on local IP
        ]
        
        # Add common local network patterns for mobile devices
        # These will be validated by the origin_validator
        print(f"🔓 Development CORS: Permissive mode (localhost + LAN)")
        print(f"   📱 Mobile devices can connect via: http://{local_ip}:8000")
        return origins

def is_valid_dev_origin(origin: str) -> bool:
    """
    Validates if an origin is allowed in development mode.
    Checks against IP patterns defined in ALLOWED_HOSTS.
    """
    if not origin:
        return False
    
    # Extract hostname from origin (strip protocol and port)
    try:
        # Remove protocol
        hostname = origin.split("://")[1] if "://" in origin else origin
        # Remove port
        hostname = hostname.split(":")[0]
    except (IndexError, AttributeError):
        return False
    
    allowed_patterns = settings.ALLOWED_HOSTS.split(",")
    
    for pattern in allowed_patterns:
        pattern = pattern.strip()
        # Convert wildcard pattern to regex
        regex_pattern = pattern.replace(".", r"\.").replace("*", r"\d+")
        if re.match(f"^{regex_pattern}$", hostname):
            return True
    
    return False

# Get origins list
cors_origins = get_cors_origins()

# Custom CORS middleware with pattern matching for development
if settings.ENVIRONMENT == "development":
    # Development: Allow credentials with pattern-based validation
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.0\.\d+\.\d+|172\.16\.\d+\.\d+)(:\d+)?$",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )
else:
    # Production: Strict origin list (no wildcards with credentials)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
        allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
        expose_headers=["Content-Length", "Content-Type"],
        max_age=600,  # Cache preflight requests for 10 minutes
    )

app.include_router(api_router, prefix="/api/v1")

# ============================================================================
# Rate Limiting
# ============================================================================
setup_rate_limiting(app)

# ============================================================================
# Lifecycle Events
# ============================================================================

@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    print("✅ ChefMentor X API started successfully")
    print(f"📊 Rate limit: {settings.RATE_LIMIT_PER_MINUTE} req/min")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("👋 ChefMentor X API shutting down...")

@app.get("/health")
async def health_check():
    """Health check endpoint to verify backend is running"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": "1.0.0",
        "database": "connected",
        "server_ip": local_ip
    }

@app.get("/")
async def root():
    return {
        "message": "Welcome to ChefMentor X API",
        "docs": "/docs"
    }
