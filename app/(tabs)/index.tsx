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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 24,
  },
  
  actionButtons: {
    gap: 16,
    marginTop: 16,
  },

  buttonContent: {
    flex: 1,
  },

  buttonIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 16,
    width: 40,
  },

  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 32,
  },

  iconText: {
    fontSize: 18,
  },

  infoContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    elevation: 3,
    padding: 24,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
  },

  quickActions: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 24,
    padding: 24,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },

  secondaryButton: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
  },

  statusContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 24,
    padding: 24,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  statusIndicator: {
    borderRadius: 6,
    height: 12,
    width: 12,
  },

  statusItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },

  statusList: {
    gap: 8,
    marginTop: 16,
  },

  statusSuccess: {
    backgroundColor: '#34C759',
  },
});
