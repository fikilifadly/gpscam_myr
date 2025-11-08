// components/Camera.component.types.ts
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { PhotoData } from '@/types/index.';

export interface States {
  cameraRef: React.RefObject<ExpoCamera>;
  hasPermission: boolean | null;
  setHasPermission: (permission: boolean) => void;
  cameraType: CameraType; // Make sure this is included
  setCameraType: (type: CameraType) => void;
  isCapturing: boolean;
  setIsCapturing: (capturing: boolean) => void;
  uploadLoading: boolean;
  uploadPhoto: (photoData: Omit<PhotoData, "id" | "createdAt">) => Promise<string>;
  isGrantingPermission: boolean;
  setIsGrantingPermission: (granting: boolean) => void;
};
export interface UseCamera {
  cameraRef: React.RefObject<ExpoCamera>;
  hasPermission: boolean | null;
  cameraType: CameraType;
  isCapturing: boolean;
  uploadLoading: boolean;
  isGrantingPermission: boolean;
  handleCapturePhoto: () => void;
  toggleCameraType: () => void;
  grantPermission: () => void;
};