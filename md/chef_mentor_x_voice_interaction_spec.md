# ChefMentor X – Voice Interaction Specification

**Version:** 1.0  
**Last Updated:** February 12, 2026  
**Status:** Approved for Implementation

---

## 1. Overview

Voice interaction is **critical** for ChefMentor X because users' hands are often busy, wet, or dirty while cooking. This document specifies the complete voice interaction system.

### Core Features
- 🔊 **Text-to-Speech (TTS):** App reads instructions aloud
- 🎤 **Speech-to-Text (STT):** Users control app with voice commands
- 🗣️ **Natural Language Processing:** Understand cooking questions in natural language
- 📴 **Offline Capable:** Works without internet connection

---

## 2. Voice Technology Stack

### 2.1 Text-to-Speech (TTS)

**Primary Solution: Piper TTS**
- **Type:** Open-source neural TTS
- **Docs:** https://github.com/rhasspy/piper
- **License:** MIT
- **Cost:** FREE (runs locally)
- **Quality:** Natural-sounding voices
- **Languages:** 20+ languages supported
- **Offline:** ✅ Yes

**Voice Models:**
- **English (US):** `en_US-lessac-medium` (recommended - clear, professional)
- **English (US):** `en_US-amy-medium` (alternative - friendly, casual)
- **Fallback:** Device native TTS via `expo-speech`

**Installation:**
```bash
pip install piper-tts
# Download voice model
wget https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx
```

**Integration (Backend):**
```python
from piper.voice import PiperVoice
import io

class TTSService:
    def __init__(self):
        self.voice = PiperVoice.load("models/en_US-lessac-medium.onnx")
    
    def synthesize(self, text: str) -> bytes:
        """Convert text to speech, return audio bytes"""
        audio_buffer = io.BytesIO()
        self.voice.synthesize(text, audio_buffer)
        return audio_buffer.getvalue()
```

**Integration (Frontend - React Native):**
```typescript
import { Audio } from 'expo-av';

async function playVoiceInstruction(text: string) {
  // Call backend TTS endpoint
  const response = await fetch('/api/voice/tts', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  
  const audioBlob = await response.blob();
  const { sound } = await Audio.Sound.createAsync({ uri: URL.createObjectURL(audioBlob) });
  await sound.playAsync();
}
```

---

### 2.2 Speech-to-Text (STT)

**Primary Solution: Whisper.cpp**
- **Type:** OpenAI Whisper optimized for CPU/mobile
- **Docs:** https://github.com/ggerganov/whisper.cpp
- **License:** MIT
- **Cost:** FREE (runs locally)
- **Accuracy:** State-of-the-art for voice recognition
- **Languages:** 99 languages
- **Offline:** ✅ Yes

**Model Selection:**
| Model | Size | Speed | Accuracy | Recommended For |
|-------|------|-------|----------|-----------------|
| `tiny` | 75 MB | Very fast | Good | Mobile devices |
| `base` | 142 MB | Fast | Better | **MVP Default** |
| `small` | 466 MB | Medium | Excellent | High accuracy needs |
| `medium` | 1.5 GB | Slow | Best | Server-side only |

**Installation:**
```bash
pip install whisper-cpp-python
# Download model
wget https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin
```

**Integration (Backend):**
```python
from whispercpp import Whisper

class STTService:
    def __init__(self):
        self.whisper = Whisper.from_pretrained("base")
    
    def transcribe(self, audio_file: bytes) -> str:
        """Convert speech to text"""
        result = self.whisper.transcribe(audio_file)
        return result["text"].strip()
```

**Integration (Frontend - React Native):**
```typescript
import { Audio } from 'expo-av';

async function recordVoiceCommand(): Promise<string> {
  // Request microphone permission
  await Audio.requestPermissionsAsync();
  
  // Record audio
  const recording = new Audio.Recording();
  await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
  await recording.startAsync();
  
  // ... user speaks ...
  
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  
  // Send to backend STT
  const formData = new FormData();
  formData.append('audio', { uri, type: 'audio/wav', name: 'voice.wav' });
  
  const response = await fetch('/api/voice/stt', {
    method: 'POST',
    body: formData,
  });
  
  const { text } = await response.json();
  return text;
}
```

