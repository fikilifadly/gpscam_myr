import { StyleSheet } from 'react-native';
import Constant from '@/constants';

const { COLORS } = Constant;

export default StyleSheet.create({
  buttonDisabled: {
    opacity: 0.6,
  },
  
  camera: {
    borderRadius: 8,
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  
  captureButton: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
    elevation: 5,
    marginHorizontal: 16,
    minWidth: 120,
    paddingHorizontal: 30,
    paddingVertical: 15,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  captureButtonDisabled: {
    backgroundColor: '#F2F2F7',
    shadowOpacity: 0.1,
  },

  captureButtonText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },

  container: {
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  controls: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
    paddingBottom: 32,
  },

  flipButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  flipButtonText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: '500',
  },

  infoContainer: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    top: 20,
  },

  infoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },

  loadingOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 15,
    justifyContent: 'center',
    padding: 30,
  },

  loadingText: {
    color: COLORS.WHITE,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
  },

  overlaySubText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 8,
    opacity: 0.8,
  },

  overlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },

  permissionButton: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 16,
    minWidth: 200,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },

  permissionButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  permissionContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  permissionText: {
    color: COLORS.WHITE,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },

  sensorWarning: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    borderRadius: 20,
    elevation: 4,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    top: 60,
  },

  sensorWarningText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },

  subPermissionText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.8,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});