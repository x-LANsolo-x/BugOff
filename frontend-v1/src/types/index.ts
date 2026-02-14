/**
 * ChefMentor X – Core TypeScript Types
 */

// ─── Auth ──────────────────────────────────────────

export interface User {
    id: string;
    email: string;
    name: string;           // changed from displayName to match backend
    photoUrl?: string;
    skillLevel: SkillLevel;
    createdAt: string;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'experienced';

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isDemo: boolean;
    isLoading: boolean;
}

// ─── Recipes ───────────────────────────────────────

export interface Recipe {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
    prepTime: number; // minutes
    cookTime: number; // minutes
    servings: number;
    ingredients: Ingredient[];
    steps: CookingStep[];
    tags: string[];
}

export interface Ingredient {
    id: string;
    name: string;
    quantity: string;
    unit: string;
    optional?: boolean;
}

export interface CookingStep {
    id: string;
    stepNumber: number;
    title: string;
    instruction: string;
    duration?: number; // seconds
    timerRequired?: boolean;
    visualCue?: string;
    tips?: string[];
    warnings?: string[];
}

// ─── Cooking Session ───────────────────────────────

export interface CookingSession {
    id: string;
    recipeId: string;
    currentStep: number;
    totalSteps: number;
    startedAt: string;
    completedAt?: string;
    isPaused: boolean;
    isVoiceActive: boolean;
    timerValue: number | null; // remaining seconds
}

// ─── Analysis ──────────────────────────────────────

export interface AnalysisRequest {
    imageUri: string;
    dishName?: string;
    heatLevel?: string;
    cookingTime?: string;
    ingredientChanges?: string;
    additionalContext?: string;
}

export interface AnalysisResult {
    id: string;
    rootCause: string;
    explanation: string;
    corrections: CorrectionSuggestion[];
    confidence: number;
    analyzedAt: string;
}

export interface CorrectionSuggestion {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
}

// ─── Navigation ────────────────────────────────────

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Onboarding: undefined;
    Permissions: undefined;
    SkillLevel: undefined;
    MainTabs: undefined;
};

export type MainTabParamList = {
    CookTab: undefined;
    AnalyzeTab: undefined;
    HistoryTab: undefined;
    ProfileTab: undefined;
};

export type CookStackParamList = {
    RecipeList: undefined;
    RecipeDetails: { recipeId?: string };
    LiveCooking: { recipeId?: string };
    Completion: { recipeId?: string };
};

export type AnalyzeStackParamList = {
    UploadAnalysis: undefined;
    ContextQuestions: { imageUri?: string };
    AnalysisLoading: { imageUri?: string; context?: Record<string, any> };
    DiagnosisResult: undefined;
};

export type ProfileStackParamList = {
    Profile: undefined;
    CookingHistory: undefined;
    Settings: undefined;
};

// ─── API ───────────────────────────────────────────

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string>;
}

// ─── UI ────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type AlertType = 'success' | 'warning' | 'error' | 'info';
export type LoadingType = 'spinner' | 'skeleton';