**Alternative: Vosk**
- Smaller models (~50MB)
- Faster on mobile
- Slightly lower accuracy
- Use if Whisper too heavy for mobile

---

### 2.3 Intent Recognition (NLU)

**Solution: Gemini API**
- Parse natural language voice commands
- Extract intent and parameters
- Handle variations in phrasing

**Example:**
```python
async def parse_voice_intent(voice_text: str, context: dict) -> dict:
    """
    Parse voice command into actionable intent
    
    Args:
        voice_text: Transcribed user speech
        context: Current cooking context (step number, recipe, etc.)
    
    Returns:
        {"intent": "INTENT_NAME", "parameters": {...}}
    """
    prompt = f"""
    User said: "{voice_text}"
    Current context: Step {context['current_step']} of {context['total_steps']}
    
    Classify into one intent:
    - NEXT_STEP, PREVIOUS_STEP, REPEAT, PAUSE, RESUME
    - START_TIMER, STOP_TIMER, TIMER_STATUS
    - INGREDIENT_QUERY, TEMPERATURE_QUERY, TIME_QUERY
    - GENERAL_QUESTION, HELP, FINISH, CANCEL
    
    Return JSON: {{"intent": "...", "parameters": {{...}}}}
    """
    
    response = await gemini.generate_content(prompt)
    return json.loads(response.text)
```

---

## 3. Voice Commands Reference

### 3.1 Navigation Commands

| User Says | Intent | Action | TTS Response |
|-----------|--------|--------|--------------|
| "Next step" | NEXT_STEP | Advance to next step | "Step 2: Chop the onions..." |
| "Next" | NEXT_STEP | Advance to next step | "Step 2: Chop the onions..." |
| "Go to next step" | NEXT_STEP | Advance to next step | "Step 2: Chop the onions..." |
| "Previous step" | PREVIOUS_STEP | Go back one step | "Step 1: Prepare ingredients..." |
| "Go back" | PREVIOUS_STEP | Go back one step | "Step 1: Prepare ingredients..." |
| "Repeat" | REPEAT | Re-read current step | "Step 1: Prepare ingredients..." |
| "Say that again" | REPEAT | Re-read current step | "Step 1: Prepare ingredients..." |

### 3.2 Timer Commands

| User Says | Intent | Parameters | Action |
|-----------|--------|------------|--------|
| "Start timer" | START_TIMER | duration from context | Start timer for current step |
| "Set a timer for 5 minutes" | START_TIMER | duration: 5 | Start 5-minute timer |
| "Timer for 10 minutes" | START_TIMER | duration: 10 | Start 10-minute timer |
| "How much time is left?" | TIMER_STATUS | - | Report remaining time |
| "Stop timer" | STOP_TIMER | - | Cancel active timer |
| "Pause timer" | PAUSE_TIMER | - | Pause timer |

### 3.3 Information Queries

| User Says | Intent | Parameters | TTS Response |
|-----------|--------|------------|--------------|
| "How much salt?" | INGREDIENT_QUERY | ingredient: "salt" | "2 teaspoons of salt" |
| "What temperature?" | TEMPERATURE_QUERY | - | "Preheat to 350 degrees Fahrenheit" |
| "How long does this take?" | TIME_QUERY | - | "This step takes about 5 minutes" |
| "What's next?" | PREVIEW_NEXT | - | "After this, you'll chop the onions" |
| "What ingredients do I need?" | INGREDIENTS_LIST | - | "You need: 2 cups flour, 1 cup sugar..." |

### 3.4 Session Control

| User Says | Intent | Action | TTS Response |
|-----------|--------|--------|--------------|
| "Pause" | PAUSE | Pause cooking session | "Paused. Say resume when ready." |
| "Resume" | RESUME | Resume session | "Resuming. You were on step 3..." |
| "Finish cooking" | FINISH | Complete session | "Great job! Your dish is complete." |
| "Cancel" | CANCEL | Abort session | "Cooking session cancelled." |
| "Help" | HELP | Show available commands | "You can say: next, repeat, timer, pause..." |
| "Start over" | RESTART | Restart from step 1 | "Restarting from the beginning..." |

