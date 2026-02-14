# Contributing to ChefMentor X

Thank you for your interest in contributing to ChefMentor X! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community

---

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/chefmentor-x.git
cd chefmentor-x
git remote add upstream https://github.com/ORIGINAL_OWNER/chefmentor-x.git
```

### 2. Set Up Development Environment

Follow the complete setup guide in [SETUP.md](SETUP.md).

**Quick version:**
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### 3. Create a Branch

```bash
# Update your fork
git checkout master
git pull upstream master

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features (e.g., `feature/voice-commands`)
- `fix/` - Bug fixes (e.g., `fix/recipe-loading-error`)
- `docs/` - Documentation updates (e.g., `docs/setup-guide`)
- `test/` - Test additions (e.g., `test/auth-endpoints`)
- `refactor/` - Code refactoring (e.g., `refactor/database-models`)

---

## 💻 Development Workflow

### Backend Development

```bash
cd backend
source venv/bin/activate

# Make changes to code...

# Run tests
pytest

# Check code style
black app/
flake8 app/

# Run type checking
mypy app/

# Run local server
uvicorn app.main:app --reload
```

### Frontend Development

```bash
cd frontend

# Make changes to code...

# Run tests
npm test

# Check TypeScript types
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Run on device/simulator
npm start
```

### Database Migrations

```bash
cd backend
source venv/bin/activate

# Create migration after model changes
alembic revision --autogenerate -m "Description of changes"

# Review generated migration in alembic/versions/

# Apply migration
alembic upgrade head

# Rollback if needed
alembic downgrade -1
```

---

## 📏 Coding Standards

### Python (Backend)

**Style Guide:** Follow PEP 8

```python
# Good: Clear, documented, type-hinted
from typing import List, Optional
from pydantic import BaseModel

class Recipe(BaseModel):
    """Recipe model with ingredients and instructions."""
    
    id: int
    title: str
    description: Optional[str] = None
    ingredients: List[str]
    
    def get_ingredient_count(self) -> int:
        """Return the number of ingredients."""
        return len(self.ingredients)
```

**Tools:**
- **Formatter**: Black (line length: 88)
- **Linter**: Flake8
- **Type Checker**: MyPy
- **Import Sorter**: isort

**Install dev tools:**
```bash
pip install black flake8 mypy isort pytest-cov
```

**Pre-commit checks:**
```bash
black app/ tests/
flake8 app/ tests/
mypy app/
isort app/ tests/
pytest --cov=app
```

### TypeScript/React Native (Frontend)

**Style Guide:** Airbnb JavaScript Style Guide

```typescript
// Good: Typed, documented, functional
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RecipeCardProps {
  title: string;
  description?: string;
  onPress: () => void;
}

/**
 * Recipe card component displaying recipe information.
 */
export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
```

**Tools:**
- **Formatter**: Prettier
- **Linter**: ESLint
- **Type Checker**: TypeScript

**Pre-commit checks:**
```bash
npm run lint
npm run type-check
npm test
npm run format
```

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(backend): add recipe search endpoint

Implement full-text search for recipes using PostgreSQL
text search functionality. Includes filtering by ingredients
and difficulty level.

Closes #123

---

fix(frontend): resolve camera permission crash on iOS

Fixed issue where app would crash when requesting camera
permissions on iOS 15+. Added proper permission handling
and user-friendly error messages.

Fixes #456

---

docs(setup): update database setup instructions

Added Docker Compose option for easier local development
database setup. Includes PostgreSQL and Redis configuration.
```

---

## 🧪 Testing Requirements

### Backend Tests

**Location:** `backend/tests/`

**Coverage requirement:** Minimum 80%

**Test types:**
```bash
# Unit tests
pytest tests/unit/

# Integration tests
pytest tests/integration/

# All tests with coverage
pytest --cov=app --cov-report=html

