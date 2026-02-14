/**
 * ChefMentor X – Screen Exports
 *
 * Real implementations for P1 + P2 + P3 screens, placeholders for the rest.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';

// ─── Real Screens ──────────────────────────────────

// P1
export { default as SplashScreen } from './SplashScreen';
export { default as LoginScreen } from './LoginScreen';
export { default as RecipeListScreen } from './RecipeListScreen';

// P2
export { default as RecipeDetailsScreen } from './RecipeDetailsScreen';
export { default as LiveCookingScreen } from './LiveCookingScreen';
export { default as CompletionScreen } from './CompletionScreen';

// P3
export { default as UploadAnalysisScreen } from './UploadAnalysisScreen';
export { default as AnalysisLoadingScreen } from './AnalysisLoadingScreen';
export { default as DiagnosisResultScreen } from './DiagnosisResultScreen';

// ─── Placeholder factory ───────────────────────────

const createPlaceholder = (name: string, emoji: string) => {
    const Screen = () => (
        <View style= { styles.container } >
        <Text style={ styles.emoji }> { emoji } </Text>
            < Text style = { styles.title } > { name } </Text>
                < Text style = { styles.subtitle } > Coming soon </Text>
                    </View>
    );
Screen.displayName = name.replace(/\s/g, '');
return Screen;
};

// Auth flow
export const OnboardingScreen = createPlaceholder('Onboarding', '👋');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.neutral[50],
        padding: Spacing[8],
    },
    emoji: { fontSize: 64, marginBottom: Spacing[4] },
    title: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: Colors.neutral[900],
        marginBottom: Spacing[2],
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        color: Colors.neutral[500],
    },
});
