import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, ViewStyle } from 'react-native';
import { voiceService } from '../services/voiceService';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  style?: ViewStyle;
}

export default function VoiceInputButton({ onTranscript, style }: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const handlePress = async () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      // Voice service integration will be added
      onTranscript("Voice input will be available soon");
    } else {
      // Start listening
      setIsListening(true);
      // Simulate voice input for now
      setTimeout(() => {
        setIsListening(false);
        onTranscript("Voice input will be available soon");
      }, 1000);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isListening && styles.buttonActive, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.Text style={[styles.icon, { transform: [{ scale: pulseAnim }] }]}>
        {isListening ? '🔴' : '🎤'}
      </Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FF6B4A',
  },
  buttonActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  icon: {
    fontSize: 20,
  },
});
