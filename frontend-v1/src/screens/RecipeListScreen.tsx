/**
 * ChefMentor X – Recipe List Screen
 *
 * Fetches recipes from backend API with demo fallback.
 * Features:
 *  - API-connected recipe list with loading/error states
 *  - Search bar triggers API search
 *  - Category filter pills
 *  - Demo mode uses hardcoded sample data
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useRecipeStore, useAuthStore, useProfileStore } from '../stores';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyStateView from '../components/EmptyState';
import ErrorStateView from '../components/ErrorState';

// ─── Demo Fallback Data ─────────────────────────────

interface SampleRecipe {
    id: string;
    title: string;
    emoji: string;
    emojiBg: string;
    time: string;
    calories: string;
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
    category: string;
}

const DEMO_RECIPES: SampleRecipe[] = [
    { id: '1', title: 'Spicy Ramen Bowl', emoji: '🍜', emojiBg: '#FFF7ED', time: '25 min', calories: '340 kcal', difficulty: 'BEGINNER', category: 'Main Course' },
    { id: '2', title: 'Morning Omelette', emoji: '🍳', emojiBg: '#EFF6FF', time: '15 min', calories: '210 kcal', difficulty: 'BEGINNER', category: 'Breakfast' },
    { id: '3', title: 'Paella Valencia', emoji: '🥘', emojiBg: '#FEFCE8', time: '55 min', calories: '520 kcal', difficulty: 'INTERMEDIATE', category: 'Main Course' },
    { id: '4', title: 'Creamy Carbonara', emoji: '🍝', emojiBg: '#FAF5FF', time: '30 min', calories: '680 kcal', difficulty: 'ADVANCED', category: 'Main Course' },
    { id: '5', title: 'Club Sandwich', emoji: '🥪', emojiBg: '#FFF1F2', time: '10 min', calories: '380 kcal', difficulty: 'BEGINNER', category: 'Breakfast' },
];

const FOOD_EMOJIS: Record<string, { emoji: string; bg: string }> = {
    default: { emoji: '🍽️', bg: '#F0F9FF' },
    ramen: { emoji: '🍜', bg: '#FFF7ED' },
    pasta: { emoji: '🍝', bg: '#FAF5FF' },
    rice: { emoji: '🍚', bg: '#FEFCE8' },
    salad: { emoji: '🥗', bg: '#ECFDF5' },
    soup: { emoji: '🍲', bg: '#FFF7ED' },
};

const CATEGORIES = ['All Recipes', 'Breakfast', 'Main Course', 'Dessert'];

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
    BEGINNER: { bg: '#ECFDF5', text: '#059669' },
    INTERMEDIATE: { bg: '#FEF3C7', text: '#D97706' },
    ADVANCED: { bg: '#FEE2E2', text: '#DC2626' },
    EXPERT: { bg: '#EDE9FE', text: '#7C3AED' },
};

export default function RecipeListScreen({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Recipes');
    const [refreshing, setRefreshing] = useState(false);

    const { isDemo } = useAuthStore();
    const { recipes, isLoading, error, fetchRecipes } = useRecipeStore();

    // Fetch recipes from API on mount (non-demo mode)
    useEffect(() => {
        if (!isDemo) {
            fetchRecipes();
        }
    }, [isDemo]);

    // PHASE 4 TEST: Fetch user profile on mount
    useEffect(() => {
        if (!isDemo) {
            console.log('🧪 Phase 4 Test: Fetching user profile...');
            useProfileStore.getState().fetchProfile();
        }
    }, [isDemo]);

    // Pull-to-refresh
    const onRefresh = useCallback(async () => {
        if (isDemo) return;
        setRefreshing(true);
        await fetchRecipes(searchQuery || undefined);
        setRefreshing(false);
    }, [isDemo, searchQuery]);

    // Search handler - debounced API call
    const handleSearch = useCallback((text: string) => {
        setSearchQuery(text);
        if (!isDemo && text.length >= 2) {
            fetchRecipes(text);
        } else if (!isDemo && text.length === 0) {
            fetchRecipes();
        }
    }, [isDemo]);

    // Build display list
    const displayRecipes = useMemo(() => {
        if (isDemo) {
            // Demo mode: use hardcoded data with local filtering
            let filtered = DEMO_RECIPES;
            if (activeCategory !== 'All Recipes') {
                filtered = filtered.filter((r) => r.category === activeCategory);
            }
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                filtered = filtered.filter((r) => r.title.toLowerCase().includes(q));
            }
            return filtered.map((r) => ({
                ...r,
                isDemo: true,
            }));
        }

        // API mode: map to display format
        return recipes.map((r) => {
            const totalTime = (r.prepTime || 0) + (r.cookTime || 0);
            const matchedEmoji = Object.entries(FOOD_EMOJIS).find(([key]) =>
                r.title.toLowerCase().includes(key)
            );
            const { emoji, bg } = matchedEmoji?.[1] || FOOD_EMOJIS.default;

            return {
                id: r.id,
                title: r.title,
                emoji,
                emojiBg: bg,
                time: totalTime > 0 ? `${totalTime} min` : 'N/A',
                calories: '',
                difficulty: r.difficulty || 'BEGINNER',
                category: r.tags?.[0] || 'Main Course',
                isDemo: false,
            };
        });
    }, [isDemo, recipes, searchQuery, activeCategory]);

    // Navigate to recipe detail
    const handleStart = (recipe: any) => {
        navigation.navigate('RecipeDetails', { recipeId: recipe.id });
    };

    // Render recipe card
    const renderRecipeCard = ({ item }: { item: any }) => {
        const diffColors = DIFFICULTY_COLORS[item.difficulty] || DIFFICULTY_COLORS.BEGINNER;
        return (
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.95}
                onPress={() => handleStart(item)}
                accessibilityRole="button"
                accessibilityLabel={`${item.title}, ${item.difficulty}, ${item.time}`}
            >
                <View style={styles.cardTop}>
                    <View style={styles.cardLeft}>
                        <View style={[styles.emojiBox, { backgroundColor: item.emojiBg }]}>
                            <Text style={styles.emoji}>{item.emoji}</Text>
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                            <View style={styles.cardMeta}>
                                <Text style={styles.metaIcon}>⏱</Text>
                                <Text style={styles.metaText}>{item.time}</Text>
                                {item.calories ? (
                                    <>
                                        <View style={styles.metaDot} />
                                        <Text style={styles.metaIcon}>🔥</Text>
                                        <Text style={styles.metaText}>{item.calories}</Text>
                                    </>
                                ) : null}
                            </View>
                        </View>
                    </View>
                    <View style={[styles.diffBadge, { backgroundColor: diffColors.bg }]}>
                        <Text style={[styles.diffText, { color: diffColors.text }]}>
                            {item.difficulty.toUpperCase()}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardBottom}>
                    <TouchableOpacity
                        style={styles.startBtn}
                        onPress={() => handleStart(item)}
                        accessibilityRole="button"
                    >
                        <Text style={styles.startText}>START</Text>
                        <Text style={styles.startArrow}>→</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.headerTitle}>Choose a Recipe</Text>
                        <Text style={styles.headerSub}>What would you like to cook today?</Text>
                    </View>
                    {isDemo && (
                        <View style={styles.demoBadge}>
                            <Text style={styles.demoBadgeText}>DEMO</Text>
                        </View>
                    )}
                </View>

                {/* Search */}
                <View style={styles.searchWrap}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for a specific food..."
                        placeholderTextColor={Colors.neutral[400]}
                        value={searchQuery}
                        onChangeText={handleSearch}
                        accessibilityLabel="Search recipes"
                    />
                </View>
            </View>

            {/* Category pills */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pillRow}
                style={styles.pillScroll}
            >
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.catPill,
                            activeCategory === cat && styles.catPillActive,
                        ]}
                        onPress={() => setActiveCategory(cat)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: activeCategory === cat }}
                    >
                        <Text
                            style={[
                                styles.catPillText,
                                activeCategory === cat && styles.catPillTextActive,
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Error State */}
            {error && !isDemo && !isLoading ? (
                <ErrorStateView
                    message={error}
                    onRetry={() => fetchRecipes()}
                />
            ) : isLoading && !refreshing ? (
                /* Skeleton loading */
                <SkeletonLoader variant="list" count={4} />
            ) : (
                /* Recipe list */
                <FlatList
                    data={displayRecipes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderRecipeCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[Colors.brand.orange]}
                            tintColor={Colors.brand.orange}
                        />
                    }
                    ListEmptyComponent={
                        <EmptyStateView
                            emoji="🍽️"
                            title="No Recipes Found"
                            subtitle="Try a different search term or category filter."
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral[50],
    },

    // Header
    header: {
        paddingHorizontal: Spacing[6],
        paddingTop: Spacing[4],
        paddingBottom: Spacing[4],
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
        marginBottom: 2,
    },
    headerSub: {
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[500],
    },
    demoBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.md,
    },
    demoBadgeText: {
        fontSize: 10,
        fontWeight: '700' as any,
        color: '#92400E',
        letterSpacing: 0.5,
    },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing[4],
        marginTop: Spacing[6],
        ...Shadows.sm,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: Spacing[2],
    },
    searchInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[900],
    },

    // Category pills
    pillScroll: {
        maxHeight: 48,
        paddingLeft: Spacing[6],
    },
    pillRow: {
        paddingRight: Spacing[6],
        gap: 10,
        alignItems: 'center',
    },
    catPill: {
        paddingHorizontal: Spacing[4],
        paddingVertical: Spacing[2],
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.neutral[100],
    },
    catPillActive: {
        backgroundColor: Colors.brand.orange,
        borderColor: Colors.brand.orange,
        ...Shadows.glow,
    },
    catPillText: {
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.neutral[500],
    },
    catPillTextActive: {
        color: Colors.white,
        fontWeight: Typography.fontWeight.semibold,
    },

    // Error
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FEE2E2',
        marginHorizontal: Spacing[6],
        marginBottom: Spacing[3],
        paddingHorizontal: Spacing[4],
        paddingVertical: Spacing[3],
        borderRadius: BorderRadius.md,
    },
    errorText: {
        color: '#B91C1C',
        fontSize: Typography.fontSize.sm,
        flex: 1,
    },
    retryBtn: {
        backgroundColor: '#B91C1C',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: BorderRadius.md,
        marginLeft: 8,
    },
    retryText: {
        color: Colors.white,
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.semibold,
    },

    // Loading
    loadingWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    loadingText: {
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[500],
    },

    // List
    listContent: {
        paddingHorizontal: Spacing[6],
        paddingTop: Spacing[4],
        paddingBottom: 100,
        gap: 12,
    },

    // Recipe Card
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg + 4,
        padding: Spacing[4],
        borderWidth: 1,
        borderColor: Colors.neutral[50],
        ...Shadows.base,
        gap: 12,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        flex: 1,
    },
    emojiBox: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: { fontSize: 28 },
    cardInfo: { flex: 1 },
    cardTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
        marginBottom: 4,
    },
    cardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaIcon: { fontSize: 12 },
    metaText: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[500],
    },
    metaDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: Colors.neutral[300],
        marginHorizontal: 4,
    },
    diffBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: BorderRadius.md,
    },
    diffText: {
        fontSize: 10,
        fontWeight: Typography.fontWeight.bold,
        letterSpacing: 0.5,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    startBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: Colors.brand.orange,
        paddingHorizontal: Spacing[6],
        paddingVertical: Spacing[2] + 2,
        borderRadius: BorderRadius.xl,
        ...Shadows.glow,
    },
    startText: {
        color: Colors.white,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
    },
    startArrow: {
        color: Colors.white,
        fontSize: Typography.fontSize.sm,
    },

    // Empty
    emptyWrap: {
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyEmoji: { fontSize: 48, marginBottom: Spacing[4] },
    emptyTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[800],
        marginBottom: Spacing[2],
    },
    emptyMsg: {
        fontSize: Typography.fontSize.base,
        color: Colors.neutral[500],
    },
});
