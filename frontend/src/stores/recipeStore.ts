/**
 * ChefMentor X – Recipe Store (Zustand)
 */

import create from 'zustand';
import type { Recipe } from '../types';

interface RecipeState {
    recipes: Recipe[];
    selectedRecipe: Recipe | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
}

interface RecipeActions {
    setRecipes: (recipes: Recipe[]) => void;
    selectRecipe: (recipe: Recipe) => void;
    clearSelection: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
}

type RecipeStore = RecipeState & RecipeActions;

export const useRecipeStore = create<RecipeStore>((set) => ({
    // State
    recipes: [],
    selectedRecipe: null,
    isLoading: false,
    error: null,
    searchQuery: '',

    // Actions
    setRecipes: (recipes) => set({ recipes, isLoading: false, error: null }),
    selectRecipe: (recipe) => set({ selectedRecipe: recipe }),
    clearSelection: () => set({ selectedRecipe: null }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error, isLoading: false }),
    setSearchQuery: (query) => set({ searchQuery: query }),
}));
