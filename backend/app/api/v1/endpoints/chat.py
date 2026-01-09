"""
AI Chat Endpoint
"""
import uuid
from typing import List

from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ChatSuggestion,
    ChatSuggestionsResponse
)
from app.core.security import limiter
from app.db.database import get_db
from app.services.ai_service import get_ai_response
from app.config import settings


router = APIRouter()


# Sample questions for the chat
SUGGESTIONS: List[ChatSuggestion] = [
    ChatSuggestion(
        question="En gurur duyduğun proje hangisi?",
        category="projects"
    ),
    ChatSuggestion(
        question="Hangi AI/ML teknolojilerinde uzmanlaştın?",
        category="skills"
    ),
    ChatSuggestion(
        question="Problem çözme yaklaşımın nasıl?",
        category="thinking"
    ),
    ChatSuggestion(
        question="Kariyer hedeflerin neler?",
        category="goals"
    ),
    ChatSuggestion(
        question="What makes you different from other AI engineers?",
        category="about"
    ),
    ChatSuggestion(
        question="Staj deneyiminden ne öğrendin?",
        category="experience"
    )
]


@router.post("", response_model=ChatResponse)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
async def chat(
    request: Request,
    chat_data: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Send a message to the AI assistant.
    
    - **message**: User's message
    - **session_id**: Session ID for conversation context (optional)
    """
    # Generate session ID if not provided
    session_id = chat_data.session_id or str(uuid.uuid4())
    
    # Get AI response
    response = await get_ai_response(
        message=chat_data.message,
        session_id=session_id
    )
    
    return ChatResponse(
        response=response,
        session_id=session_id
    )


@router.get("/suggestions", response_model=ChatSuggestionsResponse)
async def get_suggestions():
    """
    Get suggested questions for the chat.
    """
    return ChatSuggestionsResponse(suggestions=SUGGESTIONS)
