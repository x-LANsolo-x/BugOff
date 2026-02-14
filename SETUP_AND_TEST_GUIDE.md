# 🚀 Complete Setup and Testing Guide

## Step-by-Step Instructions to See Your Recipes on Phone

Follow these steps **in order** to test the full-stack integration.

---

## ✅ Step 1: Install Secure Store

Open your terminal and run:

```bash
cd frontend-v1
npx expo install expo-secure-store @react-native-async-storage/async-storage
```

**Expected output:**
```
✔ Installed expo-secure-store
✔ Installed @react-native-async-storage/async-storage
```

**Verification:**
```bash
# Check package.json
grep "expo-secure-store" package.json
grep "async-storage" package.json
```

Should show both packages in dependencies.

---

## ✅ Step 2: Verify and Configure API URL

### 2A. Find Your Computer's IP Address

**On macOS:**
```bash
ipconfig getifaddr en0
# Or
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**On Windows (PowerShell):**
```powershell
(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias Wi-Fi*).IPAddress
# Or
ipconfig
# Look for "IPv4 Address" under your WiFi adapter
```

**On Linux:**
```bash
hostname -I | awk '{print $1}'
# Or
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**Example output:** `192.168.1.100`

### 2B. Check Current Configuration

The app should **auto-detect** your IP, but let's verify:

```bash
cd frontend-v1
cat src/config/env.ts | grep -A 5 "getApiBaseUrl"
```

The auto-detection logic will:
- **Android Emulator:** Use `10.0.2.2:8000` automatically ✅
- **Physical Device:** Extract your IP from Expo's debuggerHost ✅
- **iOS Simulator:** Use `localhost:8000` automatically ✅

### 2C. Manual Override (Only if Auto-Detection Fails)

If you need to manually set your IP, edit `frontend-v1/app.json`:

```json
{
  "expo": {
    "name": "ChefMentor X",
    "extra": {
      "backendUrl": "http://192.168.1.100:8000"
    }
  }
}
```

Replace `192.168.1.100` with your actual IP from Step 2A.

---

## ✅ Step 3: Start the Backend

### 3A. Navigate to Backend Directory

```bash
cd backend
```

### 3B. Ensure .env File Exists

```bash
# Check if .env exists
ls -la .env

# If not, copy from example
cp .env.example .env
```

**Important:** Make sure `.env` has at least:
```
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/chefmentor_dev
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-key
GROQ_API_KEY=your-groq-key
ENVIRONMENT=development
```

### 3C. Activate Virtual Environment (If Exists)

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```powershell
venv\Scripts\activate
```

### 3D. Start Backend with Network Access

**CRITICAL:** Use `--host 0.0.0.0` to allow mobile devices to connect:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3E. Verify Backend Started

**Expected console output:**
```
🚀 Server running at: http://192.168.1.100:8000
🌍 Environment: development
🔓 Development CORS: Permissive mode (localhost + LAN)
   📱 Mobile devices can connect via: http://192.168.1.100:8000

INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Key things to verify:**
1. ✅ Shows your LAN IP (e.g., `192.168.1.100`)
2. ✅ Shows "Development CORS: Permissive mode"
3. ✅ No errors about database connection

### 3F. Test Backend from Browser

Open browser and visit:
```
http://localhost:8000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "environment": "development",
  "version": "1.0.0",
  "database": "connected",
  "server_ip": "192.168.1.100"
}
```

### 3G. Check Recipes Endpoint

Visit:
```
http://localhost:8000/api/v1/recipes?source=local
```

**Expected response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Maggi Noodles",
      "difficulty": "easy",
      "cookTimeMinutes": 5,
      "servings": 1
    },
    // ... more recipes
  ]
}
```

**If you see empty array `[]`:**
You need to seed the database! Run:
```bash
python backend/app/db/seed.py
# Or manually add recipes via /docs
```

---

## ✅ Step 4: Start the Frontend

### 4A. Open New Terminal (Keep Backend Running)

Open a **new terminal window/tab** - **do not close the backend terminal!**

### 4B. Navigate to Frontend

```bash
cd frontend-v1
```

### 4C. Install Dependencies (If Not Done)

```bash
npm install
```

### 4D. Start Expo

```bash
npm start
```

**Alternative commands:**
```bash
# Clear cache if issues
npm start -- --clear

# Or use expo directly
npx expo start
```

### 4E. Wait for Expo Dev Server

