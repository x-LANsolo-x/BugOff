/**
 * ChefMentor X – Card Component
 * Used for recipes, diagnosis results, and content containers.
 */

import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    ImageSourcePropType,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';

interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
    variant?: 'default' | 'elevated' | 'outlined';
}

interface RecipeCardProps {
    title: string;
    imageUrl: string;
    difficulty: string;
    time: string;
    onPress: () => void;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    children,
    onPress,
    style,
    variant = 'default',
}) => {
    const variantStyle =
        variant === 'elevated'
            ? [styles.base, Shadows.md]
            : variant === 'outlined'
                ? [styles.base, styles.outlined]
                : [styles.base, Shadows.base];

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.9}
                style={[...variantStyle, style]}
                accessibilityRole="button"
            >
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={[...variantStyle, style]}>{children}</View>;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
    title,
    imageUrl,
    difficulty,
    time,
    onPress,
    style,
}) => {
    return (
        <Card onPress={onPress} variant="elevated" style={[styles.recipeCard, style]}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.recipeImage}
                resizeMode="cover"
                accessibilityLabel={`${title} dish photo`}
            />
            <View style={styles.recipeContent}>
                <Text style={styles.recipeTitle} numberOfLines={2}>
                    {title}
                </Text>
                <View style={styles.recipeMeta}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{difficulty}</Text>
                    </View>
                    <Text style={styles.recipeTime}>{time}</Text>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    base: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing[4],
        overflow: 'hidden',
    },
    outlined: {
        borderWidth: 1,
        borderColor: Colors.neutral[200],
    },
    // Recipe Card
    recipeCard: {
        padding: 0,
        marginBottom: Spacing[3],
    },
    recipeImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: BorderRadius.lg,
        borderTopRightRadius: BorderRadius.lg,
    },
    recipeContent: {
        padding: Spacing[3],
    },
    recipeTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[900],
        marginBottom: Spacing[2],
    },
    recipeMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    badge: {
        backgroundColor: Colors.brand.peach,
        paddingHorizontal: Spacing[2],
        paddingVertical: Spacing[1],
        borderRadius: BorderRadius.full,
    },
    badgeText: {
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.brand.orange,
    },
    recipeTime: {
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[500],
    },
});
