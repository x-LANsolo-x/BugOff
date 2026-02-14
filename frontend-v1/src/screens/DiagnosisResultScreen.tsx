/**
 * ChefMentor X – Diagnosis Result Screen
 *
 * No stitch exists — designed from PRD specs:
 *  - Diagnosis summary with severity badge
 *  - "What Went Wrong" section with issue cards
 *  - "How to Fix It" correction suggestions
 *  - "Try Again" CTA
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');

// ─── Sample diagnosis data ─────────────────────────

const DIAGNOSIS = {
    dishName: 'Scrambled Eggs',
    emoji: '🍳',
    severity: 'Moderate',
    severityColor: '#F59E0B',
    summary: 'Your eggs were overcooked, resulting in a dry, rubbery texture. The heat was too high and the cooking time was too long.',
    issues: [
        {
            icon: '🌡️',
            title: 'Heat Too High',
            desc: 'The pan temperature exceeded the recommended medium-low setting.',
            severity: 'High',
            severityBg: '#FEE2E2',
            severityColor: '#B91C1C',
        },
        {
            icon: '⏱',
            title: 'Overcooked',
            desc: 'Eggs were left on heat for too long after curds formed.',
            severity: 'Medium',
            severityBg: '#FEF3C7',
            severityColor: '#A16207',
        },
        {
            icon: '🧂',
            title: 'Seasoned Too Early',
            desc: 'Salt was added before cooking, breaking down the egg proteins.',
            severity: 'Low',
            severityBg: '#DCFCE7',
            severityColor: '#15803D',
        },
    ],
    fixes: [
        { icon: '1️⃣', text: 'Use medium-low heat and keep the flame consistent' },
        { icon: '2️⃣', text: 'Remove eggs from heat while still slightly wet — carry-over heat finishes the cook' },
        { icon: '3️⃣', text: 'Season with salt only after removing from heat' },
        { icon: '4️⃣', text: 'Fold gently using a spatula instead of stirring aggressively' },
    ],
};

export default function DiagnosisResultScreen({ navigation }: any) {
    const fadeIn = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleTryAgain = () => {
        navigation.popToTop();
    };

    const handleBackHome = () => {
        navigation.getParent()?.navigate('CookTab');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Progress bar — all filled */}
            <View style={styles.progressRow}>
                {[1, 2, 3, 4].map((i) => (
                    <View key={i} style={[styles.progressBar, styles.progressActive]} />
                ))}
            </View>

            <Animated.ScrollView
                style={{ opacity: fadeIn }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header card */}
                <Animated.View style={[styles.headerCard, { transform: [{ translateY: slideUp }] }]}>
                    <View style={styles.dishRow}>
                        <View style={styles.dishCircle}>
                            <Text style={{ fontSize: 48 }}>{DIAGNOSIS.emoji}</Text>
                        </View>
                        <View style={styles.dishInfo}>
                            <Text style={styles.dishName}>{DIAGNOSIS.dishName}</Text>
                            <View style={[styles.severityBadge, { backgroundColor: DIAGNOSIS.severityColor + '20' }]}>
                                <View style={[styles.severityDot, { backgroundColor: DIAGNOSIS.severityColor }]} />
                                <Text style={[styles.severityText, { color: DIAGNOSIS.severityColor }]}>
                                    {DIAGNOSIS.severity} Issues
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.summary}>{DIAGNOSIS.summary}</Text>
                </Animated.View>

                {/* What Went Wrong */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🔍 What Went Wrong</Text>
                    {DIAGNOSIS.issues.map((issue, i) => (
                        <View key={i} style={styles.issueCard}>
                            <View style={styles.issueTop}>
                                <View style={styles.issueLeft}>
                                    <Text style={styles.issueIcon}>{issue.icon}</Text>
                                    <Text style={styles.issueTitle}>{issue.title}</Text>
                                </View>
                                <View style={[styles.issueBadge, { backgroundColor: issue.severityBg }]}>
                                    <Text style={[styles.issueBadgeText, { color: issue.severityColor }]}>
                                        {issue.severity}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.issueDesc}>{issue.desc}</Text>
                        </View>
                    ))}
                </View>

                {/* How to Fix It */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💡 How to Fix It</Text>
                    <View style={styles.fixesCard}>
                        {DIAGNOSIS.fixes.map((fix, i) => (
                            <View key={i} style={styles.fixRow}>
                                <Text style={styles.fixIcon}>{fix.icon}</Text>
                                <Text style={styles.fixText}>{fix.text}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Spacer for CTA */}
                <View style={{ height: 120 }} />
            </Animated.ScrollView>

            {/* CTAs */}
            <View style={styles.ctaWrap}>
                <TouchableOpacity
                    style={styles.ctaPrimary}
                    onPress={handleTryAgain}
                    activeOpacity={0.9}
                    accessibilityRole="button"
                >
                    <Text style={{ fontSize: 18 }}>📸</Text>
                    <Text style={styles.ctaPrimaryText}>Analyze Another Dish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.ctaSecondary}
                    onPress={handleBackHome}
                    activeOpacity={0.85}
                    accessibilityRole="button"
                >
                    <Text style={styles.ctaSecondaryText}>Back to Recipes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.neutral[50] },

    // Progress
    progressRow: {
        flexDirection: 'row',
        paddingHorizontal: Spacing[6],
        gap: 6,
        paddingVertical: Spacing[2],
    },
    progressBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.neutral[200],
    },
    progressActive: { backgroundColor: Colors.brand.orange },

    scrollContent: { paddingHorizontal: Spacing[6], paddingTop: Spacing[4] },

    // Header card
    headerCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: Spacing[6],
        marginBottom: Spacing[6],
        ...Shadows.lg,
        borderWidth: 1,
        borderColor: Colors.neutral[50],
    },
    dishRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: Spacing[4] },
    dishCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FFF7ED',
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
    },
    dishInfo: { flex: 1 },
    dishName: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
        marginBottom: Spacing[2],
    },
    severityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    severityDot: { width: 7, height: 7, borderRadius: 3.5 },
    severityText: { fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.bold },
    summary: {
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[600],
        lineHeight: 22,
    },

    // Section
    section: { marginBottom: Spacing[6] },
    sectionTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
        marginBottom: Spacing[4],
    },

    // Issues
    issueCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg + 4,
        padding: Spacing[4],
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.neutral[100],
        ...Shadows.sm,
    },
    issueTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing[2],
    },
    issueLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    issueIcon: { fontSize: 20 },
    issueTitle: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
    },
    issueBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
    },
    issueBadgeText: { fontSize: 10, fontWeight: Typography.fontWeight.bold, letterSpacing: 0.5 },
    issueDesc: {
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[500],
        lineHeight: 20,
    },

    // Fixes
    fixesCard: {
        backgroundColor: '#E9F0E8',
        borderRadius: BorderRadius.lg + 4,
        padding: Spacing[5],
        gap: 14,
    },
    fixRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    fixIcon: { fontSize: 18, marginTop: 1 },
    fixText: {
        flex: 1,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.neutral[800],
        lineHeight: 20,
    },

    // CTA
    ctaWrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing[6],
        paddingBottom: 36,
        backgroundColor: 'rgba(249,250,251,0.95)',
        gap: 10,
    },
    ctaPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 18,
        backgroundColor: Colors.brand.orange,
        borderRadius: BorderRadius.lg + 4,
        ...Shadows.glow,
    },
    ctaPrimaryText: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.white,
    },
    ctaSecondary: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: BorderRadius.lg + 4,
        borderWidth: 2,
        borderColor: Colors.neutral[200],
    },
    ctaSecondaryText: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[700],
    },
});
