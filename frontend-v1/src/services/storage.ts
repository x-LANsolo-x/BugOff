/**
 * Secure Storage Wrapper for ChefMentor X
 * 
 * Provides a unified interface for token storage with automatic fallback.
 * 
 * Priority:
 * 1. expo-secure-store (native, encrypted storage)
 * 2. AsyncStorage (fallback for web or if secure-store unavailable)
 * 
 * Installation:
 * Run: npx expo install expo-secure-store @react-native-async-storage/async-storage
 */

import { Platform } from 'react-native';

// Storage keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'auth_access_token',
    REFRESH_TOKEN: 'auth_refresh_token',
    USER_DATA: 'auth_user_data',
} as const;

// ============================================================================
// Storage Interface
// ============================================================================

interface SecureStorage {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}

// ============================================================================
// Implementation Selector
// ============================================================================

let storage: SecureStorage;

// Try to use expo-secure-store (native platforms)
if (Platform.OS !== 'web') {
    try {
        const SecureStore = require('expo-secure-store');
        
        storage = {
            async setItem(key: string, value: string): Promise<void> {
                await SecureStore.setItemAsync(key, value);
            },
            
            async getItem(key: string): Promise<string | null> {
                return await SecureStore.getItemAsync(key);
            },
            
            async removeItem(key: string): Promise<void> {
                await SecureStore.deleteItemAsync(key);
            },
            
            async clear(): Promise<void> {
                // Remove all auth-related keys
                await Promise.all([
                    SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN).catch(() => {}),
                    SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN).catch(() => {}),
                    SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA).catch(() => {}),
                ]);
            },
        };
        
        console.log('✅ Using expo-secure-store for token storage');
    } catch (error) {
        console.warn('⚠️  expo-secure-store not available, falling back to AsyncStorage');
        storage = createAsyncStorageFallback();
    }
} else {
    // Web: Use AsyncStorage
    console.log('🌐 Using AsyncStorage for web platform');
    storage = createAsyncStorageFallback();
}

// ============================================================================
// AsyncStorage Fallback
// ============================================================================

function createAsyncStorageFallback(): SecureStorage {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        
        return {
            async setItem(key: string, value: string): Promise<void> {
                await AsyncStorage.setItem(key, value);
            },
            
            async getItem(key: string): Promise<string | null> {
                return await AsyncStorage.getItem(key);
            },
            
            async removeItem(key: string): Promise<void> {
                await AsyncStorage.removeItem(key);
            },
            
            async clear(): Promise<void> {
                const keys = Object.values(STORAGE_KEYS);
                await AsyncStorage.multiRemove(keys);
            },
        };
    } catch (error) {
        console.error('❌ No storage available. Falling back to in-memory storage.');
        return createInMemoryStorage();
    }
}

// ============================================================================
// In-Memory Fallback (Last Resort)
// ============================================================================

function createInMemoryStorage(): SecureStorage {
    const memoryStore = new Map<string, string>();
    
    return {
        async setItem(key: string, value: string): Promise<void> {
            memoryStore.set(key, value);
        },
        
        async getItem(key: string): Promise<string | null> {
            return memoryStore.get(key) || null;
        },
        
        async removeItem(key: string): Promise<void> {
            memoryStore.delete(key);
        },
        
        async clear(): Promise<void> {
            memoryStore.clear();
        },
    };
}

// ============================================================================
// Exported Storage Functions
// ============================================================================

/**
 * Store access token securely
 */
export async function setAccessToken(token: string): Promise<void> {
    await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
}

/**
 * Get access token
 */
export async function getAccessToken(): Promise<string | null> {
    return await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

/**
 * Store refresh token securely
 */
export async function setRefreshToken(token: string): Promise<void> {
    await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
}

/**
 * Get refresh token
 */
export async function getRefreshToken(): Promise<string | null> {
    return await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * Store user data
 */
export async function setUserData(userData: object): Promise<void> {
    await storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
}

/**
 * Get user data
 */
export async function getUserData(): Promise<object | null> {
    const data = await storage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
}

/**
 * Clear all authentication data
 */
export async function clearAuthData(): Promise<void> {
    await storage.clear();
}

/**
 * Store both tokens at once
 */
export async function setTokens(accessToken: string, refreshToken?: string): Promise<void> {
    await setAccessToken(accessToken);
    if (refreshToken) {
        await setRefreshToken(refreshToken);
    }
}

// Default export
export default storage;