### 3.5 AI Questions

| User Says | Intent | Action |
|-----------|--------|--------|
| "Why do I need to do this?" | GENERAL_QUESTION | Ask Gemini for explanation |
| "Can I substitute butter?" | GENERAL_QUESTION | Ask Gemini about substitutions |
| "What if I don't have a whisk?" | GENERAL_QUESTION | Ask Gemini for alternatives |
| "How do I know when it's done?" | GENERAL_QUESTION | Ask Gemini for visual cues |

---

## 4. Voice UX Flow

### 4.1 Voice Activation Methods

**Option A: Always Listening (Recommended for MVP)**
- Microphone button visible on screen
- User taps button → starts listening
- User speaks → processes command
- No wake word needed

**Option B: Wake Word (Post-MVP)**
- Always listening for "Hey ChefMentor"
- More battery intensive
- Requires wake word detection model

**MVP Implementation: Push-to-Talk**
```typescript
function VoiceButton() {
  const [isListening, setIsListening] = useState(false);
  
  const handleVoiceCommand = async () => {
    setIsListening(true);
    
    // Record audio
    const voiceText = await recordVoiceCommand();
    
    // Send to backend
    const intent = await parseVoiceIntent(voiceText);
    
    // Execute action
    await handleIntent(intent);
    
    setIsListening(false);
  };
  
  return (
    <TouchableOpacity onPress={handleVoiceCommand}>
      <Icon name={isListening ? "mic-on" : "mic-off"} />
    </TouchableOpacity>
  );
}
```

---

### 4.2 Voice Feedback Loop

```
User taps microphone button
    ↓
App: Visual feedback (pulsing mic icon)
App: Play "listening" sound (beep)
    ↓
User speaks: "Next step"
    ↓
App: Visual feedback (processing...)
App: STT transcribes: "Next step"
    ↓
App: NLU parses intent: NEXT_STEP
    ↓
App: Executes action (advance to step 2)
    ↓
App: TTS speaks: "Step 2: Chop the onions into small pieces"
App: Visual shows step 2 content
    ↓
[Ready for next command]
```

---

### 4.3 Error Handling

| Error | TTS Response | Visual Feedback |
|-------|--------------|-----------------|
| STT failed to understand | "Sorry, I didn't catch that. Please try again." | Show mic button again |
| Ambiguous command | "Did you mean next step or repeat?" | Show options |
| Invalid command for context | "You can't do that right now. Try saying help." | Show available commands |
| Network error | "I'm having trouble connecting. Using offline mode." | Show offline indicator |
| Timer already running | "A timer is already running. Want to stop it?" | Show timer status |

---

## 5. Accessibility Features

### 5.1 Voice-Only Mode

**Enable for:**
- Visually impaired users
- Users with messy hands
- Multitasking users

**Features:**
- Auto-read each step aloud
- Spoken confirmation of all actions
- Audio progress indicators ("You're on step 3 of 8")
- Timer alerts via sound + speech

**Implementation:**
```typescript
const [voiceOnlyMode, setVoiceOnlyMode] = useState(false);

useEffect(() => {
  if (voiceOnlyMode && currentStep) {
    // Auto-read step aloud
    speakText(currentStep.instruction);
  }
}, [currentStep, voiceOnlyMode]);
```

---

### 5.2 Voice Settings

**User Preferences:**
- **TTS Speed:** 0.8x, 1.0x (default), 1.2x, 1.5x
- **TTS Voice:** Male/Female options
- **Auto-read:** On/Off (automatically read new steps)
- **Voice confirmation:** On/Off (confirm every action)
- **Volume boost:** For noisy kitchens

**Storage:**
```typescript
interface VoiceSettings {
  ttsSpeed: number;
  ttsVoice: 'male' | 'female';
  autoRead: boolean;
  voiceConfirmation: boolean;
  volumeBoost: boolean;
}
```

---

## 6. Performance Requirements

### 6.1 Latency Targets

