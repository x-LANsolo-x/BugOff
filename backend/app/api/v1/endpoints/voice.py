from fastapi import APIRouter, UploadFile, File, Response, Body
from app.services.voice import VoiceService
from app.services.ai_mentor import AIMentorService
from pydantic import BaseModel

router = APIRouter()

class TTSRequest(BaseModel):
    text: str

class VoiceCommandRequest(BaseModel):
    text: str

@router.post("/stt")
async def speech_to_text(file: UploadFile = File(...)):
    """
    Upload audio file (wav/mp3) -> Get text transcription.
    """
    service = VoiceService()
    content = await file.read()
    text = await service.speech_to_text(content, file.filename)
    return {"text": text}

@router.post("/command")
async def process_voice_command(request: VoiceCommandRequest):
    """
    Text -> Intent (NLU)
    User sends "Set timer for 5 mins", gets {"intent": "TIMER", "duration": 300}
    """
    service = AIMentorService()
    intent = await service.parse_voice_intent(request.text)
    return intent

@router.post("/tts")
async def text_to_speech(request: TTSRequest):
    """
    Send text -> Get MP3 audio file.
    """
    service = VoiceService()
    audio_buffer = await service.text_to_speech(request.text)
    
    if not audio_buffer:
        return {"error": "Failed to generate audio"}
        
    return Response(content=audio_buffer.read(), media_type="audio/mp3")
