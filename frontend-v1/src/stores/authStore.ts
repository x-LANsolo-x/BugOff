/**
 * ChefMentor X – Auth Store (Zustand) with Persistent Storage
 * 
 * Features:
 * - Persistent authentication state
 * - Secure token storage
 * - Auto-restore session on app launch
 */

import create from 'zustand';
import type { User, AuthState } from '../types';
import { setTokens, clearAuthData, getAccessToken, getUserData } from '../services/storage';

interface AuthActions {
    setUser: (user: User, token: string, refreshToken?: string) => Promise<void>;
    setDemo: () => void;
    logout: () => Promise<void>;
    setLoading: (loading: boolean) => void;
    restoreSession: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
    // State
    user: null,
    token: null,
    isAuthenticated: false,
    isDemo: false,
    isLoading: true, // Start as loading while checking for saved session

    // Actions
    
    /**
     * Set authenticated user and persist tokens
     */
    setUser: async (user, token, refreshToken) => {
        try {
            // Save tokens to secure storage
            await setTokens(token, refreshToken);
            
            // Update state
            set({ 
                user, 
                token, 
                isAuthenticated: true, 
                isDemo: false, 
                isLoading: false 
            });
            
            console.log('✅ User authenticated:', user.email);
        } catch (error) {
            console.error('❌ Failed to save auth data:', error);
            set({ isLoading: false });
        }
    },

    /**
     * Set demo mode (no persistent storage)
     */
    setDemo: () => {
        set({
            user: {
                id: 'demo',
                email: 'demo@chefmentorx.app',
                name: 'Demo User',
                skillLevel: 'beginner',
                createdAt: new Date().toISOString(),
            },
            token: 'demo-token',
            isAuthenticated: true,
            isDemo: true,
            isLoading: false,
        });
        
        console.log('🎭 Demo mode activated');
    },

    /**
     * Logout and clear all auth data
     */
    logout: async () => {
        try {
            // Clear tokens from secure storage
            await clearAuthData();
            
            // Clear state
            set({ 
                user: null, 
                token: null, 
                isAuthenticated: false, 
                isDemo: false 
            });
            
            console.log('👋 User logged out');
        } catch (error) {
            console.error('❌ Failed to clear auth data:', error);
        }
    },

    /**
     * Set loading state
     */
    setLoading: (loading) => set({ isLoading: loading }),
    
    /**
     * Restore session from storage on app launch
     */
    restoreSession: async () => {
        try {
            console.log('🔄 Restoring session...');
            
            // Get stored token and user data
            const token = await getAccessToken();
            const userData = await getUserData();
            
            if (token && userData) {
                set({
                    user: userData as User,
                    token,
                    isAuthenticated: true,
                    isDemo: false,
                    isLoading: false,
                });
                
                console.log('✅ Session restored:', (userData as any).email);
            } else {
                console.log('ℹ️  No saved session found');
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('❌ Failed to restore session:', error);
            set({ isLoading: false });
        }
    },
}));
