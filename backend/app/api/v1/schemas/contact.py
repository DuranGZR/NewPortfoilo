"""
Contact Form Pydantic Schemas
"""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    """Schema for creating a contact message."""
    
    name: str = Field(..., min_length=2, max_length=100, description="Sender name")
    email: EmailStr = Field(..., description="Sender email")
    subject: Optional[str] = Field(None, max_length=200, description="Message subject")
    message: str = Field(..., min_length=10, max_length=5000, description="Message content")


class ContactResponse(BaseModel):
    """Schema for contact response."""
    
    success: bool
    message: str


class ContactInDB(BaseModel):
    """Schema for contact in database."""
    
    id: int
    name: str
    email: str
    subject: Optional[str]
    message: str
    ip_address: Optional[str]
    is_read: bool
    created_at: datetime
    
    model_config = {"from_attributes": True}
