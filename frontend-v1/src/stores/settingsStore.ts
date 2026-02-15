import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
    theme: 'light' | 'dark' | 'system';
    pushNotifications: boolean;
    weeklyMealPlan: boolean;
    voiceVolume: number;
    voiceSpeed: 'Slow' | 'Normal' | 'Fast'; // Changed to string union to match screen
    beginnerMode: boolean;
    wakeWordEnabled: boolean;
    autoRead: boolean;

    toggleTheme: () => void;
    setPushNotifications: (enabled: boolean) => void;
    setWeeklyMealPlan: (enabled: boolean) => void;
    setVoiceVolume: (vol: number) => void;
    setVoiceSpeed: (speed: 'Slow' | 'Normal' | 'Fast') => void;
    setBeginnerMode: (enabled: boolean) => void;
    setWakeWordEnabled: (enabled: boolean) => void;
    toggleAutoRead: () => void;
}

export const useSettingsStore = create<SettingsState>(
    persist(
        (set) => ({
            theme: 'system' as 'light' | 'dark' | 'system',
            pushNotifications: true as boolean,
            weeklyMealPlan: true as boolean,
            voiceVolume: 0.8,
            voiceSpeed: 'Normal' as 'Slow' | 'Normal' | 'Fast', // Default to Normal
            beginnerMode: true as boolean,
            wakeWordEnabled: false as boolean,
            autoRead: true as boolean,

            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),
            setPushNotifications: (enabled) => set({ pushNotifications: enabled }),
            setWeeklyMealPlan: (enabled) => set({ weeklyMealPlan: enabled }),
            setVoiceVolume: (vol) => set({ voiceVolume: vol }),
            setVoiceSpeed: (speed) => set({ voiceSpeed: speed }),
            setBeginnerMode: (enabled) => set({ beginnerMode: enabled }),
            setWakeWordEnabled: (enabled) => set({ wakeWordEnabled: enabled }),
            toggleAutoRead: () => set((state) => ({ autoRead: !state.autoRead })),
        }),
        {
            name: 'settings-storage',
            getStorage: () => AsyncStorage,
        }
    )
);
