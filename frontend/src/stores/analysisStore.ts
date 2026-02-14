/**
 * ChefMentor X – Analysis Store (Zustand)
 */

import create from 'zustand';
import type { AnalysisRequest, AnalysisResult } from '../types';

interface AnalysisState {
    uploadedImageUri: string | null;
    contextAnswers: Partial<AnalysisRequest>;
    analysisResult: AnalysisResult | null;
    isAnalyzing: boolean;
    error: string | null;
}

interface AnalysisActions {
    setImage: (uri: string) => void;
    setContext: (answers: Partial<AnalysisRequest>) => void;
    setResult: (result: AnalysisResult) => void;
    setAnalyzing: (analyzing: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

type AnalysisStore = AnalysisState & AnalysisActions;

const initialState: AnalysisState = {
    uploadedImageUri: null,
    contextAnswers: {},
    analysisResult: null,
    isAnalyzing: false,
    error: null,
};

export const useAnalysisStore = create<AnalysisStore>((set) => ({
    ...initialState,

    setImage: (uri) => set({ uploadedImageUri: uri }),
    setContext: (answers) =>
        set((state) => ({ contextAnswers: { ...state.contextAnswers, ...answers } })),
    setResult: (result) => set({ analysisResult: result, isAnalyzing: false, error: null }),
    setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
    setError: (error) => set({ error, isAnalyzing: false }),
    reset: () => set(initialState),
}));
