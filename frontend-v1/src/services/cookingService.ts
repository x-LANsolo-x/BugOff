/**
 * ChefMentor X – Cooking Session Service
 *
 * Manages live cooking sessions via backend API.
 */

import { apiClient } from './apiClient';

// ── Types ──────────────────────────────────────────
export interface CookingSession {
    id: string;
    recipe_id: string;
    user_id: string | null;
    demo_session_id: string | null;
    status: 'in_progress' | 'completed' | 'abandoned';
    current_step_index: string;
    started_at: string;
    completed_at: string | null;
}

export interface StepData {
    step_number: number;
    instruction: string;
    expected_state: string | null;
    is_last_step: boolean;
    guidance: string;
    message?: string;
}

// ── API Functions ──────────────────────────────────

/**
 * Start a new cooking session for a recipe.
 */
export async function startCookingSession(
    recipeId: string,
    demoSessionId?: string
): Promise<CookingSession> {
    const response = await apiClient.post('/cooking/start', {
        recipe_id: recipeId,
        demo_session_id: demoSessionId || null,
    });
    return response.data;
}

/**
 * Get the current step for a cooking session.
 */
export async function getCurrentStep(sessionId: string): Promise<StepData> {
    const response = await apiClient.get(`/cooking/${sessionId}/current`);
    return response.data;
}

/**
 * Advance to the next step in a cooking session.
 */
export async function advanceStep(sessionId: string): Promise<StepData> {
    const response = await apiClient.post(`/cooking/${sessionId}/next`);
    return response.data;
}

/**
 * Complete a cooking session with result.
 */
export async function completeCookingSession(
    sessionId: string,
    result: 'success' | 'partial' | 'failed',
    rating?: number
): Promise<void> {
    await apiClient.post(`/cooking/${sessionId}/complete`, {
        result,
        rating,
    });
}

/**
 * Save post-cook feedback.
 */
export async function savePostCookFeedback(
    sessionId: string,
    feedback: {
        emoji: string;
        label: string;
        notes?: string;
    }
): Promise<void> {
    await apiClient.post(`/cooking/${sessionId}/feedback`, feedback);
}
