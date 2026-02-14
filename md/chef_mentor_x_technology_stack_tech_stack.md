# ChefMentor X – Technology Stack Documentation

---

## App Context
- **App Type:** Mobile Application (Primary), Backend API
- **Scale:** MVP (Hackathon + Early Startup)
- **Team Size:** 4 developers
- **Timeline:** Hackathon MVP (short-term, demo-focused)

---

## 1. Stack Overview

### Architecture Pattern
- **Type:** Modular Monolithic Architecture

**Justification:**
- Faster development for hackathon timelines
- Easier debugging and demo stability
- Clear separation of modules (Auth, Cooking Flow, Failure Analysis)
- Can later evolve into microservices if needed

### Deployment Strategy
- Frontend and backend deployed independently
- Cloud-managed services to reduce DevOps overhead

---

## 2. Frontend Stack

### Framework
- **React Native 0.73.6**
- Docs: https://reactnative.dev/
- License: MIT
- **Reason:** Cross-platform mobile support with strong ecosystem
- **Alternatives Rejected:** Flutter (learning curve, Dart ecosystem)

### Language
- **TypeScript 5.3.3**
- Docs: https://www.typescriptlang.org/
- License: Apache 2.0
- **Reason:** Type safety, better scalability

### Styling
- **NativeWind 4.0.12** (Tailwind for React Native)
- Docs: https://www.nativewind.dev/
- License: MIT
- **Reason:** Fast UI iteration

### State Management
- **Zustand 4.5.2**
- Docs: https://zustand-demo.pmnd.rs/
- License: MIT
- **Reason:** Lightweight, minimal boilerplate

### Form Handling
- **React Hook Form 7.49.3**
- Docs: https://react-hook-form.com/
- License: MIT

### HTTP Client
- **Axios 1.6.5**
- Docs: https://axios-http.com/
- License: MIT

### Routing
- **React Navigation 6.1.9**
- Docs: https://reactnavigation.org/
- License: MIT

### UI Components
- **Custom Components**
- **Reason:** Design flexibility and hackathon speed

---

## 3. Backend Stack

### Runtime
- **Python 3.11**
- Docs: https://www.python.org/
- License: PSF

### Framework
- **FastAPI 0.110.x**
- Docs: https://fastapi.tiangolo.com/
- License: MIT
- **Reason:** High performance, async support, easy AI/ML integration
- **Alternative Rejected:** Node.js (Fastify) – less aligned with ML workflows

### Database
- **PostgreSQL 15.5**
- Docs: https://www.postgresql.org/
- License: PostgreSQL License

### ORM
- **SQLAlchemy 2.x (Async) + Alembic**
- Driver: asyncpg
- Docs: https://www.sqlalchemy.org/
- License: MIT
- **Reason:** Async support for FastAPI, mature Python ORM

### Caching
- **Redis 7.2.4 (Mandatory)**
- Docs: https://redis.io/
- License: RSAL
- **Usage:** Session caching, recipe step caching, inference throttling

### Authentication
- **OAuth 2.0 (Google)**
- **JWT (python-jose)**
- Docs: https://python-jose.readthedocs.io/

### File Storage
- **Cloudinary**
- Docs: https://cloudinary.com/
- License: Commercial (Free Tier for MVP)
- **Usage:** Image/video uploads for failure analysis

---

## 4. Database Schema Strategy

- **Migrations:** Alembic (Python migration tool)
- **Seeding:** Python seed scripts
- **Backup:** Daily managed DB backups
- **Pooling:** SQLAlchemy connection pooling + PgBouncer (optional)

---

## 5. DevOps & Infrastructure

### Version Control
- GitHub
- **Branching:** GitHub Flow

### CI/CD
- GitHub Actions
- Lint + build on pull requests

### Hosting
- **Frontend:** Expo Go (Demo) / EAS Build
- **Backend:** Railway
- **Database:** Railway PostgreSQL

### Monitoring & Analytics
- **Analytics:** PostHog (Open Source)
- **Errors:** Sentry
- **Logs:** Railway logs
- **Metrics:** Prometheus + Grafana (optional for production)

### Testing
- **Unit:** Jest 29.7.0
- **E2E:** Not in MVP

---

## 6. Development Tools

- **ESLint 8.56.0** (Airbnb base)
- **Prettier 3.2.2**
- **Husky 9.0.11** (pre-commit hooks)
- **IDE:** VS Code

---

## 6.5. AI/ML Stack

### AI Providers
- **Primary LLM:** Google Gemini 1.5 (Flash/Pro)
- Docs: https://ai.google.dev/
- License: Commercial (Free Tier: 15 RPM, 1M TPM, 1500 RPD)
- **Reason:** Free, high-quality, multimodal (text + vision)

