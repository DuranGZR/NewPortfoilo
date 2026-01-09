"""
Analytics Pydantic Schemas
"""
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field


class PageViewCreate(BaseModel):
    """Schema for recording a page view."""
    
    page_path: str = Field(..., description="Page path (e.g., /projects/sentiment)")
    project_slug: Optional[str] = Field(None, description="Project slug if applicable")
    visitor_id: Optional[str] = Field(None, description="Anonymous visitor ID")
    referrer: Optional[str] = Field(None, description="Referrer URL")


class PageViewResponse(BaseModel):
    """Schema for page view response."""
    
    success: bool
    message: str


class PageStats(BaseModel):
    """Statistics for a single page."""
    
    page_path: str
    view_count: int


class ProjectStats(BaseModel):
    """Statistics for a project."""
    
    project_slug: str
    view_count: int


class AnalyticsStatsResponse(BaseModel):
    """Schema for analytics stats response."""
    
    total_views: int
    unique_visitors: int
    top_pages: List[PageStats]
    top_projects: List[ProjectStats]
    period_days: int
