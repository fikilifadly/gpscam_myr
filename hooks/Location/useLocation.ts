import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { LocationData, CompassData, MockDetectionResult } from '@/types/index.types';
import { checkMockLocation } from '@/utils/location/location';
import APP_CONSTANTS from '@/constants';

interface UseLocationReturn {
  location: LocationData | null;
  compass: CompassData | null;
  mockDetection: MockDetectionResult;
  error: string | null;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<LocationData | null>;
  startWatching: () => void;
  stopWatching: () => void;
}

/**
 * Custom hook for location, compass, and mock location detection
 * @returns Location methods and state
 */
const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [compass, setCompass] = useState<CompassData | null>(null);
  const [mockDetection, setMockDetection] = useState<MockDetectionResult>({
    isMocked: false,
    mockApps: [],
    provider: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [watchSubscription, setWatchSubscription] = useState<Location.LocationSubscription | null>(null);

  /**
   * Request location permissions
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      
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
   */
  const getCurrentLocation = useCallback(async (): Promise<LocationData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
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
        timestamp: currentLocation.timestamp,
      };

      setLocation(locationData);

      // Check for mock location
      const mockResult = await checkMockLocation();
      setMockDetection(mockResult);

      return locationData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Start watching location updates
   */
  const startWatching = useCallback((): void => {
    if (watchSubscription) return;

    const watchLocation = async (): Promise<void> => {
      try {
        const sub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: APP_CONSTANTS.LOCATION.UPDATE_INTERVAL,
            distanceInterval: APP_CONSTANTS.LOCATION.DISTANCE_INTERVAL,
          },
          (newLocation) => {
            const locationData: LocationData = {
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              altitude: newLocation.coords.altitude,
              accuracy: newLocation.coords.accuracy,
              altitudeAccuracy: newLocation.coords.altitudeAccuracy,
              heading: newLocation.coords.heading,
              speed: newLocation.coords.speed,
              timestamp: newLocation.timestamp,
            };
            setLocation(locationData);
          }
        );
        setWatchSubscription(sub);
      } catch (err) {
        console.error('Error watching location:', err);
      }
    };

    watchLocation();
  }, [watchSubscription]);

  /**
   * Stop watching location updates
   */
  const stopWatching = useCallback((): void => {
    if (watchSubscription) {
      watchSubscription.remove();
      setWatchSubscription(null);
    }
  }, [watchSubscription]);

  // Watch compass
  useEffect(() => {
    let compassSubscription: Location.LocationSubscription | null = null;

    const watchCompass = async (): Promise<void> => {
      try {
        compassSubscription = await Location.watchHeadingAsync((heading) => {
          setCompass({
            magneticHeading: heading.magHeading,
            trueHeading: heading.trueHeading,
          });
        });
      } catch (err) {
        console.error('Error watching compass:', err);
      }
    };

    watchCompass();

    return (): void => {
      if (compassSubscription) {
        compassSubscription.remove();
      }
      stopWatching();
    };
  }, [stopWatching]);

  return {
    location,
    compass,
    mockDetection,
    error,
    isLoading,
    requestPermission,
    getCurrentLocation,
    startWatching,
    stopWatching,
  };
};

export default useLocation;