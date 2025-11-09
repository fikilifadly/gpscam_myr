import * as Location from 'expo-location';
import { Platform } from 'react-native';

/**
 * Enhanced mock location detection service
 */
const MockDetectionService = {
  /**
   * Check for mock location using multiple methods
   * 
   * @returns {Promise<boolean>} Promise that resolves to true if mock location detected
   */
  checkMockLocation: async (): Promise<boolean> => {
    try {
      const checks = await Promise.allSettled([
        _checkProviderStatus(),
        _checkLocationAccuracy(),
        _checkInstallationSources(),
      ]);

      return checks.some(result => 
        result.status === 'fulfilled' && result.value === true
      );
    } catch (error) {
      console.error('Error in mock location detection:', error);
      return false;
    }
  },

  /**
   * Get detailed mock detection results
   * 
   * @returns {Promise<MockDetectionResult>} Detailed detection results
   */
  getDetailedDetection: async (): Promise<MockDetectionResult> => {
    const results = {
      isMocked: false,
      reasons: [] as string[],
      confidence: 0, // 0-100%
    };

    try {
      // Check 1: Provider status
      const providerStatus = await _checkProviderStatus();
      if (providerStatus) {
        results.isMocked = true;
        results.reasons.push('Location provider issues detected');
        results.confidence += 40;
      }

      // Check 2: Accuracy verification
      const accuracyCheck = await _checkLocationAccuracy();
      if (accuracyCheck) {
        results.isMocked = true;
        results.reasons.push('Suspicious location accuracy');
        results.confidence += 30;
      }

      // Check 3: Android-specific checks
      if (Platform.OS === 'android') {
        const androidCheck = await _checkInstallationSources();
        if (androidCheck) {
          results.isMocked = true;
          results.reasons.push('Mock location app detected');
          results.confidence += 30;
        }
      }

      return results;
    } catch (error) {
      console.error('Error in detailed mock detection:', error);
      return results;
    }
  },
};

/**
 * Check location provider status
 * 
 * @returns {Promise<boolean>} True if issues detected
 * @private
 */
const _checkProviderStatus = async (): Promise<boolean> => {
  try {
    const status = await Location.getProviderStatusAsync();
    return !status.locationServicesEnabled || !status.gpsAvailable;
  } catch (error) {
    return false;
  }
};

/**
 * Check location accuracy for suspicious patterns
 * 
 * @returns {Promise<boolean>} True if accuracy seems suspicious
 * @private
 */
const _checkLocationAccuracy = async (): Promise<boolean> => {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    // Suspicious if accuracy is too perfect or very poor
    const accuracy = location.coords.accuracy || 100;
    return accuracy < 1 || accuracy > 1000; // Too good or too bad
  } catch (error) {
    return false;
  }
};

/**
 * Check for mock location apps (Android specific)
 * 
 * @returns {Promise<boolean>} True if mock apps detected
 * @private
 */
const _checkInstallationSources = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return false;

  try {
    // This would require additional native implementation
    // For now, return false as placeholder
    return false;
  } catch (error) {
    return false;
  }
};

export interface MockDetectionResult {
  isMocked: boolean;
  reasons: string[];
  confidence: number;
}

export default MockDetectionService;