/**
 * ChefMentor X – Permissions Screen
 *
 * Requests camera, microphone, and notification permissions
 * before entering the main app. Shows friendly explanations
 * for why each permission is needed.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Alert,
    Platform,
    Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { Colors, Typography, BorderRadius, Shadows } from '../constants/theme';

const { width: SCREEN_W } = Dimensions.get('window');

const PERMISSIONS = [
    {
        id: 'camera',
        emoji: '📸',
        title: 'Camera Access',
        desc: 'Take photos of your dishes for AI analysis and failure diagnosis.',
        required: true,
    },
    {
        id: 'mic',
        emoji: '🎤',
        title: 'Microphone Access',
        desc: 'Hands-free voice commands while cooking — the core of ChefMentor X.',
        required: true,
    },
    {
        id: 'notifications',
        emoji: '🔔',
        title: 'Notifications',
        desc: 'Timer alerts and cooking reminders so nothing burns.',
        required: false,
    },
];

export default function PermissionsScreen({ navigation }: any) {
    const [granted, setGranted] = useState<Record<string, boolean>>({});
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    const requestCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setGranted((g) => ({ ...g, camera: status === 'granted' }));
        return status === 'granted';
    };

    const requestMic = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        setGranted((g) => ({ ...g, mic: status === 'granted' }));
        return status === 'granted';
    };

    const requestNotifications = async () => {
        // Notifications permission varies by platform
        setGranted((g) => ({ ...g, notifications: true }));
        return true;
    };

    const requestPermission = async (id: string) => {
        switch (id) {
            case 'camera': return requestCamera();
            case 'mic': return requestMic();
            case 'notifications': return requestNotifications();
        }
    };

    const handleRequestAll = async () => {
        await requestCamera();
        await requestMic();
        await requestNotifications();
    };

    const allRequiredGranted =
        granted['camera'] && granted['mic'];

    const handleContinue = () => {
        if (!allRequiredGranted) {
            Alert.alert(
                'Permissions Required',
                'Camera and Microphone are needed for the core cooking experience. You can enable them later in Settings.',
                [
                    { text: 'Skip Anyway', onPress: () => navigation.navigate('SkillLevel'), style: 'cancel' },
                    { text: 'Grant', onPress: handleRequestAll },
                ]
            );
            return;
        }
        navigation.navigate('SkillLevel');
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.emoji}>🔐</Text>
                <Text style={styles.title}>Quick Setup</Text>
                <Text style={styles.subtitle}>
                    ChefMentor X needs a few permissions for the best cooking experience.
                </Text>
            </View>

            {/* Permission Cards */}
            <View style={styles.cards}>
                {PERMISSIONS.map((perm) => (
                    <TouchableOpacity
                        key={perm.id}
                        style={[
                            styles.card,
                            granted[perm.id] && styles.cardGranted,
                        ]}
                        onPress={() => requestPermission(perm.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.cardLeft}>
                            <Text style={styles.cardEmoji}>{perm.emoji}</Text>
                            <View style={styles.cardText}>
                                <Text style={styles.cardTitle}>
                                    {perm.title}
                                    {!perm.required && (
                                        <Text style={styles.optional}> (optional)</Text>
                                    )}
                                </Text>
                                <Text style={styles.cardDesc}>{perm.desc}</Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.statusBadge,
                                granted[perm.id] ? styles.badgeGranted : styles.badgePending,
                            ]}
                        >
                            <Text style={styles.badgeText}>
                                {granted[perm.id] ? '✓' : 'TAP'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Continue Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.continueBtn, allRequiredGranted && styles.continueBtnActive]}
                    onPress={handleContinue}
                    activeOpacity={0.8}
                >
                    <Text style={styles.continueBtnText}>
                        {allRequiredGranted ? 'Continue →' : 'Continue Anyway →'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.footerNote}>
                    You can change these anytime in Settings
                </Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.neutral[50],
        paddingHorizontal: 24,
        paddingTop: 80,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    title: {
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: Typography.fontSize['2xl'],
        fontWeight: '700',
        color: Colors.textMain,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.base,
        color: Colors.textSub,
        textAlign: 'center',
        lineHeight: 22,
    },

    cards: { gap: 12 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: BorderRadius.lg,
        borderWidth: 1.5,
        borderColor: Colors.neutral[200],
        ...Shadows.md,
    },
    cardGranted: {
        borderColor: '#34D399',
        backgroundColor: '#F0FDF4',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    cardEmoji: { fontSize: 28 },
    cardText: { flex: 1 },
    cardTitle: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: Typography.fontSize.base,
        fontWeight: '600',
        color: Colors.textMain,
    },
    optional: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.xs,
        fontWeight: '400',
        color: Colors.neutral[400],
    },
    cardDesc: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.sm,
        color: Colors.textSub,
        marginTop: 2,
        lineHeight: 18,
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: BorderRadius.full,
        marginLeft: 8,
    },
    badgePending: {
        backgroundColor: Colors.neutral[100],
    },
    badgeGranted: {
        backgroundColor: '#34D399',
    },
    badgeText: {
        fontFamily: 'DMSans-Bold',
        fontSize: 11,
        fontWeight: '700',
        color: Colors.textMain,
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
    footerNote: {
        fontFamily: 'DMSans',
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[400],
        textAlign: 'center',
        marginTop: 12,
    },
});
