/**
 * ChefMentor X – Analysis Store (Zustand)
 * Now connected to backend API
 */
import create from 'zustand';
import type { AnalysisRequest, AnalysisResult } from '../types';
import { apiClient } from '../services/apiClient';

interface AnalysisState {
    uploadedImageUri: string | null;
    contextAnswers: Partial<AnalysisRequest>;
    analysisResult: AnalysisResult | null;
    pastAnalyses: AnalysisResult[];
    isAnalyzing: boolean;
    error: string | null;
}

interface AnalysisActions {
    setImage: (uri: string) => void;
    setContext: (answers: Partial<AnalysisRequest>) => void;
    setResult: (result: AnalysisResult) => void;
    setAnalyzing: (analyzing: boolean) => void;
    setError: (error: string | null) => void;
    submitAnalysis: (sessionId?: string) => Promise<void>;
    fetchAnalyses: () => Promise<void>;
    reset: () => void;
}

type AnalysisStore = AnalysisState & AnalysisActions;

const initialState: AnalysisState = {
    uploadedImageUri: null,
    contextAnswers: {},
    analysisResult: null,
    pastAnalyses: [],
    isAnalyzing: false,
    error: null,
};

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
    ...initialState,

    setImage: (uri) => set({ uploadedImageUri: uri }),
    setContext: (answers) =>
        set((state) => ({ contextAnswers: { ...state.contextAnswers, ...answers } })),
    setResult: (result) => set({ analysisResult: result, isAnalyzing: false, error: null }),
    setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
    setError: (error) => set({ error, isAnalyzing: false }),

    submitAnalysis: async (sessionId?: string) => {
        const { uploadedImageUri, contextAnswers } = get();
        if (!uploadedImageUri) {
            set({ error: 'No image selected' });
            return;
        }

        set({ isAnalyzing: true, error: null });
        try {
            // Step 1: Upload image (if your backend expects a URL, 
            // you'd upload to Cloudinary first, then send the URL)
            // For now, we send the analysis request with the image URI
            const { data } = await apiClient.post('/analysis/', {
                session_id: sessionId,
                issue_description: contextAnswers.additionalContext || 'Cooking failure analysis',
                dish_image_url: uploadedImageUri,
            });

            const result: AnalysisResult = {
                id: data.id,
                rootCause: data.root_cause || 'Analysis pending',
                explanation: data.explanation || 'AI analysis will be available shortly.',
                corrections: data.suggestions || [],
                confidence: data.confidence || 0.8,
                analyzedAt: data.created_at || new Date().toISOString(),
            };

            set({
                analysisResult: result,
                isAnalyzing: false,
                error: null,
            });

            console.log('🔬 Analysis submitted:', data.id);
        } catch (err: any) {
            console.error('❌ Analysis submission failed:', err);
            set({
                error: err.message || 'Analysis failed. Please try again.',
                isAnalyzing: false,
            });
        }
    },

    fetchAnalyses: async () => {
        try {
            const { data } = await apiClient.get('/analysis/');
            const analyses: AnalysisResult[] = (data || []).map((a: any) => ({
                id: a.id,
                rootCause: a.root_cause || '',
                explanation: a.explanation || '',
                corrections: a.suggestions || [],
                confidence: a.confidence || 0,
                analyzedAt: a.created_at || '',
            }));

            set({ pastAnalyses: analyses });
        } catch (err: any) {
            console.error('❌ Failed to fetch analyses:', err);
        }
    },

    reset: () => set(initialState),
}));
