import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';

interface CameraControlsProps {
  onCapture: () => void;
  disabled?: boolean;
  loading?: boolean;
  onFlipCamera?: () => void;
  onFlashToggle?: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  onCapture,
  disabled = false,
  loading = false,
  onFlipCamera,
  onFlashToggle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        {/* Flash Toggle */}
        <TouchableOpacity style={styles.controlButton} onPress={onFlashToggle}>
          <Ionicons name="flash" size={24} color={Colors.background} />
        </TouchableOpacity>

        {/* Capture Button */}
        <TouchableOpacity
          style={[styles.captureButton, disabled && styles.disabled]}
          onPress={onCapture}
          disabled={disabled || loading}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        {/* Flip Camera */}
        <TouchableOpacity style={styles.controlButton} onPress={onFlipCamera}>
          <Ionicons name="camera-reverse" size={24} color={Colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  controlButton: {
    padding: Spacing.sm,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});