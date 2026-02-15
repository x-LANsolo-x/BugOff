/**
 * ChefMentor X – Recipe Details Screen
 *
 * Stitch ref: chefmentor_x_recipe_details
 * Features:
 *  - Hero image area with gradient overlay (emoji-based hero for MVP)
 *  - Back / bookmark / share buttons
 *  - Recipe title, time, difficulty, rating
 *  - Chef avatar card
 *  - Ingredients list with emoji + quantity
 *  - Instructions timeline with step-dot indicators
 *  - Sticky "START COOKING" CTA button
 */

import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');

// ─── Sample data for the MVP ────────────────────────

const RECIPE = {
    title: 'The Perfect Scrambled Eggs',
    category: 'Breakfast',
    time: '10 min',
    difficulty: 'BEGINNER',
    rating: '4.9',
    ratingCount: '2k',
    emoji: '🍳',
    heroBg: '#FFF7ED',
    chef: { name: 'Chef Gordon', emoji: '👨‍🍳' },
    servings: '2 Servings',
    ingredients: [
        { emoji: '🥚', name: 'Large Eggs', qty: '4 pcs', bg: '#FFF7ED' },
        { emoji: '🧈', name: 'Unsalted Butter', qty: '1 tbsp', bg: '#FEF9C3' },
        { emoji: '🧂', name: 'Salt & Pepper', qty: 'To taste', bg: '#F3F4F6' },
        { emoji: '🌿', name: 'Chives', qty: 'Optional', bg: '#DCFCE7' },
    ],
    steps: [
        {
            title: 'Whisk the Eggs',
            desc: 'Crack the eggs into a bowl. Add a pinch of salt and pepper. Whisk vigorously until the mixture is uniform and airy.',
        },
        {
            title: 'Heat the Pan',
            desc: 'Place a non-stick skillet over medium-low heat. Add the butter and let it melt completely, swirling to coat the pan.',
        },
        {
            title: 'Cook Gently',
            desc: "Pour in eggs. Let sit for a moment, then gently push across the pan with a spatula. Don't overcook!",
        },
        {
            title: 'Serve & Garnish',
            desc: 'Remove from heat while still slightly wet — carry-over heat finishes the cook. Top with chives if desired.',
        },
    ],
};

