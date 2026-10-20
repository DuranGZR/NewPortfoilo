"""
Translation Files Endpoint
Provides public reads for Next.js i18n dynamic sync,
and protected writes for Admin CMS.
"""
import copy
import json
from pathlib import Path
from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.endpoints.admin import verify_admin_token
from app.api.v1.schemas.admin import ContentResponse, ContentUpdateResponse
from app.db.database import get_db
from app.db.models import SiteTranslation

router = APIRouter()

# Paths for seed/backup translations
BACKEND_DATA_DIR = Path(__file__).parent.parent.parent.parent / "data" / "messages"
FRONTEND_MESSAGES_DIR = Path(__file__).parent.parent.parent.parent.parent.parent / "frontend" / "messages"


def _read_seed_file(lang: str) -> Dict[str, Any]:
    """Read seed JSON from backend data or frontend messages."""
    for folder in [BACKEND_DATA_DIR, FRONTEND_MESSAGES_DIR]:
        candidate = folder / f"{lang}.json"
        if candidate.exists():
            try:
                with open(candidate, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
    return {}


def _mirror_to_disk(lang: str, data: Dict[str, Any]) -> None:
    """Best-effort write to local JSON files if accessible."""
    for folder in [BACKEND_DATA_DIR, FRONTEND_MESSAGES_DIR]:
        if folder.exists():
            try:
                target = folder / f"{lang}.json"
                with open(target, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
            except Exception:
                pass


async def _get_or_create_translation(lang: str, db: AsyncSession) -> SiteTranslation:
    """Get translation row from DB or seed from file."""
    result = await db.execute(select(SiteTranslation).where(SiteTranslation.lang == lang))
    row = result.scalars().first()
    if row is None:
        initial_content = _read_seed_file(lang)
        row = SiteTranslation(lang=lang, content=initial_content)
        db.add(row)
        await db.commit()
        await db.refresh(row)
    return row


@router.get("/{lang}", response_model=ContentResponse)
async def get_translations(
    lang: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all translations for a language (tr or en).
    Public endpoint for Next.js frontend sync and Admin CMS.
    """
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Desteklenmeyen dil. 'tr' veya 'en' kullanın.")

    row = await _get_or_create_translation(lang, db)
    return ContentResponse(content=row.content or {})


@router.put("/{lang}", response_model=ContentUpdateResponse)
async def update_translations(
    lang: str,
    data: dict,
    admin: dict = Depends(verify_admin_token),
    db: AsyncSession = Depends(get_db)
):
    """Update entire translations JSON for a language."""
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Desteklenmeyen dil. 'tr' veya 'en' kullanın.")

    row = await _get_or_create_translation(lang, db)
    row.content = data
    await db.commit()
    _mirror_to_disk(lang, data)

    return ContentUpdateResponse(
        success=True,
        message=f"'{lang}.json' başarıyla güncellendi"
    )


@router.put("/{lang}/section/{section}", response_model=ContentUpdateResponse)
async def update_section(
    lang: str,
    section: str,
    data: dict,
    admin: dict = Depends(verify_admin_token),
    db: AsyncSession = Depends(get_db)
):
    """Update a specific section in translations."""
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Desteklenmeyen dil. 'tr' veya 'en' kullanın.")

    row = await _get_or_create_translation(lang, db)
    content = copy.deepcopy(row.content or {})
    content[section] = data
    row.content = content
    await db.commit()
    _mirror_to_disk(lang, content)

    return ContentUpdateResponse(
        success=True,
        message=f"'{lang}.json' - '{section}' bölümü güncellendi"
    )


@router.put("/{lang}/field", response_model=ContentUpdateResponse)
async def update_field(
    lang: str,
    request: dict,
    admin: dict = Depends(verify_admin_token),
    db: AsyncSession = Depends(get_db)
):
    """Update a nested field using dot notation path (e.g. 'hero.title')."""
    if lang not in ["tr", "en"]:
        raise HTTPException(status_code=400, detail="Desteklenmeyen dil. 'tr' veya 'en' kullanın.")

    path = request.get("path", "").strip()
    value = request.get("value")

    if not path:
        raise HTTPException(status_code=400, detail="Path belirtilmelidir.")

    row = await _get_or_create_translation(lang, db)
    content = copy.deepcopy(row.content or {})

    keys = path.split(".")
    curr = content
    for key in keys[:-1]:
        if key not in curr or not isinstance(curr[key], dict):
            curr[key] = {}
        curr = curr[key]

    curr[keys[-1]] = value
    row.content = content
    await db.commit()
    _mirror_to_disk(lang, content)

    return ContentUpdateResponse(
        success=True,
        message=f"'{lang}.json' - '{path}' güncellendi"
    )
