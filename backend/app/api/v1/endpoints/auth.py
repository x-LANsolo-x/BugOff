from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.auth import GoogleAuthRequest, TokenResponse, RefreshTokenRequest
from app.services.auth import AuthService
from app.core.security import create_access_token, verify_token

router = APIRouter()

@router.post("/google", response_model=TokenResponse)
async def google_login(
    auth_data: GoogleAuthRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Exchange Google ID Token for App JWT Token.
    Creates user if they don't exist.
    """
    auth_service = AuthService(db)
    return await auth_service.google_login(auth_data.id_token)


@router.post("/refresh")
async def refresh_token(request: RefreshTokenRequest):
    """
    Exchange a valid refresh token for a new access + refresh token pair.
    Called automatically by the frontend on 401 responses.
    """
    payload = verify_token(request.refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    # Ensure it's actually a refresh token
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")
    
    # Issue new token pair
    new_access = create_access_token(
        data={"sub": payload["sub"], "email": payload["email"]}
    )
    new_refresh = create_access_token(
        data={"sub": payload["sub"], "email": payload["email"], "type": "refresh"},
        expires_delta=timedelta(days=7)
    )
    
    return {
        "access_token": new_access,
        "refresh_token": new_refresh,
    }
