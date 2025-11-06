import { SetterState, PromiseVoid, AsyncVoidFunction } from '@/types/index.';
import { Camera as ExpoCamera, CameraType, Camera } from 'expo-camera';
import { UseFirebase } from '@/hooks/firebase/useFirebase.types';
import { RefObject } from 'react';

export type States = Pick<UseFirebase, 'uploadPhoto'> & {
  cameraRef: RefObject<ExpoCamera>;
  hasPermission: boolean;
  setHasPermission: SetterState<boolean>;
  cameraType: CameraType;
  setCameraType: SetterState<CameraType>;
  isCapturing: boolean;
  setIsCapturing: SetterState<boolean>;
  uploadLoading: boolean;
};

export interface UseCamera extends States {
  requestPermissions: () => PromiseVoid;
  handleCapturePhoto: () => AsyncVoidFunction;
  toggleCameraType: () => void;
  grantPermission: () => PromiseVoid;
}