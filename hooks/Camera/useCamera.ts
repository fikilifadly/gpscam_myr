import { useState, useRef, useCallback } from 'react';
import { Camera, CameraType, CameraPictureOptions } from 'expo-camera';
import { CameraPhoto, ProcessedImage } from '@/types/index.types';
import { addExifData, addWatermark } from '@/utils/imageProcessor/imageProcessor';
import APP_CONSTANTS from '@/constants';

interface UseCameraReturn {
  cameraRef: React.RefObject<Camera>;
  hasPermission: boolean | null;
  previewUri: string | null;
  isTakingPicture: boolean;
  cameraType: CameraType;
  requestPermission: () => Promise<boolean>;
  takePicture: () => Promise<CameraPhoto | null>;
  retakePicture: () => void;
  savePicture: (photo: CameraPhoto, metadata: Omit<ProcessedImage, 'uri'>) => Promise<ProcessedImage | null>;
  switchCamera: () => void;
}

/**
 * Custom hook for camera functionality with GPS metadata
 * @returns Camera methods and state
 */
export const useCamera = (): UseCameraReturn => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);

  /**
   * Request camera permissions
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const granted = status === 'granted';
      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }, []);

  /**
   * Capture picture from camera
   */
  const takePicture = useCallback(async (): Promise<CameraPhoto | null> => {
    if (!cameraRef.current) {
      console.warn('Camera ref is not available');
      return null;
    }

    setIsTakingPicture(true);
    try {
      const photo: CameraPhoto = await cameraRef.current.takePictureAsync({
        quality: APP_CONSTANTS.CAMERA.QUALITY,
        exif: true,
        base64: false,
        skipProcessing: false,
      } as CameraPictureOptions);

      setPreviewUri(photo.uri);
      return photo;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    } finally {
      setIsTakingPicture(false);
    }
  }, []);

  /**
   * Reset preview and allow retaking picture
   */
  const retakePicture = useCallback((): void => {
    setPreviewUri(null);
  }, []);

  /**
   * Save picture with watermark and metadata
   */
  const savePicture = useCallback(async (
    photo: CameraPhoto,
    metadata: Omit<ProcessedImage, 'uri'>
  ): Promise<ProcessedImage | null> => {
    try {
      // Step 1: Add watermark to image
      const watermarkedImage = await addWatermark(photo.uri);
      
      // Step 2: Add EXIF data with GPS and custom metadata
      const finalImageUri = await addExifData(watermarkedImage.uri, metadata);
      
      const processedImage: ProcessedImage = {
        uri: finalImageUri,
        ...metadata,
      };

      return processedImage;
    } catch (error) {
      console.error('Error saving picture:', error);
      return null;
    }
  }, []);

  /**
   * Switch between front and back camera
   */
  const switchCamera = useCallback((): void => {
    setCameraType(current => 
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }, []);

  return {
    cameraRef,
    hasPermission,
    previewUri,
    isTakingPicture,
    cameraType,
    requestPermission,
    takePicture,
    retakePicture,
    savePicture,
    switchCamera,
  };
};

export default useCamera;