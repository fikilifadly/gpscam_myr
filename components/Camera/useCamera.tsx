// hooks/useCamera.ts
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
): Promise<string> => {
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
  return async (): Promise<void> => {
    if (!cameraRef.current || isCapturing) {
      console.log("Camera not ready or already capturing");
      return;
    }

    console.log("=== STARTING PHOTO CAPTURE ===");
    setIsCapturing(true);

    // Add a flag to prevent multiple simultaneous captures
    let captureCompleted = false;

    try {
      console.log("1. Capturing photo...");
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      console.log("Photo captured successfully:", photo.uri);

      if (!photo.uri) {
        throw new Error("No photo URI returned from camera");
      }

      console.log("2. Getting enhanced location...");
      
      // Use a single location call with timeout
      const locationPromise = locationService.getEnhancedLocation();
      const locationTimeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Location service timeout during photo capture")), 20000)
      );

      const locationData = await Promise.race([locationPromise, locationTimeout]);
      console.log("Enhanced location obtained:", locationData);

      console.log("3. Getting mock detection...");
      const isMocked = await MockDetectionService.checkMockLocation();
      console.log("Mock detection result:", isMocked);

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

      console.log("4. Showing preview...");
      captureCompleted = true;
      showPreview(photo.uri, photoData);
      console.log("=== PHOTO CAPTURE COMPLETED ===");

    } catch (error: any) {
      console.error("=== PHOTO CAPTURE FAILED ===", error);
      
      // Only reset state if capture wasn't completed
      if (!captureCompleted) {
        setIsCapturing(false);
      }

      if (error.message.includes("timeout")) {
        Alert.alert(
          "Location Timeout", 
          "GPS signal took too long. Please ensure:\n• You're in an area with good GPS reception\n• Location services are enabled\n• Try moving to an open area",
          [{ text: "OK" }]
        );
      } else if (error.message.includes("permission")) {
        Alert.alert(
          "Permission Required",
          "Location permission is needed to tag your photos.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Capture Failed",
          `Unable to complete photo capture: ${error.message}`,
          [{ text: "OK" }]
        );
      }
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
 * Handle capture photo
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
const _grantPermission = async ({ setHasPermission, setIsGrantingPermission }: States): Promise<void> => {
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
  const [lastCaptureTime, setLastCaptureTime] = useState<number>(0);

  // Fixed showPreview function
  const showPreview = (uri: string, data: Omit<PhotoData, "id" | "createdAt">) => {
    console.log("🟢 SHOW PREVIEW CALLED with:", {
      uri: uri ? `URI exists (${uri.substring(0, 50)}...)` : 'NO URI',
      data: data ? 'Data exists' : 'NO DATA',
      hasLocation: !!data?.location,
      previewVisible: previewVisible
    });
    
    // Reset capturing state BEFORE setting preview data
    states.setIsCapturing(false);
    
    // Then set preview data
    setPreviewPhotoUri(uri);
    setPreviewPhotoData(data);
    setPreviewVisible(true);
    
    console.log("🟢 Preview state updated, should be visible now");
  };

  const hidePreview = () => {
    console.log("Hiding preview modal");
    setPreviewVisible(false);
    setPreviewPhotoUri("");
    setPreviewPhotoData(null);
  };

  const retakePhoto = () => {
    console.log("Retaking photo, resetting states...");
    states.setIsCapturing(false);
    hidePreview();
  };

  const processUpload = async (photoData: Omit<PhotoData, "id" | "createdAt">): Promise<void> => {
    try {
      console.log("Starting upload process...");
      const photoId = await _processAndUploadPhoto(previewPhotoUri, photoData, states.uploadPhoto);
      hidePreview();
      Alert.alert("Success", "Photo uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload photo");
      throw error;
    }
  };

  // Fixed debounced capture function
  const debouncedCapture = (): void => {
    const now = Date.now();
    console.log("Debounced capture called, last capture:", now - lastCaptureTime);

    if (now - lastCaptureTime < 3000) {
      console.log("Capture throttled - too soon after previous capture");
      return;
    }
    
    setLastCaptureTime(now);
    _capturePhotoHandler(states, showPreview)();
  };

  _useEffectPermission(states);

  return {
    cameraRef: states.cameraRef,
    hasPermission: states.hasPermission,
    cameraType: states.cameraType,
    isCapturing: states.isCapturing,
    uploadLoading: states.uploadLoading,
    isGrantingPermission: states.isGrantingPermission,
    previewVisible,
    previewPhotoUri,
    previewPhotoData,
    handleCapturePhoto: () => _capturePhotoHandler(states, showPreview)(),
    debouncedCapture,
    toggleCameraType: () => _toggleCameraType(states),
    grantPermission: () => _grantPermission(states),
    retakePhoto,
    processUpload,
    hidePreview,
  };
};

export default useCamera;