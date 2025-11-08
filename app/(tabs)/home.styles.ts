import { StyleSheet } from 'react-native';
import Constant from '@/constants';

const { COLORS } = Constant;

export default StyleSheet.create({
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});