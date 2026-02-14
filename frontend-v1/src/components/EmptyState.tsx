/**
 * ChefMentor X – Empty State Component
 *
 * Displays a friendly message when there's no data.
 * Usage:
 *   <EmptyState
 *     emoji="📋"
 *     title="No Recipes Yet"
 *     subtitle="Start by adding your first recipe"
 *     actionLabel="Browse Recipes"
 *     onAction={() => navigation.navigate('RecipeList')}
 *   />
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

interface EmptyStateProps {
    emoji?: string;
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    emoji = '📭',
    title,
    subtitle,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 80,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
        >
            {/* Decorative top circle */}
            <View style={styles.emojiCircle}>
                <Text style={styles.emoji}>{emoji}</Text>
            </View>

            <Text style={styles.title}>{title}</Text>

            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

            {actionLabel && onAction && (
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={onAction}
                    activeOpacity={0.85}
                >
                    <Text style={styles.actionLabel}>{actionLabel}</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
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
        backgroundColor: Colors.brand.peachLight,
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
    subtitle: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.base,
        color: Colors.textSub,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: Spacing[6],
    },
    actionBtn: {
        backgroundColor: Colors.brand.orange,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: BorderRadius.lg,
        ...Shadows.glow,
    },
    actionLabel: {
        fontFamily: 'DMSans-Bold',
        color: Colors.white,
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
    },
});
