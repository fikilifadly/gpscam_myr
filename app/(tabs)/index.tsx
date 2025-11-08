import React from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import GeneralText from '@/components/GeneralText/GeneralText.component';
import Constant from '@/constants';
import styles from './home.styles';

const {
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
          <GeneralText 
            text="Quick Actions" 
            variant={SECTION_TITLE}
          />
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              onPress={navigateToCamera}
            >
              <View style={styles.buttonIcon}>
                <Text style={styles.iconText}>📸</Text>
              </View>
              <View style={styles.buttonContent}>
                <GeneralText 
                  text="Open Camera" 
                  variant={BUTTON}
                  type="PRIMARY"
                />
                <GeneralText 
                  text="Capture GPS-tagged photos"
                  variant={SECTION_SUBTITLE}
                />
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
                <GeneralText 
                  text="View Gallery" 
                  variant={BUTTON}
                  type="SECONDARY"
                />
                <GeneralText 
                  text="Browse captured photos"
                  variant={SECTION_SUBTITLE}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature Status */}
        <View style={styles.statusContainer}>
          <GeneralText 
            text="Feature Status" 
            variant={SECTION_TITLE}
          />
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
          <GeneralText 
            text="About This App" 
            variant={SECTION_TITLE}
          />
          <GeneralText 
            text="This GPS Camera app captures photos with verified location data, weather information, and detects mock GPS locations. All photos are stored with complete metadata including coordinates, altitude, and EXIF data."
            variant={SECTION_SUBTITLE}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}