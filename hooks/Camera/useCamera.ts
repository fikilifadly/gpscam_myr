import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { useCallback, useRef, useState } from "react";

import type { CameraPhoto, CompassData, LocationData, ProcessedImage, WeatherData } from '../../types/index.types';
import type { UseCamera } from "./Camera.types";

import Constant from "@/constants";

const {
  PERMISSION: { GRANTED },
} = Constant;

/**
 * Use Camera
 *
 * @returns {UseCamera} camera hook
 */
const useCamera = (): UseCamera => {
  const cameraRef = useRef<typeof Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);

  /**
   * Request camera permissions
   *
   * @returns {Promise<boolean>} Permission granted status
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();

      const granted = status === GRANTED;

      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      return false;
    }
  }, []);

  /**
   * Capture picture from camera
   * 
   * @returns {Promise<string | null>} URI of captured image
   */
  const takePicture = useCallback(async (): Promise<string | null> => {
    if (!cameraRef.current) {
      console.warn("Camera ref is not available");
      return null;
    }

    setIsTakingPicture(true);
    try {
      const photo: CameraPhoto = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        exif: true,
        skipProcessing: false,
      });

      setPreviewUri(photo.uri);
      return photo.uri;
    } catch (error) {
      console.error("Error taking picture:", error);
      return null;
    } finally {
      setIsTakingPicture(false);
    }
  }, []);

  /**
   * Reset preview and allow retaking picture
   * 
   * @returns {void} setter null
   */
  const retakePicture = useCallback((): void => {
    setPreviewUri(null);
  }, []);

  /**
   * Save picture with watermark and metadata
   * 
   * @param {string} uri - uri
   * @param {Object} metadata - metadata
   * @returns {Promise<ProcessedImage | null>} processImage | null
   */
  const savePicture = useCallback(
    async (
      uri: string,
      metadata: {
        location: LocationData;
        weather: WeatherData;
        compass: CompassData;
        hasMockLocation: boolean;
      }
    ): Promise<ProcessedImage | null> => {
      try {
        const processedImage = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 1080 } }], {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: false,
        });

        const imageWithExif = await addExifData(processedImage.uri, metadata);

        return {
          ...processedImage,
          location: metadata.location,
          timestamp: new Date().toISOString(),
          weather: metadata.weather,
          compass: metadata.compass,
          hasMockLocation: metadata.hasMockLocation,
        };
      } catch (error) {
        console.error("Error saving picture:", error);
        return null;
      }
    },
    []
  );

  return {
    cameraRef,
    hasPermission,
    previewUri,
    isTakingPicture,
    requestPermission,
    takePicture,
    retakePicture,
    savePicture,
  };
};

export default useCamera;