from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.base import get_db
from app.schemas.cooking import StartCookingRequest, CookingSessionResponse, StepResponse
from app.services.cooking import CookingService

router = APIRouter()

@router.post("/start", response_model=CookingSessionResponse)
async def start_cooking(
    data: StartCookingRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """Start cooking a specific recipe"""
    service = CookingService(db)
    session = await service.start_session(data.recipe_id, demo_session_id=data.demo_session_id, background_tasks=background_tasks)
    return session

@router.get("/{session_id}/current", response_model=StepResponse)
async def get_current_step(session_id: str, db: AsyncSession = Depends(get_db)):
    """Get the current step instruction"""
    service = CookingService(db)
    return await service.get_current_step(session_id)

    """User says 'Next' -> Advance step and return new instruction"""
    service = CookingService(db)
    return await service.advance_step(session_id, background_tasks)

# ── Chat Endpoint ───────────────────────────────────

from pydantic import BaseModel
from app.services.ai_mentor import AIMentorService

class ChatRequest(BaseModel):
    messages: list[dict] # [{"role": "user", "content": "..."}]
    context: dict        # {"recipe_name": "...", "current_step": 1, ...}

@router.post("/chat")
async def chat_with_mentor(request: ChatRequest):
    """Interactive chat with the AI Chef"""
    service = AIMentorService()
    response = await service.chat_with_mentor(request.messages, request.context)
    return {"response": response}


# ── Live Analysis Endpoint ──────────────────────────

from fastapi import UploadFile, File, Form
from app.services.ai_vision import AIVisionService
from PIL import Image
from io import BytesIO

@router.post("/live-analysis")
async def live_analysis(
    image: UploadFile = File(...),
    step_instruction: str = Form(""),
    recipe_name: str = Form(""),
    step_number: int = Form(1),
):
    """
    Accepts a camera frame and the current step context.
    Returns AI feedback on cooking progress.
    """
    try:
        contents = await image.read()
        image_data = Image.open(BytesIO(contents))

        vision_service = AIVisionService()
        result = await vision_service.analyze_live_cooking(
            image_data=image_data,
            step_instruction=step_instruction,
            recipe_name=recipe_name,
            step_number=step_number,
        )
        return result
    except Exception as e:
        print(f"Live analysis error: {e}")
        return {
            "feedback": "Keep going! You're doing great.",
            "is_on_track": True,
            "suggestions": [],
            "ai_provider": "error_fallback"
        }
