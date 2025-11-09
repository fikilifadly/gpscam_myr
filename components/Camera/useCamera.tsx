import { useState, useRef, useEffect } from "react";
import { Alert } from "react-native";
import { Camera as ExpoCamera, CameraType } from "expo-camera";
import { AsyncVoidFunction, PhotoData, PromiseVoid } from "@/types/index.";
import cameraService from "@/services/camera";
import locationService from "@/services/location";
import MockDetectionService from "@/services/mock/index";
import useFirebase from "@/hooks/firebase/useFirebase";
import { States, UseCamera } from "./Camera.component.types";

/**
 * Process and upload photo to Firebase
 */
const _processAndUploadPhoto = async (
  imageUri: string,
  photoData: Omit<PhotoData, "id" | "createdAt">,
  uploadPhoto: (photoData: Omit<PhotoData, "id" | "createdAt">) => Promise<string>
): PromiseVoid => {
  try {
    console.log("Processing image for upload...");
    const compressedUri = await cameraService.compressImage(imageUri);
    const imageBase64 = await cameraService.imageToBase64(compressedUri);

    const finalPhotoData = {
      ...photoData,
      imageBase64: imageBase64,
    };

    console.log("Uploading photo to Firebase...");
    const photoId = await uploadPhoto(finalPhotoData);
    console.log("Photo uploaded successfully:", photoId);

    return photoId;
  } catch (error) {
    console.error("Error processing photo:", error);
    throw error;
  }
};

/**
 * Handle capture photo operation
 */
const _handleCapturePhoto = (
  cameraRef: React.RefObject<ExpoCamera>,
  isCapturing: boolean,
  setIsCapturing: (capturing: boolean) => void,
  showPreview: (uri: string, data: Omit<PhotoData, "id" | "createdAt">) => void
): AsyncVoidFunction => {
  return async (): PromiseVoid => {
    if (!cameraRef.current || isCapturing) {
      console.log("Camera not ready or already capturing");
      return;
    }

    console.log("Starting photo capture...");
    setIsCapturing(true);

    try {
      const capturePromise = cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      const captureTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Photo capture timeout")), 10000));

      const photo = (await Promise.race([capturePromise, captureTimeout])) as any;
      console.log("Photo captured:", photo.uri);

      if (photo.uri) {
        console.log("Getting location data for preview...");
        const locationData = await locationService.getEnhancedLocation();
        const isMocked = await MockDetectionService.checkMockLocation();

        const photoData: Omit<PhotoData, "id" | "createdAt"> = {
          imageBase64: "", 
          isMockLocation: isMocked,
          location: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            altitude: locationData.altitude,
            compassHeading: locationData.compassHeading,
            magneticField: locationData.magneticField,
            weather: locationData.weather,
          },
          exifData: {
            customGeoTag: `X-DataGeoTag: ${locationData.latitude}, ${locationData.longitude}`,
          },
        };

        showPreview(photo.uri, photoData);
      }
    } catch (error: any) {
      console.error("Error capturing photo:", error);

      if (error.message.includes("timeout")) {
        Alert.alert("Timeout", error.message);
      } else {
        Alert.alert("Error", "Failed to capture photo");
      }
    } finally {
      console.log("Photo capture process completed");
      setIsCapturing(false);
    }
  };
};

/**
 * States
 */
const _states = (): States => {
  const cameraRef = useRef<ExpoCamera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isGrantingPermission, setIsGrantingPermission] = useState<boolean>(false);
  const { uploadPhoto, loading: uploadLoading } = useFirebase();

  return {
    cameraRef,
    hasPermission,
    setHasPermission,
    cameraType,
    setCameraType,
    isCapturing,
    setIsCapturing,
    uploadLoading,
    uploadPhoto,
    isGrantingPermission,
    setIsGrantingPermission,
  };
};

/**
 * Handle capture photo - FIXED: Accept showPreview parameter
 */
const _capturePhotoHandler = (
  states: States,
  showPreview: (uri: string, data: Omit<PhotoData, "id" | "createdAt">) => void
): AsyncVoidFunction => {
  return _handleCapturePhoto(
    states.cameraRef,
    states.isCapturing,
    states.setIsCapturing,
    showPreview 
  );
};

/**
 * Toggle between front and back camera
 */
const _toggleCameraType = ({ cameraType, setCameraType }: States): void => {
  setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back);
};

/**
 * Grant camera permission
 */
const _grantPermission = async ({ setHasPermission, setIsGrantingPermission }: States): PromiseVoid => {
  try {
    setIsGrantingPermission(true);
    const permission = await cameraService.requestCameraPermissions();
    setHasPermission(permission);

    if (!permission) {
      Alert.alert("Permission Denied", "Camera permission is required to use this feature. Please enable it in your device settings.", [{ text: "OK" }]);
    }
  } catch (error) {
    console.error("Error granting permission:", error);
    Alert.alert("Error", "Failed to request camera permission");
    setHasPermission(false);
  } finally {
    setIsGrantingPermission(false);
  }
};

/**
 * Initialize camera permissions
 */
const _useEffectPermission = (states: States): void => {
  const { setHasPermission, setIsGrantingPermission } = states;

  useEffect(() => {
    const initializeCamera = async (): Promise<void> => {
      try {
        setIsGrantingPermission(true);
        console.log("Initializing camera permissions...");
        const permission = await cameraService.requestCameraPermissions();
        console.log("Camera permission initialized:", permission);
        setHasPermission(permission);
      } catch (error) {
        console.error("Error initializing camera:", error);
        setHasPermission(false);
      } finally {
        setIsGrantingPermission(false);
      }
    };

    initializeCamera();
  }, []);
};

/**
 * Camera hook for managing camera operations and state
 */
const useCamera = (): UseCamera => {
  const states = _states();

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewPhotoUri, setPreviewPhotoUri] = useState<string>("");
  const [previewPhotoData, setPreviewPhotoData] = useState<Omit<PhotoData, "id" | "createdAt"> | null>(null);

  const showPreview = (uri: string, data: Omit<PhotoData, "id" | "createdAt">) => {
    setPreviewPhotoUri(uri);
    setPreviewPhotoData(data);
    setPreviewVisible(true);
  };

  const hidePreview = () => {
    setPreviewVisible(false);
    setPreviewPhotoUri("");
    setPreviewPhotoData(null);
  };

  const retakePhoto = () => {
    console.log("Retaking photo, resetting states...");

    states.setIsCapturing(false);

    hidePreview();

    setTimeout(() => {
      console.log("Camera should be ready for retake now");
    }, 100);
  };

  const processUpload = async (photoData: Omit<PhotoData, "id" | "createdAt">) => {
    try {
      const photoId = await _processAndUploadPhoto(previewPhotoUri, photoData, states.uploadPhoto);
      hidePreview();
      Alert.alert("Success", "Photo uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload photo");
      throw error;
    }
  };

  _useEffectPermission(states);

  return {
    ...states,
    previewVisible,
    previewPhotoUri,
    previewPhotoData,
    handleCapturePhoto: _capturePhotoHandler(states, showPreview),
    toggleCameraType: () => _toggleCameraType(states),
    grantPermission: () => _grantPermission(states),
    retakePhoto,
    processUpload,
    hidePreview,
  };
};

export default useCamera;
