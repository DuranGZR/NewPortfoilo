"""
Translation Files Endpoint
Directly edit tr.json and en.json files
"""
import json
from pathlib import Path
from typing import Dict, Any

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.api.v1.endpoints.admin import verify_admin_token
from app.api.v1.schemas.admin import ContentResponse, ContentUpdateResponse


router = APIRouter()

# Translation files paths
FRONTEND_MESSAGES_DIR = Path(__file__).parent.parent.parent.parent.parent.parent / "frontend" / "messages"
TR_FILE = FRONTEND_MESSAGES_DIR / "tr.json"
EN_FILE = FRONTEND_MESSAGES_DIR / "en.json"


def load_translations(lang: str) -> Dict[str, Any]:
    """Load translation file."""
    file_path = TR_FILE if lang == "tr" else EN_FILE
    if file_path.exists():
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_translations(lang: str, data: Dict[str, Any]) -> None:
    """Save translation file."""
    file_path = TR_FILE if lang == "tr" else EN_FILE
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


@router.get("/{lang}", response_model=ContentResponse)
async def get_translations(
    lang: str,
    admin: dict = Depends(verify_admin_token)
):
    """Get all translations for a language (tr or en)."""
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Invalid language. Use 'tr' or 'en'.")
    
    content = load_translations(lang)
    return ContentResponse(content=content)


@router.put("/{lang}", response_model=ContentUpdateResponse)
async def update_translations(
    lang: str,
    data: dict,
    admin: dict = Depends(verify_admin_token)
):
    """Update entire translations file."""
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Invalid language. Use 'tr' or 'en'.")
    
    save_translations(lang, data)
    
    return ContentUpdateResponse(
        success=True,
        message=f"'{lang}.json' güncellendi"
    )


@router.put("/{lang}/section/{section}", response_model=ContentUpdateResponse)
async def update_section(
    lang: str,
    section: str,
    data: dict,
    admin: dict = Depends(verify_admin_token)
):
    """Update a specific section in translations."""
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Invalid language. Use 'tr' or 'en'.")
    
    translations = load_translations(lang)
    translations[section] = data
    save_translations(lang, translations)
    
    return ContentUpdateResponse(
        success=True,
        message=f"'{lang}.json' - '{section}' bölümü güncellendi"
    )


@router.put("/{lang}/field", response_model=ContentUpdateResponse)
async def update_field(
    lang: str,
    request: dict,
    admin: dict = Depends(verify_admin_token)
):
    """Update a nested field using dot notation path."""
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Invalid language. Use 'tr' or 'en'.")
    
    path = request.get("path", "")  # e.g., "hero.title"
    value = request.get("value", "")
    
    translations = load_translations(lang)
    
    # Navigate to nested field using path
    keys = path.split(".")
    current = translations
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    
    current[keys[-1]] = value
    save_translations(lang, translations)
    
    return ContentUpdateResponse(
        success=True,
        message=f"'{lang}.json' - '{path}' güncellendi"
    )
