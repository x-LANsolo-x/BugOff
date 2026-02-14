/**
 * ChefMentor X – Cooking Session Store (Zustand)
 * Now connected to backend API
 */
import create from 'zustand';
import { apiClient } from '../services/apiClient';

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
    isLoading: boolean;
    error: string | null;
}

interface CookingActions {
    startSession: (recipeId: string, totalSteps: number) => Promise<void>;
    nextStep: () => Promise<void>;
    prevStep: () => Promise<void>;
    goToStep: (step: number) => void;
    pause: () => void;
    resume: () => void;
    toggleVoice: () => void;
    setTimer: (seconds: number) => void;
    tickTimer: () => void;
    clearTimer: () => void;
    endSession: () => Promise<void>;
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
    isLoading: false,
    error: null,

    // Actions
    startSession: async (recipeId, totalSteps) => {
        set({ isLoading: true, error: null });
        try {
            // Call backend to create a session
            const { data } = await apiClient.post('/sessions', {
                recipe_id: recipeId,
            });

            set({
                sessionId: data.id,
                recipeId,
                currentStep: 0,
                totalSteps,
                isPaused: false,
                isVoiceActive: true,
                timerValue: null,
                timerRunning: false,
                startedAt: data.started_at || new Date().toISOString(),
                isActive: true,
                isLoading: false,
            });

            console.log('🍳 Cooking session started:', data.id);
        } catch (err: any) {
            console.error('❌ Failed to start session:', err);
            // Fallback to client-side session if backend fails
            set({
                sessionId: `local_${Date.now()}`,
                recipeId,
                currentStep: 0,
                totalSteps,
                isPaused: false,
                isVoiceActive: true,
                timerValue: null,
                timerRunning: false,
                startedAt: new Date().toISOString(),
                isActive: true,
                isLoading: false,
                error: 'Using offline mode',
            });
        }
    },

    nextStep: async () => {
        const { currentStep, totalSteps, sessionId } = get();
        if (currentStep < totalSteps - 1) {
            const newStep = currentStep + 1;
            set({ currentStep: newStep, timerValue: null, timerRunning: false });

            // Sync with backend (fire-and-forget)
            if (sessionId && !sessionId.startsWith('local_')) {
                apiClient.put(`/sessions/${sessionId}/step`, {
                    current_step_index: String(newStep),
                }).catch((err) => console.warn('⚠️ Step sync failed:', err));
            }
        }
    },

    prevStep: async () => {
        const { currentStep, sessionId } = get();
        if (currentStep > 0) {
            const newStep = currentStep - 1;
            set({ currentStep: newStep, timerValue: null, timerRunning: false });

            // Sync with backend (fire-and-forget)
            if (sessionId && !sessionId.startsWith('local_')) {
                apiClient.put(`/sessions/${sessionId}/step`, {
                    current_step_index: String(newStep),
                }).catch((err) => console.warn('⚠️ Step sync failed:', err));
            }
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

    endSession: async () => {
        const { sessionId } = get();

        // Update backend session status
        if (sessionId && !sessionId.startsWith('local_')) {
            try {
                await apiClient.put(`/sessions/${sessionId}`, {
                    status: 'completed',
                });
                console.log('✅ Session completed on backend');
            } catch (err) {
                console.warn('⚠️ Failed to complete session on backend:', err);
            }
        }

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
            isLoading: false,
            error: null,
        });
    },
}));
