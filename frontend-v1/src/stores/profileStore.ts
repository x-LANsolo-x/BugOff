/**
 * ChefMentor X – Profile Store (Zustand)
 * Connected to GET/PUT /api/v1/profile
 */
import create from 'zustand';
import { apiClient } from '../services/apiClient';

interface CookingHabits {
    dietary_restrictions?: string[];
    allergies?: string[];
    skill_level?: string;
    preferred_cuisines?: string[];
    cooking_frequency?: string;
}

interface ProfileState {
    cookingHabits: CookingHabits;
    isLoading: boolean;
    error: string | null;
}

interface ProfileActions {
    fetchProfile: () => Promise<void>;
    updateProfile: (habits: Partial<CookingHabits>) => Promise<void>;
    setError: (error: string | null) => void;
}

type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>((set, get) => ({
    cookingHabits: {},
    isLoading: false,
    error: null,

    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiClient.get('/profile');
            set({
                cookingHabits: data.cooking_habits || {},
                isLoading: false,
            });
            console.log('👤 Profile loaded');
        } catch (err: any) {
            console.error('❌ Failed to load profile:', err);
            set({
                error: err.message || 'Failed to load profile',
                isLoading: false,
            });
        }
    },

    updateProfile: async (habits) => {
        set({ isLoading: true, error: null });
        try {
            const currentHabits = get().cookingHabits;
            const merged = { ...currentHabits, ...habits };

            const { data } = await apiClient.put('/profile', {
                cooking_habits: merged,
            });

            set({
                cookingHabits: data.cooking_habits || merged,
                isLoading: false,
            });
            console.log('✅ Profile updated');
        } catch (err: any) {
            console.error('❌ Failed to update profile:', err);
            set({
                error: err.message || 'Failed to update profile',
                isLoading: false,
            });
        }
    },

    setError: (error) => set({ error }),
}));
