import React from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import GeneralText from '@/components/GeneralText/GeneralText.component';
import Constants from '@/constants';
import { Size } from '@/utils';

const { scaleFont, scaleSize } = Size;
const {
  GENERAL_TEXT: {
    VARIANTS: { SECTION_TITLE, SECTION_SUBTITLE, BUTTON },
  },
  COLORS,
  SPACING,
  BORDER_RADIUS,
} = Constants;

/**
 * Home screen serving as navigation hub for GPS Camera app
 * 
 * @returns {React.FC} Home screen component
 */
export default function HomeScreen() {
  const router = useRouter();

  /**
   * Navigate to camera screen
   */
  const navigateToCamera = (): void => {
    router.push('/camera');
  };

  /**
   * Navigate to gallery screen
   */
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
              <GeneralText 
                text="Camera: Ready" 
                variant={SECTION_SUBTITLE}
              />
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, styles.statusSuccess]} />
              <GeneralText 
                text="GPS Location: Ready" 
                variant={SECTION_SUBTITLE}
              />
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, styles.statusSuccess]} />
              <GeneralText 
                text="Weather Data: Ready" 
                variant={SECTION_SUBTITLE}
              />
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, styles.statusSuccess]} />
              <GeneralText 
                text="Firebase Storage: Connected" 
                variant={SECTION_SUBTITLE}
              />
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

// Styles defined in the same file
const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  
  scrollContent: {
    flexGrow: 1,
    padding: scaleSize(SPACING.MD),
  },

  header: {
    alignItems: 'center',
    paddingVertical: scaleSize(SPACING.XL),
    marginBottom: scaleSize(SPACING.LG),
  },

  quickActions: {
    backgroundColor: COLORS.WHITE,
    padding: scaleSize(SPACING.LG),
    borderRadius: scaleSize(BORDER_RADIUS.LG),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: scaleSize(SPACING.XS),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(SPACING.SM),
    elevation: 3,
    marginBottom: scaleSize(SPACING.LG),
  },

  actionButtons: {
    gap: scaleSize(SPACING.MD),
    marginTop: scaleSize(SPACING.MD),
  },

  actionButton: {
    flexDirection: 'row',
    padding: scaleSize(SPACING.LG),
    borderRadius: scaleSize(BORDER_RADIUS.MD),
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
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleSize(SPACING.MD),
  },

  iconText: {
    fontSize: scaleFont(18),
  },

  buttonContent: {
    flex: 1,
  },

  statusContainer: {
    backgroundColor: COLORS.WHITE,
    padding: scaleSize(SPACING.LG),
    borderRadius: scaleSize(BORDER_RADIUS.LG),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: scaleSize(SPACING.XS),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(SPACING.SM),
    elevation: 3,
    marginBottom: scaleSize(SPACING.LG),
  },

  statusList: {
    marginTop: scaleSize(SPACING.MD),
    gap: scaleSize(SPACING.SM),
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleSize(SPACING.MD),
  },

  statusIndicator: {
    width: scaleSize(12),
    height: scaleSize(12),
    borderRadius: scaleSize(6),
  },

  statusSuccess: {
    backgroundColor: COLORS.SUCCESS,
  },

  infoContainer: {
    backgroundColor: COLORS.WHITE,
    padding: scaleSize(SPACING.LG),
    borderRadius: scaleSize(BORDER_RADIUS.LG),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: scaleSize(SPACING.XS),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(SPACING.SM),
    elevation: 3,
  },
};

// import GeneralText from "@/components/GeneralText/GeneralText.component";
// import { SafeAreaView } from "react-native-safe-area-context";

// import Constant from "@/constants";

// const {
// 	GENERAL_TEXT: {
// 		VARIANTS: { SECTION_TITLE },
// 	},
// } = Constant;

// export default function HomeScreen() {
// 	return (
// 		<SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
// 			<GeneralText text="welcome" variant={SECTION_TITLE} />
// 		</SafeAreaView>
// 	);
// }
