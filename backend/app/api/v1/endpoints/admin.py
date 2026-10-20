"""
Admin Panel Endpoint
Secure admin authentication and management
"""
from datetime import datetime, timedelta
from typing import Optional

import bcrypt
import jwt
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.api.v1.schemas.admin import (
    AdminLoginRequest,
    AdminLoginResponse,
)
from app.config import settings
from app.core.security import get_client_ip, limiter

router = APIRouter()
security = HTTPBearer(auto_error=False)


def create_jwt_token(data: dict, expires_delta: timedelta = timedelta(days=7)) -> str:
    """Create a JWT token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.admin_jwt_secret, algorithm="HS256")


def verify_jwt_token(token: str) -> dict:
    """Verify a JWT token."""
    try:
        payload = jwt.decode(token, settings.admin_jwt_secret, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token süresi doldu")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Geçersiz token")


async def verify_admin_token(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> dict:
    """Verify admin JWT token."""
    if not credentials:
        raise HTTPException(status_code=401, detail="Oturum açmanız gerekiyor")
    return verify_jwt_token(credentials.credentials)


@router.post("/login", response_model=AdminLoginResponse)
@limiter.limit("10/minute")
async def admin_login(request: Request, login_data: AdminLoginRequest):
    """Admin login endpoint."""
    ip = get_client_ip(request)
    entered_password = login_data.password.strip()

    is_valid = False

    # 1. Plain text comparison if admin_password is set
    if settings.admin_password and entered_password == settings.admin_password:
        is_valid = True

    # 2. Bcrypt comparison if admin_password_hash is set
    elif settings.admin_password_hash:
        try:
            pw_bytes = entered_password.encode("utf-8")
            hash_bytes = settings.admin_password_hash.encode("utf-8")
            if bcrypt.checkpw(pw_bytes, hash_bytes):
                is_valid = True
        except Exception:
            pass

    # 3. Default fallback if neither configured
    elif entered_password == "admin123":
        is_valid = True

    if not is_valid:
        return AdminLoginResponse(
            success=False,
            message="Geçersiz şifre"
        )

    token = create_jwt_token({"admin": True, "ip": ip})
    return AdminLoginResponse(
        success=True,
        message="Giriş başarılı",
        token=token
    )


@router.get("/me")
async def admin_me(admin: dict = Depends(verify_admin_token)):
    """Check if token is valid."""
    return {"authenticated": True}
