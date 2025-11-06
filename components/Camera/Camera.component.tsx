import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import useCamera from './useCamera';
import styles from './Camera.component.styles';

/**
 * Camera component for capturing photos with GPS data
 * 
 * @returns {React.FC} Camera component
 */
const CameraComponent: React.FC = () => {
  const {
    cameraRef,
    hasPermission,
    cameraType,
    isCapturing,
    uploadLoading,
    handleCapturePhoto,
    toggleCameraType,
    grantPermission,
  } = useCamera();

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={grantPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ExpoCamera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
      >
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[
              styles.captureButton, 
              (isCapturing || uploadLoading) && styles.captureButtonDisabled
            ]}
            onPress={handleCapturePhoto()}
            disabled={isCapturing || uploadLoading}
          >
            <Text style={styles.captureButtonText}>
              {isCapturing ? 'Capturing...' : 'Capture'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.flipButton}
            onPress={toggleCameraType}
            disabled={isCapturing || uploadLoading}
          >
            <Text style={styles.flipButtonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </ExpoCamera>
    </View>
  );
};

export default CameraComponent;