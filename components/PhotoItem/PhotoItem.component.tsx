import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { PhotoData, AsyncVoidFunction } from '@/types/index.';
import usePhotoGallery from '../PhotoGallery/usePhotoGallery';
import styles from '../PhotoGallery/PhotoGallery.component.style';

/**
 * Photo Item component props
 */
interface PhotoItemProps {
  photo: PhotoData;
  onDelete: (photoId: string) => AsyncVoidFunction;
  loading: boolean;
}

/**
 * Photo item component for displaying individual photos
 * 
 * @param {PhotoItemProps} props - Component props
 * @returns {React.ReactElement} Photo item component
 */
const PhotoItem: React.FC<PhotoItemProps> = ({ 
  photo, 
  onDelete, 
  loading 
}) => {
  const { 
    handleViewDetails, 
    handleImageError, 
    hasImageError,
    formatCoordinates,
    formatDate 
  } = usePhotoGallery();

  /**
   * Handle image error
   */
  const handleImageErrorInternal = (): void => {
    if (photo.id) {
      handleImageError(photo.id);
    }
  };

  return (
    <View style={styles.photoItem}>
      <View style={styles.photoHeader}>
        <Text style={styles.photoDate}>
          {formatDate(photo.createdAt || '')}
        </Text>
        {photo.isMockLocation && (
          <View style={styles.mockLocationBadge}>
            <Text style={styles.mockLocationText}>⚠️ Mock Location</Text>
          </View>
        )}
      </View>

      <Image
        source={{ uri: photo.imageBase64 }}
        style={styles.photoImage}
        onError={handleImageErrorInternal}
        resizeMode="cover"
      />

      {photo.id && hasImageError(photo.id) && (
        <View style={styles.imageError}>
          <Text style={styles.imageErrorText}>Failed to load image</Text>
        </View>
      )}

      <View style={styles.photoDetails}>
        <Text style={styles.locationText}>
          📍 {formatCoordinates(photo.location.latitude, photo.location.longitude)}
        </Text>
        
        {photo.location.altitude && (
          <Text style={styles.altitudeText}>
            🏔️ Altitude: {photo.location.altitude}m
          </Text>
        )}

        {photo.location.weather && (
          <Text style={styles.weatherText}>
            🌡️ {photo.location.weather.condition}, {photo.location.weather.temp}°C
          </Text>
        )}

        <View style={styles.photoActions}>
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => handleViewDetails(photo)}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.deleteButton, loading && styles.deleteButtonDisabled]}
            onPress={onDelete(photo.id!)}
            disabled={loading}
          >
            <Text style={styles.deleteButtonText}>
              {loading ? 'Deleting...' : 'Delete'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PhotoItem;