- **Fallback LLM:** Groq (Llama 3.1 70B / Mixtral)
- Docs: https://groq.com/
- License: Commercial (Free Tier: generous limits)
- **Reason:** Fast inference, free tier, reliability backup

### Vision AI
- **Gemini 1.5 Pro Vision**
- **Usage:** Analyze uploaded dish photos for "Failed Dish Analysis"
- **Fallback:** Text-only analysis with user description

### Voice AI
- **TTS (Text-to-Speech):** Piper TTS or Coqui TTS
- Docs: https://github.com/rhasspy/piper
- License: MIT (Open Source)
- **Reason:** Free, runs locally, offline capable, natural voices

- **STT (Speech-to-Text):** Whisper.cpp or Vosk
- Docs: https://github.com/ggerganov/whisper.cpp
- License: MIT (Open Source)
- **Reason:** Free, runs locally, accurate voice recognition

- **Fallback:** expo-speech (device native TTS/STT)

### AI Safety
- **Pre-prompt Safety Instructions:** Food safety guidelines
- **Post-processing Validation:** Check for dangerous advice
- **Blocked Terms List:** Raw meat handling, unsafe temperatures
- **Human Review Queue:** Flag suspicious AI responses

### External Recipe APIs
- **RecipeDB API**
- Docs: https://cosylab.iiitd.edu.in/recipedb/
- **Usage:** Fetch structured recipe data

- **FlavorDB API**
- Docs: https://cosylab.iiitd.edu.in/flavordb/
- **Usage:** Ingredient pairing and flavor profiles

---

## 7. Environment Variables

```
# Database
DATABASE_URL="PostgreSQL connection string"
REDIS_URL="Redis connection string"

# Authentication
JWT_SECRET="JWT signing secret"
JWT_ALGORITHM="HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES="15"
GOOGLE_CLIENT_ID="Google OAuth client ID"
GOOGLE_CLIENT_SECRET="Google OAuth client secret"

# File Storage
CLOUDINARY_CLOUD_NAME="Cloudinary cloud name"
CLOUDINARY_API_KEY="Cloudinary API key"
CLOUDINARY_API_SECRET="Cloudinary API secret"

# AI/ML APIs
GEMINI_API_KEY="Google Gemini API key"
GROQ_API_KEY="Groq API key"

# Recipe APIs
RECIPE_DB_API_KEY="RecipeDB API key"
FLAVOR_DB_API_KEY="FlavorDB API key"

# Analytics
POSTHOG_API_KEY="PostHog project API key"
POSTHOG_HOST="PostHog instance URL"

# Rate Limiting
RATE_LIMIT_ENABLED="true"
```

---

## 8. Package.json Scripts

```json
// Frontend package.json scripts
{
  "scripts": {
    "dev": "expo start",
    "build": "expo build",
    "lint": "eslint .",
    "test": "jest",
    "start": "expo start"
  }
}
```

```bash
# Backend Python scripts (Makefile or just commands)
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Database migrations
alembic upgrade head  # Run migrations
alembic revision --autogenerate -m "migration message"  # Create migration

# Testing
pytest tests/ -v --cov=app

# Code quality
black app/ tests/
ruff check app/ tests/
```

---

## 9. Dependencies Lock

```json
// Frontend dependencies
{
  "react": "18.2.0",
  "react-native": "0.73.6",
  "expo": "50.0.6",
  "zustand": "4.5.2",
  "axios": "1.6.5"
}
```

```txt
# Backend Python Dependencies (requirements.txt)

# Web Framework
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# Database & ORM
sqlalchemy[asyncio]==2.0.25
asyncpg==0.29.0
alembic==1.13.1
psycopg2-binary==2.9.9

# Authentication & Security
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
pydantic==2.5.3
pydantic-settings==2.1.0

# AI/ML
google-generativeai==0.3.2  # Gemini SDK
groq==0.4.1  # Groq SDK

# File Storage
cloudinary==1.38.0

# Rate Limiting
slowapi==0.1.9

# Caching
redis==5.0.1
hiredis==2.3.2

# HTTP Client
requests==2.31.0
httpx==0.26.0

# Testing
pytest==7.4.4
pytest-asyncio==0.23.3
pytest-cov==4.1.0

# Code Quality
black==23.12.1
ruff==0.1.11
```

---

## 10. Security Considerations

- OAuth-based login
- JWT expiry: 15 minutes
- Refresh tokens (future)
- HTTPS enforced
- Rate limiting on API routes
- No media stored without consent

---

## 11. Version Upgrade Policy

- Patch updates applied immediately
- Minor updates tested monthly
- Major updates post-hackathon
- Rollback via tagged releases

---

