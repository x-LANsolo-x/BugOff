/**
 * ChefMentor X – Context Questions Screen
 *
 * Shown between Upload and Analysis. Collects context about
 * the failed dish to improve AI diagnosis accuracy.
 *
 * Flow: Upload → Context Questions → Analysis Loading → Diagnosis Result
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Animated,
    Dimensions,
} from 'react-native';
import { Colors, Typography, BorderRadius, Shadows } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');

const HEAT_LEVELS = [
    { id: 'low', emoji: '🟢', label: 'Low Heat' },
    { id: 'medium', emoji: '🟡', label: 'Medium Heat' },
    { id: 'high', emoji: '🔴', label: 'High Heat' },
    { id: 'unknown', emoji: '❓', label: 'Not Sure' },
];

const TIMING_OPTIONS = [
    { id: 'under', emoji: '⏩', label: 'Undercooked' },
    { id: 'ok', emoji: '✅', label: 'Timed Right' },
    { id: 'over', emoji: '⏰', label: 'Overcooked' },
    { id: 'unknown', emoji: '❓', label: 'Not Sure' },
];

const CHANGES_OPTIONS = [
    { id: 'none', label: 'Followed exactly' },
    { id: 'substituted', label: 'Substituted ingredients' },
    { id: 'skipped', label: 'Skipped a step' },
    { id: 'modified', label: 'Modified quantities' },
];

export default function ContextQuestionsScreen({ navigation, route }: any) {
    const { imageUri } = route?.params || {};
    const [heatLevel, setHeatLevel] = useState<string | null>(null);
    const [timing, setTiming] = useState<string | null>(null);
    const [changes, setChanges] = useState<string[]>([]);
    const [notes, setNotes] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleChange = (id: string) => {
        setChanges((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const handleAnalyze = () => {
        const context = {
            heat_level: heatLevel,
            timing,
            modifications: changes,
            notes: notes.trim() || undefined,
        };

        navigation.navigate('AnalysisLoading', {
            imageUri,
            context,
        });
    };

    const canProceed = heatLevel || timing; // At least one question answered

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>What Happened?</Text>
                <Text style={styles.subtitle}>
                    Help our AI understand what went wrong. Answer what you can.
                </Text>
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Question 1: Heat Level */}
                <View style={styles.questionBlock}>
                    <Text style={styles.questionLabel}>🔥 What heat did you use?</Text>
                    <View style={styles.optionRow}>
                        {HEAT_LEVELS.map((opt) => (
                            <TouchableOpacity
                                key={opt.id}
                                style={[
                                    styles.optionPill,
                                    heatLevel === opt.id && styles.optionPillSelected,
                                ]}
                                onPress={() => setHeatLevel(opt.id)}
                            >
                                <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                                <Text
                                    style={[
                                        styles.optionLabel,
                                        heatLevel === opt.id && styles.optionLabelSelected,
                                    ]}
                                >
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Question 2: Timing */}
                <View style={styles.questionBlock}>
                    <Text style={styles.questionLabel}>⏱ How was the timing?</Text>
                    <View style={styles.optionRow}>
                        {TIMING_OPTIONS.map((opt) => (
                            <TouchableOpacity
                                key={opt.id}
                                style={[
                                    styles.optionPill,
                                    timing === opt.id && styles.optionPillSelected,
                                ]}
                                onPress={() => setTiming(opt.id)}
                            >
                                <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                                <Text
                                    style={[
                                        styles.optionLabel,
                                        timing === opt.id && styles.optionLabelSelected,
                                    ]}
                                >
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Question 3: Modifications */}
                <View style={styles.questionBlock}>
                    <Text style={styles.questionLabel}>📝 Did you change anything?</Text>
                    <View style={styles.chipRow}>
                        {CHANGES_OPTIONS.map((opt) => (
                            <TouchableOpacity
                                key={opt.id}
                                style={[
                                    styles.chip,
                                    changes.includes(opt.id) && styles.chipSelected,
                                ]}
                                onPress={() => toggleChange(opt.id)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        changes.includes(opt.id) && styles.chipTextSelected,
                                    ]}
                                >
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Optional Notes */}
                <View style={styles.questionBlock}>
                    <Text style={styles.questionLabel}>💬 Anything else? (optional)</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder='E.g. "It tasted bitter" or "The sauce separated"'
                        placeholderTextColor={Colors.neutral[400]}
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                {/* Analyze Button */}
                <TouchableOpacity
                    style={[styles.analyzeBtn, canProceed && styles.analyzeBtnActive]}
                    onPress={handleAnalyze}
                    activeOpacity={0.8}
                >
                    <Text style={styles.analyzeBtnText}>
                        🔬 Analyze My Dish
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={() =>
                        navigation.navigate('AnalysisLoading', { imageUri, context: {} })
                    }
                >
                    <Text style={styles.skipText}>Skip — Analyze without context</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral[50],
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.neutral[100],
    },
    backBtn: {
        marginBottom: 12,
    },
    backText: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: Typography.fontSize.sm,
        color: Colors.brand.orange,
        fontWeight: '600',
    },
    title: {
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: Typography.fontSize['2xl'],
        fontWeight: '700',
        color: Colors.textMain,
    },
    subtitle: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.sm,
        color: Colors.textSub,
        marginTop: 4,
        lineHeight: 20,
    },

    scroll: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    questionBlock: {
        marginBottom: 24,
    },
    questionLabel: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 10,
    },

    optionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: Colors.neutral[200],
        gap: 6,
    },
    optionPillSelected: {
        borderColor: Colors.brand.orange,
        backgroundColor: '#FFF7ED',
    },
    optionEmoji: { fontSize: 16 },
    optionLabel: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: Typography.fontSize.sm,
        fontWeight: '600',
        color: Colors.textSub,
    },
    optionLabelSelected: {
        color: Colors.brand.orange,
    },

    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: Colors.neutral[200],
    },
    chipSelected: {
        borderColor: Colors.brand.orange,
        backgroundColor: '#FFF7ED',
    },
    chipText: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: Typography.fontSize.sm,
        fontWeight: '600',
        color: Colors.textSub,
    },
    chipTextSelected: {
        color: Colors.brand.orange,
    },

    notesInput: {
        fontFamily: 'DMSans',
        backgroundColor: Colors.white,
        borderWidth: 1.5,
        borderColor: Colors.neutral[200],
        borderRadius: BorderRadius.lg,
        padding: 14,
        fontSize: Typography.fontSize.base,
        color: Colors.textMain,
        minHeight: 80,
        textAlignVertical: 'top',
    },

    analyzeBtn: {
        backgroundColor: Colors.neutral[300],
        paddingVertical: 16,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginTop: 8,
    },
    analyzeBtnActive: {
        backgroundColor: Colors.brand.orange,
        ...Shadows.glow,
    },
    analyzeBtnText: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
        color: Colors.white,
    },

    skipBtn: {
        alignItems: 'center',
        paddingVertical: 14,
    },
    skipText: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[400],
        textDecorationLine: 'underline',
    },
});
