import { StyleSheet } from 'react-native';
import Constants from '@/constants';
import { Size } from '@/utils';
import { getTypographyStyle } from '@/utils/typography/typography';

const { scaleFont, scaleSize } = Size;
const { COLORS, SPACING, TYPOGRAPHY } = Constants;

/**
 * Photo Gallery component styles
 */
const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleSize(SPACING.XL),
  },

  // Header styles
  header: {
    padding: scaleSize(SPACING.MD),
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  title: {
    ...getTypographyStyle('HEADER_MEDIUM', { color: COLORS.TEXT_PRIMARY }),
    marginBottom: scaleSize(SPACING.XS),
  },
  subtitle: {
    ...getTypographyStyle('BODY_SMALL', { color: COLORS.TEXT_SECONDARY }),
  },

  // List styles
  listContent: {
    padding: scaleSize(SPACING.MD),
  },
  
  // Photo item styles
  photoItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_LG),
    marginBottom: scaleSize(SPACING.MD),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: scaleSize(SPACING.XS),
    },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(SPACING.SM),
    elevation: 3,
    overflow: 'hidden',
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleSize(SPACING.MD),
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  photoDate: {
    ...getTypographyStyle('CAPTION_SMALL', { color: COLORS.TEXT_SECONDARY }),
  },
  mockLocationBadge: {
    backgroundColor: COLORS.WARNING,
    paddingHorizontal: scaleSize(SPACING.SM),
    paddingVertical: scaleSize(SPACING.XS),
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_SM),
  },
  mockLocationText: {
    ...getTypographyStyle('LABEL_SMALL', { color: COLORS.WHITE }),
  },
  
  // Image styles
  photoImage: {
    width: '100%',
    height: scaleSize(200),
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  imageError: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -scaleSize(10) }],
  },
  imageErrorText: {
    ...getTypographyStyle('BODY_MEDIUM', { color: COLORS.TEXT_SECONDARY }),
  },
  
  // Photo details styles
  photoDetails: {
    padding: scaleSize(SPACING.MD),
  },
  locationText: {
    ...getTypographyStyle('BODY_SMALL', { color: COLORS.TEXT_PRIMARY }),
    marginBottom: scaleSize(SPACING.XS),
  },
  altitudeText: {
    ...getTypographyStyle('BODY_SMALL', { color: COLORS.TEXT_SECONDARY }),
    marginBottom: scaleSize(SPACING.XS),
  },
  weatherText: {
    ...getTypographyStyle('BODY_SMALL', { color: COLORS.TEXT_SECONDARY }),
    marginBottom: scaleSize(SPACING.MD),
  },
  
  // Action buttons styles
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: scaleSize(SPACING.LG),
    paddingVertical: scaleSize(SPACING.SM),
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_MD),
    flex: 1,
    marginRight: scaleSize(SPACING.SM),
    alignItems: 'center',
  },
  detailsButtonText: {
    ...getTypographyStyle('BUTTON_SMALL', { color: COLORS.WHITE }),
  },
  deleteButton: {
    backgroundColor: COLORS.ERROR,
    paddingHorizontal: scaleSize(SPACING.LG),
    paddingVertical: scaleSize(SPACING.SM),
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_MD),
    flex: 1,
    marginLeft: scaleSize(SPACING.SM),
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    backgroundColor: COLORS.GRAY_MEDIUM,
  },
  deleteButtonText: {
    ...getTypographyStyle('BUTTON_SMALL', { color: COLORS.WHITE }),
  },
  
  // Empty state styles
  emptyContainer: {
    alignItems: 'center',
    padding: scaleSize(SPACING.XXL),
  },
  emptyText: {
    ...getTypographyStyle('HEADER_SMALL', { color: COLORS.TEXT_SECONDARY }),
    marginBottom: scaleSize(SPACING.SM),
  },
  emptySubtext: {
    ...getTypographyStyle('BODY_MEDIUM', { 
      color: COLORS.TEXT_TERTIARY,
      align: TYPOGRAPHY.TEXT_ALIGN_CENTER 
    }),
    lineHeight: scaleSize(20),
  },
  
  // Loading and error styles
  loadingText: {
    ...getTypographyStyle('BODY_LARGE', { color: COLORS.TEXT_SECONDARY }),
    marginBottom: scaleSize(SPACING.MD),
  },
  errorText: {
    ...getTypographyStyle('BODY_MEDIUM', { 
      color: COLORS.ERROR,
      align: TYPOGRAPHY.TEXT_ALIGN_CENTER 
    }),
    marginBottom: scaleSize(SPACING.MD),
    lineHeight: scaleSize(20),
  },
  retryButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: scaleSize(SPACING.XL),
    paddingVertical: scaleSize(SPACING.MD),
    borderRadius: scaleSize(SPACING.BORDER_RADIUS_MD),
    marginBottom: scaleSize(SPACING.SM),
  },
  retryButtonText: {
    ...getTypographyStyle('BUTTON_MEDIUM', { color: COLORS.WHITE }),
  },
  clearErrorButton: {
    paddingHorizontal: scaleSize(SPACING.XL),
    paddingVertical: scaleSize(SPACING.MD),
  },
  clearErrorButtonText: {
    ...getTypographyStyle('BODY_MEDIUM', { color: COLORS.TEXT_SECONDARY }),
  },
});

export default styles;