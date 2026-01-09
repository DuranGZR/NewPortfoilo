"""
Admin Panel Schemas
"""
from pydantic import BaseModel
from typing import Dict, Any, Optional, List


class AdminLoginRequest(BaseModel):
    """Admin login request."""
    password: str


class AdminLoginResponse(BaseModel):
    """Admin login response."""
    success: bool
    message: str
    token: Optional[str] = None


class ContentUpdateRequest(BaseModel):
    """Content update request."""
    section: str
    key: str
    value: str


class SectionUpdateRequest(BaseModel):
    """Update entire section."""
    section: str
    data: Dict[str, Any]


class ArrayItemRequest(BaseModel):
    """Add/update array item."""
    section: str
    array_key: str  # e.g., "items" for projects.items
    item: Dict[str, Any]


class ArrayItemDeleteRequest(BaseModel):
    """Delete array item."""
    section: str
    array_key: str
    item_id: str


class ContentResponse(BaseModel):
    """Content response."""
    content: Dict[str, Any]


class ContentUpdateResponse(BaseModel):
    """Content update response."""
    success: bool
    message: str

