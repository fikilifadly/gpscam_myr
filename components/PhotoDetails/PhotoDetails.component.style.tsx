import { StyleSheet } from 'react-native';
import Constant from '@/constants';

const { COLORS } = Constant;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },

  backButton: {
    padding: 8,
  },

  title: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },

  headerSpacer: {
    width: 60,
  },

  photoContainer: {
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photo: {
    width: '100%',
    height: 300,
  },

  section: {
    backgroundColor: COLORS.WHITE,
    margin: 16,
    padding: 24,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },

  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
    flex: 1,
  },

  infoValue: {
    fontSize: 16,
    color: COLORS.BLACK,
    flex: 2,
    textAlign: 'right',
  },

  mapButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },

  mapButtonText: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: '600',
  },

  actionsSection: {
    padding: 16,
  },

  shareButton: {
    backgroundColor: '#5AC8FA',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  shareButtonText: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});