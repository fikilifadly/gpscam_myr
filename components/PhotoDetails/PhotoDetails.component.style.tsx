import { StyleSheet } from 'react-native';
import Constants from '@/constants';
import { Size } from '@/utils';
import { getTypographyStyle } from '@/utils/typography';

const { scaleFont, scaleSize } = Size;
const { COLORS, SPACING, TYPOGRAPHY } = Constants;

/**
 * Photo Details component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scaleSize(SPACING.MD),
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  backButton: {
    padding: scaleSize(SPACING.SM),
  },
  backButtonText: {
    ...getTypographyStyle('BUTTON_MEDIUM', { color: COLORS.PRIMARY }),
  },
  title: {
    ...getTypographyStyle('HEADER_MEDIUM', { 
      color: COLORS.TEXT_PRIMARY,
      align: TYPOGRAPHY.TEXT_ALIGN_CENTER 
    }),
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: scaleSize(60),
  },

  // Photo styles
  photoContainer: {
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: scaleSize(300),
  },

  // Section styles
  section: {
    backgroundColor: COLORS.WHITE,
    margin: scaleSize(SPACING.MD),
    padding: scaleSize(SPACING.LG),
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_LG),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: scaleSize(SPACING.XS),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(SPACING.SM),
    elevation: 2,
  },
  sectionTitle: {
    ...getTypographyStyle('HEADER_SMALL', { color: COLORS.TEXT_PRIMARY }),
    marginBottom: scaleSize(SPACING.MD),
  },

  // Info row styles
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleSize(SPACING.SM),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  infoLabel: {
    ...getTypographyStyle('LABEL_MEDIUM', { color: COLORS.TEXT_SECONDARY }),
    flex: 1,
  },
  infoValue: {
    ...getTypographyStyle('BODY_MEDIUM', { color: COLORS.TEXT_PRIMARY }),
    flex: 2,
    textAlign: 'right',
  },
  mockWarning: {
    color: COLORS.WARNING,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
  },
  authentic: {
    color: COLORS.SUCCESS,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
  },

  // Button styles
  mapButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: scaleSize(SPACING.MD),
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_MD),
    alignItems: 'center',
    marginTop: scaleSize(SPACING.MD),
  },
  mapButtonText: {
    ...getTypographyStyle('BUTTON_MEDIUM', { color: COLORS.WHITE }),
  },
  
  // Actions section
  actionsSection: {
    padding: scaleSize(SPACING.MD),
  },
  shareButton: {
    backgroundColor: COLORS.INFO,
    padding: scaleSize(SPACING.MD),
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_MD),
    alignItems: 'center',
  },
  shareButtonText: {
    ...getTypographyStyle('BUTTON_MEDIUM', { color: COLORS.WHITE }),
  },
});

export default styles;