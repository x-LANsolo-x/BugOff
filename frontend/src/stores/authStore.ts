/**
 * ChefMentor X – Auth Store (Zustand)
 */

import { create } from 'zustand';
import type { User, AuthState } from '../types';

interface AuthActions {
    setUser: (user: User, token: string) => void;
    setDemo: () => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
    // State
    user: null,
    token: null,
    isAuthenticated: false,
    isDemo: false,
    isLoading: false,

    // Actions
    setUser: (user, token) =>
        set({ user, token, isAuthenticated: true, isDemo: false, isLoading: false }),

    setDemo: () =>
        set({
            user: {
                id: 'demo',
                email: 'demo@chefmentorx.app',
                displayName: 'Demo User',
                skillLevel: 'beginner',
                createdAt: new Date().toISOString(),
            },
            token: 'demo-token',
            isAuthenticated: true,
            isDemo: true,
            isLoading: false,
        }),

    logout: () =>
        set({ user: null, token: null, isAuthenticated: false, isDemo: false }),

    setLoading: (loading) => set({ isLoading: loading }),
}));
