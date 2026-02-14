import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading assets/fonts
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1f56e0" />
      </View>
    );
  }

  return <AppNavigator />;
}
