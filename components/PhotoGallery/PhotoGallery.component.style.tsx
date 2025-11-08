import { StyleSheet } from 'react-native';
import Constant from '@/constants';

const { COLORS } = Constant;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },

  header: {
    padding: 16,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },

  listContent: {
    padding: 16,
  },
  
  photoItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },

  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F2F2F7',
  },

  photoImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F2F2F7',
  },

  imageError: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -10 }],
  },

  photoDetails: {
    padding: 16,
  },

  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailsButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },

  deleteButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },

  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },

  loadingText: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 16,
  },

  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },

  retryButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 8,
  },

  clearErrorButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
});