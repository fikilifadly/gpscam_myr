import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhotoGallery from '@/components/PhotoGallery/PhotoGallery.component';
import Constants from '@/constants';
import { Size } from '@/utils';

const { scaleSize } = Size;
const { COLORS } = Constants;

/**
 * Gallery screen for direct navigation
 * 
 * @returns {React.FC} Gallery screen component
 */
export default function GalleryScreen() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <PhotoGallery />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
};