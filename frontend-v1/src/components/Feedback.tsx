/**
 * ChefMentor X – Loading, EmptyState, ErrorCard, SuccessCard Components
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../constants/theme';

// ─── Loading Spinner ───────────────────────────────

interface LoadingProps {
    message?: string;
    size?: 'small' | 'large';
    color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
    message = 'Loading...',
    size = 'large',
    color = Colors.brand.orange,
}) => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={styles.loadingText}>{message}</Text>}
    </View>
);

// ─── Skeleton Loader ───────────────────────────────

interface SkeletonProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = BorderRadius.md,
}) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
            ])
        );
        animation.start();
        return () => animation.stop();
    }, []);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                { width: width as any, height, borderRadius, opacity },
            ]}
        />
    );
};

// ─── Empty State ───────────────────────────────────

interface EmptyStateProps {
    icon?: string;
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = '📭',
    title,
    message,
    actionLabel,
    onAction,
}) => (
    <View style={styles.emptyContainer} accessibilityRole="text">
        <Text style={styles.emptyIcon}>{icon}</Text>
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptyMessage}>{message}</Text>
        {actionLabel && onAction && (
            <TouchableOpacity onPress={onAction} style={styles.emptyCTA} accessibilityRole="button">
                <Text style={styles.emptyCTAText}>{actionLabel}</Text>
            </TouchableOpacity>
        )}
    </View>
);

// ─── Error Card ────────────────────────────────────

interface ErrorCardProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ message, onRetry }) => (
    <View style={styles.errorCard} accessibilityRole="alert">
        <Text style={styles.errorIcon}>⚠</Text>
        <Text style={styles.errorMessage}>{message}</Text>
        {onRetry && (
            <TouchableOpacity onPress={onRetry} style={styles.retryButton} accessibilityRole="button">
                <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
        )}
    </View>
);

// ─── Success Card ──────────────────────────────────

interface SuccessCardProps {
    title?: string;
    message: string;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({
    title = 'Success!',
    message,
}) => {
    const scale = useRef(new Animated.Value(0.5)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[styles.successCard, { opacity, transform: [{ scale }] }]}
            accessibilityRole="alert"
        >
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>{title}</Text>
            <Text style={styles.successMessage}>{message}</Text>
        </Animated.View>
    );
};

// ─── Styles ────────────────────────────────────────

const styles = StyleSheet.create({
    // Loading
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing[8],
    },
    loadingText: {
        marginTop: Spacing[3],
        fontSize: Typography.fontSize.base,
        color: Colors.neutral[500],
    },
    // Skeleton
    skeleton: {
        backgroundColor: Colors.neutral[200],
        marginBottom: Spacing[2],
    },
    // Empty State
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing[8],
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: Spacing[4],
    },
    emptyTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[800],
        marginBottom: Spacing[2],
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: Typography.fontSize.base,
        color: Colors.neutral[500],
        textAlign: 'center',
        lineHeight: 22,
    },
    emptyCTA: {
        marginTop: Spacing[6],
        backgroundColor: Colors.brand.orange,
        paddingVertical: Spacing[3],
        paddingHorizontal: Spacing[6],
        borderRadius: BorderRadius.xl,
    },
    emptyCTAText: {
        color: Colors.white,
        fontWeight: Typography.fontWeight.bold,
        fontSize: Typography.fontSize.base,
    },
    // Error Card
    errorCard: {
        backgroundColor: '#fef2f2',
        borderRadius: BorderRadius.lg,
        padding: Spacing[4],
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fecaca',
        ...Shadows.sm,
    },
    errorIcon: {
        fontSize: 32,
        marginBottom: Spacing[2],
    },
    errorMessage: {
        fontSize: Typography.fontSize.base,
        color: '#991b1b',
        textAlign: 'center',
        marginBottom: Spacing[3],
    },
    retryButton: {
        backgroundColor: Colors.error,
        paddingVertical: Spacing[2],
        paddingHorizontal: Spacing[4],
        borderRadius: BorderRadius.md,
    },
    retryText: {
        color: Colors.white,
        fontWeight: Typography.fontWeight.semibold,
        fontSize: Typography.fontSize.sm,
    },
    // Success Card
    successCard: {
        backgroundColor: '#ecfdf5',
        borderRadius: BorderRadius.lg,
        padding: Spacing[6],
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#a7f3d0',
        ...Shadows.sm,
    },
    successIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.success,
        color: Colors.white,
        fontSize: 28,
        fontWeight: Typography.fontWeight.bold,
        textAlign: 'center',
        lineHeight: 56,
        overflow: 'hidden',
        marginBottom: Spacing[3],
    },
    successTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: '#065f46',
        marginBottom: Spacing[1],
    },
    successMessage: {
        fontSize: Typography.fontSize.base,
        color: '#047857',
        textAlign: 'center',
    },
});
