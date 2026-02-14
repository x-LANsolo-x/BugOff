from pydantic import BaseModel, EmailStr

class GoogleAuthRequest(BaseModel):
    id_token: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    name: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    
    class Config:
        from_attributes = True
