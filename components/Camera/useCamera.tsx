import { useState, useRef, useEffect } from "react";
import { Alert } from "react-native";
import { Camera as ExpoCamera, CameraType } from "expo-camera";
import { AsyncVoidFunction, PhotoData, PromiseVoid } from "@/types/index.";
import cameraService from "@/services/camera";
import useFirebase from "@/hooks/firebase/useFirebase";
import { States, UseCamera } from "./Camera.component.types";

/**
 * Process and upload photo to Firebase
 *
 * @param {string} imageUri - Original image URI
 * @param {Function} uploadPhoto - Upload photo function
 * @returns {PromiseVoid} Promise that resolves when photo is uploaded
 * @private
 */
const _processAndUploadPhoto = async (imageUri: string, uploadPhoto: (photoData: Omit<PhotoData, "id" | "createdAt">) => Promise<string>): PromiseVoid => {
  try {
    const compressedUri = await cameraService.compressImage(imageUri);
    const imageBase64 = await cameraService.imageToBase64(compressedUri);

    // TODO: Get location data (will implement in next step)
    const locationData = {
      latitude: -6.2,
      longitude: 106.816666,
      altitude: null,
      compassHeading: null,
      magneticField: null,
      weather: null,
    };

    const photoData: Omit<PhotoData, "id" | "createdAt"> = {
      imageBase64,
      isMockLocation: false,
      location: locationData,
      exifData: {
        customGeoTag: `X-DataGeoTag: ${locationData.latitude}, ${locationData.longitude}`,
      },
    };

    const photoId = await uploadPhoto(photoData);

    Alert.alert("Success", `Photo uploaded with ID: ${photoId}`);
  } catch (error) {
    console.error("Error processing photo:", error);
    Alert.alert("Error", "Failed to process and upload photo");
    throw error;
  }
};

/**
 * Handle capture photo operation
 *
 * @param {React.RefObject<ExpoCamera>} cameraRef - Camera reference
 * @param {boolean} isCapturing - Current capture state
 * @param {Function} setIsCapturing - Set capture state function
 * @param {Function} uploadPhoto - Upload photo function
 * @returns {AsyncVoidFunction} Async function that captures photo
 * @private
 */
const _handleCapturePhoto = (
  cameraRef: React.RefObject<ExpoCamera>,
  isCapturing: boolean,
  setIsCapturing: (capturing: boolean) => void,
  uploadPhoto: (photoData: Omit<PhotoData, "id" | "createdAt">) => Promise<string>
): AsyncVoidFunction => {
  return async (): PromiseVoid => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (photo.uri) {
        await _processAndUploadPhoto(photo.uri, uploadPhoto);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Error", "Failed to capture photo");
    } finally {
      setIsCapturing(false);
    }
  };
};

/**
 * States
 *
 * @returns {States} states
 */
const _states = (): States => {
  const cameraRef = useRef<ExpoCamera>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const { uploadPhoto, loading } = useFirebase();

  return {
    cameraRef,
    hasPermission,
    setHasPermission,
    cameraType,
    setCameraType,
    isCapturing,
    setIsCapturing,
    uploadLoading: loading,
    uploadPhoto,
  };
};

/**
 * Request camera permissions
 *
 * @param {States} states - states
 * @returns {PromiseVoid} Promise that resolves when permissions are checked
 */
const _requestPermissions = async ({ setHasPermission }: States): PromiseVoid => {
  const permission = await cameraService.requestCameraPermissions();
  setHasPermission(permission);
};

/**
 * Handle capture photo
 *
 * @param {States} states - states
 * @returns {AsyncVoidFunction} Async function that captures and processes photo
 */
const _capturePhotoHandler = ({ cameraRef, isCapturing, setIsCapturing, uploadPhoto }: States): AsyncVoidFunction => {
  return _handleCapturePhoto(cameraRef, isCapturing, setIsCapturing, uploadPhoto);
};

/**
 * Toggle between front and back camera
 *
 * @param {States} states - states
 * @returns {void} void fn
 */
const _toggleCameraType = ({ setCameraType }: States): void => {
  setCameraType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
};

/**
 * Grant camera permission
 *
 * @param {States} states - states
 * @returns {PromiseVoid}
 */
const _grantPermission = async ({ setHasPermission }: States): PromiseVoid => {
  const permission = await cameraService.requestCameraPermissions();
  setHasPermission(permission);
};

/**
 * _useEffectPermission
 * 
 * @param {States} states - states
 * @returns {void} void fn
 */
const _useEffectPermission = ({ setHasPermission }: States): void => {
  useEffect(() => {
    const initializeCamera = async (): Promise<void> => {
      const permission = await cameraService.requestCameraPermissions();
      setHasPermission(permission);
    };

    initializeCamera();
  }, []);
}

/**
 * Camera hook for managing camera operations and state
 *
 * @returns {Object} Camera state and operations
 */
const useCamera = (): UseCamera => {
  const states = _states();

  _useEffectPermission(states);

  return {
    ...states,
     requestPermissions: () => _requestPermissions(states),
    handleCapturePhoto: () => _capturePhotoHandler(states),
    toggleCameraType: () => _toggleCameraType(states),
    grantPermission: () => _grantPermission(states),
  };
};

export default useCamera;
