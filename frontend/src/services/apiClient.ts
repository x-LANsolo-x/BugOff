/**
 * ChefMentor X – Axios API Client
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../constants/config';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';

// Create Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Request Interceptor ───────────────────────────

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { token } = useAuthStore.getState();
        if (token && token !== 'demo-token') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ──────────────────────────

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const { showToast, setOffline } = useUIStore.getState();
        const { logout } = useAuthStore.getState();

        // Network error / offline
        if (!error.response) {
            setOffline(true);
            showToast('warning', 'You appear to be offline. Some features may be unavailable.');
            return Promise.reject(error);
        }

        const status = error.response.status;

        switch (status) {
            case 401:
                // Session expired
                logout();
                showToast('error', 'Session expired. Please sign in again.');
                break;
            case 429:
                // Rate limited
                showToast('warning', 'Too many requests. Please wait a moment.');
                break;
            case 500:
                showToast('error', 'Something went wrong. Please try again.');
                break;
            default:
                break;
        }

        return Promise.reject(error);
    }
);

export default apiClient;
