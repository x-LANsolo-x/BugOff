/**
 * ChefMentor X – TextInput Component
 * States: default, focus, error, disabled
 */

import React, { useState } from 'react';
import {
    View,
    TextInput as RNTextInput,
    Text,
    StyleSheet,
    TextInputProps as RNTextInputProps,
    ViewStyle,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '../../constants/theme';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
    containerStyle?: ViewStyle;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    hint,
    icon,
    containerStyle,
    editable = true,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = error
        ? Colors.error
        : isFocused
            ? Colors.brand.orange
            : Colors.neutral[300];

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputWrapper,
                    { borderColor },
                    isFocused && styles.focusRing,
                    !editable && styles.disabled,
                ]}
            >
                {icon && <View style={styles.icon}>{icon}</View>}
                <RNTextInput
                    style={[styles.input, !editable && styles.disabledText]}
                    placeholderTextColor={Colors.neutral[400]}
                    editable={editable}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    accessibilityLabel={label}
                    {...props}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            {hint && !error && <Text style={styles.hint}>{hint}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: Spacing[4],
    },
    label: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.neutral[700],
        marginBottom: Spacing[1],
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.white,
        paddingHorizontal: Spacing[3],
    },
    focusRing: {
        borderWidth: 2,
        shadowColor: Colors.brand.orange,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        paddingVertical: Spacing[3],
        fontSize: Typography.fontSize.base,
        color: Colors.neutral[900],
    },
    icon: {
        marginRight: Spacing[2],
    },
    disabled: {
        backgroundColor: Colors.neutral[100],
        opacity: 0.7,
    },
    disabledText: {
        color: Colors.neutral[400],
    },
    error: {
        fontSize: Typography.fontSize.xs,
        color: Colors.error,
        marginTop: Spacing[1],
    },
    hint: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[500],
        marginTop: Spacing[1],
    },
});
