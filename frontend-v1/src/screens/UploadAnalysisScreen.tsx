/**
 * ChefMentor X – Upload Analysis Screen
 *
 * Stitch ref: chefmentor_x_upload_analysis
 * Features:
 *  - Header with back button + "Analyze Failed Dish" title
 *  - 3-step progress bar
 *  - Dashed upload area with camera icon
 *  - "Take Photo Now" (sage) + "Choose from Gallery" (outline) buttons
 *  - Tips for AI Analysis card (3 tips with icons)
 */

import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useAnalysisStore } from '../stores';

const TIPS = [
    { icon: '💡', title: 'Good Lighting', desc: 'Ensure the dish is well-lit so textures are visible.', bg: '#FEF9C3' },
    { icon: '📐', title: 'Show Whole Dish', desc: 'Frame the entire plate or pot within the photo.', bg: '#DBEAFE' },
    { icon: '🎯', title: 'Clear Image', desc: 'Avoid blurriness to help identify ingredients.', bg: '#F3E8FF' },
];

export default function UploadAnalysisScreen({ navigation }: any) {
    const fadeIn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    const handleTakePhoto = () => {
        // Placeholder: in production use expo-camera
        useAnalysisStore.getState().setImage('demo-photo-uri');
        navigation.navigate('ContextQuestions');
    };

    const handleChooseGallery = () => {
        // Placeholder: in production use expo-image-picker
        useAnalysisStore.getState().setImage('demo-gallery-uri');
        navigation.navigate('ContextQuestions');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                    accessibilityLabel="Go back"
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Analyze Failed Dish</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressRow}>
                <View style={[styles.progressBar, styles.progressActive]} />
                <View style={styles.progressBar} />
                <View style={styles.progressBar} />
            </View>

            <Animated.ScrollView
                style={{ opacity: fadeIn }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.subtitle}>
                    Upload a photo of your culinary attempt. Our AI will analyze what went wrong and how to fix it next time.
                </Text>

                {/* Upload area */}
                <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={handleChooseGallery}
                    activeOpacity={0.85}
                    accessibilityLabel="Tap to upload photo"
                >
                    <View style={styles.uploadIconCircle}>
                        <Text style={{ fontSize: 40 }}>📸</Text>
                    </View>
                    <Text style={styles.uploadTitle}>Tap to Upload</Text>
                    <Text style={styles.uploadSub}>Supports JPG, PNG, HEIC up to 10MB</Text>
                </TouchableOpacity>

                {/* Action buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.takePhotoBtn}
                        onPress={handleTakePhoto}
                        activeOpacity={0.85}
                        accessibilityRole="button"
                    >
                        <Text style={{ fontSize: 20 }}>📷</Text>
                        <Text style={styles.takePhotoText}>Take Photo Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.galleryBtn}
                        onPress={handleChooseGallery}
                        activeOpacity={0.85}
                        accessibilityRole="button"
                    >
                        <Text style={{ fontSize: 20 }}>🖼️</Text>
                        <Text style={styles.galleryText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>

                {/* Tips */}
                <View style={styles.tipsCard}>
                    <Text style={styles.tipsTitle}>TIPS FOR AI ANALYSIS</Text>
                    {TIPS.map((tip) => (
                        <View key={tip.title} style={styles.tipRow}>
                            <View style={[styles.tipIcon, { backgroundColor: tip.bg }]}>
                                <Text style={{ fontSize: 18 }}>{tip.icon}</Text>
                            </View>
                            <View style={styles.tipContent}>
                                <Text style={styles.tipTitle}>{tip.title}</Text>
                                <Text style={styles.tipDesc}>{tip.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.neutral[50] },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing[6],
        paddingVertical: Spacing[3],
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing[2],
    },
    backIcon: { fontSize: 22, color: Colors.neutral[800] },
    headerTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
    },

    // Progress
    progressRow: {
        flexDirection: 'row',
        paddingHorizontal: Spacing[6],
        gap: 6,
        marginBottom: Spacing[4],
    },
    progressBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.neutral[200],
    },
    progressActive: { backgroundColor: Colors.brand.orange },

    // Scroll
    scrollContent: {
        paddingHorizontal: Spacing[6],
        paddingBottom: 40,
    },
    subtitle: {
        fontSize: Typography.fontSize.sm,
        color: Colors.neutral[500],
        marginBottom: Spacing[6],
        lineHeight: 20,
    },

    // Upload area
    uploadArea: {
        width: '100%',
        aspectRatio: 4 / 5,
        borderRadius: 24,
        borderWidth: 3,
        borderStyle: 'dashed',
        borderColor: Colors.brand.orange,
        backgroundColor: '#FFF7ED',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing[8],
    },
    uploadIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing[4],
        ...Shadows.sm,
    },
    uploadTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.brand.orange,
        marginBottom: Spacing[2],
    },
    uploadSub: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[500],
    },

    // Actions
    actions: { gap: 12, marginBottom: Spacing[8] },
    takePhotoBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 16,
        borderRadius: BorderRadius.xl,
        backgroundColor: '#8BA88E',
        ...Shadows.md,
    },
    takePhotoText: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.white,
    },
    galleryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 16,
        borderRadius: BorderRadius.xl,
        borderWidth: 2,
        borderColor: Colors.brand.orange,
        backgroundColor: 'transparent',
    },
    galleryText: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.brand.orange,
    },

    // Tips
    tipsCard: {
        backgroundColor: Colors.neutral[50],
        borderRadius: BorderRadius.lg + 4,
        padding: Spacing[5],
        borderWidth: 1,
        borderColor: Colors.neutral[100],
    },
    tipsTitle: {
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
        letterSpacing: 1,
        marginBottom: Spacing[4],
    },
    tipRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
        marginBottom: 14,
    },
    tipIcon: {
        width: 36,
        height: 36,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipContent: { flex: 1 },
    tipTitle: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
        color: Colors.neutral[900],
        marginBottom: 2,
    },
    tipDesc: {
        fontSize: Typography.fontSize.xs,
        color: Colors.neutral[500],
        lineHeight: 16,
    },
});
