import * as ImageManipulator from 'expo-image-manipulator';
import { ProcessedImage } from '@/types/index.';
import Constant from '@/constants';

/**
 * Add watermark/logo to image
 */
export const addWatermark = async (imageUri: string): Promise<ImageManipulator.ImageResult> => {
  try {
    // For now, just resize and optimize the image
    // In production, you would overlay a logo watermark using ImageManipulator
    return await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: Constant.IMAGE.MAX_WIDTH } },
      ],
      { 
        compress: Constant.IMAGE.COMPRESSION, 
        format: ImageManipulator.SaveFormat.JPEG,
        base64: false 
      }
    );
  } catch (error) {
    console.error('Error adding watermark:', error);
    throw new Error('Failed to process image');
  }
};

/**
 * Add EXIF data with GPS and custom metadata
 */
export const addExifData = async (
  imageUri: string,
  metadata: Omit<ProcessedImage, 'uri'>
): Promise<string> => {
  const { location, weather, compass, hasMockLocation, timestamp } = metadata;
  
  try {
    // Note: EXIF writing in React Native requires native modules
    // This is a placeholder implementation
    // In production, use a library like 'react-native-exif' or implement native module
    
    const exifData = {
      // Standard GPS EXIF data
      GPSLatitude: Math.abs(location.latitude),
      GPSLatitudeRef: location.latitude >= 0 ? 'N' : 'S',
      GPSLongitude: Math.abs(location.longitude),
      GPSLongitudeRef: location.longitude >= 0 ? 'E' : 'W',
      GPSAltitude: location.altitude,
      GPSTimeStamp: new Date().toISOString(),
      GPSDateStamp: new Date().toISOString().split('T')[0],
      
      // Custom metadata
      'X-DataGeoTag': `${location.latitude}, ${location.longitude}`,
      'X-Weather': weather.condition,
      'X-Temperature': weather.temperature,
      'X-Compass': compass.trueHeading,
      'X-Altitude': location.altitude,
      'X-MockLocation': hasMockLocation,
      'X-Timestamp': timestamp,
      'X-Accuracy': location.accuracy,
    };

    console.log('EXIF Data would be added:', exifData);
    
    // Return original URI since we can't modify EXIF in this example
    // In real implementation, you would use a native module to write EXIF
    return imageUri;
  } catch (error) {
    console.error('Error adding EXIF data:', error);
    return imageUri; // Return original on error
  }
};

/**
 * Create thumbnail from image
 */
export const createThumbnail = async (uri: string): Promise<ImageManipulator.ImageResult> => {
  try {
    return await ImageManipulator.manipulateAsync(
      uri,
      [
        { resize: { width: Constant.IMAGE.THUMBNAIL_WIDTH } },
      ],
      { 
        compress: Constant.IMAGE.COMPRESSION, 
        format: ImageManipulator.SaveFormat.JPEG 
      }
    );
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    throw new Error('Failed to create thumbnail');
  }
};

/**
 * Extract EXIF data from image
 */
export const extractExifData = async (imageUri: string): Promise<Record<string, any>> => {
  // Placeholder for EXIF extraction
  // Use a library like 'expo-media-library' or 'react-native-exif'
  try {
    // This would be implemented with a proper EXIF library
    return {};
  } catch (error) {
    console.error('Error extracting EXIF data:', error);
    return {};
  }
};