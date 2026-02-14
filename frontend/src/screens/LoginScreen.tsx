/**
 * ChefMentor X – Login Screen
 *
 * Stitch ref: chefmentor_x_login
 * Features:
 *  - Back button
 *  - App icon with glow shadow
 *  - "Welcome Back" heading
 *  - Google OAuth + Apple sign-in buttons
 *  - "Continue as Guest" (demo mode)
 *  - Fade-in-up stagger animations
 */

import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useAuthStore } from '../stores';

export default function LoginScreen({ navigation }: any) {
    // Stagger animations
    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;
    const anim3 = useRef(new Animated.Value(0)).current;
    const slide1 = useRef(new Animated.Value(20)).current;
    const slide2 = useRef(new Animated.Value(20)).current;
    const slide3 = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        const createAnim = (opacity: Animated.Value, translateY: Animated.Value, delay: number) =>
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 600, delay, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 600, delay, useNativeDriver: true }),
            ]);

        Animated.stagger(100, [
            createAnim(anim1, slide1, 0),
            createAnim(anim2, slide2, 100),
            createAnim(anim3, slide3, 200),
        ]).start();
    }, []);

    const handleGoogleLogin = () => {
        // Placeholder: In production, use expo-auth-session for Google OAuth
        useAuthStore.getState().setUser(
            {
                id: 'google-user-1',
                email: 'user@gmail.com',
                displayName: 'Chef User',
                skillLevel: 'beginner',
                createdAt: new Date().toISOString(),
            },
            'auth-token-placeholder'
        );
        navigation.replace('MainTabs');
    };

    const handleGuestMode = () => {
        useAuthStore.getState().setDemo();
        navigation.replace('MainTabs');
    };

    return (
        <View style={styles.container}>
            {/* Decorative blur */}
            <View style={styles.decorBlur} />

            <SafeAreaView style={styles.safeArea}>
                {/* Back button */}
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                    accessibilityLabel="Go back"
                    accessibilityRole="button"
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>

                {/* Main content */}
                <View style={styles.content}>
                    {/* Logo */}
                    <Animated.View style={[styles.logoWrap, { opacity: anim1, transform: [{ translateY: slide1 }] }]}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoEmoji}>🍽️</Text>
                        </View>
                    </Animated.View>

                    {/* Heading */}
                    <Animated.View style={[styles.headingWrap, { opacity: anim1, transform: [{ translateY: slide1 }] }]}>
                        <Text style={styles.heading}>Welcome Back</Text>
                        <Text style={styles.subheading}>
                            Sign in to access your{'\n'}cooking journey
                        </Text>
                    </Animated.View>

                    {/* Auth buttons */}
                    <Animated.View style={[styles.authButtons, { opacity: anim2, transform: [{ translateY: slide2 }] }]}>
                        {/* Google */}
                        <TouchableOpacity
                            style={styles.googleBtn}
                            onPress={handleGoogleLogin}
                            activeOpacity={0.85}
                            accessibilityRole="button"
                            accessibilityLabel="Continue with Google"
                        >
                            <View style={styles.gIcon}>
                                <Text style={styles.gIconText}>G</Text>
                            </View>
                            <Text style={styles.authBtnText}>Continue with Google</Text>
                        </TouchableOpacity>

                        {/* Apple */}
                        <TouchableOpacity
                            style={styles.appleBtn}
                            onPress={() => { }}
                            activeOpacity={0.85}
                            accessibilityRole="button"
                            accessibilityLabel="Continue with Apple"
                        >
                            <Text style={styles.appleIcon}>🍎</Text>
                            <Text style={styles.appleBtnText}>Continue with Apple</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Divider */}
                    <Animated.View style={[styles.dividerRow, { opacity: anim3, transform: [{ translateY: slide3 }] }]}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </Animated.View>

                    {/* Guest mode */}
                    <Animated.View style={[styles.guestWrap, { opacity: anim3, transform: [{ translateY: slide3 }] }]}>
                        <TouchableOpacity onPress={handleGuestMode} accessibilityRole="button">
                            <Text style={styles.guestText}>Continue as Guest</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.legal}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.legalBold}>Terms</Text> &{' '}
                        <Text style={styles.legalBold}>Privacy Policy</Text>
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing[6],
    },
    decorBlur: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: Colors.brand.peach,
        opacity: 0.5,
        transform: [{ translateY: -80 }, { translateX: 60 }],
    },

    // Back
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: Colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing[2],
    },
    backIcon: {
        fontSize: 20,
        color: Colors.neutral[800],
    },

    // Content
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 60,
    },

    // Logo
    logoWrap: {
        alignItems: 'center',
        marginBottom: Spacing[10],
    },
    logoCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: Colors.brand.orange,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.glow,
    },
    logoEmoji: { fontSize: 48 },

    // Heading
    headingWrap: {
        alignItems: 'center',
        marginBottom: Spacing[10],
    },
    heading: {
        fontSize: Typography.fontSize['4xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
        marginBottom: Spacing[3],
        letterSpacing: -0.5,
    },
    subheading: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.neutral[500],
        textAlign: 'center',
        lineHeight: 26,
    },

    // Auth buttons
    authButtons: {
        gap: 12,
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        height: 56,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.neutral[200],
        borderRadius: BorderRadius.xl,
        ...Shadows.sm,
    },
    gIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gIconText: {
        fontSize: 16,
        fontWeight: Typography.fontWeight.bold,
        color: '#4285F4',
    },
    authBtnText: {
        fontSize: 17,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[900],
    },
    appleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        height: 56,
        backgroundColor: Colors.black,
        borderRadius: BorderRadius.xl,
        ...Shadows.lg,
    },
    appleIcon: { fontSize: 20 },
    appleBtnText: {
        fontSize: 17,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.white,
    },

    // Divider
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginVertical: Spacing[8],
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.neutral[200],
    },
    dividerText: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: Colors.neutral[400],
        letterSpacing: 1,
    },

    // Guest
    guestWrap: { alignItems: 'center' },
    guestText: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.brand.orange,
    },

    // Footer
    footer: {
        paddingBottom: Spacing[6],
        alignItems: 'center',
    },
    legal: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[500],
        textAlign: 'center',
    },
    legalBold: {
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[800],
        textDecorationLine: 'underline',
    },
});
