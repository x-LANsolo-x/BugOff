/**
 * ChefMentor X – API Client with JWT Authentication
 * 
 * Features:
 * - Automatic JWT token injection
 * - Token refresh on 401
 * - Network error handling
 * - Request/response logging (dev only)
 */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '../config/env';
import { getAccessToken, getRefreshToken, setTokens, clearAuthData } from './storage';

// ============================================================================
// Axios Instance
// ============================================================================

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log API client initialization
console.log('🔌 API Client initialized');
console.log('   Base URL:', ENV.API_URL);
console.log('   Timeout:', ENV.API_TIMEOUT + 'ms');

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
        
        if (ENV.IS_DEV) {
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
    if (ENV.IS_DEV) {
      console.log('✅ Response:', response.config.url, response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // ========================================================================
    // Handle Network Errors
    // ========================================================================
    
    if (!error.response) {
      console.error('🌐 Network Error - Backend unreachable');
      
      // You can dispatch a global offline state here
      // Example: useUIStore.getState().setOffline(true);
      
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
        
        const response = await axios.post(`${ENV.API_URL}/auth/refresh`, {
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
        
        // Process queue with error
        processQueue(refreshError);
        
        isRefreshing = false;
        
        // You can dispatch a logout action here
        // Example: useAuthStore.getState().logout();
        
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
        break;
      case 404:
        console.warn('⚠️  Not Found (404):', error.config?.url);
        break;
      case 429:
        console.warn('⚠️  Rate Limited (429): Too many requests');
        break;
      case 500:
        console.error('❌ Server Error (500): Internal server error');
        break;
      case 503:
        console.error('❌ Service Unavailable (503): Server is down');
        break;
      default:
        console.error(`❌ HTTP Error (${status}):`, error.response.data);
    }
    
    // Return standardized error
    return Promise.reject({
      status,
      message: error.response.data?.message || (error as any).message || 'Unknown error',
      data: error.response.data,
      originalError: error,
    });
  }
);

// ============================================================================
// Export
// ============================================================================

export default apiClient;
