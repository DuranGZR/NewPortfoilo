"""
Admin Panel Endpoint
Secure admin authentication and content management
"""
import json
import os
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, Any

import bcrypt
import jwt
from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.api.v1.schemas.admin import (
    AdminLoginRequest,
    AdminLoginResponse,
    ContentUpdateRequest,
    ContentResponse,
    ContentUpdateResponse
)
from app.core.security import limiter
from app.config import settings


router = APIRouter()
security = HTTPBearer(auto_error=False)

# Content file path
CONTENT_FILE = Path(__file__).parent.parent.parent.parent / "data" / "content.json"

# Failed login attempts tracking
failed_attempts: Dict[str, Dict[str, Any]] = {}


def load_content() -> Dict[str, Any]:
    """Load content from JSON file."""
    if CONTENT_FILE.exists():
        with open(CONTENT_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_content(content: Dict[str, Any]) -> None:
    """Save content to JSON file."""
    with open(CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(content, f, ensure_ascii=False, indent=2)


def create_jwt_token(data: dict, expires_delta: timedelta = timedelta(hours=1)) -> str:
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
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def check_rate_limit(ip: str) -> bool:
    """Check if IP is rate limited (3 failed attempts = 15 min lockout)."""
    if ip not in failed_attempts:
        return True
    
    attempt_data = failed_attempts[ip]
    if attempt_data["count"] >= 3:
        lockout_until = attempt_data["last_attempt"] + timedelta(minutes=15)
        if datetime.utcnow() < lockout_until:
            return False
        # Reset after lockout period
        del failed_attempts[ip]
    
    return True


def record_failed_attempt(ip: str) -> None:
    """Record a failed login attempt."""
    if ip not in failed_attempts:
        failed_attempts[ip] = {"count": 0, "last_attempt": datetime.utcnow()}
    
    failed_attempts[ip]["count"] += 1
    failed_attempts[ip]["last_attempt"] = datetime.utcnow()


def get_client_ip(request: Request) -> str:
    """Get client IP address."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


async def verify_admin_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """Verify admin JWT token."""
    if not credentials:
        raise HTTPException(status_code=401, detail="Authorization required")
    
    return verify_jwt_token(credentials.credentials)


@router.post("/login", response_model=AdminLoginResponse)
@limiter.limit("5/minute")
async def admin_login(request: Request, login_data: AdminLoginRequest):
    """
    Admin login endpoint.
    Returns JWT token on successful authentication.
    """
    ip = get_client_ip(request)
    
    # Check rate limit
    if not check_rate_limit(ip):
        raise HTTPException(
            status_code=429,
            detail="Çok fazla başarısız deneme. 15 dakika sonra tekrar deneyin."
        )
    
    # Verify password
    try:
        password_bytes = login_data.password.encode("utf-8")
        hash_bytes = settings.admin_password_hash.encode("utf-8")
        
        if bcrypt.checkpw(password_bytes, hash_bytes):
            # Clear failed attempts on success
            if ip in failed_attempts:
                del failed_attempts[ip]
            
            # Create JWT token
            token = create_jwt_token({"admin": True, "ip": ip})
            
            return AdminLoginResponse(
                success=True,
                message="Giriş başarılı",
                token=token
            )
    except Exception:
        pass
    
    # Record failed attempt
    record_failed_attempt(ip)
    
    return AdminLoginResponse(
        success=False,
        message="Geçersiz şifre"
    )


@router.get("/content", response_model=ContentResponse)
async def get_content(admin: dict = Depends(verify_admin_token)):
    """Get all editable content."""
    content = load_content()
    return ContentResponse(content=content)


@router.put("/content", response_model=ContentUpdateResponse)
async def update_content(
    update_data: ContentUpdateRequest,
    admin: dict = Depends(verify_admin_token)
):
    """Update a specific content field."""
    content = load_content()
    
    # Navigate to section
    if update_data.section not in content:
        content[update_data.section] = {}
    
    # Update the value
    content[update_data.section][update_data.key] = update_data.value
    
    # Save changes
    save_content(content)
    
    return ContentUpdateResponse(
        success=True,
        message=f"'{update_data.section}.{update_data.key}' güncellendi"
    )


@router.put("/content/section/{section}", response_model=ContentUpdateResponse)
async def update_section(
    section: str,
    data: dict,
    admin: dict = Depends(verify_admin_token)
):
    """Update an entire section."""
    content = load_content()
    content[section] = data
    save_content(content)
    
    return ContentUpdateResponse(
        success=True,
        message=f"'{section}' bölümü güncellendi"
    )


@router.post("/content/array-item", response_model=ContentUpdateResponse)
async def add_array_item(
    request: dict,
    admin: dict = Depends(verify_admin_token)
):
    """Add or update an item in an array."""
    content = load_content()
    section = request.get("section")
    array_key = request.get("array_key", "items")
    item = request.get("item")
    
    if section not in content:
        content[section] = {}
    
    if array_key not in content[section]:
        content[section][array_key] = []
    
    # Check if item exists (by id), update or append
    items = content[section][array_key]
    item_id = item.get("id")
    
    found = False
    for i, existing in enumerate(items):
        if existing.get("id") == item_id:
            items[i] = item
            found = True
            break
    
    if not found:
        items.append(item)
    
    save_content(content)
    
    return ContentUpdateResponse(
        success=True,
        message=f"'{section}.{array_key}' öğesi eklendi/güncellendi"
    )


@router.delete("/content/array-item", response_model=ContentUpdateResponse)
async def delete_array_item(
    request: dict,
    admin: dict = Depends(verify_admin_token)
):
    """Delete an item from an array."""
    content = load_content()
    section = request.get("section")
    array_key = request.get("array_key", "items")
    item_id = request.get("item_id")
    
    if section in content and array_key in content[section]:
        items = content[section][array_key]
        content[section][array_key] = [i for i in items if i.get("id") != item_id]
        save_content(content)
    
    return ContentUpdateResponse(
        success=True,
        message=f"'{section}.{array_key}' öğesi silindi"
    )


@router.post("/logout", response_model=AdminLoginResponse)
async def admin_logout(admin: dict = Depends(verify_admin_token)):
    """Admin logout (client should discard token)."""
    return AdminLoginResponse(
        success=True,
        message="Çıkış yapıldı"
    )

