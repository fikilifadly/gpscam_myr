// components/Camera.component.styles.ts
import { StyleSheet } from 'react-native';
import Constant from '@/constants';

const { COLORS } = Constant;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    padding: 16,
  },
  
  camera: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 16,
    paddingBottom: 32,
  },

  captureButton: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 50,
    marginHorizontal: 16,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 120,
    alignItems: 'center',
  },

  captureButtonDisabled: {
    backgroundColor: '#F2F2F7',
    shadowOpacity: 0.1,
  },

  captureButtonText: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '600',
  },

  flipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flipButtonText: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: '500',
  },

  permissionButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },

  permissionButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  permissionText: {
    fontSize: 18,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },

  loadingText: {
    fontSize: 16,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 24,
  },

  // === NEW STYLES ===
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '600',
  },

  overlaySubText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
    opacity: 0.8,
  },

  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    top: 20,
  },

  infoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },

  sensorWarning: {
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    alignSelf: 'center',
    position: 'absolute',
    top: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  sensorWarningText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },

  subPermissionText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    paddingHorizontal: 20,
    opacity: 0.8,
  },
});