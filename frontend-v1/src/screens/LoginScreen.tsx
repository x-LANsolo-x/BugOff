import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useAuthStore } from '../stores/authStore';
import { apiClient } from '../services/apiClient';

// Complete auth session if app was opened from a link
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {
  const { setUser, setDemo } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleClientId,
    // Add these if you have specific platform IDs
    // iosClientId: '...',
    // androidClientId: '...',
  });

  // Listen for auth state changes to trigger navigation
  useEffect(() => {
    if (useAuthStore.getState().isAuthenticated) {
      navigation.replace('MainTabs');
    }
  }, [useAuthStore.getState().isAuthenticated]);

  useEffect(() => {
    handleGoogleResponse();
  }, [response]);

  const handleGoogleResponse = async () => {
    console.log('🔔 Google Auth Response:', JSON.stringify(response, null, 2));

    if (response?.type === 'success') {
      // Try to get id_token from params (implicit) or authentication object (PKCE)
      const id_token = response.params?.id_token || response.authentication?.idToken;

      if (!id_token) {
        console.error('❌ No ID Token found in response');
        Alert.alert('Sign-In Error', 'Could not retrieve ID Token from Google.');
        return;
      }

      setIsLoading(true);
      try {
        console.log('🔐 Google ID Token received, exchanging with backend...');

        // 1. Exchange ID token for backend access token
        const authRes = await apiClient.post('/auth/google', { id_token });
        const { access_token, refresh_token } = authRes.data;

        console.log('✅ Backend tokens received, fetching user profile...');

        // 2. Fetch full user profile
        // Temporarily set bearer token for this request
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        try {
          const userRes = await apiClient.get('/users/me');
          const userData = userRes.data;

          console.log('👤 User profile fetched:', userData.email);

          // 3. Update global auth store
          // Map backend user to frontend User interface
          // Note: Backend 'role' is not in frontend User interface, checking if skillLevel exists
          const user = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            skillLevel: userData.profile?.cooking_habits?.skill_level || 'beginner',
            createdAt: userData.created_at,
            photoUrl: userData.profile?.avatar_url // if available
          };

          await setUser(user, access_token, refresh_token);
          console.log('💾 Auth store updated');

        } catch (profileError) {
          console.error('❌ Profile fetch failed:', profileError);
          Alert.alert('Login Error', 'Failed to fetch user profile.');
        }

      } catch (error: any) {
        console.error('❌ Login failed:', error);
        Alert.alert(
          'Login Failed',
          error.response?.data?.detail || 'Could not connect to server. Please try again.'
        );
        // Reset auth header just in case
        delete apiClient.defaults.headers.common['Authorization'];
      } finally {
        setIsLoading(false);
      }
    } else if (response?.type === 'error') {
      Alert.alert('Sign-In Error', 'Google Sign-In failed.');
    }
  };

  const handleDemoLogin = () => {
    setDemo();
    navigation.replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo / Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>👨‍🍳</Text>
          <Text style={styles.title}>ChefMentor X</Text>
          <Text style={styles.subtitle}>Your AI Cooking Companion</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={() => promptAsync()}
            disabled={!request || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.textMain} />
            ) : (
              <>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleText}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.demoBtn}
            onPress={handleDemoLogin}
            disabled={isLoading}
          >
            <Text style={styles.demoText}>Try Demo Mode</Text>
            <Text style={styles.demoArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          By signing in, you agree to our Terms & Privacy Policy.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.brand.orange, // Orange background
  },
  content: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    marginTop: 120, // Top spacing
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: Spacing[8],
    paddingTop: 60,
    alignItems: 'center',
    ...Shadows.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
    backgroundColor: Colors.brand.peach,
    padding: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.brand.peachLight,
    ...Shadows.sm,
  },
  title: {
    fontFamily: 'DMSans-Bold',
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'DMSans',
    fontSize: Typography.fontSize.base,
    color: Colors.textSub,
  },
  actions: {
    width: '100%',
    gap: 16,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    ...Shadows.base,
    gap: 12,
  },
  googleIcon: {
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
    color: Colors.textMain,
  },
  googleText: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: Typography.fontSize.base,
    color: Colors.textMain,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral[200],
  },
  orText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    color: Colors.neutral[400],
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral[100],
    paddingVertical: 16,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 8,
  },
  demoText: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: Typography.fontSize.base,
    color: Colors.textMain,
    fontWeight: '600',
  },
  demoArrow: {
    fontSize: 18,
    color: Colors.textMain,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 40,
    fontFamily: 'DMSans',
    fontSize: 11,
    color: Colors.neutral[400],
    textAlign: 'center',
  },
});
