import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PhotoData } from '@/types/index.';
import styles from './PhotoDetails.component.style';

/**
 * Photo Details component for displaying full photo information with map integration
 * 
 * @returns {React.FC} Photo Details component
 */
const PhotoDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photo } = route.params as { photo: PhotoData };

  /**
   * Handle open in maps
   */
  const handleOpenInMaps = (): void => {
    const { latitude, longitude } = photo.location;
    const url = `https://maps.google.com/maps?q=${latitude},${longitude}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open maps application');
    });
  };

  /**
   * Handle share photo
   */
  const handleSharePhoto = (): void => {
    Alert.alert('Share', 'Share functionality to be implemented');
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Unknown date';
    }
  };

  /**
   * Format coordinates for display
   */
  const formatCoordinates = (lat: number, lng: number): string => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Photo Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Photo */}
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: photo.imageBase64 }}
          style={styles.photo}
          resizeMode="contain"
        />
      </View>

      {/* Location Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Location Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Coordinates:</Text>
          <Text style={styles.infoValue}>
            {formatCoordinates(photo.location.latitude, photo.location.longitude)}
          </Text>
        </View>

        {photo.location.altitude && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altitude:</Text>
            <Text style={styles.infoValue}>{photo.location.altitude}m</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mock Location:</Text>
          <Text style={[
            styles.infoValue,
            photo.isMockLocation ? styles.mockWarning : styles.authentic
          ]}>
            {photo.isMockLocation ? '⚠️ Detected' : '✅ Authentic'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.mapButton}
          onPress={handleOpenInMaps}
        >
          <Text style={styles.mapButtonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Information */}
      {photo.location.weather && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌤️ Weather Conditions</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Condition:</Text>
            <Text style={styles.infoValue}>{photo.location.weather.condition}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Temperature:</Text>
            <Text style={styles.infoValue}>{photo.location.weather.temp}°C</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Humidity:</Text>
            <Text style={styles.infoValue}>{photo.location.weather.humidity}%</Text>
          </View>
        </View>
      )}

      {/* EXIF & Technical Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Technical Details</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Photo ID:</Text>
          <Text style={styles.infoValue}>{photo.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Taken:</Text>
          <Text style={styles.infoValue}>{formatDate(photo.createdAt || '')}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>EXIF Tag:</Text>
          <Text style={styles.infoValue}>{photo.exifData.customGeoTag}</Text>
        </View>

        {photo.location.compassHeading && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Compass Heading:</Text>
            <Text style={styles.infoValue}>{photo.location.compassHeading}°</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleSharePhoto}
        >
          <Text style={styles.shareButtonText}>Share Photo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PhotoDetails;