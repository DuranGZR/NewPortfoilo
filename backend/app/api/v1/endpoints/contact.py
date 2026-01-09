"""
Contact Form Endpoint
"""
from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.schemas.contact import ContactCreate, ContactResponse
from app.core.security import limiter, get_client_ip
from app.db.database import get_db
from app.db.models import Contact
from app.services.email_service import send_contact_notification
from app.config import settings


router = APIRouter()


@router.post("", response_model=ContactResponse)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
async def submit_contact(
    request: Request,
    contact_data: ContactCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Submit a contact form message.
    
    - **name**: Sender's name
    - **email**: Sender's email address
    - **subject**: Message subject (optional)
    - **message**: Message content
    """
    # Get client IP
    ip_address = get_client_ip(request)
    
    # Create contact record
    contact = Contact(
        name=contact_data.name,
        email=contact_data.email,
        subject=contact_data.subject,
        message=contact_data.message,
        ip_address=ip_address
    )
    
    db.add(contact)
    await db.commit()
    
    # Send email notification (non-blocking)
    try:
        await send_contact_notification(contact_data)
    except Exception as e:
        # Log error but don't fail the request
        print(f"Failed to send email notification: {e}")
    
    return ContactResponse(
        success=True,
        message="Mesajınız başarıyla gönderildi. En kısa sürede size döneceğim."
    )
