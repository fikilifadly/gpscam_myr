import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { PhotoData } from '@/types/index.';
export interface States {
  cameraRef: React.RefObject<ExpoCamera>;
  hasPermission: boolean | null;
  setHasPermission: (permission: boolean) => void;
  cameraType: CameraType;
  setCameraType: (type: CameraType) => void;
  isCapturing: boolean;
  setIsCapturing: (capturing: boolean) => void;
  uploadLoading: boolean;
  uploadPhoto: (photoData: Omit<PhotoData, "id" | "createdAt">) => Promise<string>;
  isGrantingPermission: boolean;
  setIsGrantingPermission: (granting: boolean) => void;
  lastCaptureTime: number;
  setLastCaptureTime: (capturing: number) => void;
}
export interface UseCamera {
  cameraRef: React.RefObject<ExpoCamera>;
  hasPermission: boolean | null;
  cameraType: CameraType;
  isCapturing: boolean;
  uploadLoading: boolean;
  isGrantingPermission: boolean;
  previewVisible: boolean;
  previewPhotoUri: string;
  previewPhotoData: Omit<PhotoData, "id" | "createdAt"> | null;
  handleCapturePhoto: () => void;
  toggleCameraType: () => void;
  grantPermission: () => void;
  retakePhoto: () => void;
  processUpload: (photoData: Omit<PhotoData, "id" | "createdAt">) => void;
  hidePreview: () => void;
}