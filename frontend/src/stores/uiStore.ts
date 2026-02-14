/**
 * ChefMentor X – UI Store (Zustand)
 */

import create from 'zustand';
import type { AlertType } from '../types';

interface ToastData {
    id: string;
    type: AlertType;
    title?: string;
    message: string;
}

interface UIState {
    isGlobalLoading: boolean;
    toasts: ToastData[];
    isOffline: boolean;
}

interface UIActions {
    setGlobalLoading: (loading: boolean) => void;
    showToast: (type: AlertType, message: string, title?: string) => void;
    dismissToast: (id: string) => void;
    setOffline: (offline: boolean) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
    isGlobalLoading: false,
    toasts: [],
    isOffline: false,

    setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),

    showToast: (type, message, title) =>
        set((state) => ({
            toasts: [
                ...state.toasts,
                { id: `toast_${Date.now()}`, type, message, title },
            ],
        })),

    dismissToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),

    setOffline: (offline) => set({ isOffline: offline }),
}));
