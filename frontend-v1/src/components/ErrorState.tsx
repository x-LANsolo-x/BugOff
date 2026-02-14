/**
 * ChefMentor X – Error State Component
 *
 * Displays error with retry button.
 * Usage:
 *   <ErrorState
 *     message="Failed to load recipes"
 *     onRetry={() => refetch()}
 *   />
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

interface ErrorStateProps {
    emoji?: string;
    title?: string;
    message?: string;
    onRetry?: () => void;
    retryLabel?: string;
}

export default function ErrorState({
    emoji = '⚠️',
    title = 'Something Went Wrong',
    message = 'We couldn\'t load the data. Please check your connection and try again.',
    onRetry,
    retryLabel = 'Try Again',
}: ErrorStateProps) {
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.emojiCircle,
                    { transform: [{ translateX: shakeAnim }] },
                ]}
            >
                <Text style={styles.emoji}>{emoji}</Text>
            </Animated.View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            {onRetry && (
                <TouchableOpacity
                    style={styles.retryBtn}
                    onPress={onRetry}
                    activeOpacity={0.85}
                >
                    <Text style={styles.retryIcon}>🔄</Text>
                    <Text style={styles.retryLabel}>{retryLabel}</Text>
                </TouchableOpacity>
            )}

            <Text style={styles.helpText}>
                If the problem persists, try restarting the app.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing[8],
        paddingVertical: Spacing[10],
    },
    emojiCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing[5],
    },
    emoji: {
        fontSize: 44,
    },
    title: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.xl,
        fontWeight: '700',
        color: Colors.textMain,
        textAlign: 'center',
        marginBottom: 8,
    },
    message: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.base,
        color: Colors.textSub,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: Spacing[6],
    },
    retryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Colors.brand.orange,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: BorderRadius.lg,
        ...Shadows.glow,
        marginBottom: 16,
    },
    retryIcon: { fontSize: 16 },
    retryLabel: {
        fontFamily: 'DMSans-Bold',
        color: Colors.white,
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
    },
    helpText: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[400],
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
