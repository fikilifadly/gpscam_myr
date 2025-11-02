import { Camera } from 'expo-camera';
import { CompassData, LocationData, ProcessedImage, WeatherData } from '../../types/index.types';

export interface UseCamera {
  cameraRef: React.RefObject<typeof Camera>;
  hasPermission: boolean | null;
  previewUri: string | null;
  isTakingPicture: boolean;
  requestPermission: () => Promise<boolean>;
  takePicture: () => Promise<string | null>;
  retakePicture: () => void;
  savePicture: (
    uri: string, 
    metadata: {
      location: LocationData;
      weather: WeatherData;
      compass: CompassData;
      hasMockLocation: boolean;
    }
  ) => Promise<ProcessedImage | null>;
};

