import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CameraComponent from '@/components/Camera/Camera.component';
import Constants from '@/constants';
import { Size } from '@/utils';

const { scaleSize } = Size;
const { COLORS } = Constants;

/**
 * Camera screen
 * 
 * @returns {React.FC} Camera screen component
 */
export default function CameraScreen() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <CameraComponent />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
};