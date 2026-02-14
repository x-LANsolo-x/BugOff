"""
ChefMentor X - Application Configuration
Centralized configuration management using Pydantic Settings
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    All values are loaded from .env file in the backend directory.
    """
    
    # =============================================================================
    # DATABASE CONFIGURATION
    # =============================================================================
    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # =============================================================================
    # JWT & AUTHENTICATION
    # =============================================================================
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    
    # Google OAuth
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    
    # =============================================================================
    # AI/ML SERVICES
    # =============================================================================
    GEMINI_API_KEY: str
    GROQ_API_KEY: str
    
    # =============================================================================
    # FILE STORAGE - CLOUDINARY
    # =============================================================================
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str
    
    # =============================================================================
    # OPTIONAL SERVICES
    # =============================================================================
    RECIPE_DB_API_KEY: Optional[str] = None
    FLAVOR_DB_API_KEY: Optional[str] = None
    POSTHOG_API_KEY: Optional[str] = None
    POSTHOG_HOST: Optional[str] = None
    SENTRY_DSN: Optional[str] = None
    
    # =============================================================================
    # APPLICATION SETTINGS
    # =============================================================================
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "ChefMentor X API"
    VERSION: str = "1.0.0"
    
    # CORS Origins (comma-separated in .env)
    # Development: Use "*" or specific local IPs
    # Production: Comma-separated list like "https://app.example.com,https://www.example.com"
    CORS_ORIGINS: str = "*"
    
    # Allowed hosts for CORS pattern matching (development only)
    # These patterns are used when ENVIRONMENT=development
    ALLOWED_HOSTS: str = "localhost,127.0.0.1,192.168.*.*,10.0.*.*,172.16.*.*"
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Pagination
    DEFAULT_PAGE_SIZE: int = 20
    MAX_PAGE_SIZE: int = 100
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
