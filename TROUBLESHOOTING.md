# 🔧 ChefMentor X - Troubleshooting Guide

Common issues and solutions for ChefMentor X setup and development.

---

## Database Issues

### ❌ "Cannot connect to PostgreSQL"

**Symptoms:**
- `setup_database.py` fails with connection error
- Backend crashes with database connection error

**Solutions:**

1. **Check if PostgreSQL is running:**
   ```bash
   # Windows: Open Services app, look for PostgreSQL
   # Mac:
   brew services list
   brew services start postgresql
   
   # Linux:
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

2. **Test connection manually:**
   ```bash
   psql -U postgres -h localhost
   # Enter your password when prompted
   ```

3. **Check your credentials in `.env`:**
   ```env
   # Make sure password matches your PostgreSQL password
   DATABASE_URL=postgresql+asyncpg://postgres:YOUR_PASSWORD@localhost:5432/chefmentor_dev
   ```

4. **Reset PostgreSQL password (if forgotten):**
   ```bash
   # Mac:
   psql -U postgres
   ALTER USER postgres PASSWORD 'newpassword';
   
   # Linux:
   sudo -u postgres psql
   ALTER USER postgres PASSWORD 'newpassword';
   
   # Windows: Use pgAdmin or SQL Shell
   ```

### ❌ "Database does not exist"

**Solution:**
Run the automated setup script:
```bash
cd backend
python setup_database.py
```

Or create manually:
```bash
psql -U postgres
CREATE DATABASE chefmentor_dev;
\q
```

### ❌ "psycopg2 module not found"

**Solution:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install psycopg2-binary
```

### ❌ Migration errors: "relation already exists"

**Solution - Reset database:**
```bash
# 1. Drop and recreate database
psql -U postgres
DROP DATABASE IF EXISTS chefmentor_dev;
CREATE DATABASE chefmentor_dev;
\q

# 2. Re-run setup
python setup_database.py
```

---

## Backend Issues

### ❌ Port 8000 already in use

**Solution:**

```bash
# Find and kill the process

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:8000 | xargs kill -9

# Or use a different port:
uvicorn app.main:app --reload --port 8001
```

### ❌ "ModuleNotFoundError" when starting backend

**Solution:**
```bash
cd backend

# Make sure virtual environment is activated
source venv/bin/activate  # Windows: venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt

# Verify installation
python -c "import fastapi; import sqlalchemy; print('OK')"
```

### ❌ "No module named 'app'"

**Solution:**
Make sure you're running from the `backend` directory:
```bash
cd backend
uvicorn app.main:app --reload
# NOT: uvicorn main:app
```

### ❌ API Key errors (Gemini, Groq, etc.)

**Solution:**

1. Check `.env` file exists:
   ```bash
   ls -la backend/.env  # Should exist
   ```

2. Verify API keys are set:
   ```bash
   cd backend
   python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('Gemini:', os.getenv('GEMINI_API_KEY')[:10] if os.getenv('GEMINI_API_KEY') else 'NOT SET')"
   ```

3. Get new API keys:
   - Gemini: https://aistudio.google.com/app/apikey
   - Groq: https://console.groq.com/keys
   - Cloudinary: https://cloudinary.com/console

---

## Frontend Issues

### ❌ "Cannot connect to backend" / Network errors

**Solution:**

1. **Make sure backend is running:**
   Visit http://localhost:8000/docs - should load

2. **Update API URL for mobile testing:**
   
   Edit `frontend-v1/src/config/env.ts`:
   ```typescript
   // Find your computer's IP:
   // Windows: ipconfig
   // Mac/Linux: ifconfig | grep "inet "
   
   export const API_URL = 'http://YOUR_COMPUTER_IP:8000';
   // Example: export const API_URL = 'http://192.168.1.100:8000';
   ```

3. **Check CORS settings:**
   
   Edit `backend/.env`:
   ```env
   CORS_ORIGINS=*
   ```

4. **Restart both servers** after changing configs

### ❌ Metro bundler port 8081 in use

**Solution:**
```bash
# Kill all Node processes
# Windows:
taskkill /F /IM node.exe

# Mac/Linux:
killall node

# Then restart
npm start
```

### ❌ "Unable to resolve module"

**Solution:**
```bash
cd frontend-v1

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Metro cache
npx expo start --clear
```

### ❌ Expo won't load on phone

**Solutions:**

