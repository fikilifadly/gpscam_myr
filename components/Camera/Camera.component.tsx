// components/CameraComponent.tsx
import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import useCamera from './useCamera';
import useLocation from '@/hooks/location/useLocation';
import styles from './Camera.component.styles';

/**
 * Camera component for capturing photos with GPS data
 */
const CameraComponent: React.FC = () => {
  const {
    cameraRef,
    hasPermission,
    cameraType,
    isCapturing,
    uploadLoading,
    isGrantingPermission,
    handleCapturePhoto,
    toggleCameraType,
    grantPermission,
  } = useCamera();

  const { 
    hasLocationPermission, 
    hasSensorPermission,
    isCheckingLocation, 
    requestLocationPermissions 
  } = useLocation();

  // Check if we have all required permissions
  const hasAllPermissions = hasPermission && hasLocationPermission;

  // Combined loading states
  const isLoading = isCheckingLocation || isGrantingPermission;
  const isButtonDisabled = isCapturing || uploadLoading || isLoading || !hasAllPermissions;

  // Show loading while checking permissions
  if (hasPermission === null || isLoading) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>
          {isGrantingPermission ? 'Requesting permissions...' : 'Checking permissions...'}
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <Text style={styles.subPermissionText}>
          Camera permission is required to take photos.
        </Text>
        <TouchableOpacity 
          style={[styles.permissionButton, isGrantingPermission && styles.buttonDisabled]}
          onPress={grantPermission}
          disabled={isGrantingPermission}
        >
          {isGrantingPermission ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.permissionButtonText}>Grant Camera Permission</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  if (hasLocationPermission === false) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <Text style={styles.permissionText}>Location permission required</Text>
        <Text style={styles.subPermissionText}>
          GPS Camera needs location access to tag your photos with GPS data and weather information.
          {!hasSensorPermission && '\n\nNote: Compass features are not available on this device.'}
        </Text>
        <TouchableOpacity 
          style={[styles.permissionButton, isGrantingPermission && styles.buttonDisabled]}
          onPress={requestLocationPermissions}
          disabled={isGrantingPermission}
        >
          {isGrantingPermission ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.permissionButtonText}>Grant Location Permission</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExpoCamera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
      >
        <View style={styles.controls}>
          {/* Sensor Status Indicator */}
          {!hasSensorPermission && (
            <View style={styles.sensorWarning}>
              <Text style={styles.sensorWarningText}>
                ⓘ Compass not available
              </Text>
            </View>
          )}
          
          {/* Info Container */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              📍 Location: Ready • 🧭 Compass: {hasSensorPermission ? 'Ready' : 'N/A'}
            </Text>
          </View>

          {/* Capture Button */}
          <TouchableOpacity 
            style={[
              styles.captureButton, 
              isButtonDisabled && styles.captureButtonDisabled
            ]}
            onPress={handleCapturePhoto}
            disabled={isButtonDisabled}
          >
            {isCapturing || uploadLoading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <Text style={styles.captureButtonText}>
                {!hasAllPermissions ? 'Need Permissions' : 'Capture Photo'}
              </Text>
            )}
          </TouchableOpacity>
          
          {/* Flip Camera Button */}
          <TouchableOpacity 
            style={[styles.flipButton, isButtonDisabled && styles.buttonDisabled]}
            onPress={toggleCameraType}
            disabled={isButtonDisabled}
          >
            <Text style={styles.flipButtonText}>Flip</Text>
          </TouchableOpacity>
        </View>

        {/* Overlay Loading when capturing/uploading */}
        {(isCapturing || uploadLoading) && (
          <View style={styles.overlay}>
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.overlayText}>
                {isCapturing ? 'Capturing photo...' : 'Processing photo...'}
              </Text>
              <Text style={styles.overlaySubText}>
                {isCapturing ? 'Getting location data...' : 'Uploading to cloud...'}
              </Text>
            </View>
          </View>
        )}
      </ExpoCamera>
    </View>
  );
};

export default CameraComponent;