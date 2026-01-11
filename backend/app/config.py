"""
Portfolio Backend Configuration
"""
from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )
    
    # Application
    app_name: str = "Portfolio API"
    app_env: str = "development"
    debug: bool = True
    api_v1_prefix: str = "/api/v1"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    
    # CORS
    cors_origins: str = "http://localhost:3000"
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./portfolio.db"
    
    # AI - Groq
    groq_api_key: str = ""
    
    # Email - Resend
    resend_api_key: str = ""
    contact_email: str = ""
    
    # Rate Limiting
    rate_limit_per_minute: int = 30
    
    # Admin
    admin_api_key: str = ""
    admin_password_hash: str = ""
    admin_jwt_secret: str = ""
    admin_path: str = "ctrl-x7k9p2m"
    
    @property
    def is_production(self) -> bool:
        """Check if running in production."""
        return self.app_env.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
