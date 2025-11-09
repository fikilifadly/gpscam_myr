// screens/ListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Alert, StyleSheet, RefreshControl } from 'react-native';
import useFirebase from '@/hooks/firebase/useFirebase';
import WebViewMap from '@/components/Map/Map.component';

const ListScreen: React.FC = () => {
  const { photos, loadPhotos, loading, deletePhoto, lastUpdate } = useFirebase();
  const [lastViewedCount, setLastViewedCount] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Track when user views the gallery
  useEffect(() => {
    setLastViewedCount(photos.length);
  }, []);

  // Calculate new photos count
  const newPhotosCount = photos.length - lastViewedCount;
  const hasNewPhotos = newPhotosCount > 0;

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPhotos();
    setRefreshing(false);
  };

  const markAsViewed = () => {
    setLastViewedCount(photos.length);
  };

  const debugBase64Data = (photos: any[]) => {
    photos.forEach((photo, index) => {
      console.log(`=== Photo ${index + 1} Debug ===`);
      console.log('Photo ID:', photo.id);
      console.log('Has imageBase64:', !!photo.imageBase64);
      console.log('Location data:', photo.location);
      console.log('================');
    });
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    if (photos.length > 0 && !loading) {
      debugBase64Data(photos);
    }
  }, [photos, loading]);

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

  const renderPhotoItem = ({ item, index }: { item: any; index: number }) => {
    const isNewPhoto = index < newPhotosCount;
    
    if (!item.imageBase64) {
      console.log('No imageBase64 found for item:', item.id);
      return (
        <View style={styles.photoCard}>
          {isNewPhoto && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>}
          
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Image not available</Text>
          </View>
          
          {item.location?.latitude && item.location?.longitude && (
            <WebViewMap
              latitude={item.location.latitude}
              longitude={item.location.longitude}
              altitude={item.location.altitude}
            />
          )}
          
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

    let imageSource = item.imageBase64;
    if (!imageSource.startsWith('data:image/')) {
      imageSource = `data:image/jpeg;base64,${imageSource}`;
    }
    imageSource = imageSource.trim().replace(/^"(.*)"$/, '$1');

    return (
      <View style={styles.photoCard}>
        {isNewPhoto && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>}
        
        <Image 
          source={{ uri: imageSource }} 
          style={styles.photoImage}
          resizeMode="cover"
          onError={(error) => {
            console.log('Image loading error:', error.nativeEvent.error);
          }}
          onLoad={() => console.log('Image loaded successfully for item:', item.id)}
        />
        
        {/* Map Section */}
        {item.location?.latitude && item.location?.longitude && (
          <WebViewMap
            latitude={item.location.latitude}
            longitude={item.location.longitude}
            altitude={item.location.altitude}
          />
        )}

        <View style={styles.photoInfo}>
          <Text style={styles.locationText}>
            📍 Coordinates: {item.location?.latitude?.toFixed(6) || 'N/A'}, {item.location?.longitude?.toFixed(6) || 'N/A'}
          </Text>
          
          <Text style={styles.mockText}>
            {item.isMockLocation ? '⚠️ Suspected Mock Location' : '✅ Clean Location'}
          </Text>
          
          <Text style={styles.weatherText}>
            {item.location?.weather ? `🌤 ${item.location.weather.condition}, ${item.location.weather.temp}°C` : '🌤 Weather data unavailable'}
          </Text>
          
          {item.location?.compassHeading && (
            <Text style={styles.compassText}>
              🧭 Heading: {item.location.compassHeading}°
            </Text>
          )}
          
          {item.location?.magneticField && (
            <Text style={styles.magneticText}>
              🧲 Magnetic Field: {item.location.magneticField} μT
            </Text>
          )}
          
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
            <Text style={styles.deleteButtonText}>Delete Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
     <View style={styles.header}>
      <Text style={styles.title}>Photo Gallery</Text>
      <View style={styles.statusContainer}>
        {loading && <Text style={styles.statusText}>🔄 Loading...</Text>}
        <Text style={styles.countText}>{photos.length} photos</Text>
      </View>
    </View>
      
      {loading && !refreshing ? (
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
              tintColor="#007AFF"
            />
          }
          onScroll={() => {
            // Auto-mark as viewed when user scrolls
            if (hasNewPhotos) {
              markAsViewed();
            }
          }}
        />
      )}
    </View>
  );
};

// Add these new styles:
const styles = StyleSheet.create({
  compassText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 16,
  },
  countText: {
  color: '#666',
  fontSize: 12,
},
  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    marginTop: 8,
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
  color: '#FF3B30',
  fontSize: 12,
},
  geoTagText: {
    color: '#888',
    fontFamily: 'monospace',
    fontSize: 10,
    marginBottom: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  magneticText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  mockText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  newBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 10,
  },
  newBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newPhotosIndicator: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  newPhotosText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
  statusContainer: {
  alignItems: 'flex-end',
},
  statusText: {
  color: '#007AFF',
  fontSize: 12,
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
  },
  weatherText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default ListScreen;