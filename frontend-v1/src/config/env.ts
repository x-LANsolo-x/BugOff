/**
 * ChefMentor X – Environment Configuration
 * 
 * AUTO-DETECTS the correct API URL based on platform and device type.
 * No manual configuration needed! 🎉
 */

import Constants from 'expo-constants';
import { Platform } from 'react-native';

// ============================================================================
// API Configuration - Smart Auto-Detection
// ============================================================================

/**
 * Automatically determines the correct API base URL
 * 
 * Production: Uses deployed Railway backend
 * 
 * Development (Auto-detects):
 * - iOS Simulator → localhost:8000
 * - iOS Physical Device → LAN IP (from Expo debuggerHost)
 * - Android Emulator → 10.0.2.2:8000 (special host alias)
 * - Android Physical Device → LAN IP (from Expo debuggerHost)
 * - Web → localhost:8000
 * 
 * Manual Override: Set in app.json:
 * {
 *   "expo": {
 *     "extra": {
 *       "backendUrl": "http://192.168.1.100:8000"
 *     }
 *   }
 * }
 */
function getApiBaseUrl(): string {
    // Production: Use deployed backend
    if (!__DEV__) {
        return 'https://chefmentor-production.up.railway.app/api/v1';
    }

    // Development: Check for manual override first
    const customBackendUrl = Constants.expoConfig?.extra?.backendUrl;
    
    if (customBackendUrl) {
        console.log('📡 Using custom backend URL:', customBackendUrl);
        return `${customBackendUrl}/api/v1`;
    }

    // Auto-detect based on platform
    const { manifest } = Constants;
    
    if (Platform.OS === 'android') {
        // Android: Check if on physical device or emulator
        const debuggerHost = manifest?.debuggerHost || manifest?.hostUri;
        
        if (debuggerHost) {
            // Physical device: Extract IP from debuggerHost (format: "192.168.1.x:19000")
            const hostIP = debuggerHost.split(':')[0];
            console.log('📱 Android physical device detected, using host IP:', hostIP);
            return `http://${hostIP}:8000/api/v1`;
        }
        
        // Android Emulator: Use special alias for host machine
        console.log('📱 Android Emulator detected, using 10.0.2.2');
        return 'http://10.0.2.2:8000/api/v1';
    }

    if (Platform.OS === 'ios') {
        // iOS: Check if on physical device or simulator
        const debuggerHost = manifest?.debuggerHost || manifest?.hostUri;
        
        if (debuggerHost && !debuggerHost.includes('localhost')) {
            // Physical device: Use LAN IP
            const hostIP = debuggerHost.split(':')[0];
            console.log('📱 iOS physical device detected, using host IP:', hostIP);
            return `http://${hostIP}:8000/api/v1`;
        }
        
        // iOS Simulator: Use localhost
        console.log('📱 iOS Simulator detected, using localhost');
        return 'http://localhost:8000/api/v1';
    }

    // Web or other platforms: Use localhost
    console.log('🌐 Web/Other platform detected, using localhost');
    return 'http://localhost:8000/api/v1';
}

// Get the API URL
const API_URL = getApiBaseUrl();

// Log configuration for debugging
console.log('\n' + '='.repeat(50));
console.log('🔧 CHEFMENTOR X - CONFIGURATION');
console.log('='.repeat(50));
console.log('🔗 API URL:', API_URL);
console.log('🏗️  Environment:', __DEV__ ? 'Development' : 'Production');
console.log('📱 Platform:', Platform.OS);
console.log('='.repeat(50) + '\n');

// ============================================================================
// Exported Configuration
// ============================================================================

export const ENV = {
    // API Configuration
    API_URL,
    
    // Timeouts (in milliseconds)
    API_TIMEOUT: 15000,          // 15s for general requests
    AI_TIMEOUT: 30000,           // 30s for AI requests (can be slower)
    UPLOAD_TIMEOUT: 60000,       // 60s for image uploads
    
    // Environment
    IS_DEV: __DEV__,
    IS_PROD: !__DEV__,
    
    // Platform
    PLATFORM: Platform.OS,
    IS_IOS: Platform.OS === 'ios',
    IS_ANDROID: Platform.OS === 'android',
    IS_WEB: Platform.OS === 'web',
} as const;

// Type-safe environment access
export type EnvConfig = typeof ENV;
