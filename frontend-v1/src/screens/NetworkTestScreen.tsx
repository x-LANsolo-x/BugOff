/**
 * Network Test Screen for ChefMentor X
 * 
 * Use this screen during development to verify backend connectivity.
 * 
 * Add to navigation:
 * import NetworkTestScreen from './src/screens/NetworkTestScreen';
 * <Stack.Screen name="NetworkTest" component={NetworkTestScreen} />
 */

import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    Alert, 
    ActivityIndicator,
    StyleSheet 
} from 'react-native';
import { 
    testBackendConnection, 
    getNetworkDebugInfo, 
    getConnectionInstructions,
    logNetworkConfig,
    type ConnectionTestResult,
    type NetworkDebugInfo
} from '../utils/networkDebug';
import { ENV } from '../config/env';

export default function NetworkTestScreen() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ConnectionTestResult | null>(null);
    const [debugInfo, setDebugInfo] = useState<NetworkDebugInfo | null>(null);

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
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>🔧 Network Test</Text>

                {/* Debug Info Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Configuration:</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>API URL:</Text>
                        <Text style={styles.value} numberOfLines={2}>
                            {ENV.API_URL}
                        </Text>
                    </View>
                    {debugInfo && (
                        <>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Platform:</Text>
                                <Text style={styles.value}>{debugInfo.platform}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Device:</Text>
                                <Text style={styles.value}>{debugInfo.deviceType}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Environment:</Text>
                                <Text style={styles.value}>{debugInfo.environment}</Text>
                            </View>
                            {debugInfo.debuggerHost && (
                                <View style={styles.infoRow}>
                                    <Text style={styles.label}>Debugger:</Text>
                                    <Text style={styles.value}>{debugInfo.debuggerHost}</Text>
                                </View>
                            )}
                        </>
                    )}
                </View>

                {/* Test Button */}
                <TouchableOpacity
                    onPress={handleTest}
                    disabled={loading}
                    style={[styles.button, styles.primaryButton]}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Test Backend Connection</Text>
                    )}
                </TouchableOpacity>

                {/* Instructions Button */}
                <TouchableOpacity
                    onPress={showInstructions}
                    style={[styles.button, styles.secondaryButton]}
                >
                    <Text style={styles.buttonText}>Show Setup Instructions</Text>
                </TouchableOpacity>

                {/* Results Card */}
                {result && (
                    <View style={[
                        styles.card,
                        result.success ? styles.successCard : styles.errorCard
                    ]}>
                        <Text style={styles.resultTitle}>
                            {result.success ? '✅ Connected' : '❌ Failed'}
                        </Text>
                        <Text style={styles.resultMessage}>{result.message}</Text>
                        {result.status && (
                            <Text style={styles.resultDetail}>
                                Status: {result.status}
                            </Text>
                        )}
                        {result.latency && (
                            <Text style={styles.resultDetail}>
                                Latency: {result.latency}ms
                            </Text>
                        )}
                        {result.serverIP && (
                            <Text style={styles.resultDetail}>
                                Server IP: {result.serverIP}
                            </Text>
                        )}
                    </View>
                )}

                {/* Tips Card */}
                <View style={styles.tipsCard}>
                    <Text style={styles.tipsTitle}>💡 Tips:</Text>
                    <Text style={styles.tipText}>
                        • Backend must run with --host 0.0.0.0
                    </Text>
                    <Text style={styles.tipText}>
                        • Phone and laptop on same WiFi
                    </Text>
                    <Text style={styles.tipText}>
                        • Check firewall allows port 8000
                    </Text>
                    <Text style={styles.tipText}>
                        • Check backend console for server IP
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e0e0e0',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        flexWrap: 'wrap',
    },
    label: {
        fontSize: 14,
        color: '#999',
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'monospace',
        flex: 1,
        textAlign: 'right',
    },
    button: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#2563eb',
    },
    secondaryButton: {
        backgroundColor: '#4a4a4a',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    successCard: {
        backgroundColor: '#064e3b',
    },
    errorCard: {
        backgroundColor: '#7f1d1d',
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    resultMessage: {
        fontSize: 14,
        color: 'white',
        marginBottom: 8,
        lineHeight: 20,
    },
    resultDetail: {
        fontSize: 12,
        color: '#d1d5db',
        marginTop: 4,
    },
    tipsCard: {
        backgroundColor: '#78350f',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fcd34d',
        marginBottom: 12,
    },
    tipText: {
        fontSize: 14,
        color: '#fef3c7',
        marginBottom: 6,
    },
});
