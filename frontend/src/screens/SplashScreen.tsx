/**
 * ChefMentor X – Splash Screen
 *
 * Stitch ref: chefmentor_x_splash_screen_1
 * Features:
 *  - Animated floating logo with food emoji badges
 *  - Gradient glow background blurs
 *  - "Learn · Cook · Share" tag pills
 *  - "Try Demo Mode" primary CTA
 *  - "Sign in with Google" secondary CTA
 *  - Auto-redirect if already authenticated
 */

import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Button } from '../components';
import { useAuthStore } from '../stores';

const { width: SCREEN_W } = Dimensions.get('window');

// Google "G" SVG as a small PNG data URI is not practical in RN,
// so we use a text fallback.
const GoogleIcon = () => (
    <View style={gStyles.googleIcon}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>G</Text>
    </View>
);

export default function SplashScreen({ navigation }: any) {
    const { isAuthenticated } = useAuthStore();

    // ─── Animations ────────────────────────────
    const floatY = useRef(new Animated.Value(0)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        // Floating logo
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatY, { toValue: -15, duration: 3000, useNativeDriver: true }),
                Animated.timing(floatY, { toValue: 0, duration: 3000, useNativeDriver: true }),
            ])
        ).start();

        // Fade in content
        Animated.parallel([
            Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideUp, { toValue: 0, duration: 800, useNativeDriver: true }),
        ]).start();
    }, []);

    // Auto-redirect
    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('MainTabs');
        }
    }, [isAuthenticated]);

    const handleDemo = () => {
        useAuthStore.getState().setDemo();
        navigation.replace('MainTabs');
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {/* Background gradient blurs */}
            <View style={styles.bgBlur1} />
            <View style={styles.bgBlur2} />
            <View style={styles.bgBlur3} />

            <SafeAreaView style={styles.safeArea}>
                {/* ─── Logo & Branding ─────────────────── */}
                <View style={styles.center}>
                    <Animated.View
                        style={[styles.logoWrap, { transform: [{ translateY: floatY }] }]}
                    >
                        {/* Glow behind logo */}
                        <View style={styles.logoGlow} />

                        {/* Main logo circle */}
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoEmoji}>👨‍🍳</Text>
                        </View>

                        {/* Floating food badges */}
                        <View style={styles.badge1}>
                            <Text style={styles.badgeEmoji}>🥕</Text>
                        </View>
                        <View style={styles.badge2}>
                            <Text style={styles.badgeEmoji}>🔥</Text>
                        </View>
                    </Animated.View>

                    {/* Title */}
                    <Animated.View style={[styles.titleBlock, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
                        <Text style={styles.title}>
                            ChefMentor <Text style={styles.titleAccent}>X</Text>
                        </Text>
                        <Text style={styles.subtitle}>Your AI Cooking Coach</Text>

                        {/* Tag pills */}
                        <View style={styles.pillRow}>
                            {['Learn', 'Cook', 'Share'].map((label) => (
                                <View key={label} style={styles.pill}>
                                    <Text style={styles.pillText}>{label}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                </View>

                {/* ─── CTAs ────────────────────────────── */}
                <Animated.View style={[styles.ctaPanel, { opacity: fadeIn }]}>
                    <View style={styles.ctaGlass}>
                        <Button
                            title="Try Demo Mode"
                            onPress={handleDemo}
                            variant="primary"
                            size="lg"
                            icon={<Text style={{ color: '#fff', fontSize: 18 }}>→</Text>}
                            iconPosition="right"
                        />

                        <TouchableOpacity
                            style={styles.googleBtn}
                            onPress={handleLogin}
                            activeOpacity={0.85}
                            accessibilityRole="button"
                            accessibilityLabel="Sign in with Google"
                        >
                            <GoogleIcon />
                            <Text style={styles.googleText}>Sign in with Google</Text>
                        </TouchableOpacity>

                        <Text style={styles.legal}>
                            By continuing, you agree to our{' '}
                            <Text style={styles.legalLink}>Terms of Service</Text> &{' '}
                            <Text style={styles.legalLink}>Privacy Policy</Text>
                        </Text>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
}

// ─── Styles ────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.brand.peach,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: Spacing[6],
    },

    // Background blurs
    bgBlur1: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255,107,74,0.2)',
        opacity: 0.4,
    },
    bgBlur2: {
        position: 'absolute',
        top: '40%',
        left: -100,
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: 'rgba(167,243,208,0.3)',
        opacity: 0.4,
    },
    bgBlur3: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(254,240,138,0.25)',
        opacity: 0.3,
    },

    // Center content
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },

    // Logo
    logoWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing[8],
    },
    logoGlow: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255,107,74,0.2)',
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.brand.orange,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: Colors.white,
        ...Shadows.lg,
    },
    logoEmoji: {
        fontSize: 56,
    },
    badge1: {
        position: 'absolute',
        top: -12,
        right: -12,
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '12deg' }],
        ...Shadows.md,
    },
    badge2: {
        position: 'absolute',
        bottom: -4,
        left: -20,
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-12deg' }],
        ...Shadows.md,
    },
    badgeEmoji: { fontSize: 20 },

    // Title
    titleBlock: { alignItems: 'center' },
    title: {
        fontSize: Typography.fontSize['4xl'],
        fontWeight: Typography.fontWeight.extrabold,
        color: Colors.neutral[900],
        letterSpacing: -0.5,
    },
    titleAccent: {
        color: Colors.brand.orange,
    },
    subtitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.neutral[500],
        marginTop: Spacing[1],
    },
    pillRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: Spacing[6],
    },
    pill: {
        paddingHorizontal: Spacing[3],
        paddingVertical: Spacing[1],
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.neutral[200],
    },
    pillText: {
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[600],
    },

    // CTA Panel
    ctaPanel: {
        paddingBottom: Spacing[8],
    },
    ctaGlass: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 28,
        padding: Spacing[6],
        ...Shadows.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        gap: 12,
    },

    // Google button
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingVertical: 16,
        borderRadius: BorderRadius.xl,
        borderWidth: 2,
        borderColor: Colors.neutral[200],
        backgroundColor: 'transparent',
    },
    googleText: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[800],
    },

    // Legal
    legal: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[500],
        textAlign: 'center',
        marginTop: Spacing[2],
    },
    legalLink: {
        textDecorationLine: 'underline',
        color: Colors.neutral[700],
    },
});

const gStyles = StyleSheet.create({
    googleIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