**Expected console output:**
```
🔧 CHEFMENTOR X - CONFIGURATION
==================================================
🔗 API URL: http://192.168.1.100:8000/api/v1
🏗️  Environment: Development
📱 Platform: ios
==================================================

Starting Metro Bundler

Metro waiting on exp://192.168.1.100:8081

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu

Logs for your project will appear below.
```

**Key things to verify:**
1. ✅ API URL shows your correct IP
2. ✅ Environment shows "Development"
3. ✅ No errors in the console

---

## ✅ Step 5: Run on Your Phone

### 5A. Ensure Phone and Computer on Same WiFi

**CRITICAL:** Both devices must be on the **same WiFi network**.

**Check on phone:**
- Settings → WiFi → Check network name
- Should match your computer's WiFi

**Check on computer:**
- Should be on same network as phone

### 5B. Install Expo Go App

**If not already installed:**

- **iOS:** Download "Expo Go" from App Store
- **Android:** Download "Expo Go" from Play Store

### 5C. Scan QR Code

**Method 1: Using Expo Go App**
1. Open Expo Go app on your phone
2. Tap "Scan QR code"
3. Scan the QR code shown in your terminal

**Method 2: Using Camera (iOS)**
1. Open Camera app
2. Point at QR code
3. Tap notification to open in Expo Go

**Method 3: Manual URL**
1. Open Expo Go
2. Tap "Enter URL manually"
3. Type: `exp://192.168.1.100:8081` (use your IP)

### 5D. Wait for Bundle to Load

**Expected on phone screen:**
```
Opening on Android...
Downloading JavaScript bundle
100%
```

**Expected in terminal:**
```
› Opening exp://192.168.1.100:8081 on Android
› Opening on Android...
  BUNDLE  ./index.ts

LOG  🔧 CHEFMENTOR X - CONFIGURATION
LOG  🔗 API URL: http://192.168.1.100:8000/api/v1
LOG  🏗️  Environment: Development
LOG  📱 Platform: android
LOG  🚀 App starting - checking for saved session...
LOG  🔄 Restoring session...
LOG  ℹ️  No saved session found
```

---

## ✅ Step 6: Navigate to CookScreen and See Recipes!

### 6A. App Opens

You should see the app launch with a splash screen briefly.

### 6B. Navigate to CookScreen

Depending on your navigation setup:
- Tap on "Cook" tab/button
- Or the app might show CookScreen by default

### 6C. Expected: See Your Recipes! 🎉

**You should see:**

```
┌─────────────────────────────────────────┐
│  What do you want to cook?              │
│  5 recipes available                    │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Maggi Noodles              [easy] │ │
│  │ ⏱️ 5 min  👥 1 servings           │ │
│  │ Cook This! →                      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Pasta Carbonara          [medium] │ │
│  │ ⏱️ 20 min  👥 2 servings          │ │
│  │ Cook This! →                      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ... more recipes ...                   │
└─────────────────────────────────────────┘
```

### 6D. Terminal Shows Success

**Backend terminal:**
```
INFO:     192.168.1.101 - "GET /api/v1/recipes?source=local HTTP/1.1" 200 OK
```

**Frontend terminal:**
```
LOG  📡 Fetching recipes from backend...
LOG  🔑 Attaching token to request: /recipes?source=local
LOG  ✅ Response: /recipes?source=local 200
LOG  ✅ Recipes fetched: 5 recipes
```

### 6E. Pull to Refresh Works

Pull down on the recipe list and it should refresh!

---

## 🐛 Troubleshooting

### Problem 1: "Cannot connect to backend"

**Symptoms:**
- Error message on phone: "Cannot connect to backend"
- Debug box shows URL

**Solutions:**

1. **Check both on same WiFi**
   ```bash
   # On computer
   ping <your-phone-ip>
   ```

2. **Check firewall allows port 8000**
   
   **macOS:**
   ```bash
   # System Preferences → Security & Privacy → Firewall
   # Allow incoming connections for Python or uvicorn
   ```

   **Windows:**
   ```powershell
   netsh advfirewall firewall add rule name="FastAPI Dev" dir=in action=allow protocol=TCP localport=8000
   ```

   **Linux:**
   ```bash
   sudo ufw allow 8000/tcp
   ```

3. **Verify backend is running with 0.0.0.0**
   ```bash
   # Should see 0.0.0.0:8000, NOT 127.0.0.1:8000
   ps aux | grep uvicorn
   ```

4. **Test from phone browser**
   
   Open phone browser and visit:
   ```
   http://192.168.1.100:8000/health
   ```
   
   Should show JSON response. If not, firewall is blocking.

