import { Platform } from 'react-native';
import * as Application from 'expo-application';
import { MockDetectionResult } from '@/types/index.';
import Constant from '@/constants';

/**
 * Check if mock location is enabled and detect mock location apps
 */
export const checkMockLocation = async (): Promise<MockDetectionResult> => {
  try {
    if (Platform.OS === 'android') {
      // Check for mock location apps
      const installedApps = await getInstalledApps();
      const mockApps = installedApps.filter(app => 
        Constant.MOCK_LOCATION_APPS.includes(app.packageName)
      );

      return {
        isMocked: mockApps.length > 0,
        mockApps: mockApps.map(app => app.packageName),
        provider: null, // Would need additional native module to get location provider
      };
    }
    
    // iOS has stricter location spoofing prevention
    return {
      isMocked: false,
      mockApps: [],
      provider: null,
    };
  } catch (error) {
    console.error('Error checking mock location:', error);
    return {
      isMocked: false,
      mockApps: [],
      provider: null,
    };
  }
};

/**
 * Get installed applications (Android only)
 */
const getInstalledApps = async (): Promise<Array<{packageName: string, name: string}>> => {
  if (Platform.OS !== 'android') {
    return [];
  }

  try {
    // Note: This requires additional permissions on Android
    // For demo purposes, returning empty array
    // In production, you'd use a library like 'react-native-installed-packages'
    return [];
  } catch (error) {
    console.error('Error getting installed apps:', error);
    return [];
  }
};

/**
 * Calculate distance between two coordinates in kilometers
 */
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Convert degrees to radians
 */
const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

/**
 * Format location coordinates for display
 */
export const formatCoordinates = (latitude: number, longitude: number): string => {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lonDirection = longitude >= 0 ? 'E' : 'W';
  
  return `${Math.abs(latitude).toFixed(6)}°${latDirection}, ${Math.abs(longitude).toFixed(6)}°${lonDirection}`;
};

/**
 * Get address from coordinates (reverse geocoding)
 */
export const reverseGeocode = async (latitude: number, longitude: number): Promise<string | null> => {
  try {
    // This would use a geocoding service like Google Maps or OpenStreetMap
    // For now, return null - implement based on your chosen service
    return null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
};