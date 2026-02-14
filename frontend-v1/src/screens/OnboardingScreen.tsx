/**
 * ChefMentor X – Onboarding Screen
 * Matches stitch design: chefmentor_x_onboarding
 *
 * Layout: 3-slide horizontal carousel. Each slide has a dark illustration
 * card with chat-bubble mock conversation, a headline with accent,
 * and description text. Skip button top-right, dot indicators + Next
 * button at the bottom.
 */

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

const { width } = Dimensions.get('window');

interface Slide {
    id: string;
    emoji: string;
    tag: string;
    userBubble: string;
    aiBubble: string;
    title: string;
    titleAccent: string;
    description: string;
}

const SLIDES: Slide[] = [
    {
        id: '1',
        emoji: '🎙️',
        tag: 'VOICE COMMAND',
        userBubble: '"Next step, please!"',
        aiBubble: '"Okay! Now sauté the onions until golden brown."',
        title: 'Cook',
        titleAccent: 'Hands-Free',
        description:
            'Get step-by-step voice guidance while you cook. No need to touch your phone with messy hands.',
    },
    {
        id: '2',
        emoji: '📸',
        tag: 'AI ANALYSIS',
        userBubble: '"What went wrong?"',
        aiBubble: '"The oven temperature was too high. Try 425°F next time."',
        title: 'Learn from',
        titleAccent: 'Mistakes',
        description:
            'Snap a photo of your failed dish and our AI will diagnose what went wrong and how to fix it.',
    },
    {
        id: '3',
        emoji: '🏆',
        tag: 'TRACK PROGRESS',
        userBubble: '"Show my stats"',
        aiBubble: '"You\'ve mastered 12 recipes this month! New badge earned."',
        title: 'Level Up',
        titleAccent: 'Your Skills',
        description:
            'Track your cooking journey, earn badges, and watch your skills improve with every dish.',
    },
];

export default function OnboardingScreen({ navigation }: any) {
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<FlatList>(null);

    const goNext = () => {
        if (activeIndex < SLIDES.length - 1) {
            const next = activeIndex + 1;
            listRef.current?.scrollToIndex({ index: next, animated: true });
            setActiveIndex(next);
        } else {
            navigation.replace('Login');
        }
    };

    const goSkip = () => {
        navigation.replace('Login');
    };

    const renderSlide = ({ item }: { item: Slide }) => (
        <View style={styles.slide}>
            {/* Dark illustration card */}
            <View style={styles.illustrationCard}>
                {/* User bubble */}
                <View style={styles.userBubble}>
                    <Text style={styles.bubbleTag}>{item.tag}</Text>
                    <Text style={styles.bubbleText}>{item.userBubble}</Text>
                </View>

                {/* AI reply bubble */}
                <View style={styles.aiBubble}>
                    <Text style={styles.aiTag}>CHEFMENTOR</Text>
                    <Text style={styles.aiText}>{item.aiBubble}</Text>
                </View>

                {/* Background emoji */}
                <Text style={styles.bgEmoji}>{item.emoji}</Text>
            </View>

            {/* Headline */}
            <Text style={styles.heading}>
                {item.title}{' '}
                <Text style={styles.headingAccent}>{item.titleAccent}</Text>
            </Text>

            {/* Description */}
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Skip */}
            <TouchableOpacity style={styles.skipBtn} onPress={goSkip} activeOpacity={0.7}>
                <Text style={styles.skipLabel}>Skip</Text>
            </TouchableOpacity>

            {/* Slide list */}
            <FlatList
                ref={listRef}
                data={SLIDES}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
                    setActiveIndex(idx);
                }}
                style={{ flex: 1 }}
            />

            {/* Bottom bar: dots + Next button */}
            <View style={styles.bottomBar}>
                {/* Dots */}
                <View style={styles.dotRow}>
                    {SLIDES.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                i === activeIndex ? styles.dotActive : styles.dotInactive,
                            ]}
                        />
                    ))}
                </View>

                {/* Next / Get Started */}
                <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.85}>
                    <Text style={styles.nextLabel}>
                        {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                    <Text style={styles.nextArrow}>→</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

/* ─── Styles ─────────────────────────────────────────── */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    /* Skip */
    skipBtn: {
        position: 'absolute',
        top: 56,
        right: 20,
        zIndex: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    skipLabel: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: Typography.fontSize.base,
        fontWeight: '600',
        color: Colors.brand.orange,
    },

    /* Slide */
    slide: {
        width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing[6],
    },

    /* Illustration card */
    illustrationCard: {
        width: width - 80,
        height: 340,
        borderRadius: BorderRadius['2xl'],
        backgroundColor: '#2D4A3E',
        marginBottom: 32,
        padding: 20,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    bgEmoji: {
        fontSize: 60,
        position: 'absolute',
        bottom: 16,
        right: 16,
        opacity: 0.2,
    },

    /* User bubble */
    userBubble: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: 14,
        maxWidth: '72%',
        marginBottom: 14,
        ...Shadows.sm,
    },
    bubbleTag: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: 10,
        fontWeight: '600',
        color: Colors.textSub,
        letterSpacing: 1,
        marginBottom: 4,
    },
    bubbleText: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize.base,
        fontWeight: '700',
        color: Colors.textMain,
    },

    /* AI bubble */
    aiBubble: {
        backgroundColor: Colors.brand.orange,
        borderRadius: BorderRadius.lg,
        padding: 14,
        maxWidth: '78%',
        alignSelf: 'flex-end',
    },
    aiTag: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
        marginBottom: 4,
    },
    aiText: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.sm,
        color: Colors.white,
        lineHeight: 20,
    },

    /* Heading */
    heading: {
        fontFamily: 'DMSans-Bold',
        fontSize: Typography.fontSize['3xl'],
        fontWeight: '700',
        color: Colors.textMain,
        textAlign: 'center',
        marginBottom: 12,
    },
    headingAccent: {
        color: Colors.brand.orange,
        textDecorationLine: 'underline',
        textDecorationColor: Colors.brand.orange,
    },

    /* Description */
    description: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.base,
        color: Colors.textSub,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 300,
    },

    /* Bottom bar */
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing[6],
        paddingBottom: 40,
        paddingTop: 16,
    },
    dotRow: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    dotActive: {
        width: 24,
        backgroundColor: Colors.brand.orange,
    },
    dotInactive: {
        width: 8,
        backgroundColor: Colors.neutral[300],
    },

    /* Next button */
    nextBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.brand.orange,
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: BorderRadius.full,
        gap: 8,
        ...Shadows.glow,
    },
    nextLabel: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: Typography.fontSize.base,
        fontWeight: '600',
        color: Colors.white,
    },
    nextArrow: {
        fontSize: 16,
        color: Colors.white,
    },
});