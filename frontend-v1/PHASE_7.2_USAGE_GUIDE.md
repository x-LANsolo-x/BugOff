# Phase 7.2: API Client Architecture - Usage Guide

## ✅ What Was Implemented

### 1. Secure Token Storage (`src/services/storage.ts`)
- Auto-selects best storage: SecureStore → AsyncStorage → In-Memory
- Encrypted storage on native platforms
- Persistent auth across app restarts
- Type-safe storage functions

### 2. Enhanced API Client (`src/services/apiClient.ts`)
- Automatic JWT token injection
- Token refresh on 401 (expired token)
- Request queuing during refresh
- Network error handling
- Standardized error responses
- Dev mode logging

### 3. Persistent Auth Store (`src/stores/authStore.ts`)
- Auto-restore session on app launch
- Secure token persistence
- Async auth operations
- Demo mode support

---

## 🚀 Installation Required

**Run this in `frontend-v1`:**

```bash
npx expo install expo-secure-store @react-native-async-storage/async-storage
```

See `INSTALL_DEPENDENCIES.md` for details.

---

## 📝 Usage Examples

### 1. Login Flow

```typescript
import { useAuthStore } from '../stores/authStore';
import { apiClient } from '../services/apiClient';

const LoginScreen = () => {
    const { setUser, setLoading } = useAuthStore();
    
    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        
        try {
            // Login request
            const response = await apiClient.post('/auth/login', {
                email,
                password,
            });
            
            const { user, access_token, refresh_token } = response.data;
            
            // Save user and tokens (automatically persisted)
            await setUser(user, access_token, refresh_token);
            
            // Navigate to home
            navigation.navigate('Home');
        } catch (error: any) {
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        // ... UI code
    );
};
```

### 2. Restore Session on App Launch

```typescript
// App.tsx or AppNavigator.tsx
import { useAuthStore } from './src/stores/authStore';
import { useEffect } from 'react';

const App = () => {
    const { restoreSession, isLoading } = useAuthStore();
    
    useEffect(() => {
        // Restore session on app launch
        restoreSession();
    }, []);
    
    if (isLoading) {
        return <SplashScreen />;
    }
    
    return <AppNavigator />;
};
```

### 3. Authenticated API Requests

```typescript
import { apiClient } from '../services/apiClient';

// Token is automatically attached to all requests
const fetchRecipes = async () => {
    try {
        const response = await apiClient.get('/recipes');
        return response.data;
    } catch (error: any) {
        // Error is already standardized
        console.error(error.message);
        throw error;
    }
};

// Upload with FormData
const uploadImage = async (imageUri: string) => {
    const formData = new FormData();
    formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
    } as any);
    
    try {
        const response = await apiClient.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 60000, // 60s for uploads
        });
        
        return response.data;
    } catch (error: any) {
        Alert.alert('Upload Failed', error.message);
    }
};
```

### 4. Logout

```typescript
import { useAuthStore } from '../stores/authStore';

const ProfileScreen = () => {
    const { logout } = useAuthStore();
    
    const handleLogout = async () => {
        // Clears tokens and state
        await logout();
        
        // Navigate to login
        navigation.navigate('Login');
    };
    
    return (
        <Button title="Logout" onPress={handleLogout} />
    );
};
```

### 5. Demo Mode

```typescript
import { useAuthStore } from '../stores/authStore';

const LoginScreen = () => {
    const { setDemo } = useAuthStore();
    
    const handleDemoMode = () => {
        // Quick demo access (no persistence)
        setDemo();
        navigation.navigate('Home');
    };
    
    return (
        <>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Try Demo" onPress={handleDemoMode} />
        </>
    );
};
```

---

## 🔄 Token Refresh Flow

### Automatic Handling

When a request returns 401:

1. **First 401:** Attempts token refresh
   - Calls `/auth/refresh` with refresh token
   - Saves new tokens
   - Retries original request

2. **Concurrent Requests:** Queued during refresh
   - All pending requests wait
   - Retry after successful refresh

