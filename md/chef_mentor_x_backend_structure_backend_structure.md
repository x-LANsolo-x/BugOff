# ChefMentor X – Backend Structure Documentation

---

## App Context
ChefMentor X is a mobile-first AI cooking mentor with two primary user intents:
1) **Cook a Dish** – live, step-aware cooking guidance with mandatory voice support.
2) **Analyze Failed Dish** – post-cooking failure diagnosis using image/video uploads.

The backend supports authentication, recipe orchestration, AI inference coordination, failure analysis, personalization, and demo-friendly access. This document follows the required structure defined in the provided template fileciteturn6file0.

---

## 1. ARCHITECTURE OVERVIEW

### Backend Architecture

**Runtime & Framework:**
- **Runtime:** Python 3.11+
- **Framework:** FastAPI (async API framework)
- **ORM:** SQLAlchemy 2.x (async) with asyncpg driver
- **Migrations:** Alembic
- **Database:** PostgreSQL 15.x
- **Caching:** Redis 7.2+

### System Architecture (Text-Based)

```
[ Mobile App (React Native) ]
          |
          v
[ API Gateway – FastAPI ]
          |
-------------------------------------------------
|        |           |            |              |
Auth   Cooking     Failure     Profile        Media
Svc    Flow Svc    Analysis     Svc            Svc
        |             |            |              |
        v             v            v              v
     PostgreSQL     PostgreSQL   PostgreSQL    Cloudinary
     (SQLAlchemy)                              (AI Vision)
        |
        v
      Redis (cache, sessions, rate limits)
        
        
External APIs:
- Google Gemini (Primary AI)
- Groq (Fallback AI)
- RecipeDB (Recipe data)
- FlavorDB (Ingredient pairing)
```

### Request / Response Flow
1. Client sends HTTPS request to FastAPI
2. Auth middleware validates JWT (if required)
3. Request routed to feature module
4. Data fetched from DB / cache
5. Optional call to external APIs (RecipeDB, FlavorDB)
6. Response returned as JSON

### Service Boundaries
- **Auth Module:** Login, demo access, JWT handling
- **Cooking Module:** Recipe steps, live guidance orchestration
- **Failure Module:** Uploads, diagnosis, explanations
- **Profile Module:** Cooking history and personalization
- **Media Module:** Cloudinary integration

### External Integrations
- **AI Services:** Google Gemini (primary), Groq (fallback)
- **Recipe Data:** RecipeDB API, FlavorDB API
- **Media Storage:** Cloudinary (image/video storage)
- **Authentication:** Google OAuth
- **Voice AI:** Piper TTS (local), Whisper STT (local)
- **Analytics:** PostHog
- **Error Tracking:** Sentry

---

## 2. DATABASE SCHEMA

### Table: users
- **Purpose:** Store registered users
- id: UUID, primary key
- email: VARCHAR(255), unique, not null
- name: VARCHAR(100), not null
- role: ENUM('user','admin'), default 'user'
- created_at: TIMESTAMP, not null
- updated_at: TIMESTAMP, not null

Indexes:
- idx_users_email (email)

Relationships:
- One-to-Many with cooking_sessions
- One-to-Many with failure_analyses

---

### Table: demo_sessions
- **Purpose:** Track demo users without login
- id: UUID, primary key
- created_at: TIMESTAMP, not null
- expires_at: TIMESTAMP, not null

Relationships:
- One-to-Many with cooking_sessions
- One-to-Many with failure_analyses

---

### Table: recipes
- **Purpose:** Store supported recipes (MVP = 5)
- id: UUID, primary key
- name: VARCHAR(150), not null
- difficulty: ENUM('easy','medium','hard')
- estimated_time_min: INT
- created_at: TIMESTAMP

Indexes:
- idx_recipes_name (name)

---

