"""
Email Service - Send notifications via Resend
"""
import resend

from app.config import settings
from app.api.v1.schemas.contact import ContactCreate


async def send_contact_notification(contact: ContactCreate) -> bool:
    """
    Send email notification for new contact form submission.
    
    Args:
        contact: Contact form data
        
    Returns:
        True if email sent successfully
    """
    if not settings.resend_api_key or not settings.contact_email:
        print("Email service not configured - skipping notification")
        return False
    
    resend.api_key = settings.resend_api_key
    
    subject = f"[Portfolio] Yeni Mesaj: {contact.subject or 'Konu Belirtilmemiş'}"
    
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #819fa7; border-bottom: 2px solid #819fa7; padding-bottom: 10px;">
            Yeni İletişim Formu Mesajı
        </h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Gönderen:</strong> {contact.name}</p>
            <p><strong>E-posta:</strong> <a href="mailto:{contact.email}">{contact.email}</a></p>
            <p><strong>Konu:</strong> {contact.subject or 'Belirtilmemiş'}</p>
        </div>
        
        <div style="background-color: #1a1a1a; color: #f3f5f9; padding: 20px; border-radius: 8px;">
            <h3 style="color: #819fa7; margin-top: 0;">Mesaj:</h3>
            <p style="white-space: pre-wrap;">{contact.message}</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Bu e-posta portfolio sitesindeki iletişim formundan otomatik olarak gönderilmiştir.
        </p>
    </div>
    """
    
    try:
        resend.Emails.send({
            "from": "Portfolio <onboarding@resend.dev>",
            "to": settings.contact_email,
            "subject": subject,
            "html": html_content,
            "reply_to": contact.email
        })
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False
