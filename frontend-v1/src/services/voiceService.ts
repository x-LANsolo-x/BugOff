/**
 * ChefMentor X – Voice Service
 *
 * Uses expo-speech for TTS on-device and backend API for STT + intent parsing.
 * Provides hands-free cooking interaction.
 */

import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { apiClient } from './apiClient';

// ── Types ──────────────────────────────────────────
export interface VoiceIntent {
    intent: 'NEXT' | 'PREV' | 'REPEAT' | 'TIMER' | 'INGREDIENT' | 'PAUSE' | 'RESUME' | 'HELP' | 'UNKNOWN';
    duration_seconds?: number;
    ingredient?: string;
    error?: string;
}

export interface VoiceSettings {
    ttsSpeed: number; // 0.8, 1.0, 1.2, 1.5
    autoRead: boolean;
    voiceEnabled: boolean;
}

const DEFAULT_SETTINGS: VoiceSettings = {
    ttsSpeed: 1.0,
    autoRead: true,
    voiceEnabled: true,
};

// ── Voice Service ──────────────────────────────────

class VoiceService {
    private settings: VoiceSettings = DEFAULT_SETTINGS;
    private recording: Audio.Recording | null = null;
    private isListening: boolean = false;

    /**
     * Request microphone permissions explicitly.
     */
    async requestPermissions(): Promise<boolean> {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            return status === 'granted';
        } catch (e) {
            console.error("Error requesting permissions:", e);
            return false;
        }
    }

    // ── TTS (Text-to-Speech) ─────────────────────────

    /**
     * Speak text aloud using device TTS.
     * Uses expo-speech (on-device, zero latency, works offline).
     */
    async speak(text: string): Promise<void> {
        if (!this.settings.voiceEnabled) return;

        // Stop any current speech first
        await this.stopSpeaking();

        return new Promise((resolve) => {
            Speech.speak(text, {
                language: 'en-US',
                rate: this.settings.ttsSpeed,
                pitch: 1.0,
                onDone: () => resolve(),
                onError: () => resolve(),
            });
        });
    }

    /** Stop any ongoing TTS. */
    async stopSpeaking(): Promise<void> {
        Speech.stop();
    }

    /** Check if currently speaking. */
    isSpeaking(): Promise<boolean> {
        return Speech.isSpeakingAsync();
    }

    // ── STT (Speech-to-Text) ─────────────────────────

    /**
     * Start recording audio for STT.
     * Returns true if recording started successfully.
     */
    async startListening(): Promise<{ success: boolean; error?: string }> {
        try {
            console.log('🎤 [VoiceService] Requesting permissions...');
            const permission = await Audio.requestPermissionsAsync();
            console.log('🎤 [VoiceService] Permission status:', permission.status);

            if (permission.status !== 'granted') {
                console.warn('🎤 [VoiceService] Microphone permission denied');
                // Try one more time with getPermissionsAsync to be sure
                const check = await Audio.getPermissionsAsync();
                console.log('🎤 [VoiceService] Double check status:', check.status);
                if (check.status !== 'granted') {
                    return { success: false, error: 'Permission denied. Please enable mic access in settings.' };
                }
            }

            console.log('🎤 [VoiceService] Permission granted, setting audio mode...');
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: false,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });
            } catch (modeError) {
                console.error('🎤 [VoiceService] Failed to set audio mode:', modeError);
                return { success: false, error: 'Audio setup failed. Restart app.' };
            }

            console.log('🎤 [VoiceService] Starting recording...');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            this.recording = recording;
            this.isListening = true;
            console.log('🎤 [VoiceService] Recording started successfully');
            return { success: true };
        } catch (error: any) {
            console.error('🎤 [VoiceService] Failed to start recording (General Error):', error);
            this.isListening = false;
            return { success: false, error: error.message || 'Mic error. Try again.' };
        }
    }

    /**
     * Stop recording and send audio to backend for transcription + intent parsing.
     * Returns the parsed voice intent.
     */
    async stopListeningAndParse(): Promise<VoiceIntent> {
        if (!this.recording) {
            return { intent: 'UNKNOWN', error: 'No recording active' };
        }

        try {
            this.isListening = false;
            await this.recording.stopAndUnloadAsync();
            const uri = this.recording.getURI();
            this.recording = null;

            if (!uri) {
                return { intent: 'UNKNOWN', error: 'No audio captured' };
            }

            // Reset audio mode back to playback
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });

            // Step 1: Send audio to backend STT
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: 'audio/wav',
                name: 'voice_command.wav',
            } as any);

            const sttResponse = await apiClient.post('/voice/stt', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 10000,
            });

            const transcribedText = sttResponse.data?.text;
            if (!transcribedText) {
                return { intent: 'UNKNOWN', error: 'Could not transcribe audio' };
            }

            console.log('🎤 Transcribed:', transcribedText);

            // Step 2: Parse intent from transcribed text
            const intentResponse = await apiClient.post('/voice/command', {
                text: transcribedText,
            });

            return intentResponse.data as VoiceIntent;
        } catch (error) {
            console.error('🎤 Voice processing error:', error);

            // Cleanup
            if (this.recording) {
                try {
                    await this.recording.stopAndUnloadAsync();
                } catch { }
                this.recording = null;
            }

            return { intent: 'UNKNOWN', error: 'Voice processing failed' };
        }
    }

    /**
     * Simple text-based intent parsing (no audio recording).
     * Useful for typed commands or offline fallback.
     */
    async parseTextCommand(text: string): Promise<VoiceIntent> {
        // Offline fallback: simple pattern matching
        const lower = text.toLowerCase().trim();

        if (/^(next|go next|next step)/.test(lower)) return { intent: 'NEXT' };
        if (/^(back|previous|prev|go back)/.test(lower)) return { intent: 'PREV' };
        if (/^(repeat|again|say that again)/.test(lower)) return { intent: 'REPEAT' };
        if (/^(pause|stop|wait)/.test(lower)) return { intent: 'PAUSE' };
        if (/^(resume|continue|go)/.test(lower)) return { intent: 'RESUME' };
        if (/^(help|commands|what can)/.test(lower)) return { intent: 'HELP' };
        if (/timer|(\d+)\s*(min|sec)/.test(lower)) {
            const match = lower.match(/(\d+)\s*(min|sec)/);
            const secs = match
                ? match[2] === 'min' ? parseInt(match[1]) * 60 : parseInt(match[1])
                : 300; // default 5 min
            return { intent: 'TIMER', duration_seconds: secs };
        }
        if (/how much|ingredient|salt|sugar|oil|butter/.test(lower)) {
            return { intent: 'INGREDIENT' };
        }

        // Fall back to API for complex queries
        try {
            const response = await apiClient.post('/voice/command', { text });
            return response.data as VoiceIntent;
        } catch {
            return { intent: 'UNKNOWN' };
        }
    }

    // ── Settings ─────────────────────────────────────

    updateSettings(settings: Partial<VoiceSettings>): void {
        this.settings = { ...this.settings, ...settings };
    }

    getSettings(): VoiceSettings {
        return { ...this.settings };
    }

    getIsListening(): boolean {
        return this.isListening;
    }
}

// Singleton export
export const voiceService = new VoiceService();
export default voiceService;