3. **Refresh Fails:** Auto-logout
   - Clears all tokens
   - User redirected to login

### Backend Endpoint Required

Your backend must implement:

```python
# backend/app/api/v1/endpoints/auth.py

@router.post("/refresh")
async def refresh_token(refresh_token: str):
    # Validate refresh token
    # Generate new access token
    # Optionally rotate refresh token
    
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token  # Optional
    }
```

---

## 🔍 Debugging

### Check Token Storage

```typescript
import { getAccessToken, getRefreshToken } from '../services/storage';

const checkTokens = async () => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
};
```

### Monitor Network Requests

In development mode, the API client logs:

```
🔌 API Client initialized
   Base URL: http://192.168.1.100:8000/api/v1
   Timeout: 15000ms

🔑 Attaching token to request: /recipes
✅ Response: /recipes 200

🔄 Refreshing access token...
✅ Token refreshed successfully
```

### Test Token Expiry

```typescript
// Manually test token refresh
import { setTokens } from '../services/storage';

// Set an expired token
await setTokens('expired.jwt.token', 'valid-refresh-token');

// Make any API request - should auto-refresh
await apiClient.get('/recipes');
```

---

## 🛡️ Security Best Practices

### ✅ What We Implemented

1. **Encrypted Storage** - SecureStore on native platforms
2. **Token Refresh** - Auto-refresh on expiry
3. **Secure Transmission** - HTTPS in production (configure backend)
4. **Token Rotation** - Supported (backend implements)
5. **Auto-logout** - On refresh failure

### ⚠️ What You Should Add

1. **JWT Expiry Check** - Proactive refresh before expiry
2. **Biometric Auth** - For sensitive operations
3. **Token Blacklisting** - Backend implements
4. **Rate Limiting** - Backend implements

---

## 🐛 Troubleshooting

### Issue: "expo-secure-store not available"

**Solution:** Install dependencies:
```bash
npx expo install expo-secure-store
```

### Issue: Token not persisting

**Check:**
1. Dependencies installed?
2. Storage logs in console?
3. Async/await used correctly?

### Issue: 401 loop (infinite refresh)

**Cause:** Backend refresh endpoint not working

**Fix:**
1. Check backend `/auth/refresh` endpoint
2. Verify refresh token is valid
3. Check backend logs

### Issue: Token not attached to requests

**Check:**
1. Token saved to storage?
2. `setUser()` called with token?
3. Check API client logs in dev mode

---

## 📊 Error Handling

All API errors are standardized:

```typescript
try {
    await apiClient.get('/recipes');
} catch (error: any) {
    console.log(error.status);        // 404
    console.log(error.message);       // "Recipe not found"
    console.log(error.data);          // Full response data
    console.log(error.originalError); // Original axios error
}
```

---

## 🧪 Testing Checklist

Before moving to Phase 7.3:

- [ ] Dependencies installed (expo-secure-store, async-storage)
- [ ] Login saves tokens and persists
- [ ] App restores session on restart
- [ ] Authenticated requests include JWT
- [ ] Token refresh works on 401
- [ ] Logout clears tokens
- [ ] Demo mode works
- [ ] Network errors handled gracefully

---

## 🎯 Next Steps

### Phase 7.3: API Response Standardization
- Consistent error format across all endpoints
- Global loading states
- Retry logic for failed requests
- Offline mode handling

### Integration with Existing Screens

Update your existing screens to use the new auth flow:

1. **LoginScreen** - Use `setUser()` after successful login
2. **App.tsx** - Call `restoreSession()` on mount
3. **ProfileScreen** - Use `logout()` for logout
4. **All API calls** - Use `apiClient` instead of fetch

---

## 📚 Related Files

- `src/services/storage.ts` - Token storage wrapper
- `src/services/apiClient.ts` - Enhanced axios client
- `src/stores/authStore.ts` - Persistent auth state
- `INSTALL_DEPENDENCIES.md` - Installation guide

---

**Status:** ✅ Phase 7.2 Complete - Ready for Integration Testing
