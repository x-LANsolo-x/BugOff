/**
 * Network Debugging Utilities for ChefMentor X
 * 
 * Helps diagnose connectivity issues during development
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { ENV } from '../config/env';

// ============================================================================
// Types
// ============================================================================

export interface NetworkDebugInfo {
    platform: string;
    apiUrl: string;
    debuggerHost: string | undefined;
    deviceType: 'simulator' | 'emulator' | 'physical' | 'web';
    environment: 'development' | 'production';
    timestamp: string;
}

export interface ConnectionTestResult {
    success: boolean;
    status?: number;
    message: string;
    debugInfo: NetworkDebugInfo;
    latency?: number;
    serverIP?: string;
}

// ============================================================================
// Debug Info
// ============================================================================

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
        apiUrl: ENV.API_URL,
        debuggerHost,
        deviceType,
        environment: ENV.IS_DEV ? 'development' : 'production',
        timestamp: new Date().toISOString(),
    };
}

/**
 * Log network configuration to console
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

// ============================================================================
// Connection Testing
// ============================================================================

/**
 * Test backend connectivity with detailed diagnostics
 */
export async function testBackendConnection(): Promise<ConnectionTestResult> {
    const debugInfo = getNetworkDebugInfo();
    const startTime = Date.now();
    
    try {
        // Test the health endpoint (remove /api/v1 suffix and add /health)
        const healthUrl = ENV.API_URL.replace('/api/v1', '/health');
        
        console.log('🔍 Testing connection to:', healthUrl);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(healthUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const latency = Date.now() - startTime;
        
        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                status: response.status,
                message: `✅ Connected successfully!\nServer: ${data.server_ip || 'unknown'}\nLatency: ${latency}ms`,
                debugInfo,
                latency,
                serverIP: data.server_ip,
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
        let message = '❌ Connection failed\n\n';
        
        if (error.name === 'AbortError') {
            message += 'Timeout: Backend is not responding.\n\n';
            message += '💡 Check if backend is running:\n';
            message += '   uvicorn app.main:app --host 0.0.0.0 --port 8000';
        } else if (error.message?.includes('Network request failed')) {
            message += 'Network Error: Cannot reach backend.\n\n';
            
            if (Platform.OS === 'android') {
                message += '💡 Android Troubleshooting:\n';
                message += '• Emulator: Backend should be at 10.0.2.2:8000\n';
                message += '• Physical: Use your computer\'s LAN IP\n';
                message += '• Both: Backend must run with --host 0.0.0.0\n\n';
                message += `Current URL: ${ENV.API_URL}`;
            } else if (Platform.OS === 'ios') {
                message += '💡 iOS Troubleshooting:\n';
                message += '• Simulator: Backend should be at localhost:8000\n';
                message += '• Physical: Use your computer\'s LAN IP\n';
                message += '• Both: Ensure same WiFi network\n\n';
                message += `Current URL: ${ENV.API_URL}`;
            } else {
                message += '💡 Troubleshooting:\n';
                message += `• Check backend is running\n`;
                message += `• Current URL: ${ENV.API_URL}`;
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

// ============================================================================
// Setup Instructions
// ============================================================================

/**
 * Get platform-specific connection instructions
 */
export function getConnectionInstructions(): string {
    const info = getNetworkDebugInfo();
    
    if (!ENV.IS_DEV) {
        return 'Using production backend. No setup required.';
    }

    let instructions = '📱 Development Mode Setup:\n\n';
    
    if (info.platform === 'android') {
        if (info.deviceType === 'emulator') {
            instructions += '✓ Android Emulator Configuration\n\n';
            instructions += '1. Start backend on your computer:\n';
            instructions += '   uvicorn app.main:app --host 0.0.0.0 --port 8000\n\n';
            instructions += '2. Backend should be accessible at:\n';
            instructions += '   http://10.0.2.2:8000\n\n';
            instructions += '3. The app is auto-configured for emulator.\n';
        } else {
            instructions += '✓ Android Physical Device Configuration\n\n';
            instructions += '1. Connect phone and computer to SAME WiFi\n\n';
            instructions += '2. Start backend with network binding:\n';
            instructions += '   uvicorn app.main:app --host 0.0.0.0 --port 8000\n\n';
            instructions += '3. Check backend console for server IP:\n';
            instructions += '   "Server running at: http://XXX.XXX.XXX.XXX:8000"\n\n';
            instructions += '4. Ensure firewall allows port 8000\n\n';
            instructions += '5. App auto-detects IP from Expo.\n';
        }
    } else if (info.platform === 'ios') {
        if (info.deviceType === 'simulator') {
            instructions += '✓ iOS Simulator Configuration\n\n';
            instructions += '1. Start backend on your computer:\n';
            instructions += '   uvicorn app.main:app --port 8000\n\n';
            instructions += '2. Backend accessible at:\n';
            instructions += '   http://localhost:8000\n\n';
            instructions += '3. The app is auto-configured for simulator.\n';
        } else {
            instructions += '✓ iOS Physical Device Configuration\n\n';
            instructions += '1. Connect phone and computer to SAME WiFi\n\n';
            instructions += '2. Start backend with network binding:\n';
            instructions += '   uvicorn app.main:app --host 0.0.0.0 --port 8000\n\n';
            instructions += '3. Check backend console for server IP:\n';
            instructions += '   "Server running at: http://XXX.XXX.XXX.XXX:8000"\n\n';
            instructions += '4. Ensure firewall allows port 8000\n\n';
            instructions += '5. App auto-detects IP from Expo.\n';
        }
    } else {
        instructions += '✓ Web Configuration\n\n';
        instructions += '1. Start backend:\n';
        instructions += '   uvicorn app.main:app --port 8000\n\n';
        instructions += '2. Backend should be at:\n';
        instructions += '   http://localhost:8000\n';
    }
    
    instructions += '\n📝 Current Configuration:\n';
    instructions += `   API URL: ${info.apiUrl}\n`;
    instructions += `   Platform: ${info.platform}\n`;
    instructions += `   Device: ${info.deviceType}\n`;
    
    return instructions;
}

/**
 * Quick connectivity check (returns boolean)
 */
export async function isBackendReachable(): Promise<boolean> {
    try {
        const result = await testBackendConnection();
        return result.success;
    } catch {
        return false;
    }
}
