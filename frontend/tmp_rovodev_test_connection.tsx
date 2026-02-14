/**
 * Temporary test screen for network connectivity debugging
 * Add this to your navigation stack during development
 * 
 * Usage:
 * 1. Import in AppNavigator.tsx
 * 2. Add to stack: <Stack.Screen name="NetworkTest" component={NetworkTestScreen} />
 * 3. Navigate to it from any screen or make it initial route
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { 
    testBackendConnection, 
    getNetworkDebugInfo, 
    getConnectionInstructions,
    logNetworkConfig 
} from '../utils/networkDebug';
import { API_BASE_URL } from '../constants/config';

export default function NetworkTestScreen() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [debugInfo, setDebugInfo] = useState<any>(null);

    useEffect(() => {
        // Log config on mount
        logNetworkConfig();
        setDebugInfo(getNetworkDebugInfo());
    }, []);

    const handleTest = async () => {
        setLoading(true);
        setResult(null);

        try {
            const testResult = await testBackendConnection();
            setResult(testResult);

            if (testResult.success) {
                Alert.alert('✅ Success', testResult.message);
            } else {
                Alert.alert('❌ Connection Failed', testResult.message);
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const showInstructions = () => {
        const instructions = getConnectionInstructions();
        Alert.alert('Setup Instructions', instructions, [{ text: 'OK' }]);
    };

    return (
        <ScrollView className="flex-1 bg-gray-900 p-4">
            <View className="bg-gray-800 rounded-lg p-6 mb-4">
                <Text className="text-white text-2xl font-bold mb-4">
                    🔧 Network Test
                </Text>

                {/* Debug Info */}
                <View className="mb-4 bg-gray-700 rounded p-4">
                    <Text className="text-gray-300 font-semibold mb-2">Configuration:</Text>
                    <Text className="text-white text-xs font-mono">
                        API URL: {API_BASE_URL}
                    </Text>
                    {debugInfo && (
                        <>
                            <Text className="text-white text-xs font-mono">
                                Platform: {debugInfo.platform}
                            </Text>
                            <Text className="text-white text-xs font-mono">
                                Device: {debugInfo.deviceType}
                            </Text>
                            <Text className="text-white text-xs font-mono">
                                Environment: {debugInfo.environment}
                            </Text>
                            {debugInfo.debuggerHost && (
                                <Text className="text-white text-xs font-mono">
                                    Debugger: {debugInfo.debuggerHost}
                                </Text>
                            )}
                        </>
                    )}
                </View>

                {/* Test Button */}
                <TouchableOpacity
                    onPress={handleTest}
                    disabled={loading}
                    className="bg-blue-600 rounded-lg p-4 mb-3"
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center font-semibold">
                            Test Backend Connection
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Instructions Button */}
                <TouchableOpacity
                    onPress={showInstructions}
                    className="bg-gray-700 rounded-lg p-4"
                >
                    <Text className="text-white text-center font-semibold">
                        Show Setup Instructions
                    </Text>
                </TouchableOpacity>

                {/* Results */}
                {result && (
                    <View className={`mt-4 rounded p-4 ${result.success ? 'bg-green-900' : 'bg-red-900'}`}>
                        <Text className={`font-semibold mb-2 ${result.success ? 'text-green-300' : 'text-red-300'}`}>
                            {result.success ? '✅ Connected' : '❌ Failed'}
                        </Text>
                        <Text className="text-white text-xs mb-2">
                            {result.message}
                        </Text>
                        {result.status && (
                            <Text className="text-gray-300 text-xs">
                                Status: {result.status}
                            </Text>
                        )}
                        {result.latency && (
                            <Text className="text-gray-300 text-xs">
                                Latency: {result.latency}ms
                            </Text>
                        )}
                    </View>
                )}

                {/* Tips */}
                <View className="mt-6 bg-yellow-900 rounded p-4">
                    <Text className="text-yellow-200 font-semibold mb-2">💡 Tips:</Text>
                    <Text className="text-yellow-100 text-xs mb-1">
                        • Backend must run with --host 0.0.0.0
                    </Text>
                    <Text className="text-yellow-100 text-xs mb-1">
                        • Phone and laptop on same WiFi
                    </Text>
                    <Text className="text-yellow-100 text-xs mb-1">
                        • Check firewall allows port 8000
                    </Text>
                    <Text className="text-yellow-100 text-xs">
                        • Check backend console for server IP
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
