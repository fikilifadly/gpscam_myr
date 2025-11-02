import { act, renderHook } from '@testing-library/react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

import type { CameraPhoto, CompassData, LocationData, WeatherData } from '../../types/index.types';
import useCamera from './useCamera';

jest.mock('expo-camera');
jest.mock('expo-image-manipulator');

jest.mock('./exifUtils', () => ({
  addExifData: jest.fn((uri) => Promise.resolve(uri)),
}));

describe('useCamera', () => {
  const mockCameraRef = {
    current: {
      takePictureAsync: jest.fn(),
    },
  };

  const mockCameraPhoto: CameraPhoto = {
    uri: 'file://test-photo.jpg',
    width: 1920,
    height: 1080,
    exif: {},
  };

  const mockMetadata = {
    location: {
      latitude: -6.2088,
      longitude: 106.8456,
      altitude: 100,
      accuracy: 10,
    } as LocationData,
    weather: {
      temperature: 28,
      condition: 'Sunny',
      humidity: 70,
    } as WeatherData,
    compass: {
      heading: 180,
      accuracy: 5,
    } as CompassData,
    hasMockLocation: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    (Camera.requestCameraPermissionsAsync as jest.Mock) = jest.fn();
    
    (ImageManipulator.manipulateAsync as jest.Mock) = jest.fn();
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useCamera());

      expect(result.current.hasPermission).toBe(false);
      expect(result.current.previewUri).toBeNull();
      expect(result.current.isTakingPicture).toBe(false);
      expect(result.current.cameraRef).toBeDefined();
    });
  });

  describe('requestPermission', () => {
    it('should request camera permission and return true when granted', async () => {
      (Camera.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });

      const { result } = renderHook(() => useCamera());

      let permissionGranted: boolean = false;

      await act(async () => {
        permissionGranted = await result.current.requestPermission();
      });

      expect(Camera.requestCameraPermissionsAsync).toHaveBeenCalledTimes(1);
      expect(permissionGranted).toBe(true);
      expect(result.current.hasPermission).toBe(true);
    });

    it('should return false when permission is denied', async () => {
      (Camera.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      const { result } = renderHook(() => useCamera());

      let permissionGranted: boolean = true;

      await act(async () => {
        permissionGranted = await result.current.requestPermission();
      });

      expect(permissionGranted).toBe(false);
      expect(result.current.hasPermission).toBe(false);
    });

    it('should handle errors and return false', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (Camera.requestCameraPermissionsAsync as jest.Mock).mockRejectedValue(
        new Error('Permission error')
      );

      const { result } = renderHook(() => useCamera());

      let permissionGranted: boolean = true;

      await act(async () => {
        permissionGranted = await result.current.requestPermission();
      });

      expect(permissionGranted).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error requesting camera permission:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('takePicture', () => {
    it('should take a picture and return URI', async () => {
      const { result } = renderHook(() => useCamera());

      result.current.cameraRef.current = mockCameraRef.current as any;
      mockCameraRef.current.takePictureAsync.mockResolvedValue(mockCameraPhoto);

      let photoUri: string | null = null;

      await act(async () => {
        photoUri = await result.current.takePicture();
      });

      expect(mockCameraRef.current.takePictureAsync).toHaveBeenCalledWith({
        quality: 0.8,
        exif: true,
        skipProcessing: false,
      });
      expect(photoUri).toBe(mockCameraPhoto.uri);
      expect(result.current.previewUri).toBe(mockCameraPhoto.uri);
      expect(result.current.isTakingPicture).toBe(false);
    });

    it('should set isTakingPicture to true during capture', async () => {
      const { result } = renderHook(() => useCamera());

      result.current.cameraRef.current = mockCameraRef.current as any;
      
      let isTakingPictureDuringCapture = false;
      mockCameraRef.current.takePictureAsync.mockImplementation(async () => {
        isTakingPictureDuringCapture = result.current.isTakingPicture;
        return mockCameraPhoto;
      });

      await act(async () => {
        await result.current.takePicture();
      });

      expect(isTakingPictureDuringCapture).toBe(true);
      expect(result.current.isTakingPicture).toBe(false);
    });

    it('should return null and log warning when camera ref is not available', async () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { result } = renderHook(() => useCamera());

      let photoUri: string | null = 'not-null';

      await act(async () => {
        photoUri = await result.current.takePicture();
      });

      expect(photoUri).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalledWith('Camera ref is not available');
      expect(result.current.isTakingPicture).toBe(false);

      consoleWarnSpy.mockRestore();
    });

    it('should handle errors during picture capture', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const { result } = renderHook(() => useCamera());

      result.current.cameraRef.current = mockCameraRef.current as any;
      mockCameraRef.current.takePictureAsync.mockRejectedValue(
        new Error('Camera error')
      );

      let photoUri: string | null = 'not-null';

      await act(async () => {
        photoUri = await result.current.takePicture();
      });

      expect(photoUri).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error taking picture:',
        expect.any(Error)
      );
      expect(result.current.isTakingPicture).toBe(false);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('retakePicture', () => {
    it('should reset preview URI to null', async () => {
      const { result } = renderHook(() => useCamera());

      result.current.cameraRef.current = mockCameraRef.current as any;
      mockCameraRef.current.takePictureAsync.mockResolvedValue(mockCameraPhoto);

      await act(async () => {
        await result.current.takePicture();
      });

      expect(result.current.previewUri).toBe(mockCameraPhoto.uri);

      act(() => {
        result.current.retakePicture();
      });

      expect(result.current.previewUri).toBeNull();
    });
  });

  describe('savePicture', () => {
    it('should process and save picture with metadata', async () => {
      const mockProcessedImage = {
        uri: 'file://processed-photo.jpg',
        width: 1080,
        height: 608,
      };

      (ImageManipulator.manipulateAsync as jest.Mock).mockResolvedValue(
        mockProcessedImage
      );

      const { result } = renderHook(() => useCamera());

      let savedImage: any = null;

      await act(async () => {
        savedImage = await result.current.savePicture(
          mockCameraPhoto.uri,
          mockMetadata
        );
      });

      expect(ImageManipulator.manipulateAsync).toHaveBeenCalledWith(
        mockCameraPhoto.uri,
        [{ resize: { width: 1080 } }],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: false,
        }
      );

      expect(savedImage).toMatchObject({
        uri: mockProcessedImage.uri,
        width: mockProcessedImage.width,
        height: mockProcessedImage.height,
        location: mockMetadata.location,
        weather: mockMetadata.weather,
        compass: mockMetadata.compass,
        hasMockLocation: mockMetadata.hasMockLocation,
      });
      expect(savedImage.timestamp).toBeDefined();
      expect(typeof savedImage.timestamp).toBe('string');
    });

    it('should handle errors during save and return null', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (ImageManipulator.manipulateAsync as jest.Mock).mockRejectedValue(
        new Error('Processing error')
      );

      const { result } = renderHook(() => useCamera());

      let savedImage: any = 'not-null';

      await act(async () => {
        savedImage = await result.current.savePicture(
          mockCameraPhoto.uri,
          mockMetadata
        );
      });

      expect(savedImage).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error saving picture:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Hook Stability', () => {
    it('should maintain function references between renders', () => {
      const { result, rerender } = renderHook(() => useCamera());

      const firstRenderFunctions = {
        requestPermission: result.current.requestPermission,
        takePicture: result.current.takePicture,
        retakePicture: result.current.retakePicture,
        savePicture: result.current.savePicture,
      };

      rerender();

      expect(result.current.requestPermission).toBe(
        firstRenderFunctions.requestPermission
      );
      expect(result.current.takePicture).toBe(firstRenderFunctions.takePicture);
      expect(result.current.retakePicture).toBe(
        firstRenderFunctions.retakePicture
      );
      expect(result.current.savePicture).toBe(firstRenderFunctions.savePicture);
    });
  });
});