# Phase 7.1: Network & CORS Integration Guide

## ✅ What Was Changed

### Backend Changes (`backend/app/`)

1. **`main.py` - Environment-Aware CORS**
   - ✅ Removed hardcoded wildcard `"*"` with `allow_credentials=True` (security vulnerability)
   - ✅ Added `allow_origin_regex` for development (supports all local network patterns)
   - ✅ Strict origin whitelist for production (no wildcards)
   - ✅ Auto-detection of local IP address for mobile device connection
   - ✅ Console logging for debugging connection issues

2. **`core/config.py` - Configuration Enhancement**
   - ✅ Added `ALLOWED_HOSTS` setting for pattern-based matching in dev mode
   - ✅ Better documentation for CORS_ORIGINS usage

3. **Environment Files**
   - ✅ `.env.development` - Template for local development
   - ✅ `.env.production` - Template for production deployment

### Frontend Changes (`frontend/src/`)

1. **`constants/config.ts` - Smart API URL Detection**
   - ✅ Auto-detects platform (iOS/Android/Web)
   - ✅ Uses `10.0.2.2` for Android Emulator
   - ✅ Uses `localhost` for iOS Simulator
   - ✅ Auto-extracts LAN IP from Expo's debuggerHost for physical devices
   - ✅ Supports custom backend URL via `app.json` extra config
   - ✅ Console logging for debugging

2. **`utils/networkDebug.ts` - Diagnostic Tools** (NEW)
   - ✅ `testBackendConnection()` - Test connectivity with detailed error messages
   - ✅ `getNetworkDebugInfo()` - Get current network configuration
   - ✅ `logNetworkConfig()` - Log config to console
   - ✅ `getConnectionInstructions()` - Platform-specific setup instructions

---

## 🚀 How to Use

### Step 1: Backend Setup

#### For Local Development

1. **Copy environment file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Fill in required values in `.env`:**
   ```bash
   # Set ENVIRONMENT to development
   ENVIRONMENT=development
   DEBUG=true
   
   # CORS will auto-allow local network (no changes needed)
   CORS_ORIGINS=*
   
   # Fill in your API keys (see .env.example for instructions)
   DATABASE_URL=postgresql+asyncpg://...
   JWT_SECRET=your-secret-here
   GEMINI_API_KEY=your-key-here
   # ... etc
   ```

3. **Start backend with host binding:**
   ```bash
   # IMPORTANT: Use 0.0.0.0 to allow connections from network devices
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Note the displayed IP address:**
   ```
   🚀 Server running at: http://192.168.1.100:8000
   🌍 Environment: development
   🔓 Development CORS: Permissive mode (localhost + LAN)
      📱 Mobile devices can connect via: http://192.168.1.100:8000
   ```

#### For Production (Railway)

1. **Set environment variables in Railway dashboard:**
   ```
   ENVIRONMENT=production
   DEBUG=false
   CORS_ORIGINS=https://chefmentor-api.railway.app
   # ... other production secrets
   ```

2. **Deploy:**
   ```bash
   railway up
   ```

---

### Step 2: Frontend Setup

#### Option A: Automatic Detection (Recommended)

**No configuration needed!** The app auto-detects:
- iOS Simulator → `http://localhost:8000`
- Android Emulator → `http://10.0.2.2:8000`
- Physical Device → `http://192.168.x.x:8000` (from Expo debuggerHost)

Just run:
```bash
cd frontend
npm start
```

#### Option B: Manual Override (Advanced)

If auto-detection fails, override in `app.json`:

```json
{
  "expo": {
    "extra": {
      "backendUrl": "http://192.168.1.100:8000"
    }
  }
}
```

---

### Step 3: Test Connectivity

#### Method 1: Use Network Debug Tool (Recommended)

Add to any screen (e.g., `LoginScreen.tsx`):

```typescript
import { testBackendConnection, logNetworkConfig } from '../utils/networkDebug';

// In a useEffect or button handler
useEffect(() => {
  const checkConnection = async () => {
    logNetworkConfig(); // Logs config to console
    const result = await testBackendConnection();
    
    if (result.success) {
      console.log('✅ Backend connected!', result.message);
    } else {
      console.error('❌ Connection failed:', result.message);
      Alert.alert('Connection Error', result.message);
    }
  };
  
  checkConnection();
}, []);
```

