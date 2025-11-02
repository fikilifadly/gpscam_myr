import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { CompassData, LocationData } from '../../types/index.types';
import { checkMockLocation } from '../../utils/location';

import Constant from "@/constants";

const {
  PERMISSION: { GRANTED },
} = Constant;

/**
 * Location hook return type
 */
interface UseLocationReturn {
  location: LocationData | null;
  compass: CompassData | null;
  hasMockLocation: boolean;
  error: string | null;
  isLocationLoading: boolean;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<LocationData | null>;
}

/**
 * Use Location
 * 
 * @returns {UseLocationReturn} Location hook methods and state
 */
export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [compass, setCompass] = useState<CompassData | null>(null);
  const [hasMockLocation, setHasMockLocation] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(false);

  /**
   * Request location permissions
   * @returns {Promise<boolean>} Permission granted status
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === GRANTED;
      
      if (!granted) {
        setError('Location permission denied');
      }
      
      return granted;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Permission error: ${errorMessage}`);
      return false;
    }
  }, []);

  /**
   * Get current location with high accuracy
   * @returns {Promise<LocationData | null>} Current location data
   */
  const getCurrentLocation = useCallback(async (): Promise<LocationData | null> => {
    setIsLocationLoading(true);
    setError(null);

    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        mayShowUserSettingsDialog: true,
      });

      const locationData: LocationData = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        altitude: currentLocation.coords.altitude,
        accuracy: currentLocation.coords.accuracy,
        altitudeAccuracy: currentLocation.coords.altitudeAccuracy,
        heading: currentLocation.coords.heading,
        speed: currentLocation.coords.speed,
      };

      setLocation(locationData);

      const mockLocationDetected = await checkMockLocation();
      setHasMockLocation(mockLocationDetected);

      return locationData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      return null;
    } finally {
      setIsLocationLoading(false);
    }
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const watchCompass = async (): Promise<void> => {
      subscription = await Location.watchHeadingAsync((heading: Location.LocationHeadingObject) => {
        setCompass({
          magneticHeading: heading.magHeading,
          trueHeading: heading.trueHeading,
        });
      });
    };

    watchCompass();

    return (): void => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return {
    location,
    compass,
    hasMockLocation,
    error,
    isLocationLoading,
    requestPermission,
    getCurrentLocation,
  };
};