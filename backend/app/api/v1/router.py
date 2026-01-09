"""
API v1 Router - Aggregates all endpoint routers
"""
from fastapi import APIRouter

from app.api.v1.endpoints import health, contact, chat, analytics, admin, translations

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(contact.router, prefix="/contact", tags=["Contact"])
api_router.include_router(chat.router, prefix="/chat", tags=["AI Chat"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
api_router.include_router(translations.router, prefix="/translations", tags=["Translations"])


