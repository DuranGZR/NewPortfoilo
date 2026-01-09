"""
Security Utilities - Rate Limiting, API Key Validation
"""
from fastapi import HTTPException, Security, Request
from fastapi.security import APIKeyHeader
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import settings


# Rate Limiter
limiter = Limiter(key_func=get_remote_address)

# API Key Header for admin endpoints
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def verify_admin_api_key(
    api_key: str = Security(api_key_header)
) -> str:
    """Verify admin API key for protected endpoints."""
    if not api_key:
        raise HTTPException(
            status_code=401,
            detail="API Key required"
        )
    
    if api_key != settings.admin_api_key:
        raise HTTPException(
            status_code=403,
            detail="Invalid API Key"
        )
    
    return api_key


def get_client_ip(request: Request) -> str:
    """Get client IP address from request."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"
