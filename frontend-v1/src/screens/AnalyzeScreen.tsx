import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Button } from '../components';

export default function AnalyzeScreen({ navigation }: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Request media library permissions
  const requestMediaPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Media library permission is required to select photos. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Take photo with camera
  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  // Pick image from gallery
  const handlePickImage = async () => {
    const hasPermission = await requestMediaPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // Proceed to context questions
  const handleContinue = () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please take a photo or select one from your gallery.');
      return;
    }
    
    navigation.navigate('ContextQuestions', { imageUri: selectedImage });
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analyze Failed Dish</Text>
          <Text style={styles.subtitle}>
            Take a photo of your dish or upload one from your gallery
          </Text>
        </View>

        {/* Image Preview or Placeholder */}
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <>
              <Image source={{ uri: selectedImage }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={handleRemoveImage}
              >
                <Text style={styles.removeBtnText}>✕</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderIcon}>📸</Text>
              <Text style={styles.placeholderText}>No image selected</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleTakePhoto}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionLabel}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handlePickImage}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>🖼️</Text>
            <Text style={styles.actionLabel}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        {selectedImage && (
          <Button
            title="Continue to Analysis"
            onPress={handleContinue}
            style={styles.continueBtn}
          />
        )}

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>📝 Tips for Best Results</Text>
          <Text style={styles.tipItem}>• Take photo in good lighting</Text>
          <Text style={styles.tipItem}>• Show the entire dish clearly</Text>
          <Text style={styles.tipItem}>• Capture any visible issues</Text>
          <Text style={styles.tipItem}>• Avoid blurry or dark photos</Text>
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.brand.orange} />
          <Text style={styles.loadingText}>Processing image...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scroll: {
    padding: Spacing[6],
    paddingBottom: 100, // Extra bottom padding to prevent tab bar overlap
  },
  header: {
    marginBottom: Spacing[6],
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textMain,
    marginBottom: Spacing[2],
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSub,
    lineHeight: 24,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing[6],
    backgroundColor: Colors.white,
    ...Shadows.md,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral[100],
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: Spacing[3],
  },
  placeholderText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSub,
  },
  removeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing[6],
  },
  actionBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing[5],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.brand.orange,
    ...Shadows.sm,
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: Spacing[2],
  },
  actionLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.brand.orange,
    textAlign: 'center',
  },
  continueBtn: {
    marginTop: Spacing[2],
    marginBottom: Spacing[6],
  },
  tipsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing[5],
    marginBottom: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    ...Shadows.sm,
  },
  tipsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textMain,
    marginBottom: Spacing[3],
  },
  tipItem: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSub,
    lineHeight: 22,
    marginBottom: Spacing[1],
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    marginTop: Spacing[3],
  },
});
