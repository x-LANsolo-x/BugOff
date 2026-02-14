/**
 * ChefMentor X – Splash / Landing Screen
 * Matches stitch design: chefmentor_x_splash_screen_1
 *
 * Layout: Orange chef-hat logo, "ChefMentor X" title,
 * Learn/Cook/Share pills, food emoji grid,
 * glass-panel CTA section (Try Demo + Sign in with Google).
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useAuthStore } from '../stores/authStore';

const { width } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
    const setDemo = useAuthStore((s) => s.setDemo);

    const handleDemo = () => {
        setDemo();
        navigation.replace('MainTabs');
    };

    const handleSignIn = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Decorative background blobs */}
            <View style={styles.blobTopRight} />
            <View style={styles.blobBottomLeft} />

            {/* ── Top Section: Logo + Title + Food Grid ── */}
            <View style={styles.topSection}>
                {/* Chef Hat Logo */}
                <View style={styles.logoWrapper}>
                    <View style={styles.logoGlow} />
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoEmoji}>👨‍🍳</Text>
                    </View>
                    {/* Floating food accent – top right */}
                    <View style={styles.floatingRight}>
                        <Text style={{ fontSize: 20 }}>🥕</Text>
                    </View>
                    {/* Floating fire accent – bottom left */}
                    <View style={styles.floatingLeft}>
                        <Text style={{ fontSize: 16 }}>🔥</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>
                    ChefMentor <Text style={styles.titleX}>X</Text>
                </Text>
                <Text style={styles.subtitle}>Your AI Cooking Coach</Text>

                {/* Learn / Cook / Share pills */}
                <View style={styles.pillRow}>
                    {['Learn', 'Cook', 'Share'].map((label) => (
                        <View key={label} style={styles.pill}>
                            <Text style={styles.pillLabel}>{label}</Text>
                        </View>
                    ))}
                </View>

                {/* Food emoji collage (2-column staggered grid) */}
                <View style={styles.foodGrid}>
                    <View style={styles.gridColLeft}>
                        <View style={[styles.foodCard, { height: 125, backgroundColor: '#D4EDE3' }]}>
                            <Text style={{ fontSize: 46 }}>🥗</Text>
                        </View>
                        <View style={[styles.foodCard, { height: 95, backgroundColor: '#E8F5E0' }]}>
                            <Text style={{ fontSize: 40 }}>🥑</Text>
                        </View>
                    </View>
                    <View style={styles.gridColRight}>
                        <View style={[styles.foodCard, { height: 95, backgroundColor: '#FFF0E0' }]}>
                            <Text style={{ fontSize: 40 }}>🍕</Text>
                        </View>
                        <View style={[styles.foodCard, { height: 125, backgroundColor: '#E0E8E5' }]}>
                            <Text style={{ fontSize: 46 }}>🥦</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* ── Bottom CTA Glass Panel ── */}
            <View style={styles.ctaPanel}>
                {/* Primary CTA – Demo */}
                <TouchableOpacity style={styles.demoCta} onPress={handleDemo} activeOpacity={0.85}>
                    <Text style={styles.demoCtaLabel}>Try Demo Mode</Text>
                    <Text style={styles.demoCtaArrow}>→</Text>
                </TouchableOpacity>

                {/* Secondary CTA – Google */}
                <TouchableOpacity style={styles.googleCta} onPress={handleSignIn} activeOpacity={0.85}>
                    <Text style={styles.googleG}>G</Text>
                    <Text style={styles.googleLabel}>Sign in with Google</Text>
                </TouchableOpacity>

                {/* Terms */}
                <Text style={styles.terms}>
                    By continuing, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text> &{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
            </View>
        </View>
    );
}

/* ─── Styles ─────────────────────────────────────────── */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.brand.peachLight,
    },

    /* Background blobs */
    blobTopRight: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255,107,74,0.15)',
    },
    blobBottomLeft: {
        position: 'absolute',
        bottom: 120,
        left: -100,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(107,143,113,0.10)',
    },

    /* Top section */
    topSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing[6],
        paddingTop: 56,
    },

    /* Logo */
    logoWrapper: {
        marginBottom: 18,
        position: 'relative',
    },
    logoGlow: {
        position: 'absolute',
        top: -20,
        left: -20,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(255,107,74,0.18)',
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
    logoEmoji: { fontSize: 48 },
    floatingRight: {
        position: 'absolute',
        top: -12,
        right: -22,
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '12deg' }],
        ...Shadows.base,
    },
    floatingLeft: {
        position: 'absolute',
        bottom: -6,
        left: -22,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-12deg' }],
        ...Shadows.base,
    },

    /* Title */
    title: {
        fontFamily: 'DMSans-Bold',
        fontSize: 36,
        fontWeight: '800',
        color: Colors.textMain,
        letterSpacing: -0.5,
    },
    titleX: {
        color: Colors.brand.orange,
    },
    subtitle: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.lg,
        fontWeight: '500',
        color: Colors.textSub,
        marginTop: 4,
    },

    /* Pills */
    pillRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 18,
    },
    pill: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.neutral[200],
    },
    pillLabel: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: Typography.fontSize.xs,
        fontWeight: '600',
        color: Colors.neutral[600],
    },

    /* Food grid */
    foodGrid: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 24,
        width: '82%',
        opacity: 0.85,
        transform: [{ rotate: '2deg' }],
    },
    gridColLeft: {
        flex: 1,
        gap: 10,
        paddingTop: 28,
    },
    gridColRight: {
        flex: 1,
        gap: 10,
    },
    foodCard: {
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.base,
    },

    /* CTA panel */
    ctaPanel: {
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderTopLeftRadius: BorderRadius['3xl'],
        borderTopRightRadius: BorderRadius['3xl'],
        paddingHorizontal: Spacing[6],
        paddingTop: Spacing[6],
        paddingBottom: 40,
        ...Shadows.lg,
    },
    demoCta: {
        backgroundColor: Colors.brand.orange,
        paddingVertical: 16,
        borderRadius: BorderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...Shadows.glow,
    },
    demoCtaLabel: {
        fontFamily: 'DMSans-Bold',
        color: Colors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: '700',
    },
    demoCtaArrow: {
        color: Colors.white,
        fontSize: 20,
    },
    googleCta: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        borderRadius: BorderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 2,
        borderColor: Colors.neutral[200],
        marginTop: 12,
    },
    googleG: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textMain,
    },
    googleLabel: {
        fontFamily: 'DMSans-SemiBold',
        color: Colors.textMain,
        fontSize: Typography.fontSize.base,
        fontWeight: '600',
    },
    terms: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.xs,
        color: Colors.textSub,
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 18,
    },
    termsLink: {
        color: Colors.textMain,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});