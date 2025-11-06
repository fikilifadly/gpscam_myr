import { StyleSheet } from 'react-native';
import Constants from '@/constants';
import { Size } from '@/utils';

const { scaleFont, scaleSize } = Size;

const {
  COLORS,
  SPACING,
} = Constants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
  },
    camera: {
    flex: 1,
    width: '100%',
  },
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: scaleSize(SPACING.MD),
  },
  captureButton: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: scaleSize(SPACING.XL),
    paddingVertical: scaleSize(SPACING.MD),
    borderRadius: scaleSize(50),
    marginHorizontal: scaleSize(SPACING.MD),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  captureButtonDisabled: {
    backgroundColor: COLORS.SECONDARY,
  },
  captureButtonText: {
    fontSize: scaleFont(16),
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  flipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: scaleSize(SPACING.LG),
    paddingVertical: scaleSize(SPACING.SM),
    borderRadius: scaleSize(10),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  flipButtonText: {
    fontSize: scaleFont(14),
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  permissionButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: scaleSize(SPACING.XL),
    paddingVertical: scaleSize(SPACING.MD),
    borderRadius: scaleSize(5),
    marginTop: scaleSize(SPACING.MD),
  },
  permissionButtonText: {
    color: COLORS.WHITE,
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  permissionText: {
    fontSize: scaleFont(18),
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: scaleSize(SPACING.MD),
  },
  loadingText: {
    fontSize: scaleFont(16),
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

export default styles;