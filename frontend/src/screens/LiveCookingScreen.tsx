/**
 * ChefMentor X – Live Cooking Screen
 *
 * Stitch ref: chefmentor_x_live_cooking + chefmentor_x_pause_overlay
 * Features:
 *  - Camera-style hero (top 40%) with step indicator + "LIVE" badge
 *  - Pull-up content panel with current step instruction
 *  - Speaker button + estimated time
 *  - Ask AI (sage green) + Next Step (orange) action buttons
 *  - Repeat + Pause secondary buttons
 *  - Pause overlay modal with timer, resume, restart, end
 *  - Step progression through all recipe steps
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Modal,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useCookingStore } from '../stores';

const { height: SCREEN_H } = Dimensions.get('window');

// ─── Sample steps (same recipe from details) ───────

const STEPS = [
    { title: 'Whisk the eggs gently until light and fluffy', time: '~2 mins' },
    { title: 'Heat the pan and melt the butter evenly', time: '~1 min' },
    { title: 'Pour in the eggs and cook gently, folding slowly', time: '~3 mins' },
    { title: 'Remove from heat early and garnish with chives', time: '~1 min' },
];

// ─── Colors for the camera-area backgrounds ────────

const CAMERA_COLORS = ['#374151', '#1F2937', '#292524', '#1E293B'];

export default function LiveCookingScreen({ navigation }: any) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const totalSteps = STEPS.length;
    const step = STEPS[currentStep];

    // Pulse animation for LIVE badge
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 0.4, duration: 1000, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    // Simple elapsed timer
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((s) => s + 1);
        } else {
            navigation.navigate('Completion', { recipeId: '1' });
        }
    };

    const handleRepeat = () => {
        // Replay current step animation or voice — no-op for now
    };

    const handleResume = () => setIsPaused(false);
    const handleRestart = () => { setCurrentStep(0); setElapsedSeconds(0); setIsPaused(false); };
    const handleEnd = () => navigation.goBack();

    return (
        <View style={styles.container}>
            {/* ───── Camera-style hero (top 40%) ───────── */}
            <View style={[styles.cameraArea, { backgroundColor: CAMERA_COLORS[currentStep % CAMERA_COLORS.length] }]}>
                {/* Large step emoji */}
                <Text style={styles.cameraEmoji}>
                    {currentStep === 0 ? '🥚' : currentStep === 1 ? '🍳' : currentStep === 2 ? '🔥' : '🌿'}
                </Text>

                {/* Camera overlay gradient */}
                <View style={styles.cameraOverlay} />

                {/* Step counter */}
                <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>Step {currentStep + 1} of {totalSteps}</Text>
                </View>

                {/* LIVE badge */}
                <View style={styles.liveBadge}>
                    <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
                    <Text style={styles.liveText}>LIVE VIEW</Text>
                </View>
            </View>

            {/* ───── Content panel (bottom 60%) ────────── */}
            <View style={styles.contentPanel}>
                <View style={styles.panelHandle} />

                {/* Step instruction card */}
                <View style={styles.stepCard}>
                    <Text style={styles.stepInstruction}>{step.title}</Text>

                    <View style={styles.stepMeta}>
                        {/* Speaker */}
                        <TouchableOpacity style={styles.speakerBtn} accessibilityLabel="Read instruction aloud">
                            <Text style={{ fontSize: 28 }}>🔊</Text>
                        </TouchableOpacity>

                        {/* Timer */}
                        <View style={styles.timerChip}>
                            <Text style={{ fontSize: 16 }}>⏱</Text>
                            <Text style={styles.timerText}>{step.time}</Text>
                        </View>
                    </View>
                </View>

                {/* ─── Action buttons ────────────────────── */}
                <View style={styles.actionGrid}>
                    {/* Ask AI  +  Next Step */}
                    <View style={styles.primaryRow}>
                        <TouchableOpacity style={styles.askAIBtn} accessibilityLabel="Ask AI for help">
                            <Text style={styles.actionEmoji}>🎙️</Text>
                            <Text style={styles.actionLabel}>Ask AI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextStepBtn} onPress={handleNext} accessibilityLabel="Next step">
                            <Text style={styles.actionEmoji}>⏭️</Text>
                            <Text style={styles.actionLabel}>
                                {currentStep < totalSteps - 1 ? 'Next Step' : 'Finish'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Repeat  +  Pause */}
                    <View style={styles.secondaryRow}>
                        <TouchableOpacity style={styles.outlineBtn} onPress={handleRepeat} accessibilityLabel="Repeat step">
                            <Text style={styles.outlineIcon}>🔁</Text>
                            <Text style={styles.outlineLabel}>Repeat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.outlineBtn} onPress={() => setIsPaused(true)} accessibilityLabel="Pause">
                            <Text style={styles.outlineIcon}>⏸️</Text>
                            <Text style={styles.outlineLabel}>Pause</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* ───── Pause Overlay Modal ───────────────── */}
            <Modal visible={isPaused} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.pauseCard}>
                        {/* Pause icon */}
                        <View style={styles.pauseIconWrap}>
                            <Text style={{ fontSize: 44 }}>⏸️</Text>
                        </View>

                        <Text style={styles.pauseTitle}>Cooking Paused</Text>
                        <Text style={styles.pauseSub}>Step {currentStep + 1}: {STEPS[currentStep].title.split(' ').slice(0, 3).join(' ')}…</Text>

                        {/* Timer */}
                        <Text style={styles.pauseTimer}>{formatTime(elapsedSeconds)}</Text>

                        {/* Resume */}
                        <TouchableOpacity style={styles.resumeBtn} onPress={handleResume} accessibilityLabel="Resume cooking">
                            <Text style={{ fontSize: 20 }}>▶️</Text>
                            <Text style={styles.resumeText}>Resume Cooking</Text>
                        </TouchableOpacity>

                        {/* Restart / End */}
                        <View style={styles.pauseSecondary}>
                            <TouchableOpacity style={styles.pauseOutline} onPress={handleRestart}>
                                <Text style={styles.pauseOutlineIcon}>🔄</Text>
                                <Text style={styles.pauseOutlineText}>Restart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.pauseOutline, styles.endBtn]} onPress={handleEnd}>
                                <Text style={styles.pauseOutlineIcon}>✕</Text>
                                <Text style={[styles.pauseOutlineText, { color: '#EF4444' }]}>End</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.pauseHint}>Large buttons optimized for messy hands</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.neutral[50] },

    // ─── Camera area ──────────────────
    cameraArea: {
        height: '40%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    cameraEmoji: { fontSize: 80, opacity: 0.3, zIndex: 1 },
    cameraOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    stepBadge: {
        position: 'absolute',
        top: 56,
        left: Spacing[6],
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    stepBadgeText: { color: Colors.white, fontWeight: Typography.fontWeight.bold, fontSize: Typography.fontSize.base, letterSpacing: 0.5 },
    liveBadge: {
        position: 'absolute',
        top: 56,
        right: Spacing[6],
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(220,38,38,0.85)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: BorderRadius.full,
    },
    liveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: Colors.white },
    liveText: { color: Colors.white, fontSize: 11, fontWeight: Typography.fontWeight.bold, letterSpacing: 1 },

    // ─── Content panel ────────────────
    contentPanel: {
        flex: 1,
        backgroundColor: Colors.neutral[50],
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -28,
        paddingHorizontal: Spacing[6],
        paddingTop: Spacing[3],
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
    },
    panelHandle: {
        width: 48,
        height: 5,
        borderRadius: 3,
        backgroundColor: Colors.neutral[300],
        alignSelf: 'center',
        marginBottom: Spacing[4],
        opacity: 0.5,
    },

    // ─── Step card ────────────────────
    stepCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg + 4,
        padding: Spacing[6],
        borderWidth: 2,
        borderColor: Colors.neutral[200],
        marginBottom: Spacing[6],
        ...Shadows.lg,
    },
    stepInstruction: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.extrabold,
        color: Colors.neutral[900],
        lineHeight: 32,
        marginBottom: Spacing[4],
    },
    stepMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    speakerBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,107,74,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: Colors.neutral[100],
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: BorderRadius.md,
    },
    timerText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.neutral[600] },

    // ─── Action grid ──────────────────
    actionGrid: { gap: 12 },
    primaryRow: { flexDirection: 'row', gap: 12, height: 88 },
    askAIBtn: {
        flex: 1,
        backgroundColor: '#7C9A84',
        borderRadius: BorderRadius.lg + 4,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    nextStepBtn: {
        flex: 1,
        backgroundColor: Colors.brand.orange,
        borderRadius: BorderRadius.lg + 4,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.glow,
    },
    actionEmoji: { fontSize: 28, marginBottom: 4 },
    actionLabel: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.white },

    secondaryRow: { flexDirection: 'row', gap: 12, height: 56 },
    outlineBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: BorderRadius.xl,
        borderWidth: 2,
        borderColor: Colors.neutral[300],
    },
    outlineIcon: { fontSize: 16 },
    outlineLabel: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.bold, color: Colors.neutral[800] },

    // ─── Pause overlay ────────────────
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing[6],
    },
    pauseCard: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 28,
        padding: Spacing[8],
        alignItems: 'center',
        ...Shadows.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    pauseIconWrap: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,107,74,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing[6],
    },
    pauseTitle: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.extrabold,
        color: Colors.neutral[900],
        marginBottom: Spacing[1],
    },
    pauseSub: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.neutral[500],
        letterSpacing: 0.5,
        marginBottom: Spacing[8],
    },
    pauseTimer: {
        fontSize: 52,
        fontWeight: Typography.fontWeight.extrabold,
        color: Colors.neutral[800],
        letterSpacing: -2,
        marginBottom: Spacing[8],
    },
    resumeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        paddingVertical: 18,
        backgroundColor: Colors.brand.orange,
        borderRadius: BorderRadius.lg + 4,
        ...Shadows.glow,
        marginBottom: Spacing[4],
    },
    resumeText: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.white },

    pauseSecondary: { flexDirection: 'row', gap: 14, width: '100%' },
    pauseOutline: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 16,
        borderRadius: BorderRadius.lg + 4,
        borderWidth: 2,
        borderColor: Colors.neutral[200],
    },
    endBtn: {},
    pauseOutlineIcon: { fontSize: 18 },
    pauseOutlineText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.neutral[700] },

    pauseHint: {
        marginTop: Spacing[8],
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[400],
        textAlign: 'center',
    },
});
