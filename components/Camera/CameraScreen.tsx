import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { CameraType } from 'expo-camera';
import useCamera  from '@/hooks/Camera/useCamera';
import useLocation from '@/hooks/Location/useLocation';
import useWeather from '@/hooks/Weather/useWeather';
import useAuth from '../../hooks/useAuth';
import firestoreService from '../../services/firestore';
import CameraPreview from './CameraPreview';
import CameraControls from './CameraControls';
import MetadataOverlay from '../metadata/MetadataOverlay';
import LoadingIndicator from '../ui/LoadingIndicator';
import { ProcessedImage, CameraPhoto } from '../../types';

/**
 * Main camera screen component with Firestore integration
 */
const CameraScreen: React.FC = (): JSX.Element => {
  const {
    cameraRef,
    hasPermission,
    previewUri,
    isTakingPicture,
    cameraType,
    requestPermission,
    takePicture,
    retakePicture,
    savePicture,
    switchCamera,
  } = useCamera();

  const {
    location,
    compass,
    mockDetection,
    error: locationError,
    isLoading: locationLoading,
    requestPermission: requestLocationPermission,
    getCurrentLocation,
    startWatching,
  } = useLocation();

  const { weather, getWeather } = useWeather();
  const { user, isLoading: authLoading } = useAuth();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<CameraPhoto | null>(null);

  /**
   * Initialize permissions and services
   */
  useEffect((): void => {
    const initializeApp = async (): Promise<void> => {
      try {
        const [cameraGranted, locationGranted] = await Promise.all([
          requestPermission(),
          requestLocationPermission(),
        ]);

        if (!cameraGranted || !locationGranted) {
          Alert.alert(
            'Permissions Required',
            'Camera and location permissions are required for this app to function properly.',
            [{ text: 'OK' }]
          );
          return;
        }

        if (locationGranted) {
          await getCurrentLocation();
          startWatching();
        }

        setInitialized(true);
      } catch (error) {
        console.error('Initialization error:', error);
        Alert.alert('Error', 'Failed to initialize app');
      }
    };

    initializeApp();
  }, [requestPermission, requestLocationPermission, getCurrentLocation, startWatching]);

  /**
   * Convert image URI to Blob for Firebase Storage
   */
  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return await response.blob();
  };

  /**
   * Create thumbnail from image
   */
  const createThumbnail = async (uri: string): Promise<Blob> => {
    // Using expo-image-manipulator to create thumbnail
    const { manipulateAsync } = await import('expo-image-manipulator');
    const result = await manipulateAsync(
      uri,
      [{ resize: { width: 200 } }],
      { compress: 0.7, format: 'jpeg' }
    );
    
    const response = await fetch(result.uri);
    return await response.blob();
  };

  /**
   * Save photo to Firestore with all metadata
   */
  const saveToFirestore = async (processedImage: ProcessedImage): Promise<void> => {
    if (!user) {
      throw new Error('User must be authenticated to save photos');
    }

    try {
      // Convert image to Blob
      const imageBlob = await uriToBlob(processedImage.uri);
      const thumbnailBlob = await createThumbnail(processedImage.uri);

      // Save to Firestore
      await firestoreService.savePhotoWithMetadata(
        user.uid,
        processedImage,
        imageBlob,
        thumbnailBlob
      );

      console.log('Photo saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      throw error;
    }
  };

  /**
   * Handle picture capture
   */
  const handleTakePicture = async (): Promise<void> => {
    try {
      const photo = await takePicture();
      if (photo && location) {
        setCapturedPhoto(photo);
        await getWeather(location.latitude, location.longitude);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture');
    }
  };

  /**
   * Handle picture save with Firestore integration
   */
  const handleSavePicture = async (): Promise<void> => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please sign in to save photos');
      return;
    }

    if (!capturedPhoto || !location || !compass || !weather) {
      Alert.alert('Error', 'Missing required data to save picture');
      return;
    }

    setIsSaving(true);
    try {
      // Process image with metadata
      const processedImage = await savePicture(capturedPhoto, {
        location,
        weather,
        compass,
        hasMockLocation: mockDetection.isMocked,
        timestamp: new Date().toISOString(),
        exifData: {},
      });

      if (processedImage) {
        // Save to Firestore
        await saveToFirestore(processedImage);
        
        Alert.alert('Success', 'Photo saved with GPS metadata to cloud!');
        retakePicture();
        setCapturedPhoto(null);
      } else {
        Alert.alert('Error', 'Failed to process picture');
      }
    } catch (error) {
      console.error('Error saving picture:', error);
      Alert.alert('Error', 'Failed to save picture to cloud');
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading while initializing or authenticating
  if (!initialized || authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
        <Text style={styles.loadingText}>
          {authLoading ? 'Checking authentication...' : 'Initializing GPS Camera...'}
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please sign in to use the camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!previewUri ? (
        <>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={cameraType}
            ratio="16:9"
          >
            <MetadataOverlay
              location={location}
              weather={weather}
              compass={compass}
              mockDetection={mockDetection}
            />
          </Camera>
          <CameraControls
            onTakePicture={handleTakePicture}
            onSwitchCamera={switchCamera}
            isTakingPicture={isTakingPicture}
            isLocationLoading={locationLoading}
            hasMockLocation={mockDetection.isMocked}
          />
        </>
      ) : (
        <CameraPreview
          imageUri={previewUri}
          onRetake={retakePicture}
          onSave={handleSavePicture}
          isSaving={isSaving}
          location={location}
          weather={weather}
          compass={compass}
          hasMockLocation={mockDetection.isMocked}
        />
      )}
    </View>
  );
};

// ... styles remain the same