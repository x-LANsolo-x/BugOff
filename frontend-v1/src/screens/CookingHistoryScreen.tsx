/**
 * ChefMentor X – Cooking History Screen
 *
 * Stitch ref: chefmentor_x_cooking_history
 * Features:
 *  - Header with back button and filter
 *  - 3 stat pills (Completed, Total Time, Success Rate)
 *  - Timeline with date sections (TODAY, YESTERDAY)
 *  - Status-colored entries (green=completed, grey=abandoned, red=failed)
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

const STAT_PILLS = [
    { label: 'Completed', value: '18', icon: '✅' },
    { label: 'Total Time', value: '8.5h', icon: '⏱' },
    { label: 'Success', value: '75%', icon: '📈' },
];

const HISTORY_SECTIONS = [
    {
        title: 'TODAY',
        entries: [
            {
                recipe: 'Spicy Ramen Bowl',
                emoji: '🍜',
                status: 'completed' as const,
                time: '25 min',
                difficulty: 'BEGINNER',
                note: null,
            },
            {
                recipe: 'Creamy Carbonara',
                emoji: '🍝',
                status: 'failed' as const,
                time: '45 min',
                difficulty: 'ADVANCED',
                note: 'Over-cooked the eggs — sauce became scrambled.',
            },
        ],
    },
    {
        title: 'YESTERDAY',
        entries: [
            {
                recipe: 'Morning Omelette',
                emoji: '🍳',
                status: 'completed' as const,
                time: '12 min',
                difficulty: 'BEGINNER',
                note: null,
            },
            {
                recipe: 'Paella Valencia',
                emoji: '🥘',
                status: 'abandoned' as const,
                time: '30 min',
                difficulty: 'INTERMEDIATE',
                note: null,
            },
        ],
    },
];

const STATUS_MAP = {
    completed: { label: 'Completed', color: '#059669', bg: '#ECFDF5', dot: '#22C55E' },
    failed: { label: 'Failed', color: '#DC2626', bg: '#FEE2E2', dot: '#EF4444' },
    abandoned: { label: 'Abandoned', color: '#6B7280', bg: '#F3F4F6', dot: '#9CA3AF' },
};

export default function CookingHistoryScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cooking History</Text>
                <TouchableOpacity style={styles.filterBtn}>
                    <Text style={{ fontSize: 18 }}>⚙️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {/* Stat pills */}
                <View style={styles.statRow}>
                    {STAT_PILLS.map((stat, i) => (
                        <View key={i} style={styles.statPill}>
                            <Text style={styles.statIcon}>{stat.icon}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Timeline sections */}
                {HISTORY_SECTIONS.map((section, si) => (
                    <View key={si} style={styles.section}>
                        <Text style={styles.dateLabel}>{section.title}</Text>
                        {section.entries.map((entry, ei) => {
                            const status = STATUS_MAP[entry.status];
                            return (
                                <View key={ei} style={styles.entryCard}>
                                    {/* Timeline dot */}
                                    <View style={styles.timeline}>
                                        <View style={[styles.dot, { backgroundColor: status.dot }]} />
                                        {ei < section.entries.length - 1 && (
                                            <View style={styles.line} />
                                        )}
                                    </View>

                                    {/* Card content */}
                                    <View style={styles.entryContent}>
                                        {/* Status badge */}
                                        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                                            <Text style={[styles.statusText, { color: status.color }]}>
                                                {status.label}
                                            </Text>
                                        </View>

                                        <View style={styles.entryRow}>
                                            <Text style={styles.entryEmoji}>{entry.emoji}</Text>
                                            <View style={styles.entryInfo}>
                                                <Text style={styles.entryTitle}>{entry.recipe}</Text>
                                                <Text style={styles.entryMeta}>
                                                    ⏱ {entry.time} • {entry.difficulty}
                                                </Text>
                                            </View>
                                        </View>

                                        {entry.note && (
                                            <View style={styles.noteCard}>
                                                <Text style={styles.noteText}>📝 {entry.note}</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

/* ─── Styles ─────────────────────────────────────────── */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.neutral[50] },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing[6],
        paddingVertical: Spacing[3],
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: { fontSize: 18, color: Colors.textMain },
    headerTitle: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.xl,
        fontWeight: '700',
        color: Colors.textMain,
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
    },

    scroll: { paddingHorizontal: Spacing[6], paddingBottom: 40 },

    /* Stats */
    statRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: Spacing[6],
        marginTop: Spacing[3],
    },
    statPill: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingVertical: 14,
        borderRadius: BorderRadius.xl,
        ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.neutral[100],
    },
    statIcon: { fontSize: 18, marginBottom: 4 },
    statValue: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.xl,
        fontWeight: '800',
        color: Colors.textMain,
    },
    statLabel: {
        fontFamily: 'DMSans',
        fontSize: 11,
        color: Colors.textSub,
        marginTop: 2,
    },

    /* Section */
    section: { marginBottom: Spacing[5] },
    dateLabel: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.xs,
        fontWeight: '700',
        color: Colors.textSub,
        letterSpacing: 1.5,
        marginBottom: 12,
    },

    /* Entry */
    entryCard: { flexDirection: 'row', marginBottom: 14 },

    /* Timeline */
    timeline: { width: 24, alignItems: 'center', paddingTop: 6 },
    dot: { width: 12, height: 12, borderRadius: 6 },
    line: {
        flex: 1,
        width: 2,
        backgroundColor: Colors.neutral[200],
        marginTop: 4,
    },

    /* Content */
    entryContent: {
        flex: 1,
        marginLeft: 12,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: 14,
        ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.neutral[100],
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: BorderRadius.full,
        marginBottom: 10,
    },
    statusText: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    entryRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    entryEmoji: { fontSize: 28 },
    entryInfo: { flex: 1 },
    entryTitle: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 2,
    },
    entryMeta: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.xs,
        color: Colors.textSub,
    },

    /* Note */
    noteCard: {
        backgroundColor: '#FEE2E2',
        padding: 10,
        borderRadius: BorderRadius.md,
        marginTop: 10,
    },
    noteText: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.xs,
        color: '#B91C1C',
        lineHeight: 18,
    },
});
