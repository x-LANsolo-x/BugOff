# 🍳 ChefMentor X

> **AI-Powered Voice-First Cooking Assistant**

ChefMentor X is a revolutionary mobile cooking application that combines AI-powered guidance with voice-first interaction to make cooking accessible, educational, and enjoyable for everyone.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Node](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61dafb.svg)](https://reactnative.dev/)

---

## ✨ Features

### 🎙️ **Voice-First Design**
- **Hands-Free Cooking**: Control everything with your voice using Whisper STT
- **Natural Language**: Speak naturally - "What's next?", "Repeat that", "Set timer"
- **Text-to-Speech**: Clear audio instructions while you cook

### 🤖 **AI Cooking Coach**
- **Real-Time Guidance**: Google Gemini AI provides contextual cooking tips
- **Adaptive Instructions**: Adjusts based on your skill level and progress
- **Smart Q&A**: Ask questions anytime - "How do I know when it's done?"

### 📸 **Failure Analysis**
- **Upload Failed Dishes**: Take a photo of what went wrong
- **AI Diagnosis**: Get detailed analysis of what happened
- **Improvement Tips**: Learn specific steps to improve next time

### 🍽️ **User-Friendly Design**
- **Large Touch Targets**: Easy to use with messy hands
- **Two-Tab Interface**: Simple navigation (Cook vs Analyze)
- **Demo Mode**: Try without creating an account
- **Progressive Skill Building**: Learn as you cook

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **PostgreSQL 14+**
- **Redis 6+**

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/chefmentor-x.git
cd chefmentor-x

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys
```

### Run the App

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm start
```

📖 **For detailed setup instructions, see [SETUP.md](SETUP.md)**

---

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database management
- **PostgreSQL** - Primary database
- **Redis** - Caching and session management
- **Alembic** - Database migrations

### Frontend
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **Zustand** - State management
- **React Navigation** - Routing and navigation

### AI/ML Services
- **Google Gemini** - AI cooking guidance and analysis
- **Groq Whisper** - Speech-to-text processing
- **Google TTS** - Text-to-speech output

### Infrastructure
- **Cloudinary** - Image storage and processing
- **Railway** - Backend deployment (recommended)
- **Upstash** - Serverless Redis (recommended)

---

## 📱 Screenshots

> Coming soon! See `/stitch` folder for UI prototypes

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` and `/md` folders:

### Getting Started
- 📋 [**SETUP.md**](SETUP.md) - Complete installation guide
- 🗺️ [**IMPLEMENTATION_PLAN.md**](docs/IMPLEMENTATION_PLAN.md) - Development roadmap
- 📅 [**PROJECT_TIMELINE_GANTT.md**](docs/PROJECT_TIMELINE_GANTT.md) - Timeline and milestones

### Technical Documentation
- 🏗️ [**Backend Structure**](md/chef_mentor_x_backend_structure_backend_structure.md)
- 🎨 [**Frontend Design System**](md/chef_mentor_x_frontend_design_system_frontend_guidelines.md)
- 🔧 [**Technology Stack**](md/chef_mentor_x_technology_stack_tech_stack.md)
- 🧪 [**Testing Strategy**](md/chef_mentor_x_testing_strategy.md)

### Feature Specifications
- 🤖 [**AI/ML Strategy**](md/chef_mentor_x_ai_ml_strategy.md)
- 🎙️ [**Voice Interaction Spec**](md/chef_mentor_x_voice_interaction_spec.md)
- 🍲 [**Recipe Integration Guide**](md/chef_mentor_x_recipe_integration_guide.md)
- 🔐 [**Privacy & Security**](md/chef_mentor_x_privacy_security_policy.md)

### Product
- 📄 [**Product Requirements**](md/chef_mentor_x_final_prd_v_2_two_tab_experience.md)
- 🔄 [**Application Flow**](md/chef_mentor_x_application_flow_app_flow.md)

---

## 🗂️ Project Structure

```
chefmentor-x/
├── backend/                 # Python FastAPI backend
│   ├── app/                 # Application code (to be created)
│   ├── tests/               # Backend tests
│   ├── alembic/             # Database migrations
│   ├── .env                 # Environment variables (not in git)
│   ├── .env.example         # Environment template
│   └── requirements.txt     # Python dependencies
│
├── frontend/                # React Native mobile app
│   ├── src/                 # Source code (to be created)
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
│
├── SETUP.md                 # Setup instructions
├── README.md                # This file
└── .gitignore               # Git ignore rules
```

---

## 🛣️ Roadmap

### ✅ Phase 0: Setup (Complete)
- [x] Backend environment setup
- [x] Frontend Expo initialization
- [x] Dependency installation
- [x] Environment configuration

### 🚧 Phase 1: Backend Foundation (In Progress)
- [ ] Database models
- [ ] API endpoints
- [ ] Authentication system
- [ ] AI service integration

### 📋 Phase 2: Frontend Development (Planned)
- [ ] Navigation structure
- [ ] Core UI components
- [ ] Screen implementations
- [ ] State management

### 📋 Phase 3: Integration (Planned)
- [ ] Connect frontend to backend
- [ ] Voice interaction
- [ ] Camera integration
- [ ] Testing and QA

### 📋 Phase 4: Deployment (Planned)
- [ ] Backend deployment
- [ ] Mobile app build
- [ ] App store submission
- [ ] Production monitoring

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Dependencies won't install**
```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir

# Frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Issue: Database connection failed**
- Ensure PostgreSQL is running: `pg_ctl status`
- Check connection string in `.env`
- Verify port 5432 is not in use

**Issue: Expo won't start**
```bash
cd frontend
npx expo start -c  # Clear cache
```

For more solutions, see [SETUP.md#troubleshooting](SETUP.md#troubleshooting)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** for AI-powered cooking assistance
- **Groq** for lightning-fast speech recognition
- **Cloudinary** for image processing
- **FastAPI** and **React Native** communities
- All contributors and testers

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/chefmentor-x/issues)
- **Email**: support@chefmentorx.com
- **Discord**: [Join our community](https://discord.gg/chefmentorx)

---

## 🌟 Show Your Support

If you find ChefMentor X helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📖 Improving documentation
- 🤝 Contributing code

---

**Made with ❤️ by the ChefMentor X Team**

*Empowering home cooks with AI-powered guidance*
