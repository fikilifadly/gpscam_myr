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
});