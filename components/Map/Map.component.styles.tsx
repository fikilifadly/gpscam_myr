import { StyleSheet } from "react-native";

export default StyleSheet.create({
  altitudeText: {
    color: '#666',
    fontSize: 12,
  },
  coordinatesContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  coordinatesText: {
    color: '#666',
    fontFamily: 'monospace',
    fontSize: 12,
    marginBottom: 4,
  },
  errorContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    height: 150,
    justifyContent: 'center',
  },
  errorText: {
    color: '#666',
    fontSize: 14,
  },
  mapButton: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mapButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  mapButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  mapContainer: {
    backgroundColor: '#fafafa',
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    padding: 12,
  },
  mapTitle: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  mapTouchable: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    bottom: 0,
    left: 0,
    padding: 6,
    position: 'absolute',
    right: 0,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  staticMap: {
    height: 150,
    width: '100%',
  },
  staticMapContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    height: 150,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
});