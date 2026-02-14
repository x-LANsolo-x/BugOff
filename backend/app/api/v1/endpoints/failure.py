from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.services.failure import FailureService
from typing import Optional

router = APIRouter()

@router.post("/analyze")
async def analyze_failure(
    file: UploadFile = File(...),
    heat_level: Optional[str] = Form(None),
    timing: Optional[str] = Form(None),
    modifications: Optional[str] = Form(None),
    notes: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    """Upload image of failed dish for AI analysis with optional context"""
    context = {}
    if heat_level:
        context["heat_level"] = heat_level
    if timing:
        context["timing"] = timing
    if modifications:
        context["modifications"] = modifications
    if notes:
        context["notes"] = notes
    
    service = FailureService(db)
    result = await service.analyze_upload(file, context=context if context else None)
    return result

