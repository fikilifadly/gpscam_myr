import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';

import Constant from '@/constants';

const { PERMISSION: { GRANTED } } = Constant;

/**
 * Request camera permissions
 * 
 * @returns {Promise<boolean>} Promise that resolves to true if permissions granted
 */
export const requestCameraPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === GRANTED;
  } catch (error) {
    console.error('Error requesting camera permissions:', error);
    Alert.alert('Error', 'Failed to access camera permissions');
    return false;
  }
};

/**
 * Check camera permissions status
 * 
 * @returns {Promise<boolean>} Promise that resolves to true if permissions granted
 */
export const checkCameraPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Camera.getCameraPermissionsAsync();
    return status === GRANTED;
  } catch (error) {
    console.error('Error checking camera permissions:', error);
    return false;
  }
};

/**
 * Compress and resize image to 640x480
 * 
 * @param {string} imageUri - Original image URI
 * @returns {Promise<string>} Promise that resolves to compressed image URI
 */
export const compressImage = async (imageUri: string): Promise<string> => {
  try {
    const compressedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: 640, height: 480 } },
      ],
      {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );
    
    return compressedImage.uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to compress image');
  }
};

/**
 * Convert image to base64 string
 * 
 * @param {string} imageUri - Image URI to convert
 * @returns {Promise<string>} Promise that resolves to base64 string
 */
export const imageToBase64 = async (imageUri: string): Promise<string> => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error('Failed to convert image to base64');
  }
};

export default {
  requestCameraPermissions,
  checkCameraPermissions,
  compressImage,
  imageToBase64
};