# Specific test file
pytest tests/test_recipes.py -v
```

**Example test:**
```python
# tests/test_recipes.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_recipes():
    """Test retrieving recipe list."""
    response = client.get("/api/recipes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_recipe():
    """Test creating a new recipe."""
    recipe_data = {
        "title": "Test Recipe",
        "description": "A test recipe",
        "ingredients": ["ingredient1", "ingredient2"]
    }
    response = client.post("/api/recipes", json=recipe_data)
    assert response.status_code == 201
    assert response.json()["title"] == "Test Recipe"
```

### Frontend Tests

**Location:** `frontend/__tests__/`

**Test types:**
```bash
# Unit tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage

# Specific test
npm test -- RecipeCard.test.tsx
```

**Example test:**
```typescript
// __tests__/components/RecipeCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RecipeCard } from '@/components/RecipeCard';

describe('RecipeCard', () => {
  it('renders recipe title correctly', () => {
    const { getByText } = render(
      <RecipeCard title="Test Recipe" onPress={() => {}} />
    );
    expect(getByText('Test Recipe')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <RecipeCard title="Test Recipe" onPress={mockOnPress} />
    );
    fireEvent.press(getByText('Test Recipe'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
```

---

## 🔄 Pull Request Process

### 1. Before Submitting

**Checklist:**
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] Added/updated tests
- [ ] All tests pass
- [ ] No linting errors
- [ ] Branch is up to date with master

```bash
# Update your branch
git checkout master
git pull upstream master
git checkout your-branch
git rebase master

# Run all checks
cd backend && pytest && black app/ && flake8 app/
cd frontend && npm test && npm run lint && npm run type-check
```

### 2. Create Pull Request

**Title format:**
```
[Type] Brief description (max 72 chars)
```

**Description template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing Done
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #123
Related to #456

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented code
- [ ] Updated documentation
- [ ] Tests pass
- [ ] No new warnings
```

### 3. Code Review Process

**Reviewers will check:**
- Code quality and style
- Test coverage
- Documentation
- Performance implications
- Security considerations

**Addressing feedback:**
```bash
# Make requested changes
git add .
git commit -m "address review feedback: description"
git push origin your-branch
```

### 4. Merging

- Requires at least 1 approval
- All CI checks must pass
- No merge conflicts
- Branch must be up to date

---

## 📁 Project Structure

### Backend Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Configuration
│   ├── database.py          # Database connection
│   │
│   ├── models/              # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── recipe.py
│   │   └── session.py
│   │
│   ├── schemas/             # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── recipe.py
│   │   └── session.py
│   │
│   ├── routers/             # API endpoints
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── recipes.py
│   │   └── sessions.py
│   │
│   ├── services/            # Business logic
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── recipe_service.py
│   │   └── ai_service.py
│   │
│   └── utils/               # Utilities
│       ├── __init__.py
│       ├── security.py
│       └── helpers.py
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── conftest.py
│
├── alembic/                 # Database migrations
├── requirements.txt
└── .env.example
```

### Frontend Structure

```
frontend/
├── src/
│   ├── screens/             # Screen components
│   │   ├── auth/
│   │   ├── recipes/
│   │   └── cooking/
│   │
│   ├── components/          # Reusable components
│   │   ├── common/
│   │   ├── recipe/
│   │   └── cooking/
│   │
│   ├── navigation/          # Navigation config
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   │
│   ├── services/            # API clients
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── recipeService.ts
│   │
│   ├── store/               # State management
│   │   ├── authStore.ts
│   │   ├── recipeStore.ts
│   │   └── cookingStore.ts
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useRecipes.ts
│   │   └── useVoice.ts
│   │
│   ├── utils/               # Utilities
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── theme.ts
│   │
│   └── types/               # TypeScript types
│       ├── api.ts
│       ├── models.ts
│       └── navigation.ts
│
├── __tests__/
├── assets/
├── App.tsx
└── package.json
```

---

## 🔍 Code Review Guidelines

### As a Reviewer

**What to look for:**
- [ ] Code solves the stated problem
- [ ] No unnecessary complexity
- [ ] Proper error handling
- [ ] Security considerations addressed
- [ ] Performance implications considered
- [ ] Tests cover new code
- [ ] Documentation updated

**Review etiquette:**
- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve when satisfied or request changes
- Respond to questions promptly

### As an Author

**Responding to reviews:**
- Address all comments
- Ask for clarification if needed
- Push updates promptly
- Mark resolved conversations
- Thank reviewers for their time

---

## 🐛 Reporting Bugs

Use the GitHub issue tracker with this template:

```markdown
**Bug Description**
Clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS 12.0]
- Node: [e.g., 18.0.0]
- Python: [e.g., 3.10.0]
- Browser: [if applicable]

**Additional Context**
Any other relevant information
```

---

## 💡 Requesting Features

Use the GitHub issue tracker with this template:

```markdown
**Feature Request**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other solutions you've thought about

**Additional Context**
Mockups, examples, etc.
```

---

## 📞 Getting Help

- **Documentation**: Check `/docs` and `/md` folders
- **Issues**: Search existing issues first
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community chat (if available)

---

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Annual contributor highlight posts

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to ChefMentor X! 🙏**
