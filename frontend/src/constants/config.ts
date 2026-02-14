/**
 * ChefMentor X – App Configuration
 */

import Constants from 'expo-constants';
import { Platform } from 'react-native';

// ============================================================================
// API Configuration - Environment-Aware
// ============================================================================

/**
 * Get the appropriate API base URL based on environment and platform
 * 
 * Development:
 * - iOS Simulator: localhost
 * - Android Emulator: 10.0.2.2 (special alias for host machine)
 * - Physical Device: Your computer's LAN IP (set in .env or auto-detect)
 * 
 * Production:
 * - Uses Railway/deployed backend URL
 */
function getApiBaseUrl(): string {
    // Production: Use deployed backend
    if (!__DEV__) {
        return 'https://chefmentor-api.railway.app/api/v1';
    }

    // Development: Platform-specific configuration
    const { manifest } = Constants;
    
    // Try to get custom backend URL from environment/config
    // You can set this in app.json under "extra" or use expo-constants
    const customBackendUrl = Constants.expoConfig?.extra?.backendUrl;
    
    if (customBackendUrl) {
        console.log('📡 Using custom backend URL:', customBackendUrl);
        return `${customBackendUrl}/api/v1`;
    }

    // Auto-detect based on platform
    if (Platform.OS === 'android') {
        // Android Emulator: Use special alias for host machine
        // Physical Android: Use LAN IP from Expo's debuggerHost
        const debuggerHost = manifest?.debuggerHost || manifest?.hostUri;
        
        if (debuggerHost) {
            // Extract IP from debuggerHost (format: "192.168.1.x:19000")
            const hostIP = debuggerHost.split(':')[0];
            console.log('📱 Android detected, using host IP:', hostIP);
            return `http://${hostIP}:8000/api/v1`;
        }
        
        // Fallback for Android Emulator
        console.log('📱 Android Emulator detected, using 10.0.2.2');
        return 'http://10.0.2.2:8000/api/v1';
    }

    if (Platform.OS === 'ios') {
        // iOS Simulator: Use localhost
        // Physical iOS: Use LAN IP from Expo's debuggerHost
        const debuggerHost = manifest?.debuggerHost || manifest?.hostUri;
        
        if (debuggerHost) {
            const hostIP = debuggerHost.split(':')[0];
            console.log('📱 iOS detected, using host IP:', hostIP);
            return `http://${hostIP}:8000/api/v1`;
        }
        
        // Fallback for iOS Simulator
        console.log('📱 iOS Simulator detected, using localhost');
        return 'http://localhost:8000/api/v1';
    }

    // Web or other platforms
    console.log('🌐 Web/Other platform detected, using localhost');
    return 'http://localhost:8000/api/v1';
}

export const API_BASE_URL = getApiBaseUrl();

// Log the active API URL for debugging
console.log('🔗 API Base URL:', API_BASE_URL);
console.log('🏗️  Environment:', __DEV__ ? 'Development' : 'Production');
console.log('📱 Platform:', Platform.OS);

// Timeouts
export const API_TIMEOUT = 10000; // 10s
export const AI_RESPONSE_TIMEOUT = 5000; // 5s max for AI responses
export const VOICE_RESPONSE_TIMEOUT = 2000; // 2s for voice responses

// Limits
export const MAX_RECIPES = 5;
export const MAX_UPLOAD_SIZE_MB = 10;
export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

// Feature flags
export const FEATURES = {
    voiceEnabled: true,
    offlineMode: true,
    demoMode: true,
    analysisTab: true,
} as const;

// Google OAuth
export const GOOGLE_CLIENT_ID = '';
export const GOOGLE_REDIRECT_URI = 'com.chefmentorx:/oauth';

// App Info
export const APP_NAME = 'ChefMentor X';
export const APP_VERSION = '1.0.0';
