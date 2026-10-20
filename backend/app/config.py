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
    groq_model: str = "qwen/qwen3.8-27b"
    groq_fallback_models: str = "openai/gpt-oss-120b,openai/gpt-oss-20b"

    @property
    def groq_models_list(self) -> List[str]:
        """Ordered list of primary and fallback Groq models."""
        models = [self.groq_model.strip()]
        for fallback in self.groq_fallback_models.split(","):
            name = fallback.strip()
            if name and name not in models:
                models.append(name)
        return [m for m in models if m]
    
    # Email - Resend
    resend_api_key: str = ""
    contact_email: str = ""
    
    # Rate Limiting
    rate_limit_per_minute: int = 30
    
    @property
    def is_production(self) -> bool:
        """Check if running in production."""
        return self.app_env.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