| Operation | Target | Max Acceptable |
|-----------|--------|----------------|
| TTS synthesis | < 300ms | 500ms |
| STT transcription | < 1s | 2s |
| Intent parsing | < 500ms | 1s |
| **Total voice response** | **< 2s** | **3s** |

### 6.2 Audio Quality

**TTS Output:**
- Sample rate: 22050 Hz
- Format: WAV or MP3
- Bitrate: 64 kbps (sufficient for speech)

**STT Input:**
- Sample rate: 16000 Hz (Whisper optimized)
- Format: WAV
- Channels: Mono
- Max duration: 30 seconds per command

---

## 7. Backend API Endpoints

### 7.1 POST /api/voice/tts

**Request:**
```json
{
  "text": "Step 1: Preheat oven to 350 degrees",
  "voice": "en_US-lessac-medium",
  "speed": 1.0
}
```

**Response:**
```
Content-Type: audio/wav
[Audio binary data]
```

**Implementation:**
```python
@app.post("/api/voice/tts")
async def text_to_speech(request: TTSRequest):
    audio_bytes = tts_service.synthesize(
        text=request.text,
        voice=request.voice,
        speed=request.speed
    )
    return Response(content=audio_bytes, media_type="audio/wav")
```

---

### 7.2 POST /api/voice/stt

**Request:**
```
Content-Type: multipart/form-data
audio: [audio file]
```

**Response:**
```json
{
  "text": "next step",
  "confidence": 0.95,
  "language": "en"
}
```

**Implementation:**
```python
@app.post("/api/voice/stt")
async def speech_to_text(audio: UploadFile):
    audio_bytes = await audio.read()
    transcription = stt_service.transcribe(audio_bytes)
    return {
        "text": transcription,
        "confidence": 0.95,  # If model provides
        "language": "en"
    }
```

---

### 7.3 POST /api/voice/command

**Request:**
```json
{
  "voice_text": "next step",
  "context": {
    "session_id": "uuid",
    "current_step": 1,
    "total_steps": 8,
    "recipe_id": "uuid"
  }
}
```

**Response:**
```json
{
  "intent": "NEXT_STEP",
  "parameters": {},
  "action_taken": "advanced_to_step_2",
  "tts_response": "Step 2: Chop the onions into small pieces",
  "next_step": {
    "step_number": 2,
    "instruction": "Chop the onions into small pieces",
    "visual_cue": "Onions should be roughly 1/4 inch cubes"
  }
}
```

**Implementation:**
```python
@app.post("/api/voice/command")
async def process_voice_command(request: VoiceCommandRequest):
    # Parse intent
    intent_data = await parse_voice_intent(
        request.voice_text, 
        request.context
    )
    
    # Execute action
    result = await execute_intent(intent_data, request.context)
    
    # Generate TTS response
    tts_text = generate_response_text(result)
    
    return {
        "intent": intent_data["intent"],
        "parameters": intent_data["parameters"],
        "action_taken": result["action"],
        "tts_response": tts_text,
        "next_step": result.get("step_data")
    }
```

---

## 8. Testing Strategy

### 8.1 Voice Recognition Accuracy Tests

**Test Scenarios:**
1. Clear speech, quiet environment → 95%+ accuracy
2. Speech with accent → 85%+ accuracy
3. Noisy kitchen (running water, fan) → 75%+ accuracy
4. Fast speech → 80%+ accuracy
5. Slow speech → 90%+ accuracy

**Test Data:**
- Record 50+ voice samples per command
- Test across different speakers (age, gender, accent)
- Test in different noise conditions

---

### 8.2 Intent Classification Tests

```python
def test_intent_classification():
    test_cases = [
        ("next step", "NEXT_STEP"),
        ("go to the next one", "NEXT_STEP"),
        ("what's next", "PREVIEW_NEXT"),
        ("set timer for 5 minutes", "START_TIMER"),
        ("how much salt do I need", "INGREDIENT_QUERY"),
    ]
    
    for voice_text, expected_intent in test_cases:
        result = parse_voice_intent(voice_text, {})
        assert result["intent"] == expected_intent
```

---

### 8.3 TTS Quality Tests

