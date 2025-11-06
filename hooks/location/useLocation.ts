import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import { PromiseVoid } from '@/types/index.';

/**
 * Hook for managing location permissions
 * 
 * @returns {Object} Location permissions state and operations
 */
const useLocation = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false);
  const [isCheckingLocation, setIsCheckingLocation] = useState<boolean>(true);

  /**
   * Check current location permissions
   * 
   * @returns {PromiseVoid} Promise that resolves when permissions are checked
   * @private
   */
  const _checkLocationPermissions = async (): PromiseVoid => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setHasLocationPermission(status === 'granted');
    } catch (error) {
      console.error('Error checking location permissions:', error);
      setHasLocationPermission(false);
    } finally {
      setIsCheckingLocation(false);
    }
  };

  /**
   * Request location permissions
   * 
   * @returns {Promise<boolean>} Promise that resolves to true if permissions granted
   */
  const requestLocationPermissions = async (): Promise<boolean> => {
    try {
      setIsCheckingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setHasLocationPermission(granted);
      
      if (!granted) {
        Alert.alert(
          'Location Permission Required',
          'GPS Camera needs location access to tag your photos with GPS coordinates and weather data.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Location.getForegroundPermissionsAsync() },
          ]
        );
      }
      
      return granted;
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      setHasLocationPermission(false);
      return false;
    } finally {
      setIsCheckingLocation(false);
    }
  };

  // Check permissions on mount
  useEffect(() => {
    _checkLocationPermissions();
  }, []);

  return {
    hasLocationPermission,
    isCheckingLocation,
    requestLocationPermissions,
  };
};

export default useLocation;