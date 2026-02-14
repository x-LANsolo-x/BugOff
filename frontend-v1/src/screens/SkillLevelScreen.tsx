/**
 * ChefMentor X – Skill Level Screen
 *
 * User selects their cooking skill level during onboarding.
 * This personalizes recipe recommendations and AI guidance.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { Colors, Typography, BorderRadius, Shadows } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');

const SKILL_LEVELS = [
    {
        id: 'beginner',
        emoji: '🥚',
        title: 'Beginner',
        desc: 'I can make eggs and toast. Teach me everything!',
        recipes: 'Maggi, Scrambled Eggs, Grilled Cheese',
        color: '#34D399',
    },
    {
        id: 'intermediate',
        emoji: '🍳',
        title: 'Intermediate',
        desc: 'I cook regularly and want to level up my skills.',
        recipes: 'Ramen, Stir-Fry, Carbonara',
        color: Colors.brand.orange,
    },
    {
        id: 'advanced',
        emoji: '👨‍🍳',
        title: 'Advanced',
        desc: 'I\'m comfortable in the kitchen. Challenge me!',
        recipes: 'Tikka Masala, Thai Curry, Sushi',
        color: '#6366F1',
    },
    {
        id: 'expert',
        emoji: '⭐',
        title: 'Expert',
        desc: 'I want to master professional techniques.',
        recipes: 'Beef Wellington, Croissants, Soufflé',
        color: '#F59E0B',
    },
];

export default function SkillLevelScreen({ navigation }: any) {
    const [selected, setSelected] = useState<string | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleSelect = (id: string) => {
        setSelected(id);
    };

    const handleContinue = () => {
        // Store skill level and proceed to main app
        // In production, save to user profile via API
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
        });
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.emoji}>🎯</Text>
                <Text style={styles.title}>Your Cooking Level</Text>
                <Text style={styles.subtitle}>
                    This helps us personalize your recipes and AI guidance.
                </Text>
            </View>

            {/* Skill Level Cards */}
            <View style={styles.cards}>
                {SKILL_LEVELS.map((level) => {
                    const isSelected = selected === level.id;
                    return (
                        <TouchableOpacity
                            key={level.id}
                            style={[
                                styles.card,
                                isSelected && { borderColor: level.color, borderWidth: 2.5 },
                            ]}
                            onPress={() => handleSelect(level.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.cardContent}>
                                <Text style={styles.cardEmoji}>{level.emoji}</Text>
                                <View style={styles.cardText}>
                                    <Text style={styles.cardTitle}>{level.title}</Text>
                                    <Text style={styles.cardDesc}>{level.desc}</Text>
                                    <Text style={styles.cardRecipes}>
                                        📖 {level.recipes}
                                    </Text>
                                </View>
                                {isSelected && (
                                    <View style={[styles.checkMark, { backgroundColor: level.color }]}>
                                        <Text style={styles.checkText}>✓</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Continue Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.continueBtn, selected && styles.continueBtnActive]}
                    onPress={handleContinue}
                    disabled={!selected}
                    activeOpacity={0.8}
                >
                    <Text style={styles.continueBtnText}>
                        {selected ? 'Start Cooking! 🍳' : 'Select Your Level'}
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral[50],
        paddingHorizontal: 24,
        paddingTop: 70,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    emoji: {
        fontSize: 44,
        marginBottom: 10,
    },
    title: {
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: Typography.fontSize['2xl'],
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 6,
    },
    subtitle: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.base,
        color: Colors.textSub,
        textAlign: 'center',
        lineHeight: 22,
    },

    cards: { gap: 10 },
    card: {
        backgroundColor: Colors.white,
        padding: 14,
        borderRadius: BorderRadius.lg,
        borderWidth: 1.5,
        borderColor: Colors.neutral[200],
        ...Shadows.md,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardEmoji: { fontSize: 32 },
    cardText: { flex: 1 },
    cardTitle: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
        color: Colors.textMain,
    },
    cardDesc: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.sm,
        color: Colors.textSub,
        marginTop: 2,
        lineHeight: 18,
    },
    cardRecipes: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[400],
        marginTop: 4,
        fontStyle: 'italic',
    },
    checkMark: {
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '700',
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    continueBtn: {
        backgroundColor: Colors.neutral[300],
        paddingVertical: 16,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
    },
    continueBtnActive: {
        backgroundColor: Colors.brand.orange,
        ...Shadows.glow,
    },
    continueBtnText: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
        color: Colors.white,
    },
});
