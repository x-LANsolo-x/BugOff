/**
 * ChefMentor X – Button Component
 * Variants: Primary, Secondary, Outline, Danger, Ghost
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    View,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows, TouchTarget } from '../../constants/theme';
import type { ButtonVariant } from '../../types';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const VARIANT_STYLES: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
    primary: {
        container: {
            backgroundColor: Colors.brand.orange,
            ...Shadows.glow,
        },
        text: { color: Colors.white },
    },
    secondary: {
        container: {
            backgroundColor: Colors.neutral[100],
        },
        text: { color: Colors.neutral[800] },
    },
    outline: {
        container: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: Colors.neutral[200],
        },
        text: { color: Colors.neutral[800] },
    },
    danger: {
        container: {
            backgroundColor: Colors.error,
        },
        text: { color: Colors.white },
    },
    ghost: {
        container: {
            backgroundColor: 'transparent',
        },
        text: { color: Colors.brand.orange },
    },
};

const SIZE_STYLES: Record<string, { container: ViewStyle; text: TextStyle }> = {
    sm: {
        container: { paddingVertical: Spacing[2], paddingHorizontal: Spacing[3] },
        text: { fontSize: Typography.fontSize.sm },
    },
    md: {
        container: { paddingVertical: Spacing[3], paddingHorizontal: Spacing[4] },
        text: { fontSize: Typography.fontSize.base },
    },
    lg: {
        container: { paddingVertical: Spacing[4], paddingHorizontal: Spacing[6] },
        text: { fontSize: Typography.fontSize.lg },
    },
};

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = true,
    size = 'lg',
    style,
    textStyle,
}) => {
    const variantStyle = VARIANT_STYLES[variant];
    const sizeStyle = SIZE_STYLES[size];

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.85}
            style={[
                styles.base,
                variantStyle.container,
                sizeStyle.container,
                fullWidth && styles.fullWidth,
                disabled && styles.disabled,
                style,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: disabled || loading }}
        >
            {loading ? (
                <ActivityIndicator
                    color={variantStyle.text.color}
                    size="small"
                />
            ) : (
                <View style={styles.content}>
                    {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
                    <Text
                        style={[
                            styles.text,
                            variantStyle.text,
                            sizeStyle.text,
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                    {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: TouchTarget.min,
        flexDirection: 'row',
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: Typography.fontWeight.bold,
        textAlign: 'center',
    },
    iconLeft: {
        marginRight: Spacing[2],
    },
    iconRight: {
        marginLeft: Spacing[2],
    },
});
