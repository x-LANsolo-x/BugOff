/**
 * ChefMentor X – App Entry Point
 * Wrapped with ErrorBoundary for debugging
 * 
 * Features:
 * - Session restoration on app launch
 * - Error boundary for crash handling
 * - Safe area support
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation';
import { useAuthStore } from './src/stores/authStore';

// Error boundary class component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crash:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={errStyles.container}>
          <Text style={errStyles.emoji}>🔴</Text>
          <Text style={errStyles.title}>App Error</Text>
          <ScrollView style={errStyles.scroll}>
            <Text style={errStyles.msg}>{this.state.error?.message}</Text>
            <Text style={errStyles.stack}>{this.state.error?.stack}</Text>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

const errStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#e94560', marginBottom: 16 },
  scroll: { flex: 1, width: '100%' },
  msg: { fontSize: 16, color: '#fff', marginBottom: 12, fontWeight: '600' },
  stack: { fontSize: 12, color: '#aaa', fontFamily: 'monospace' },
});

/**
 * Main App Component with Session Restoration
 */
function AppContent() {
  const { restoreSession, isLoading } = useAuthStore();

  useEffect(() => {
    // Restore saved session on app launch
    console.log('🚀 App starting - checking for saved session...');
    restoreSession();
  }, []);

  // Show splash screen while checking for saved session
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>ChefMentor X</Text>
      </View>
    );
  }

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppContent />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
