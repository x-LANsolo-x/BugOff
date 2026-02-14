/**
 * ChefMentor X – Recipe List Screen
 *
 * Stitch ref: chefmentor_x_recipe_list
 * Features:
 *  - "Choose a Recipe" header
 *  - Search bar with icon
 *  - Category filter pills (All, Breakfast, Main Course, Dessert)
 *  - Recipe cards with emoji icon, title, time, calories, difficulty badge
 *  - START button per card
 *  - Scrollable list
 */

import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useRecipeStore } from '../stores';

// ─── Sample Recipe Data (MVP: 5 recipes) ───────────

interface SampleRecipe {
    id: string;
    title: string;
    emoji: string;
    emojiBg: string;
    time: string;
    calories: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
}

const SAMPLE_RECIPES: SampleRecipe[] = [
    {
        id: '1',
        title: 'Spicy Ramen Bowl',
        emoji: '🍜',
        emojiBg: '#FFF7ED',
        time: '25 min',
        calories: '340 kcal',
        difficulty: 'Easy',
        category: 'Main Course',
    },
    {
        id: '2',
        title: 'Morning Omelette',
        emoji: '🍳',
        emojiBg: '#EFF6FF',
        time: '15 min',
        calories: '210 kcal',
        difficulty: 'Easy',
        category: 'Breakfast',
    },
    {
        id: '3',
        title: 'Paella Valencia',
        emoji: '🥘',
        emojiBg: '#FEFCE8',
        time: '55 min',
        calories: '520 kcal',
        difficulty: 'Medium',
        category: 'Main Course',
    },
    {
        id: '4',
        title: 'Creamy Carbonara',
        emoji: '🍝',
        emojiBg: '#FAF5FF',
        time: '30 min',
        calories: '680 kcal',
        difficulty: 'Hard',
        category: 'Main Course',
    },
    {
        id: '5',
        title: 'Club Sandwich',
        emoji: '🥪',
        emojiBg: '#FFF1F2',
        time: '10 min',
        calories: '380 kcal',
        difficulty: 'Easy',
        category: 'Breakfast',
    },
];

const CATEGORIES = ['All Recipes', 'Breakfast', 'Main Course', 'Dessert'];

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
    Easy: { bg: '#DCFCE7', text: '#15803D' },
    Medium: { bg: '#FEF9C3', text: '#A16207' },
    Hard: { bg: '#FEE2E2', text: '#B91C1C' },
};

export default function RecipeListScreen({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Recipes');

    const filteredRecipes = useMemo(() => {
        let recipes = SAMPLE_RECIPES;

        if (activeCategory !== 'All Recipes') {
            recipes = recipes.filter((r) => r.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            recipes = recipes.filter((r) => r.title.toLowerCase().includes(q));
        }

        return recipes;
    }, [searchQuery, activeCategory]);

    const handleStart = (recipe: SampleRecipe) => {
        navigation.navigate('RecipeDetails', { recipeId: recipe.id });
    };

    const renderRecipeCard = ({ item }: { item: SampleRecipe }) => {
        const diffColors = DIFFICULTY_COLORS[item.difficulty];
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
                                <View style={styles.metaDot} />
                                <Text style={styles.metaIcon}>🔥</Text>
                                <Text style={styles.metaText}>{item.calories}</Text>
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
                <Text style={styles.headerTitle}>Choose a Recipe</Text>
                <Text style={styles.headerSub}>What would you like to cook today?</Text>

                {/* Search */}
                <View style={styles.searchWrap}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for a specific food..."
                        placeholderTextColor={Colors.neutral[400]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
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

            {/* Recipe list */}
            <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.id}
                renderItem={renderRecipeCard}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyEmoji}>🍽️</Text>
                        <Text style={styles.emptyTitle}>No recipes found</Text>
                        <Text style={styles.emptyMsg}>Try a different search or category</Text>
                    </View>
                }
            />
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
