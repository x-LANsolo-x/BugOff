/**
 * Network Debugging Utilities
 * Helps diagnose connectivity issues during development
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { API_BASE_URL } from '../constants/config';

interface NetworkDebugInfo {
    platform: string;
    apiUrl: string;
    debuggerHost: string | undefined;
    deviceType: 'simulator' | 'emulator' | 'physical' | 'web';
    environment: 'development' | 'production';
    timestamp: string;
}

/**
 * Get comprehensive network debug information
 */
export function getNetworkDebugInfo(): NetworkDebugInfo {
    const { manifest } = Constants;
    const debuggerHost = manifest?.debuggerHost || manifest?.hostUri;
    
    let deviceType: NetworkDebugInfo['deviceType'] = 'web';
    
    if (Platform.OS === 'ios') {
        deviceType = debuggerHost?.includes('localhost') ? 'simulator' : 'physical';
    } else if (Platform.OS === 'android') {
        // Heuristic: emulator typically on localhost, physical on LAN
        deviceType = debuggerHost?.includes('localhost') ? 'emulator' : 'physical';
    }

    return {
        platform: Platform.OS,
        apiUrl: API_BASE_URL,
        debuggerHost,
        deviceType,
        environment: __DEV__ ? 'development' : 'production',
        timestamp: new Date().toISOString(),
    };
}

/**
 * Test backend connectivity
 * Returns detailed error information for debugging
 */
export async function testBackendConnection(): Promise<{
    success: boolean;
    status?: number;
    message: string;
    debugInfo: NetworkDebugInfo;
    latency?: number;
}> {
    const debugInfo = getNetworkDebugInfo();
    const startTime = Date.now();
    
    try {
        // Test the health endpoint
        const healthUrl = API_BASE_URL.replace('/api/v1', '/health');
        
        console.log('🔍 Testing connection to:', healthUrl);
        
        const response = await fetch(healthUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Short timeout for quick failure
            signal: AbortSignal.timeout(5000),
        });

        const latency = Date.now() - startTime;
        
        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                status: response.status,
                message: `✅ Connected successfully! Server: ${data.server_ip || 'unknown'} (${latency}ms)`,
                debugInfo,
                latency,
            };
        } else {
            return {
                success: false,
                status: response.status,
                message: `❌ Server responded with status ${response.status}`,
                debugInfo,
                latency,
            };
        }
    } catch (error: any) {
        const latency = Date.now() - startTime;
        
        // Network error - provide helpful diagnostics
        let message = '❌ Connection failed: ';
        
        if (error.name === 'AbortError' || error.name === 'TimeoutError') {
            message += 'Request timeout. Check if backend is running.';
        } else if (error.message?.includes('Network request failed')) {
            message += 'Network error. ';
            
            if (Platform.OS === 'android') {
                message += '\n\n💡 Android Tips:\n';
                message += '- Emulator: Backend should be at 10.0.2.2:8000\n';
                message += '- Physical: Use your computer\'s LAN IP\n';
                message += `- Current URL: ${API_BASE_URL}`;
            } else if (Platform.OS === 'ios') {
                message += '\n\n💡 iOS Tips:\n';
                message += '- Simulator: Backend should be at localhost:8000\n';
                message += '- Physical: Use your computer\'s LAN IP\n';
                message += `- Current URL: ${API_BASE_URL}`;
            }
        } else {
            message += error.message || 'Unknown error';
        }
        
        return {
            success: false,
            message,
            debugInfo,
            latency,
        };
    }
}

/**
 * Log network configuration to console
 * Useful for debugging during development
 */
export function logNetworkConfig(): void {
    const info = getNetworkDebugInfo();
    
    console.log('\n' + '='.repeat(50));
    console.log('📡 NETWORK CONFIGURATION');
    console.log('='.repeat(50));
    console.log('Platform:', info.platform);
    console.log('Device Type:', info.deviceType);
    console.log('Environment:', info.environment);
    console.log('API URL:', info.apiUrl);
    console.log('Debugger Host:', info.debuggerHost || 'N/A');
    console.log('='.repeat(50) + '\n');
}

/**
 * Get user-friendly connection instructions based on platform
 */
export function getConnectionInstructions(): string {
    const info = getNetworkDebugInfo();
    
    if (!__DEV__) {
        return 'Using production backend. No setup required.';
    }

    let instructions = '📱 Development Mode Setup:\n\n';
    
    if (info.platform === 'android') {
        if (info.deviceType === 'emulator') {
            instructions += '1. Ensure backend is running on your computer\n';
            instructions += '2. Backend should be accessible at: http://10.0.2.2:8000\n';
            instructions += '3. Run: uvicorn app.main:app --host 0.0.0.0 --port 8000\n';
        } else {
            instructions += '1. Connect phone and computer to same WiFi\n';
            instructions += '2. Start backend with: uvicorn app.main:app --host 0.0.0.0 --port 8000\n';
            instructions += '3. Check backend logs for "Server running at: http://XXX.XXX.XXX.XXX:8000"\n';
            instructions += '4. Ensure firewall allows port 8000\n';
        }
    } else if (info.platform === 'ios') {
        if (info.deviceType === 'simulator') {
            instructions += '1. Ensure backend is running on your computer\n';
            instructions += '2. Backend should be accessible at: http://localhost:8000\n';
            instructions += '3. Run: uvicorn app.main:app --host 127.0.0.1 --port 8000\n';
        } else {
            instructions += '1. Connect phone and computer to same WiFi\n';
            instructions += '2. Start backend with: uvicorn app.main:app --host 0.0.0.0 --port 8000\n';
            instructions += '3. Check backend logs for "Server running at: http://XXX.XXX.XXX.XXX:8000"\n';
            instructions += '4. Ensure firewall allows port 8000\n';
        }
    } else {
        instructions += '1. Ensure backend is running at: http://localhost:8000\n';
        instructions += '2. Run: uvicorn app.main:app --port 8000\n';
    }
    
    return instructions;
}
