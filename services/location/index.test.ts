import locationService from './index';
import * as Location from 'expo-location';

// Mock dependencies
jest.mock('expo-location');

describe('Location Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentLocation', () => {
    it('should get location with correct Expo Location options', async () => {
      // Setup
      const mockLocation = {
        coords: {
          latitude: -6.2,
          longitude: 106.816666,
          altitude: 50,
        },
      };

      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(mockLocation);

      // Execute
      await locationService.getCurrentLocation();

      // Verify - should use valid Expo Location options
      expect(Location.getCurrentPositionAsync).toHaveBeenCalledWith({
        accuracy: Location.Accuracy.High,
      });
    });
  });
});