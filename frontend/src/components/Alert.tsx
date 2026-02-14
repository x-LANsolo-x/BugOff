/**
 * ChefMentor X – Alert / Toast Component
 * Semantic variants: success, warning, error, info
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import type { AlertType } from '../../types';

interface AlertProps {
    type: AlertType;
    title?: string;
    message: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    autoDismiss?: boolean;
    autoDismissMs?: number;
}

const ALERT_CONFIG: Record<AlertType, { bg: string; border: string; text: string; icon: string }> = {
    success: {
        bg: '#ecfdf5',
        border: Colors.success,
        text: '#065f46',
        icon: '✓',
    },
    warning: {
        bg: '#fffbeb',
        border: Colors.warning,
        text: '#92400e',
        icon: '⚠',
    },
    error: {
        bg: '#fef2f2',
        border: Colors.error,
        text: '#991b1b',
        icon: '✕',
    },
    info: {
        bg: '#eff6ff',
        border: Colors.info,
        text: '#1e40af',
        icon: 'ℹ',
    },
};

export const Alert: React.FC<AlertProps> = ({
    type,
    title,
    message,
    dismissible = false,
    onDismiss,
    autoDismiss = false,
    autoDismissMs = 4000,
}) => {
    const config = ALERT_CONFIG[type];
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        if (autoDismiss && onDismiss) {
            const timer = setTimeout(() => {
                handleDismiss();
            }, autoDismissMs);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -20,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => onDismiss?.());
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: config.bg,
                    borderLeftColor: config.border,
                    opacity,
                    transform: [{ translateY }],
                },
            ]}
            accessibilityRole="alert"
        >
            <Text style={[styles.icon, { color: config.border }]}>{config.icon}</Text>
            <View style={styles.content}>
                {title && <Text style={[styles.title, { color: config.text }]}>{title}</Text>}
                <Text style={[styles.message, { color: config.text }]}>{message}</Text>
            </View>
            {dismissible && (
                <TouchableOpacity
                    onPress={handleDismiss}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    accessibilityLabel="Dismiss alert"
                >
                    <Text style={[styles.dismiss, { color: config.text }]}>✕</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderLeftWidth: 4,
        borderRadius: BorderRadius.md,
        padding: Spacing[3],
        marginBottom: Spacing[3],
        ...Shadows.sm,
    },
    icon: {
        fontSize: Typography.fontSize.lg,
        marginRight: Spacing[2],
        marginTop: 1,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
        marginBottom: 2,
    },
    message: {
        fontSize: Typography.fontSize.sm,
        lineHeight: 20,
    },
    dismiss: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.bold,
        padding: Spacing[1],
    },
});
