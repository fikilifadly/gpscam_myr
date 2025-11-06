import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import usePhotoGallery from './usePhotoGallery';
import PhotoItem from '../PhotoItem/PhotoItem.component';
import styles from './PhotoGallery.component.style';

/**
 * Empty state component
 * 
 * @returns {React.ReactElement} Empty state component
 */
const EmptyState: React.FC = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No photos yet</Text>
    <Text style={styles.emptySubtext}>
      Capture your first GPS-tagged photo using the camera
    </Text>
  </View>
);

/**
 * Loading state component
 * 
 * @returns {React.ReactElement} Loading state component
 */
const LoadingState: React.FC = () => (
  <View style={styles.centerContainer}>
    <Text style={styles.loadingText}>Loading photos...</Text>
  </View>
);

/**
 * Error state component
 * 
 * @param {Object} props - Component props
 * @param {string} props.error - Error message
 * @param {Function} props.onRetry - Retry function
 * @param {Function} props.onDismiss - Dismiss function
 * @returns {React.ReactElement} Error state component
 */
const ErrorState: React.FC<{
  error: string;
  onRetry: () => void;
  // onDismiss: () => void;
}> = ({ error, onRetry }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>Error: {error}</Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Text style={styles.retryButtonText}>Retry</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.clearErrorButton} 
    // onPress={onDismiss}
    >
      <Text style={styles.clearErrorButtonText}>Dismiss</Text>
    </TouchableOpacity>
  </View>
);

/**
 * Photo gallery component for displaying GPS-tagged photos
 * 
 * @returns {React.FC} Photo gallery component
 */
const PhotoGallery: React.FC = () => {
  const {
    photos,
    loading,
    error,
    loadPhotos,
    handleDeletePhoto,
    handleRefresh,
  } = usePhotoGallery();

  /**
   * Load photos on component mount
   */
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  if (loading && photos.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState 
        error={error} 
        onRetry={loadPhotos}
        // onDismiss={}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Gallery</Text>
        <Text style={styles.subtitle}>
          {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <PhotoItem 
            photo={item} 
            onDelete={handleDeletePhoto}
            loading={loading}
          />
        )}
        keyExtractor={(item) => item.id || Math.random().toString()}
        refreshing={loading}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
};

export default PhotoGallery;