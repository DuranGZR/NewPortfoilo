"""
Analytics Endpoint
"""
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, Request, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.schemas.analytics import (
    PageViewCreate,
    PageViewResponse,
    AnalyticsStatsResponse,
    PageStats,
    ProjectStats
)
from app.core.security import limiter, get_client_ip, verify_admin_api_key
from app.db.database import get_db
from app.db.models import PageView
from app.config import settings


router = APIRouter()


@router.post("/pageview", response_model=PageViewResponse)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
async def record_pageview(
    request: Request,
    pageview_data: PageViewCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Record a page view.
    
    - **page_path**: Page path being viewed
    - **project_slug**: Project identifier (optional)
    - **visitor_id**: Anonymous visitor ID (optional)
    - **referrer**: Referrer URL (optional)
    """
    # Get request metadata
    user_agent = request.headers.get("User-Agent", "")
    
    # Create page view record
    pageview = PageView(
        page_path=pageview_data.page_path,
        project_slug=pageview_data.project_slug,
        visitor_id=pageview_data.visitor_id,
        user_agent=user_agent,
        referrer=pageview_data.referrer
    )
    
    db.add(pageview)
    await db.commit()
    
    return PageViewResponse(
        success=True,
        message="Page view recorded"
    )


@router.get("/stats", response_model=AnalyticsStatsResponse)
async def get_analytics_stats(
    days: int = Query(default=30, ge=1, le=365, description="Number of days to analyze"),
    api_key: str = Depends(verify_admin_api_key),
    db: AsyncSession = Depends(get_db)
):
    """
    Get analytics statistics (Admin only).
    
    - **days**: Number of days to analyze (1-365)
    """
    since_date = datetime.utcnow() - timedelta(days=days)
    
    # Total views
    total_views_result = await db.execute(
        select(func.count(PageView.id)).where(PageView.created_at >= since_date)
    )
    total_views = total_views_result.scalar() or 0
    
    # Unique visitors
    unique_visitors_result = await db.execute(
        select(func.count(func.distinct(PageView.visitor_id))).where(
            PageView.created_at >= since_date,
            PageView.visitor_id.isnot(None)
        )
    )
    unique_visitors = unique_visitors_result.scalar() or 0
    
    # Top pages
    top_pages_result = await db.execute(
        select(
            PageView.page_path,
            func.count(PageView.id).label("view_count")
        )
        .where(PageView.created_at >= since_date)
        .group_by(PageView.page_path)
        .order_by(func.count(PageView.id).desc())
        .limit(10)
    )
    top_pages = [
        PageStats(page_path=row[0], view_count=row[1])
        for row in top_pages_result
    ]
    
    # Top projects
    top_projects_result = await db.execute(
        select(
            PageView.project_slug,
            func.count(PageView.id).label("view_count")
        )
        .where(
            PageView.created_at >= since_date,
            PageView.project_slug.isnot(None)
        )
        .group_by(PageView.project_slug)
        .order_by(func.count(PageView.id).desc())
        .limit(10)
    )
    top_projects = [
        ProjectStats(project_slug=row[0], view_count=row[1])
        for row in top_projects_result
    ]
    
    return AnalyticsStatsResponse(
        total_views=total_views,
        unique_visitors=unique_visitors,
        top_pages=top_pages,
        top_projects=top_projects,
        period_days=days
    )
