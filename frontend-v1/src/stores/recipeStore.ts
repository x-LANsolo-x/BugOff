/**
 * ChefMentor X – Recipe Store (Zustand)
 * 
 * Connected to backend API:
 * - GET /api/v1/recipes (list/search)
 * - GET /api/v1/recipes/{id} (detail)
 */

import create from 'zustand';
import type { Recipe } from '../types';
import { apiClient } from '../services/apiClient';

interface RecipeState {
    recipes: Recipe[];
    selectedRecipe: Recipe | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    source: 'local' | 'recipedb' | 'ai';
}

interface RecipeActions {
    setRecipes: (recipes: Recipe[]) => void;
    selectRecipe: (recipe: Recipe) => void;
    clearSelection: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
    fetchRecipes: (query?: string, source?: string) => Promise<void>;
    fetchRecipeById: (recipeId: string) => Promise<void>;
}

type RecipeStore = RecipeState & RecipeActions;

export const useRecipeStore = create<RecipeStore>((set, get) => ({
    // State
    recipes: [],
    selectedRecipe: null,
    isLoading: false,
    error: null,
    searchQuery: '',
    source: 'local',

    // Basic setters
    setRecipes: (recipes) => set({ recipes, isLoading: false, error: null }),
    selectRecipe: (recipe) => set({ selectedRecipe: recipe }),
    clearSelection: () => set({ selectedRecipe: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error, isLoading: false }),
    setSearchQuery: (query) => set({ searchQuery: query }),

    // API Actions
    fetchRecipes: async (query?: string, source: string = 'local') => {
        set({ isLoading: true, error: null });
        try {
            const params: Record<string, string> = { source };
            if (query && query.trim()) {
                params.query = query.trim();
            }

            const { data } = await apiClient.get('/recipes', { params });

            // Normalize backend response to frontend Recipe type
            const recipes: Recipe[] = (data.data || []).map((r: any) => ({
                id: r.id || r.recipe_id,
                title: r.title || r.name,
                description: r.description || '',
                imageUrl: r.image_url || r.imageUrl || '',
                difficulty: r.difficulty || 'BEGINNER',
                prepTime: r.prep_time_minutes || r.prep_time || r.prepTime || 0,
                cookTime: r.cook_time_minutes || r.cook_time || r.cookTime || 0,
                servings: r.servings || 2,
                ingredients: r.ingredients || [],
                steps: (r.steps || []).map((s: any) => ({
                    id: s.id || String(s.step_number),
                    stepNumber: s.step_number || s.stepNumber,
                    title: s.title || `Step ${s.step_number}`,
                    instruction: s.instruction || '',
                    duration: s.duration_minutes ? s.duration_minutes * 60 : s.duration,
                    timerRequired: s.timer_required || false,
                    tips: s.ai_tips ? [s.ai_tips] : s.tips || [],
                })),
                tags: r.tags || [],
            }));

            set({ recipes, isLoading: false, source: source as any });
        } catch (err: any) {
            console.error('❌ Failed to fetch recipes:', err);
            set({
                error: err.message || 'Failed to load recipes',
                isLoading: false,
            });
        }
    },

    fetchRecipeById: async (recipeId: string) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await apiClient.get(`/recipes/${recipeId}`);

            const recipe: Recipe = {
                id: data.id || data.recipe_id,
                title: data.title || data.name,
                description: data.description || '',
                imageUrl: data.image_url || data.imageUrl || '',
                difficulty: data.difficulty || 'BEGINNER',
                prepTime: data.prep_time_minutes || data.prep_time || data.prepTime || 0,
                cookTime: data.cook_time_minutes || data.cook_time || data.cookTime || 0,
                servings: data.servings || 2,
                ingredients: data.ingredients || [],
                steps: (data.steps || []).map((s: any) => ({
                    id: s.id || String(s.step_number),
                    stepNumber: s.step_number || s.stepNumber,
                    title: s.title || `Step ${s.step_number}`,
                    instruction: s.instruction || '',
                    duration: s.duration_minutes ? s.duration_minutes * 60 : s.duration,
                    timerRequired: s.timer_required || false,
                    tips: s.ai_tips ? [s.ai_tips] : s.tips || [],
                })),
                tags: data.tags || [],
            };

            set({ selectedRecipe: recipe, isLoading: false });
        } catch (err: any) {
            console.error('❌ Failed to fetch recipe:', err);
            set({
                error: err.message || 'Failed to load recipe',
                isLoading: false,
            });
        }
    },
}));
