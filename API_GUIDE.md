# 📖 ChefMentor X - Backend API Guide

**Base URL:** `http://localhost:8000/api/v1`

---

## 🍳 Cooking Flow (The Core Feature)

### 1. Find a Recipe
**Endpoint:** `GET /recipes`
*   **List Local:** `?source=local`
*   **Search External:** `?source=recipedb`
*   **Generate AI:** `?source=ai&query=Tacos`

**Response:**
```json
{
  "data": [
    { "id": "uuid", "name": "Maggi Noodles", "steps": [...] }
  ]
}
```

### 2. Start Cooking
**Endpoint:** `POST /cooking/start`
**Body:**
```json
{
  "recipe_id": "uuid_from_previous_step"
}
```
**Response:** `session_id` (Save this!)

### 3. Get Current Instruction
**Endpoint:** `GET /cooking/{session_id}/current`
**Response:**
```json
{
  "step_number": 1,
  "instruction": "Boil water",
  "guidance": "Use a lid to boil faster!"  <-- AI Tip (Prefetched)
}
```

### 4. Next Step
**Endpoint:** `POST /cooking/{session_id}/next`
*   *Note:* This triggers background AI prefetching for the *next* step.

---

## 🎙️ Voice Features

### 1. Parse Voice Command
**Endpoint:** `POST /voice/command`
**Body:** `{"text": "Set timer for 5 minutes"}`
**Response:** `{"intent": "TIMER", "duration_seconds": 300}`

### 2. Text to Speech
**Endpoint:** `POST /voice/tts`
**Body:** `{"text": "Hello Chef"}`
**Response:** Audio file (MP3)

---

## 📸 Failure Analysis

### 1. Analyze Photo
**Endpoint:** `POST /failure/analyze`
**Format:** `multipart/form-data`
**Field:** `file` (Image)
**Response:**
```json
{
  "root_cause": "Burnt garlic",
  "explanation": "High heat caused bitter taste.",
  "suggestions": ["Add garlic last", "Use medium heat"]
}
```

---

## 👤 User Profile

### 1. Update Preferences
**Endpoint:** `PUT /profile`
**Header:** `X-User-ID: uuid`
**Body:**
```json
{
  "cooking_habits": {
    "diet": "vegan",
    "allergies": ["nuts"]
  }
}
```
