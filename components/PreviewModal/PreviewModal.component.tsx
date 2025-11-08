import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { PhotoData } from '@/types/index.';
import styles from './PreviewModal.component.styles';

interface PhotoPreviewModalProps {
  visible: boolean;
  photoUri: string;
  photoData: Omit<PhotoData, "id" | "createdAt"> | null;
  isUploading: boolean;
  onRetake: () => void;
  onUpload: (photoData: Omit<PhotoData, "id" | "createdAt">) => void;
  onClose: () => void;
}

const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  visible,
  photoUri,
  photoData,
  isUploading,
  onRetake,
  onUpload,
  onClose
}) => {
  
  const handleUpload = () => {
    if (photoData) {
      onUpload(photoData);
    }
  };

  if (!photoData) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Review Photo</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Photo Preview */}
          <View style={styles.photoContainer}>
            <Image source={{ uri: photoUri }} style={styles.photo} />
          </View>

          {/* Location Information */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>📍 Location Information</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Coordinates:</Text>
              <Text style={styles.infoValue}>
                {photoData.location.latitude.toFixed(6)}, {photoData.location.longitude.toFixed(6)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Altitude:</Text>
              <Text style={styles.infoValue}>
                {photoData.location.altitude ? `${photoData.location.altitude}m` : 'Not available'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Compass:</Text>
              <Text style={styles.infoValue}>
                {photoData.location.compassHeading ? `${photoData.location.compassHeading}°` : 'Not available'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Magnetic Field:</Text>
              <Text style={styles.infoValue}>
                {photoData.location.magneticField ? `${photoData.location.magneticField}µT` : 'Not available'}
              </Text>
            </View>

            {photoData.location.weather && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Weather:</Text>
                <Text style={styles.infoValue}>
                  {photoData.location.weather.condition}, {photoData.location.weather.temp}°C
                </Text>
              </View>
            )}

            <View style={[styles.infoRow, styles.mockDetectionRow]}>
              <Text style={styles.infoLabel}>GPS Status:</Text>
              <View style={[
                styles.statusBadge,
                photoData.isMockLocation ? styles.mockBadge : styles.cleanBadge
              ]}>
                <Text style={styles.statusText}>
                  {photoData.isMockLocation ? '⚠️ Suspected Mock' : '✅ Clean GPS'}
                </Text>
              </View>
            </View>

            <View style={styles.geoTagContainer}>
              <Text style={styles.geoTagLabel}>EXIF Geo Tag:</Text>
              <Text style={styles.geoTagValue}>
                {photoData.exifData.customGeoTag}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.retakeButton]}
            onPress={onRetake}
            disabled={isUploading}
          >
            <Text style={styles.retakeButtonText}>Retake Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
            onPress={handleUpload}
            disabled={isUploading || !photoData}
          >
            {isUploading ? (
              <>
                <ActivityIndicator size="small" color="#FFFFFF" style={styles.loadingSpinner} />
                <Text style={styles.uploadButtonText}>Uploading...</Text>
              </>
            ) : (
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PhotoPreviewModal;