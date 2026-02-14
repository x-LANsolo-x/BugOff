/**
 * ChefMentor X – App Configuration
 */

// API base URL - update for production
export const API_BASE_URL = __DEV__
    ? 'http://localhost:8000/api/v1'
    : 'https://chefmentor-api.railway.app/api/v1';

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
