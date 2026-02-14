# 📦 Required Dependencies for Phase 7.2

## Installation Instructions

Run these commands in the `frontend` directory:

### Option 1: Install All at Once (Recommended)

```bash
cd frontend
npx expo install expo-secure-store @react-native-async-storage/async-storage
```

### Option 2: Individual Installation

```bash
# Secure storage for native platforms (iOS/Android)
npx expo install expo-secure-store

# Fallback storage for web and compatibility
npx expo install @react-native-async-storage/async-storage
```

---

## Why These Dependencies?

### expo-secure-store
- **Purpose:** Encrypted token storage on native platforms
- **Platforms:** iOS (Keychain), Android (Keystore)
- **Security:** Hardware-backed encryption
- **Use Case:** Storing JWT access/refresh tokens securely

### @react-native-async-storage/async-storage
- **Purpose:** Fallback storage for web and compatibility
- **Platforms:** Web (localStorage), iOS, Android
- **Security:** Not encrypted, but acceptable for web
- **Use Case:** Fallback when secure-store unavailable

---

## Storage Fallback Logic

Our implementation automatically selects the best storage:

1. **Native (iOS/Android):**
   - Primary: `expo-secure-store` (encrypted)
   - Fallback: `AsyncStorage` (if secure-store fails)

2. **Web:**
   - Uses `AsyncStorage` (backed by localStorage)

3. **No Dependencies:**
   - Falls back to in-memory storage (session only)

This means the app will work even if you don't install these packages, but **production deployment requires them for security**.

---

## Verification

After installation, run:

```bash
npm list expo-secure-store @react-native-async-storage/async-storage
```

Expected output:
```
frontend@1.0.0
├── @react-native-async-storage/async-storage@X.X.X
└── expo-secure-store@X.X.X
```

---

## Status

- [ ] expo-secure-store installed
- [ ] @react-native-async-storage/async-storage installed
- [ ] Verified in package.json
- [ ] App runs without errors

After installation, the storage wrapper will automatically use the best available option.
