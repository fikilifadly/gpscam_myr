import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import useFirebase from '@/hooks/firebase/useFirebase';
import { PhotoData, AsyncVoidFunction, PromiseVoid } from '@/types/index.';
import { UsePhotoGallery } from './PhotoGallery.component.types';

/**
 * Format coordinates for display
 * 
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude  
 * @returns {string} Formatted coordinates
 * @private
 */
const _formatCoordinates = (lat: number, lng: number): string => {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

/**
 * Format date for display
 * 
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 * @private
 */
const _formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return 'Unknown date';
  }
};

/**
 * Handle photo deletion with confirmation
 * 
 * @param {string} photoId - Photo ID to delete
 * @param {Function} deletePhoto - Delete photo function
 * @returns {AsyncVoidFunction} Async delete function
 * @private
 */
const _handlePhotoDeletion = (
  photoId: string,
  deletePhoto: (photoId: string) => AsyncVoidFunction
): AsyncVoidFunction => {
  return async (): PromiseVoid => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const deleteFn = deletePhoto(photoId);
              await deleteFn();
            } catch (error) {
              console.error('Delete error:', error);
            }
          }
        },
      ]
    );
  };
};

/**
 * Handle view photo details
 * 
 * @param {PhotoData} photo - Photo data
 * @private
 */
const _handleViewDetails = (photo: PhotoData): void => {
  Alert.alert(
    'Photo Details',
    `Location: ${_formatCoordinates(photo.location.latitude, photo.location.longitude)}\n` +
    `Altitude: ${photo.location.altitude ? `${photo.location.altitude}m` : 'N/A'}\n` +
    `Weather: ${photo.location.weather ? `${photo.location.weather.condition}, ${photo.location.weather.temp}°C` : 'N/A'}\n` +
    `Mock Location: ${photo.isMockLocation ? 'Yes ⚠️' : 'No'}\n` +
    `Taken: ${_formatDate(photo.createdAt || '')}`
  );
};

/**
 * Photo Gallery hook for managing photo operations and state
 * 
 * @returns {UsePhotoGallery} Photo gallery state and operations
 */
const usePhotoGallery = (): UsePhotoGallery => {
  const { 
    photos, 
    loading, 
    error,
    loadPhotos, 
    deletePhoto,
  } = useFirebase();

  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  /**
   * Handle image load error
   * 
   * @param {string} photoId - Photo ID
   */
  const handleImageError = useCallback((photoId: string): void => {
    setImageErrors(prev => new Set(prev).add(photoId));
  }, []);

  /**
   * Handle photo deletion
   * 
   * @param {string} photoId - Photo ID to delete
   * @returns {AsyncVoidFunction} Async delete function
   */
  const handleDeletePhoto = useCallback((photoId: string): AsyncVoidFunction => {
    return _handlePhotoDeletion(photoId, deletePhoto);
  }, [deletePhoto]);

  /**
   * Handle view photo details
   * 
   * @param {PhotoData} photo - Photo data
   */
  const handleViewDetails = useCallback((photo: PhotoData): void => {
    _handleViewDetails(photo);
  }, []);

  /**
   * Handle pull to refresh
   */
  const handleRefresh = useCallback((): void => {
    loadPhotos();
  }, [loadPhotos]);

  /**
   * Check if image has error
   * 
   * @param {string} photoId - Photo ID
   * @returns {boolean} True if image has error
   */
  const hasImageError = useCallback((photoId: string): boolean => {
    return imageErrors.has(photoId);
  }, [imageErrors]);

  return {
    photos,
    loading,
    error,
    loadPhotos,
    handleDeletePhoto,
    handleViewDetails,
    handleRefresh,
    handleImageError,
    hasImageError,    
    formatCoordinates: _formatCoordinates,
    formatDate: _formatDate,
  };
};

export default usePhotoGallery;