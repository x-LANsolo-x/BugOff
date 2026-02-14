/**
 * ChefMentor X – Analysis API Service
 *
 * Frontend service for the failure analysis flow:
 * - Upload image with context (heat, timing, modifications)
 * - Get analysis results
 * - List past analyses
 */

import { apiClient } from './apiClient';

export interface AnalysisContext {
    heat_level?: string;
    timing?: string;
    modifications?: string;
    notes?: string;
}

export interface AnalysisResult {
    id: string;
    media_url: string;
    root_cause: string;
    explanation: string;
    tips: string[];
    severity: 'minor' | 'moderate' | 'major';
    confidence: number;
    ai_provider: string;
    created_at: string;
}

class AnalysisService {
    /**
     * Upload a dish photo with optional context for AI analysis.
     */
    async analyzeFailure(imageUri: string, context?: AnalysisContext): Promise<AnalysisResult> {
        const formData = new FormData();

        // Append image file
        const filename = imageUri.split('/').pop() || 'photo.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('file', {
            uri: imageUri,
            name: filename,
            type,
        } as any);

        // Append context fields
        if (context?.heat_level) formData.append('heat_level', context.heat_level);
        if (context?.timing) formData.append('timing', context.timing);
        if (context?.modifications) formData.append('modifications', context.modifications);
        if (context?.notes) formData.append('notes', context.notes);

        const { data } = await apiClient.post('/failure/analyze', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 60000, // 60s timeout for AI processing
        });

        return data;
    }

    /**
     * Get a specific analysis result by ID.
     */
    async getAnalysis(analysisId: string): Promise<AnalysisResult> {
        const { data } = await apiClient.get(`/failure/${analysisId}`);
        return data;
    }
}

export const analysisService = new AnalysisService();
