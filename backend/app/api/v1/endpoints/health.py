"""
Health Check Endpoint
"""
from fastapi import APIRouter
from pydantic import BaseModel

from app.config import settings


router = APIRouter()


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    app_name: str
    version: str
    environment: str


@router.get("", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.
    
    Returns the current status of the API.
    """
    return HealthResponse(
        status="healthy",
        app_name=settings.app_name,
        version="1.0.0",
        environment=settings.app_env
    )
