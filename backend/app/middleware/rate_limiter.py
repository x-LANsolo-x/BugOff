"""
ChefMentor X – Rate Limiting Middleware

Uses slowapi for request rate limiting per IP/user.
Configured via RATE_LIMIT_PER_MINUTE in settings.
"""

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.requests import Request


# Create limiter instance
limiter = Limiter(key_func=get_remote_address)


def setup_rate_limiting(app):
    """
    Attach rate limiting middleware to the FastAPI app.
    Call this in main.py after app creation.
    """
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    
    print("🛡️  Rate limiting enabled")
    return limiter
