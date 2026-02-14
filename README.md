# BugOff

BugOff is a voice-first, AI-assisted cooking companion that helps home cooks follow recipes, ask questions hands-free, and learn from mistakes. It combines step-by-step guidance with real-time assistance so users can cook confidently without constantly touching their phones.

## Features

- Voice-first cooking flow with hands-free controls
- Context-aware coaching during each step
- Photo-based failure analysis to diagnose what went wrong
- Clear, accessible UI designed for use while cooking
- Demo mode for trying the app without an account

## Tech Stack

**Backend**
- FastAPI
- SQLAlchemy
- PostgreSQL
- Redis
- Alembic

**Frontend**
- React Native
- Expo
- TypeScript
- Zustand
- React Navigation

**AI/ML Services**
- Google Gemini
- Groq Whisper
- Google Text-to-Speech

**Infrastructure**
- Cloudinary
- Railway (recommended)
- Upstash (recommended)

## 🚀 Quick Start

### First Time Setup (5 minutes)

**New to the project?** Follow our automated setup guide:

👉 **[FIRST_TIME_SETUP.md](FIRST_TIME_SETUP.md)** - Complete step-by-step setup from git clone to running app

**Quick Install:**

```bash
# 1. Clone the repository
git clone https://github.com/x-LANsolo-x/BugOff.git
cd BugOff

# 2. Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials (minimum: DATABASE_URL, GEMINI_API_KEY, GROQ_API_KEY)
python setup_database.py  # Automated database setup!

# 3. Start Backend
uvicorn app.main:app --reload

# 4. Frontend Setup (in new terminal)
cd frontend-v1
npm install
npm start
```

### Returning Users - One Command Startup

```bash
# Mac/Linux
./START_PROJECT.sh

# Windows PowerShell
.\START_PROJECT.ps1
```

Or manually:
```bash
# Terminal 1: Backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend-v1 && npm start
```

## ✅ Testing

```bash
# Backend tests with coverage
cd backend
python run_tests.py

# Or use pytest directly
pytest tests/ -v --cov=app

# Frontend tests
cd frontend-v1
npm test
```

## Project Structure

```
BugOff/
├── backend/                 # Python FastAPI backend
│   ├── app/                 # Application code
│   ├── tests/               # Backend tests
│   ├── alembic/             # Database migrations
│   ├── .env                 # Environment variables (not in git)
│   ├── .env.example         # Environment template
│   └── requirements.txt     # Python dependencies
│
├── frontend/                # React Native mobile app
│   ├── src/                 # Source code
│   │   ├── screens/         # Screen components
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API and service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Zustand state management
│   │   └── utils/           # Utilities and helpers
│   ├── assets/              # Images, fonts
│   ├── App.tsx              # Root component
│   └── package.json         # Node dependencies
│
├── docs/                    # Planning and implementation docs
├── md/                      # Detailed technical specifications
├── stitch/                  # UI design prototypes (HTML/CSS)
├── SETUP.md                 # Setup instructions
└── README.md                # This file
```

## Documentation

Additional documentation is available in the `docs` and `md` directories:

- `SETUP.md` - Complete installation guide
- `docs/IMPLEMENTATION_PLAN.md` - Development roadmap
- `docs/PROJECT_TIMELINE_GANTT.md` - Timeline and milestones
- `md/chef_mentor_x_backend_structure_backend_structure.md` - Backend structure
- `md/chef_mentor_x_frontend_design_system_frontend_guidelines.md` - Frontend design system
- `md/chef_mentor_x_technology_stack_tech_stack.md` - Technology stack details
- `md/chef_mentor_x_testing_strategy.md` - Testing strategy
- `md/chef_mentor_x_ai_ml_strategy.md` - AI/ML strategy
- `md/chef_mentor_x_voice_interaction_spec.md` - Voice interaction specification
- `md/chef_mentor_x_recipe_integration_guide.md` - Recipe integration guide
- `md/chef_mentor_x_privacy_security_policy.md` - Privacy and security policy
- `md/chef_mentor_x_final_prd_v_2_two_tab_experience.md` - Product requirements
- `md/chef_mentor_x_application_flow_app_flow.md` - Application flow

## 🔧 Troubleshooting

Having issues? Check our comprehensive troubleshooting guide:

👉 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solutions to common setup and runtime issues

**Quick Fixes:**

- **Database issues:** Run `python setup_database.py` in backend directory
- **Port in use:** Kill the process or use different port
- **Module not found:** Activate virtual environment and reinstall dependencies
- **Frontend can't connect:** Update `frontend-v1/src/config/env.ts` with your computer's IP

For detailed solutions, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or [SETUP.md](SETUP.md).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Contact & Support

- Issues: https://github.com/x-LANsolo-x/BugOff/issues
- Email: shashwatvatsyayan@gmail.com
- GitHub: https://github.com/x-LANsolo-x

## Contributors

The full list of contributors is always available on GitHub:
https://github.com/x-LANsolo-x/BugOff/graphs/contributors

This project uses the All Contributors specification to keep the list below up to date.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Made by Team BugOff
