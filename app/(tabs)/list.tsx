// screens/GalleryScreen.tsx
import React, { useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import useFirebase from '@/hooks/firebase/useFirebase';

const ListScreen: React.FC = () => {
  const { photos, loadPhotos, loading, deletePhoto } = useFirebase();

  const debugBase64Data = (photos: any[]) => {
  photos.forEach((photo, index) => {
    console.log(`=== Photo ${index + 1} Debug ===`);
    console.log('Photo ID:', photo.id);
    console.log('Has imageBase64:', !!photo.imageBase64);
    
    if (photo.imageBase64) {
      console.log('Base64 length:', photo.imageBase64.length);
      console.log('Starts with data:image:', photo.imageBase64.startsWith('data:image'));
      console.log('First 100 chars:', photo.imageBase64.substring(0, 100));
    }
    
    console.log('Location data:', photo.location);
    console.log('================');
  });
};

// Call it in your useEffect
useEffect(() => {
  loadPhotos();
}, []);

useEffect(() => {
  if (photos.length > 0 && !loading) {
    debugBase64Data(photos);
  }
}, [photos, loading]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleDeletePhoto = (photoId: string) => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => deletePhoto(photoId)()
        }
      ]
    );
  };

  // FIX: Proper base64 image rendering
  const renderPhotoItem = ({ item }: { item: any }) => {
    // Ensure we have valid base64 data
    if (!item.imageBase64) {
      console.log('No imageBase64 found for item:', item.id);
      return (
        <View style={styles.photoCard}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Image not available</Text>
          </View>
          <View style={styles.photoInfo}>
            <Text style={styles.locationText}>
              📍 {item.location?.latitude?.toFixed(6) || 'N/A'}, {item.location?.longitude?.toFixed(6) || 'N/A'}
            </Text>
            <Text style={styles.mockText}>
              {item.isMockLocation ? '⚠️ Suspected Mock Location' : '✅ Clean Location'}
            </Text>
          </View>
        </View>
      );
    }

    // Clean up base64 data if needed
    let imageSource = item.imageBase64;
    
    // If base64 data doesn't have data URL prefix, add it
    if (!imageSource.startsWith('data:image/')) {
      imageSource = `data:image/jpeg;base64,${imageSource}`;
    }
    
    // Remove any extra quotes or spaces
    imageSource = imageSource.trim().replace(/^"(.*)"$/, '$1');

    return (
      <View style={styles.photoCard}>
        <Image 
          source={{ uri: imageSource }} 
          style={styles.photoImage}
          resizeMode="cover"
          onError={(error) => {
            console.log('Image loading error:', error.nativeEvent.error);
            console.log('Image source:', imageSource.substring(0, 100) + '...');
          }}
          onLoad={() => console.log('Image loaded successfully for item:', item.id)}
        />
        <View style={styles.photoInfo}>
          <Text style={styles.locationText}>
            📍 {item.location?.latitude?.toFixed(6) || 'N/A'}, {item.location?.longitude?.toFixed(6) || 'N/A'}
          </Text>
          <Text style={styles.mockText}>
            {item.isMockLocation ? '⚠️ Suspected Mock Location' : '✅ Clean Location'}
          </Text>
          <Text style={styles.weatherText}>
            {item.location?.weather ? `🌤 ${item.location.weather.condition}, ${item.location.weather.temp}°C` : '🌤 Weather data unavailable'}
          </Text>
          <Text style={styles.timestampText}>
            📅 {item.createdAt ? new Date(item.createdAt?.toDate?.() || item.createdAt).toLocaleString() : 'Unknown date'}
          </Text>
          <Text style={styles.geoTagText}>
            {item.exifData?.customGeoTag || 'No geo tag'}
          </Text>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeletePhoto(item.id!)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Gallery</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading photos...</Text>
        </View>
      ) : photos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No photos yet</Text>
          <Text style={styles.emptySubText}>Capture some photos to see them here</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id!}
          renderItem={renderPhotoItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onRefresh={loadPhotos}
          refreshing={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 16,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptySubText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 18,
    marginBottom: 8,
  },
  errorContainer: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    height: 250,
    justifyContent: 'center',
    width: '100%',
  },
  errorText: {
    color: '#666',
    fontSize: 16,
  },
  geoTagText: {
    color: '#888',
    fontFamily: 'monospace',
    fontSize: 10,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
  },
  locationText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  mockText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  photoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  photoImage: {
    height: 250,
    width: '100%',
  },
  photoInfo: {
    padding: 16,
  },
  timestampText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  weatherText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default ListScreen;