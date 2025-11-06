export interface CameraPermissionResult {
  granted: boolean;
  canAskAgain?: boolean;
}

export interface CompressImageOptions {
  width: number;
  height: number;
  quality: number;
}

export interface CameraService {
  requestCameraPermissions: () => Promise<boolean>;
  checkCameraPermissions: () => Promise<boolean>;
  compressImage: (imageUri: string) => Promise<string>;
  imageToBase64: (imageUri: string) => Promise<string>;
}