#### Method 2: Manual Health Check

1. **From mobile device browser:**
   ```
   http://192.168.1.100:8000/health
   ```

2. **Expected response:**
   ```json
   {
     "status": "healthy",
     "environment": "development",
     "version": "1.0.0",
     "database": "connected",
     "server_ip": "192.168.1.100"
   }
   ```

---

## 🔧 Troubleshooting

### Issue: "Network request failed" on Android Emulator

**Solution:**
1. Check that backend is running with `--host 0.0.0.0`
2. Verify URL is `http://10.0.2.2:8000` (not localhost)
3. Check Android emulator can access internet

### Issue: "Network request failed" on Physical Device

**Solution:**
1. Ensure phone and computer are on **same WiFi network**
2. Backend must run with `--host 0.0.0.0` (not `127.0.0.1`)
3. Check firewall allows port 8000:
   - **Windows:** `netsh advfirewall firewall add rule name="FastAPI Dev" dir=in action=allow protocol=TCP localport=8000`
   - **Mac:** System Preferences → Security & Privacy → Firewall → Firewall Options → Allow port 8000
   - **Linux:** `sudo ufw allow 8000/tcp`
4. Verify IP address matches backend logs

### Issue: CORS Error in Console

**Development:**
- Should NOT happen with new regex-based CORS
- If it does, check backend logs show "Development CORS: Permissive mode"

**Production:**
- Add your frontend URL to `CORS_ORIGINS` in Railway:
  ```
  CORS_ORIGINS=https://chefmentor-api.railway.app,https://your-frontend-url.com
  ```

### Issue: "Wildcard CORS not allowed in production"

**Solution:**
- This is intentional security protection
- Set specific origins in production `.env`:
  ```
  CORS_ORIGINS=https://chefmentor-api.railway.app,https://app.example.com
  ```

---

## 📋 Testing Checklist

Before moving to next phase, verify:

- [ ] Backend starts and shows local IP in console
- [ ] Backend `/health` endpoint accessible from browser
- [ ] Frontend shows correct API URL in console logs
- [ ] iOS Simulator can connect (if testing on iOS)
- [ ] Android Emulator can connect (if testing on Android)
- [ ] Physical device can connect (if testing on device)
- [ ] No CORS errors in network tab
- [ ] Login/auth flow works end-to-end
- [ ] Token is included in authenticated requests

---

## 🔐 Security Notes

### Development Mode
- ✅ Allows all local network IPs (`192.168.*.*`, `10.0.*.*`, etc.)
- ✅ Safe because restricted by regex pattern
- ✅ Cannot be enabled in production (environment check)

### Production Mode
- ✅ Requires explicit origin whitelist (no wildcards)
- ✅ Fails fast if wildcard detected
- ✅ Credentials only sent to whitelisted origins
- ✅ Methods/headers restricted to necessary ones only

---

## 🎯 Next Steps

After successful connectivity:

1. **Step 7.2:** Authentication Token Flow
   - Verify JWT tokens in request headers
   - Test token refresh logic
   - Handle expired sessions

2. **Step 7.3:** API Response Standardization
   - Consistent error format
   - Loading states
   - Retry logic

3. **Step 7.4:** End-to-End Feature Testing
   - Recipe listing
   - Live cooking flow
   - Image upload
   - Voice interaction

---

## 📚 Additional Resources

- **Expo Network Debugging:** https://docs.expo.dev/guides/troubleshooting-proxies/
- **FastAPI CORS:** https://fastapi.tiangolo.com/tutorial/cors/
- **Android Emulator Networking:** https://developer.android.com/studio/run/emulator-networking

---

## 🆘 Quick Reference

### Backend Commands

```bash
# Development (allow network access)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Production (Railway handles this)
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend Commands

```bash
# Start Expo
npm start

# Start with specific platform
npm run android
npm run ios
npm run web
```

### Debug URLs

| Platform | Health Check URL |
|----------|-----------------|
| iOS Simulator | `http://localhost:8000/health` |
| Android Emulator | `http://10.0.2.2:8000/health` |
| Physical Device | `http://192.168.x.x:8000/health` |
| Production | `https://chefmentor-api.railway.app/health` |

---

**Status:** ✅ Phase 7.1 Complete - Ready for Step 7.2 (Authentication Integration)
