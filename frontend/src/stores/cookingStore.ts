/**
 * ChefMentor X – Cooking Session Store (Zustand)
 */

import { create } from 'zustand';

interface CookingState {
    sessionId: string | null;
    recipeId: string | null;
    currentStep: number;
    totalSteps: number;
    isPaused: boolean;
    isVoiceActive: boolean;
    timerValue: number | null;
    timerRunning: boolean;
    startedAt: string | null;
    isActive: boolean;
}

interface CookingActions {
    startSession: (recipeId: string, totalSteps: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    pause: () => void;
    resume: () => void;
    toggleVoice: () => void;
    setTimer: (seconds: number) => void;
    tickTimer: () => void;
    clearTimer: () => void;
    endSession: () => void;
}

type CookingStore = CookingState & CookingActions;

export const useCookingStore = create<CookingStore>((set, get) => ({
    // State
    sessionId: null,
    recipeId: null,
    currentStep: 0,
    totalSteps: 0,
    isPaused: false,
    isVoiceActive: true,
    timerValue: null,
    timerRunning: false,
    startedAt: null,
    isActive: false,

    // Actions
    startSession: (recipeId, totalSteps) =>
        set({
            sessionId: `session_${Date.now()}`,
            recipeId,
            currentStep: 0,
            totalSteps,
            isPaused: false,
            isVoiceActive: true,
            timerValue: null,
            timerRunning: false,
            startedAt: new Date().toISOString(),
            isActive: true,
        }),

    nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps - 1) {
            set({ currentStep: currentStep + 1, timerValue: null, timerRunning: false });
        }
    },

    prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
            set({ currentStep: currentStep - 1, timerValue: null, timerRunning: false });
        }
    },

    goToStep: (step) => {
        const { totalSteps } = get();
        if (step >= 0 && step < totalSteps) {
            set({ currentStep: step, timerValue: null, timerRunning: false });
        }
    },

    pause: () => set({ isPaused: true, timerRunning: false }),
    resume: () => set({ isPaused: false }),

    toggleVoice: () => set((state) => ({ isVoiceActive: !state.isVoiceActive })),

    setTimer: (seconds) => set({ timerValue: seconds, timerRunning: true }),

    tickTimer: () => {
        const { timerValue } = get();
        if (timerValue !== null && timerValue > 0) {
            set({ timerValue: timerValue - 1 });
        } else if (timerValue === 0) {
            set({ timerRunning: false });
        }
    },

    clearTimer: () => set({ timerValue: null, timerRunning: false }),

    endSession: () =>
        set({
            sessionId: null,
            recipeId: null,
            currentStep: 0,
            totalSteps: 0,
            isPaused: false,
            isVoiceActive: true,
            timerValue: null,
            timerRunning: false,
            isActive: false,
        }),
}));
