from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import UploadFile
from app.models.session import FailureAnalysis
from app.services.storage import StorageService
from app.services.ai_vision import AIVisionService
import json

class FailureService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.storage = StorageService()
        self.vision = AIVisionService()
    
    async def analyze_upload(self, file: UploadFile, user_id=None, cooking_session_id=None, context: dict = None):
        # 1. Read file
        content = await file.read()
        
        # 2. Upload to Cloudinary
        image_url = await self.storage.upload_image(content)
        
        # 3. Analyze with AI (pass context for better diagnosis)
        analysis_result = await self.vision.analyze_dish_failure(image_url, context=context)
        
        # 4. Extract fields
        root_cause = analysis_result.get("root_cause", "Unknown")
        explanation = analysis_result.get("explanation", "")
        tips = analysis_result.get("tips", [])
        severity = analysis_result.get("severity", "moderate")
        confidence = analysis_result.get("confidence", 0.5)
        ai_provider = analysis_result.get("ai_provider", "unknown")
        
        # 5. Save Record
        record = FailureAnalysis(
            user_id=user_id,
            media_url=image_url,
            root_cause=root_cause,
            explanation=f"{explanation}\n\nTips: {', '.join(tips)}" if tips else explanation
        )
        self.db.add(record)
        await self.db.commit()
        await self.db.refresh(record)
        
        # Return enriched response
        return {
            "id": str(record.id),
            "media_url": record.media_url,
            "root_cause": record.root_cause,
            "explanation": explanation,
            "tips": tips,
            "severity": severity,
            "confidence": confidence,
            "ai_provider": ai_provider,
            "created_at": str(record.created_at)
        }

