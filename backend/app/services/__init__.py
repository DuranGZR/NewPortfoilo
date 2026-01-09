"""Services Package"""
from app.services.email_service import send_contact_notification
from app.services.ai_service import get_ai_response

__all__ = ["send_contact_notification", "get_ai_response"]