**Criteria:**
- Pronunciation correctness (especially food terms)
- Natural prosody (not robotic)
- Appropriate pauses at commas/periods
- Correct emphasis on important words

**Test Words:**
- Quinoa, bruschetta, gnocchi, croissant
- Fahrenheit, Celsius, tablespoon, teaspoon
- Sauté, julienne, blanch, braise

---

## 9. Offline Capability

### 9.1 Offline Voice Features

**Available Offline:**
- ✅ TTS (Piper runs locally)
- ✅ STT (Whisper runs locally)
- ✅ Basic commands (next, previous, repeat, timer)
- ✅ Step navigation

**Not Available Offline:**
- ❌ AI questions (requires Gemini/Groq)
- ❌ Recipe generation
- ❌ Complex intent parsing

**Fallback Strategy:**
```python
async def process_command_offline(voice_text: str) -> dict:
    """Simple pattern matching for offline mode"""
    
    voice_lower = voice_text.lower()
    
    if "next" in voice_lower:
        return {"intent": "NEXT_STEP"}
    elif "back" in voice_lower or "previous" in voice_lower:
        return {"intent": "PREVIOUS_STEP"}
    elif "repeat" in voice_lower or "again" in voice_lower:
        return {"intent": "REPEAT"}
    elif "timer" in voice_lower:
        # Extract duration if mentioned
        duration = extract_duration(voice_text)
        return {"intent": "START_TIMER", "parameters": {"duration": duration}}
    else:
        return {"intent": "UNKNOWN"}
```

---

## 10. Privacy & Security

### 10.1 Voice Data Handling

**Privacy Principles:**
- ✅ Audio processed on-device when possible (Piper/Whisper)
- ✅ No audio recordings stored on server
- ✅ Transcriptions not logged (unless user consents)
- ✅ No third-party voice services used

**Data Flow:**
```
User speaks → Device microphone
    ↓
Audio captured temporarily in memory
    ↓
[Option A: Local STT] → Transcription → Delete audio
[Option B: Server STT] → Send audio → Transcribe → Delete audio immediately
    ↓
Text command processed
    ↓
Intent extracted
    ↓
Action executed
    ↓
[No audio or transcription stored]
```

---

### 10.2 Permissions

**Required Permissions:**
- 🎤 Microphone access (for STT)
- 🔊 Audio playback (for TTS)

**Permission Request Flow:**
```typescript
async function requestVoicePermissions() {
  const { status } = await Audio.requestPermissionsAsync();
  
  if (status !== 'granted') {
    // Show explanation
    Alert.alert(
      'Microphone Access Needed',
      'ChefMentor needs microphone access for hands-free cooking. Your voice is processed locally and not stored.',
      [{ text: 'OK' }]
    );
  }
  
  return status === 'granted';
}
```

---

## 11. Implementation Checklist

- [ ] Install Piper TTS and download voice models
- [ ] Install Whisper.cpp and download base model
- [ ] Create TTS API endpoint
- [ ] Create STT API endpoint
- [ ] Create voice command processing endpoint
- [ ] Implement intent parsing with Gemini
- [ ] Add voice button to UI
- [ ] Implement push-to-talk functionality
- [ ] Add voice feedback (listening indicator, processing state)
- [ ] Test all voice commands
- [ ] Test in noisy environment
- [ ] Add voice settings to user preferences
- [ ] Implement offline fallback for basic commands
- [ ] Add accessibility features (voice-only mode)
- [ ] Performance test (latency under 2s)
- [ ] Privacy review (ensure no data stored)
- [ ] User testing with 5+ testers

---

## 12. Future Enhancements

**Post-MVP:**
1. **Wake word detection:** "Hey ChefMentor"
2. **Continuous listening mode:** No button press needed
3. **Multi-language support:** Spanish, Hindi, Mandarin
4. **Voice personalization:** Learn user's voice for better accuracy
5. **Emotion detection:** Detect frustration, adjust guidance
6. **Hands-free timer management:** "Add 2 more minutes"
7. **Shopping list via voice:** "Add milk to shopping list"

---

**Document Owner:** Voice AI Team  
**Review Cycle:** Every sprint  
**Last Reviewed:** February 12, 2026
