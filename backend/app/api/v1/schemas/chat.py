"""
AI Chat Pydantic Schemas
"""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """A single chat message."""
    
    role: str = Field(..., description="Message role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")
    timestamp: Optional[datetime] = None


class ChatRequest(BaseModel):
    """Schema for chat request."""
    
    message: str = Field(..., min_length=1, max_length=2000, description="User message")
    session_id: Optional[str] = Field(None, description="Session ID for conversation context")


class ChatResponse(BaseModel):
    """Schema for chat response."""
    
    response: str = Field(..., description="AI assistant response")
    session_id: str = Field(..., description="Session ID for follow-up messages")


class ChatSuggestion(BaseModel):
    """Suggested question for the chat."""
    
    question: str
    category: str


class ChatSuggestionsResponse(BaseModel):
    """Schema for chat suggestions response."""
    
    suggestions: List[ChatSuggestion]
