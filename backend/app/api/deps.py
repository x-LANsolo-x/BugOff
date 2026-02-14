"""
ChefMentor X - Shared API Dependencies
Reusable FastAPI dependencies for authentication and authorization.
"""

from fastapi import HTTPException, Header
from app.core.security import verify_token


async def get_current_user(authorization: str = Header(..., description="Bearer <JWT>")):
    """
    Extract and validate JWT from Authorization header.
    Returns the decoded payload: {"sub": user_id, "email": ...}
    """
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = authorization[7:]  # Strip "Bearer "
    
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")
    
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    # Reject refresh tokens used as access tokens
    if payload.get("type") == "refresh":
        raise HTTPException(status_code=401, detail="Cannot use refresh token for API access")
    
    return payload