1. **Make sure phone and computer are on same WiFi network**

2. **Try tunnel mode:**
   ```bash
   npx expo start --tunnel
   ```

3. **Check firewall:**
   - Windows: Allow Node.js through Windows Firewall
   - Mac: System Preferences → Security & Privacy → Firewall → Allow Expo

4. **Use localhost mode (iOS Simulator/Android Emulator only):**
   ```bash
   npx expo start --localhost
   ```

### ❌ Build errors with Expo

**Solution:**
```bash
# Clear all caches
npx expo start --clear

# If that doesn't work, nuclear option:
cd frontend-v1
rm -rf node_modules package-lock.json .expo
npm install
npx expo start --clear
```

---

## Environment & Configuration Issues

### ❌ ".env file not loading"

**Solution:**

1. **Check file location:**
   ```bash
   ls -la backend/.env  # Should be in backend/ directory
   ```

2. **Check file format:**
   - No spaces around `=`
   - No quotes needed for most values
   - Correct: `GEMINI_API_KEY=abc123`
   - Wrong: `GEMINI_API_KEY = "abc123"`

3. **Restart server** after editing `.env`

### ❌ "JWT_SECRET not set" error

**Solution:**

Generate a new secret:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Add to `backend/.env`:
```env
JWT_SECRET=<paste-generated-secret-here>
```

---

## Installation Issues

### ❌ Python version too old

**Check version:**
```bash
python --version  # Should be 3.10+
```

**Solution:**
- Download Python 3.11: https://www.python.org/downloads/
- Or use pyenv to manage versions

### ❌ Node.js version too old

**Check version:**
```bash
node --version  # Should be 18+
```

**Solution:**
- Download Node.js 18 LTS: https://nodejs.org/
- Or use nvm: `nvm install 18`

### ❌ pip install fails

**Solutions:**

```bash
# Upgrade pip first
python -m pip install --upgrade pip

# Try without cache
pip install -r requirements.txt --no-cache-dir

# On Mac with M1/M2, you might need:
arch -arm64 pip install -r requirements.txt

# On Linux, install build tools:
sudo apt-get install python3-dev libpq-dev
```

### ❌ npm install fails

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Try with legacy peer deps
npm install --legacy-peer-deps

# Or use yarn instead
yarn install
```

---

## Testing Issues

### ❌ Tests fail with database errors

**Solution:**

Create test database:
```bash
psql -U postgres
CREATE DATABASE chefmentor_test;
\q

# Update test config in backend/.env.test (if exists)
# Or tests will use same database
```

### ❌ Import errors in tests

**Solution:**
```bash
cd backend
source venv/bin/activate

# Install test dependencies
pip install pytest pytest-asyncio pytest-cov

# Run from backend directory
pytest tests/ -v
```

---

## Performance Issues

### ❌ Backend slow to respond

**Check:**

1. **Database connection pool:**
   - Add to `.env`: `DATABASE_POOL_SIZE=5`

2. **Redis cache:**
   - Make sure Redis is running
   - Or disable caching for development

3. **API rate limits:**
   - Check Gemini/Groq API quotas

### ❌ Frontend app slow/laggy

**Solutions:**

1. **Enable Hermes engine** (should be default in new Expo)

2. **Check network tab** for slow API calls

3. **Use production mode:**
   ```bash
   npx expo start --no-dev --minify
   ```

---

## Still Having Issues?

1. **Check existing issues:**
   https://github.com/x-LANsolo-x/BugOff/issues

2. **Create a new issue:**
   - Include error messages
   - Include your OS and versions
   - Include steps to reproduce

3. **Contact:**
   - Email: shashwatvatsyayan@gmail.com
   - GitHub: @x-LANsolo-x

---

## Quick Diagnostic Commands

Run these to check your setup:

```bash
# Check Python version
python --version

# Check Node version
node --version

# Check PostgreSQL
psql --version
psql -U postgres -c "SELECT version();"

# Check if ports are in use
# Windows:
netstat -ano | findstr :8000
netstat -ano | findstr :8081

# Mac/Linux:
lsof -i :8000
lsof -i :8081

# Check virtual environment
which python  # Should show path to venv

# Check environment variables
cd backend
python -c "from dotenv import load_dotenv; load_dotenv(); import os; print('DATABASE_URL:', os.getenv('DATABASE_URL', 'NOT SET'))"
```

---

**Happy Debugging! 🔧**