### Problem 2: "expo-secure-store not available"

**Solution:**
```bash
cd frontend-v1
npx expo install expo-secure-store @react-native-async-storage/async-storage
npm start -- --clear
```

### Problem 3: No recipes showing (empty list)

**Check backend response:**
```bash
curl http://localhost:8000/api/v1/recipes?source=local
```

**If empty array:**
```bash
# Seed the database
cd backend
python app/db/seed.py
```

### Problem 4: App shows login screen and won't proceed

**This is normal!** You need to:
1. Tap "Login" button
2. Or tap "Demo Mode" if available
3. Or implement login screen to call `/auth/login`

**Quick workaround - Enable demo mode:**

Edit `frontend-v1/src/stores/authStore.ts`:
```typescript
// On app start, auto-login as demo
useEffect(() => {
    useAuthStore.getState().setDemo();
}, []);
```

### Problem 5: Different IP shown in logs

**Auto-detection might pick wrong interface.**

**Solution - Manual override:**

Edit `frontend-v1/app.json`:
```json
{
  "expo": {
    "extra": {
      "backendUrl": "http://192.168.1.100:8000"
    }
  }
}
```

Then restart:
```bash
npm start -- --clear
```

---

## ✅ Success Checklist

Verify all these:

### Backend
- [ ] Backend starts with `--host 0.0.0.0`
- [ ] Console shows your LAN IP (192.168.x.x)
- [ ] Console shows "Development CORS: Permissive mode"
- [ ] `/health` endpoint returns 200 OK
- [ ] `/api/v1/recipes` returns recipe data
- [ ] No database errors

### Frontend
- [ ] expo-secure-store installed
- [ ] Console shows correct API URL
- [ ] Console shows "App starting - checking for saved session"
- [ ] No red error screens

### Network
- [ ] Phone and computer on same WiFi
- [ ] Can ping phone from computer (or vice versa)
- [ ] Firewall allows port 8000
- [ ] Phone browser can access `http://your-ip:8000/health`

### App on Phone
- [ ] App loads without crash
- [ ] Navigate to CookScreen
- [ ] See "Loading recipes..." briefly
- [ ] **SEE YOUR RECIPES LIST!** 🎉
- [ ] Can tap a recipe
- [ ] Pull-to-refresh works

---

## 📊 Quick Reference

### Commands Summary

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2 - Frontend
cd frontend-v1
npm start

# Get your IP
# macOS: ipconfig getifaddr en0
# Windows: ipconfig
# Linux: hostname -I
```

### Important URLs

| What | URL |
|------|-----|
| Backend Health | `http://localhost:8000/health` |
| Backend Docs | `http://localhost:8000/docs` |
| Recipes API | `http://localhost:8000/api/v1/recipes` |
| From Phone | `http://192.168.x.x:8000/health` |

### Console Logs to Look For

**Success indicators:**
```
Backend:
🚀 Server running at: http://192.168.1.100:8000
🔓 Development CORS: Permissive mode

Frontend:
🔗 API URL: http://192.168.1.100:8000/api/v1
📡 Fetching recipes from backend...
✅ Recipes fetched: 5 recipes
```

---

## 🎉 What Success Looks Like

When everything works, you'll see:

1. **Backend terminal:** Requests coming in from your phone's IP
2. **Frontend terminal:** Console logs showing successful API calls
3. **Phone screen:** Beautiful list of recipes with "Maggi Noodles" at the top!
4. **You can:** Tap recipes, pull to refresh, navigate around

**Take a screenshot and celebrate!** 📸🎊

---

## 🆘 Still Having Issues?

1. **Check all steps above** - Did you miss anything?
2. **Read the error message** - It usually tells you what's wrong
3. **Check the console logs** - Both backend and frontend
4. **Look at the debug box** - Shows helpful troubleshooting info
5. **Restart everything** - Sometimes it just works after a restart

### Common Issues Summary

| Issue | Most Likely Cause | Quick Fix |
|-------|-------------------|-----------|
| Cannot connect | Not on same WiFi | Connect both to same network |
| Cannot connect | Firewall blocking | Allow port 8000 in firewall |
| Cannot connect | Wrong host | Use `--host 0.0.0.0` |
| No recipes | Database empty | Run seed script |
| Stuck on login | Auth required | Use demo mode or implement login |
| expo-secure-store error | Not installed | Run `npx expo install expo-secure-store` |

---

**Good luck! You're about to see your full-stack app working end-to-end!** 🚀
