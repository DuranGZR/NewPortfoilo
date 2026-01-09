"""API v1 Schemas Package"""
from app.api.v1.schemas.contact import ContactCreate, ContactResponse, ContactInDB
from app.api.v1.schemas.chat import (
    ChatMessage,
    ChatRequest,
    ChatResponse,
    ChatSuggestion,
    ChatSuggestionsResponse
)
from app.api.v1.schemas.analytics import (
    PageViewCreate,
    PageViewResponse,
    PageStats,
    ProjectStats,
    AnalyticsStatsResponse
)

__all__ = [
    "ContactCreate",
    "ContactResponse",
    "ContactInDB",
    "ChatMessage",
    "ChatRequest",
    "ChatResponse",
    "ChatSuggestion",
    "ChatSuggestionsResponse",
    "PageViewCreate",
    "PageViewResponse",
    "PageStats",
    "ProjectStats",
    "AnalyticsStatsResponse"
]