### Table: recipe_steps
- **Purpose:** Ordered steps per recipe
- id: UUID, primary key
- recipe_id: UUID, foreign key → recipes.id
- step_number: INT, not null
- instruction: TEXT, not null
- expected_state: VARCHAR(100)

Indexes:
- idx_steps_recipe (recipe_id)

---

### Table: cooking_sessions
- **Purpose:** Track live cooking attempts
- id: UUID, primary key
- user_id: UUID, nullable → users.id
- demo_session_id: UUID, nullable → demo_sessions.id
- recipe_id: UUID → recipes.id
- started_at: TIMESTAMP
- completed_at: TIMESTAMP
- status: ENUM('in_progress','completed','abandoned')

---

### Table: failure_analyses
- **Purpose:** Store failure diagnosis attempts
- id: UUID, primary key
- user_id: UUID, nullable → users.id
- demo_session_id: UUID, nullable → demo_sessions.id
- media_url: TEXT, not null
- root_cause: TEXT
- explanation: TEXT
- created_at: TIMESTAMP

---

### Table: user_profiles
- **Purpose:** Store personalization data
- id: UUID, primary key
- user_id: UUID → users.id
- cooking_habits: JSONB
- updated_at: TIMESTAMP

---

### Table: audit_logs
- **Purpose:** Track important backend events
- id: UUID, primary key
- entity: VARCHAR(50)
- entity_id: UUID
- action: VARCHAR(50)
- created_at: TIMESTAMP

---

## 3. API ENDPOINTS

### Authentication

**POST /api/auth/google**  
Purpose: Login with Google OAuth  
Auth: No  
Rate Limit: 5 / 15 min

Response (200):
```json
{ "accessToken": "string", "refreshToken": "string" }
```

---

### Demo Access

**POST /api/demo/start**  
Purpose: Create demo session  
Auth: No

Response:
```json
{ "demoSessionId": "uuid" }
```

---

### Cooking

**GET /api/recipes**  
Purpose: List supported recipes  
Auth: Optional

**POST /api/cooking/start**  
Purpose: Start cooking session  
Auth: Optional

**POST /api/cooking/step-event**  
Purpose: Receive step boundary events and return guidance

---

### Failure Analysis

**POST /api/failure/analyze**  
Purpose: Analyze failed dish  
Auth: Optional

---

## 4. DATA MODELS (Example)

```python
class Recipe(Base):
    id: UUID
    name: str
    difficulty: str
    estimated_time_min: int
```

---

## 5. AUTHENTICATION & AUTHORIZATION

- JWT access token (15 min)
- Refresh token (7 days)
- **Demo sessions valid for 24 hours**
- Demo sessions bypass login but are time-limited

---

## 6. BUSINESS LOGIC LAYER

Rule: Demo users cannot access saved profiles  
Applies To: Profile endpoints  
Logic:
- IF demo_session
  THEN restrict profile persistence

Rule: Failure analysis user notes  
Applies To: Failure analysis endpoints  
Logic:
- AI diagnosis is immutable
- Users can **add/edit personal notes** linked to the analysis

Rule: Admin functionality  
Applies To: Entire system  
Logic:
- No admin-only endpoints in MVP
- Admin tools planned post-MVP

---

## 7. FILE STORAGE STRATEGY

- Provider: Cloudinary
- Allowed types: JPG, PNG, MP4
- Max size: 20MB
- Store only URLs in DB

---

## 8. CACHING STRATEGY

- Redis mandatory
- Cache recipe steps (TTL 1h)
- Cache active cooking sessions

---

## 9. ERROR HANDLING

```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Invalid input" } }
```

---

## 10. SECURITY MEASURES

- Rate limiting
- Input validation via Pydantic
- HTTPS only
- Secure headers

---

## 11. BACKGROUND JOBS

- Image preprocessing
- Cache cleanup
- Audit log rotation

---

## 12. MONITORING & HEALTH

- /health endpoint
- DB connectivity check
- Redis connectivity check

---