export default function RecipeDetailsScreen({ navigation }: any) {
    const fadeIn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    const handleStartCooking = () => {
        navigation.navigate('LiveCooking', { recipeId: '1' });
    };

    return (
        <View style={styles.container}>
            {/* Hero area */}
            <View style={[styles.hero, { backgroundColor: RECIPE.heroBg }]}>
                {/* Gradient overlay */}
                <View style={styles.heroGradientTop} />
                <View style={styles.heroGradientBottom} />

                {/* Large emoji */}
                <Text style={styles.heroEmoji}>{RECIPE.emoji}</Text>

                {/* Nav buttons */}
                <SafeAreaView style={styles.heroNav} edges={['top']}>
                    <TouchableOpacity
                        style={styles.heroBtn}
                        onPress={() => navigation.goBack()}
                        accessibilityLabel="Go back"
                    >
                        <Text style={styles.heroBtnIcon}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.heroNavRight}>
                        <TouchableOpacity style={styles.heroBtn} accessibilityLabel="Bookmark">
                            <Text style={styles.heroBtnIcon}>🔖</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.heroBtn} accessibilityLabel="Share">
                            <Text style={styles.heroBtnIcon}>↗️</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Title overlay */}
                <View style={styles.heroInfo}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{RECIPE.category.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.heroTitle}>{RECIPE.title}</Text>
                    <View style={styles.heroMeta}>
                        <Text style={styles.heroMetaItem}>⏱ {RECIPE.time}</Text>
                        <Text style={styles.heroMetaItem}>🔥 {RECIPE.difficulty}</Text>
                        <Text style={styles.heroMetaItem}>⭐ {RECIPE.rating} ({RECIPE.ratingCount})</Text>
                    </View>
                </View>
            </View>

            {/* Scrollable content */}
            <Animated.ScrollView
                style={[styles.scrollArea, { opacity: fadeIn }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Chef card */}
                <View style={styles.chefCard}>
                    <View style={styles.chefLeft}>
                        <View style={styles.chefAvatar}>
                            <Text style={{ fontSize: 28 }}>{RECIPE.chef.emoji}</Text>
                            <View style={styles.chefOnline} />
                        </View>
                        <View>
                            <Text style={styles.chefLabel}>Recipe by</Text>
                            <Text style={styles.chefName}>{RECIPE.chef.name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.followBtn}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                </View>

                {/* Ingredients */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        <Text style={styles.sectionSub}>{RECIPE.servings}</Text>
                    </View>
                    {RECIPE.ingredients.map((ing, i) => (
                        <View key={i} style={styles.ingRow}>
                            <View style={[styles.ingEmoji, { backgroundColor: ing.bg }]}>
                                <Text style={{ fontSize: 20 }}>{ing.emoji}</Text>
                            </View>
                            <Text style={styles.ingName}>{ing.name}</Text>
                            <Text style={styles.ingQty}>{ing.qty}</Text>
                        </View>
                    ))}
                </View>

                {/* Instructions */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        <Text style={styles.sectionSub}>{RECIPE.steps.length} Steps</Text>
                    </View>
                    {RECIPE.steps.map((step, i) => {
                        const isFirst = i === 0;
                        const isLast = i === RECIPE.steps.length - 1;
                        return (
                            <View key={i} style={styles.stepRow}>
                                {/* Timeline */}
                                <View style={styles.stepTimeline}>
                                    <View
                                        style={[
                                            styles.stepDot,
                                            isFirst ? styles.stepDotActive : styles.stepDotInactive,
                                        ]}
                                    />
                                    {!isLast && (
                                        <View
                                            style={[
                                                styles.stepLine,
                                                isFirst ? styles.stepLineActive : styles.stepLineInactive,
                                            ]}
                                        />
                                    )}
                                </View>

                                {/* Content */}
                                <View
                                    style={[
                                        styles.stepCard,
                                        isFirst ? styles.stepCardActive : styles.stepCardInactive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.stepLabel,
                                            isFirst ? styles.stepLabelActive : styles.stepLabelInactive,
                                        ]}
                                    >
                                        STEP {i + 1}
                                    </Text>
                                    <Text style={styles.stepTitle}>{step.title}</Text>
                                    <Text style={styles.stepDesc}>{step.desc}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Bottom spacer for sticky CTA */}
                <View style={{ height: 100 }} />
            </Animated.ScrollView>

            {/* Sticky CTA */}
            <View style={styles.ctaWrap}>
                <TouchableOpacity
                    style={styles.ctaBtn}
                    onPress={handleStartCooking}
                    activeOpacity={0.9}
                    accessibilityRole="button"
                    accessibilityLabel="Start live cooking with camera and voice"
                >
                    <View style={styles.ctaLeft}>
                        <View style={styles.ctaMicCircle}>
                            {/* Camera + Mic icon combo to indicate live mode */}
                            <Text style={{ fontSize: 22 }}>📹</Text>
                        </View>
                        <View>
                            <Text style={styles.ctaTitle}>START LIVE COOKING</Text>
                            <Text style={styles.ctaSub}>Camera & Voice Assistance</Text>
                        </View>
                    </View>
                    <View style={styles.ctaArrow}>
                        <Text style={styles.ctaArrowText}>→</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.neutral[50] },

    // ─── Hero ─────────────────────────
    hero: {
        height: SCREEN_W * 0.8, // Aspect ratio based on width instead of fixed height
        maxHeight: 350,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
    },
    heroGradientTop: {
        ...StyleSheet.absoluteFillObject,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    heroGradientBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    heroEmoji: { fontSize: 96, zIndex: 1 },
    heroNav: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing[5],
        zIndex: 10,
    },
    heroNavRight: { flexDirection: 'row', gap: 10 },
    heroBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(0,0,0,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    heroBtnIcon: { fontSize: 20, color: Colors.white },

    heroInfo: {
        position: 'absolute',
        bottom: Spacing[6],
        left: Spacing[6],
        right: Spacing[6],
        zIndex: 5,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.brand.orange,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing[2],
    },
    categoryText: {
        color: Colors.white,
        fontSize: 11,
        fontWeight: Typography.fontWeight.bold,
        letterSpacing: 1,
    },
    heroTitle: {
        fontSize: Typography.fontSize['3xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.white,
        marginBottom: Spacing[2],
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowRadius: 6,
    },
    heroMeta: { flexDirection: 'row', gap: 16 },
    heroMetaItem: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
    },

    // ─── Scroll ───────────────────────
    scrollArea: { flex: 1 },
    scrollContent: { paddingHorizontal: Spacing[6], paddingTop: Spacing[6] },

    // ─── Chef card ────────────────────
    chefCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: Spacing[4],
        borderRadius: BorderRadius.lg + 4,
        ...Shadows.base,
        borderWidth: 1,
        borderColor: Colors.neutral[100],
        marginBottom: Spacing[6],
    },
    chefLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    chefAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
        ...Shadows.sm,
    },
    chefOnline: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#22C55E',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    chefLabel: { fontSize: Typography.fontSize.xs, color: Colors.neutral[500] },
    chefName: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.bold, color: Colors.neutral[900] },
    followBtn: {
        paddingHorizontal: Spacing[4],
        paddingVertical: Spacing[2],
        borderRadius: BorderRadius.xl,
        backgroundColor: Colors.brand.peach,
    },
    followText: {
        color: Colors.brand.orange,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
    },

    // ─── Section ──────────────────────
    section: { marginBottom: Spacing[6] },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing[4],
    },
    sectionTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.neutral[900] },
    sectionSub: { fontSize: Typography.fontSize.sm, color: Colors.neutral[500] },

    // ─── Ingredients ──────────────────
    ingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: Colors.neutral[100],
        marginBottom: 10,
        ...Shadows.sm,
    },
    ingEmoji: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    ingName: { flex: 1, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.neutral[900] },
    ingQty: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold, color: Colors.brand.orange },

    // ─── Steps timeline ───────────────
    stepRow: { flexDirection: 'row', marginBottom: 12 },
    stepTimeline: { width: 24, alignItems: 'center' },
    stepDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
    stepDotActive: { backgroundColor: Colors.brand.orange, borderColor: Colors.neutral[50] },
    stepDotInactive: { backgroundColor: Colors.neutral[300], borderColor: Colors.neutral[50] },
    stepLine: { flex: 1, width: 2, marginVertical: 2 },
    stepLineActive: { backgroundColor: 'rgba(255,107,74,0.2)' },
    stepLineInactive: { backgroundColor: Colors.neutral[200] },
    stepCard: { flex: 1, marginLeft: 12, padding: Spacing[5], borderRadius: BorderRadius.lg + 4 },
    stepCardActive: { backgroundColor: Colors.brand.peach },
    stepCardInactive: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.neutral[100], ...Shadows.sm },
    stepLabel: { fontSize: 11, fontWeight: Typography.fontWeight.bold, letterSpacing: 1, marginBottom: Spacing[2] },
    stepLabelActive: { color: Colors.brand.orange },
    stepLabelInactive: { color: Colors.neutral[500] },
    stepTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.neutral[900], marginBottom: Spacing[2] },
    stepDesc: { fontSize: Typography.fontSize.sm, color: Colors.neutral[500], lineHeight: 20 },

    // ─── Sticky CTA ───────────────────
    ctaWrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing[5],
        paddingTop: Spacing[4],
        paddingBottom: Platform.OS === 'ios' ? 34 : 24, // Better safe area handling
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 1,
        borderTopColor: Colors.neutral[200],
    },
    ctaBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.brand.orange,
        borderRadius: BorderRadius.lg + 4,
        padding: Spacing[4],
        ...Shadows.lg,
    },
    ctaLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    ctaMicCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.white },
    ctaSub: { fontSize: Typography.fontSize.xs, color: 'rgba(255,255,255,0.8)', fontWeight: Typography.fontWeight.medium },
    ctaArrow: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaArrowText: { fontSize: 18, color: Colors.brand.orange, fontWeight: Typography.fontWeight.bold },
});
