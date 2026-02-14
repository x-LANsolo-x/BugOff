/**
 * ChefMentor X – API Client with JWT Authentication
 * 
 * Features:
 * - Automatic JWT token injection
 * - Token refresh on 401
 * - Network error handling
 * - Request/response logging (dev only)
 * - Integration with UI store for offline/toast notifications
 */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../constants/config';
import { getAccessToken, getRefreshToken, setTokens, clearAuthData } from './storage';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';

// ============================================================================
// Axios Instance
// ============================================================================

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Log API client initialization
console.log('🔌 API Client initialized');
console.log('   Base URL:', API_BASE_URL);
console.log('   Timeout:', API_TIMEOUT + 'ms');

// ============================================================================
// Request Interceptor - Attach JWT Token
// ============================================================================

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            // Get access token from secure storage
            const token = await getAccessToken();
            
            if (token && token !== 'demo-token') {
                config.headers.Authorization = `Bearer ${token}`;
                
                if (__DEV__) {
                    console.log('🔑 Attaching token to request:', config.url);
                }
            }
        } catch (error) {
            // Silently fail if token retrieval fails
            console.warn('⚠️  Failed to retrieve token:', error);
        }
        
        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// ============================================================================
// Response Interceptor - Handle Errors & Token Refresh
// ============================================================================

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Success response - log in dev mode
        if (__DEV__) {
            console.log('✅ Response:', response.config.url, response.status);
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const { showToast, setOffline } = useUIStore.getState();
        const { logout } = useAuthStore.getState();
        
        // ========================================================================
        // Handle Network Errors
        // ========================================================================
        
        if (!error.response) {
            console.error('🌐 Network Error - Backend unreachable');
            setOffline(true);
            showToast('warning', 'You appear to be offline. Some features may be unavailable.');
            
            return Promise.reject({
                message: 'Network error. Please check your connection.',
                originalError: error,
            });
        }
        
        const status = error.response.status;
        
        // ========================================================================
        // Handle 401 Unauthorized - Token Refresh Logic
        // ========================================================================
        
        if (status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Another request is already refreshing - queue this one
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }
            
            originalRequest._retry = true;
            isRefreshing = true;
            
            try {
                const refreshToken = await getRefreshToken();
                
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                
                // Attempt to refresh the token
                console.log('🔄 Refreshing access token...');
                
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refresh_token: refreshToken,
                });
                
                const { access_token, refresh_token: newRefreshToken } = response.data;
                
                // Store new tokens
                await setTokens(access_token, newRefreshToken);
                
                console.log('✅ Token refreshed successfully');
                
                // Update authorization header for the failed request
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                
                // Process queued requests
                processQueue();
                
                isRefreshing = false;
                
                // Retry original request
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('❌ Token refresh failed:', refreshError);
                
                // Clear auth data and redirect to login
                await clearAuthData();
                await logout();
                
                // Process queue with error
                processQueue(refreshError);
                
                isRefreshing = false;
                
                showToast('error', 'Session expired. Please sign in again.');
                
                return Promise.reject({
                    message: 'Session expired. Please login again.',
                    originalError: refreshError,
                });
            }
        }
        
        // ========================================================================
        // Handle Other Status Codes
        // ========================================================================
        
        switch (status) {
            case 400:
                console.warn('⚠️  Bad Request (400):', error.response.data);
                break;
            case 403:
                console.warn('⚠️  Forbidden (403): Insufficient permissions');
                showToast('error', 'You do not have permission to perform this action.');
                break;
            case 404:
                console.warn('⚠️  Not Found (404):', error.config?.url);
                break;
            case 429:
                console.warn('⚠️  Rate Limited (429): Too many requests');
                showToast('warning', 'Too many requests. Please wait a moment.');
                break;
            case 500:
                console.error('❌ Server Error (500): Internal server error');
                showToast('error', 'Something went wrong. Please try again.');
                break;
            case 503:
                console.error('❌ Service Unavailable (503): Server is down');
                showToast('error', 'Service temporarily unavailable.');
                break;
            default:
                console.error(`❌ HTTP Error (${status}):`, error.response.data);
        }
        
        // Return standardized error
        return Promise.reject({
            status,
            message: error.response.data?.message || error.message,
            data: error.response.data,
            originalError: error,
        });
    }
);

// ============================================================================
// Export
// ============================================================================

export default apiClient;
