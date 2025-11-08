import React from 'react';
import { View, TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import GeneralText from '@/components/GeneralText/GeneralText.component';
import Constant from '@/constants';

const {
  COLORS,
  GENERAL_TEXT: {
    VARIANTS: { SECTION_TITLE, SECTION_SUBTITLE, BUTTON },
  },
} = Constant;

export default function HomeScreen() {
  const router = useRouter();

  const navigateToCamera = (): void => {
    router.push('/camera');
  };

  const navigateToGallery = (): void => {
    router.push('/gallery');
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* App Header */}
        <View style={styles.header}>
          <GeneralText 
            text="GPS Camera App" 
            variant={SECTION_TITLE}
            align="center"
          />
          <GeneralText 
            text="Capture photos with verified location data" 
            variant={SECTION_SUBTITLE}
            align="center"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <GeneralText text="Quick Actions" variant={SECTION_TITLE} />
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              onPress={navigateToCamera}
            >
              <View style={styles.buttonIcon}>
                <Text style={styles.iconText}>📸</Text>
              </View>
              <View style={styles.buttonContent}>
                <GeneralText text="Open Camera" variant={BUTTON} type="PRIMARY" />
                <GeneralText text="Capture GPS-tagged photos" variant={SECTION_SUBTITLE} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={navigateToGallery}
            >
              <View style={styles.buttonIcon}>
                <Text style={styles.iconText}>🖼️</Text>
              </View>
              <View style={styles.buttonContent}>
                <GeneralText text="View Gallery" variant={BUTTON} type="SECONDARY" />
                <GeneralText text="Browse captured photos" variant={SECTION_SUBTITLE} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature Status */}
        <View style={styles.statusContainer}>
          <GeneralText text="Feature Status" variant={SECTION_TITLE} />
          <View style={styles.statusList}>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, styles.statusSuccess]} />
              <GeneralText text="Camera: Ready" variant={SECTION_SUBTITLE} />
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, styles.statusSuccess]} />
              <GeneralText text="GPS Location: Ready" variant={SECTION_SUBTITLE} />
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, styles.statusSuccess]} />
              <GeneralText text="Weather Data: Ready" variant={SECTION_SUBTITLE} />
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, styles.statusSuccess]} />
              <GeneralText text="Firebase Storage: Connected" variant={SECTION_SUBTITLE} />
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.infoContainer}>
          <GeneralText text="About This App" variant={SECTION_TITLE} />
          <GeneralText
            text="This GPS Camera app captures photos with verified location data, weather information, and detects mock GPS locations. All photos are stored with complete metadata including coordinates, altitude, and EXIF data."
            variant={SECTION_SUBTITLE}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },

  header: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },

  quickActions: {
    backgroundColor: COLORS.WHITE,
    padding: 24,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },

  actionButtons: {
    gap: 16,
    marginTop: 16,
  },

  actionButton: {
    flexDirection: 'row',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },

  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
  },

  secondaryButton: {
    backgroundColor: COLORS.SECONDARY,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },

  buttonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  iconText: {
    fontSize: 18,
  },

  buttonContent: {
    flex: 1,
  },

  statusContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 24,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },

  statusList: {
    marginTop: 16,
    gap: 8,
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  statusSuccess: {
    backgroundColor: '#34C759',
  },

  infoContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 24,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
