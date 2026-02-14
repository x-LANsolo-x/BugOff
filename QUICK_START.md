# 🚀 Quick Start - Full-Stack Integration Testing

## Prerequisites
- ✅ Python 3.9+ installed
- ✅ Node.js 18+ installed
- ✅ Expo CLI (`npm install -g expo-cli`)
- ✅ PostgreSQL running (or use Railway)
- ✅ API keys ready (Gemini, Groq, Cloudinary, etc.)

---

## Step 1: Backend Setup (5 minutes)

### Option A: Using Start Script (Recommended)

**macOS/Linux:**
```bash
chmod +x START_BACKEND_DEV.sh
./START_BACKEND_DEV.sh
```

**Windows (PowerShell):**
```powershell
.\START_BACKEND_DEV.ps1
```

### Option B: Manual Setup

```bash
cd backend

# Create .env from example
cp .env.example .env

# Edit .env and fill in your API keys
# Minimum required: DATABASE_URL, JWT_SECRET, GEMINI_API_KEY, GROQ_API_KEY

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server (IMPORTANT: Use 0.0.0.0 for mobile access)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Look for this in the console:**
```
🚀 Server running at: http://192.168.1.100:8000
🌍 Environment: development
🔓 Development CORS: Permissive mode (localhost + LAN)
   📱 Mobile devices can connect via: http://192.168.1.100:8000
```

---

## Step 2: Test Backend Connectivity

### Test 1: Browser Health Check

Open in your browser:
```
http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "development",
  "version": "1.0.0",
  "database": "connected",
  "server_ip": "192.168.1.100"
}
```

### Test 2: CORS Test Script (Optional)

```bash
cd backend
pip install httpx colorama
python tmp_rovodev_test_cors.py
```

---

## Step 3: Frontend Setup (3 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Start Expo
npm start
```

**You'll see:**
```
🔗 API Base URL: http://192.168.1.100:8000/api/v1
🏗️  Environment: Development
📱 Platform: ios (or android)
```

### Platform-Specific Launch:

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Physical Device:**
1. Install Expo Go app from App Store / Play Store
2. Scan QR code from terminal
3. App will auto-detect backend IP

---

## Step 4: Test Frontend Connection

### Option A: Using Test Screen (Recommended)

1. **Add test screen to navigation:**

Edit `frontend/src/navigation/AppNavigator.tsx`:

```typescript
import NetworkTestScreen from '../screens/tmp_rovodev_test_connection';

// Inside your Stack.Navigator
<Stack.Screen 
    name="NetworkTest" 
    component={NetworkTestScreen}
    options={{ title: 'Network Test' }}
/>
```

2. **Navigate to it** or make it the initial route temporarily:

```typescript
<Stack.Navigator initialRouteName="NetworkTest">
```

3. **Tap "Test Backend Connection"** - should show green success!

### Option B: Manual Test in Code

Add to any screen:

```typescript
import { testBackendConnection } from '../utils/networkDebug';

useEffect(() => {
  testBackendConnection().then(result => {
    console.log(result);
    if (result.success) {
      Alert.alert('✅ Connected', result.message);
    } else {
      Alert.alert('❌ Failed', result.message);
    }
  });
}, []);
```

---

## Common Issues & Solutions

### ❌ "Network request failed" on Physical Device

**Problem:** Phone can't reach backend

**Solution:**
1. ✅ Ensure phone and laptop on **same WiFi**
2. ✅ Backend started with `--host 0.0.0.0`
3. ✅ Firewall allows port 8000:
   - **Mac:** System Prefs → Security → Firewall → Allow
   - **Windows:** `netsh advfirewall firewall add rule name="FastAPI Dev" dir=in action=allow protocol=TCP localport=8000`
   - **Linux:** `sudo ufw allow 8000/tcp`
4. ✅ Check backend console for correct IP

### ❌ "Network request failed" on Android Emulator

**Problem:** Emulator can't reach localhost

**Solution:**
- Android emulator uses `10.0.2.2` to access host machine
- Our auto-detection handles this, but verify console shows:
  ```
  📱 Android Emulator detected, using 10.0.2.2
  ```

### ❌ CORS Error in Browser Console

**Development:**
- Should NOT happen with new config
- Verify backend shows: `🔓 Development CORS: Permissive mode`

**Production:**
- Add frontend URL to `CORS_ORIGINS` in Railway

### ❌ Backend crashes with "Wildcard CORS not allowed"

**Solution:**
- This is production safety check
- Make sure `ENVIRONMENT=development` in `.env`
- In production, set specific origins:
  ```
  CORS_ORIGINS=https://api.example.com,https://app.example.com
  ```

---

## Testing Checklist

Before moving to next phase:

- [ ] Backend starts without errors
- [ ] Health endpoint returns 200 OK
- [ ] Backend console shows local IP
- [ ] Frontend app launches successfully
- [ ] Frontend console shows correct API URL
- [ ] Network test screen shows green success
- [ ] Can make authenticated requests (login works)
- [ ] No CORS errors in network inspector

---

## Next Steps

✅ **Phase 7.1 Complete** → Proceed to:

- **Phase 7.2:** Authentication Token Flow
  - JWT storage strategy
  - Token refresh logic
  - Session handling

- **Phase 7.3:** API Response Standardization
  - Error format consistency
  - Loading states
  - Retry logic

- **Phase 7.4:** End-to-End Feature Testing
  - Recipe CRUD
  - Live cooking
  - Image upload
  - Voice interaction

---

## Need Help?

1. **Check logs:** Both backend console and React Native debugger
2. **Run network test:** Use `tmp_rovodev_test_connection.tsx`
3. **Verify config:** Run `logNetworkConfig()` in frontend
4. **Test CORS:** Run `tmp_rovodev_test_cors.py` in backend

---

## Cleanup

When done testing, remove temporary files:

```bash
# Backend
rm backend/tmp_rovodev_test_cors.py

# Frontend
rm frontend/tmp_rovodev_test_connection.tsx
```

---

**Status:** Ready for integration testing! 🎉
