export type VoidFunction = () => void;
export type SetterBoolean<T> = (params: T) => boolean;
export type SetterState<T> = (state: T) => void;
export type AsycnVoidFunction = () => Promise<void>;
export type AsyncFunction<T> = () => Promise<T>;

export interface LocationData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

export interface WeatherData {
  temperature: number | null;
  condition: string | null;
  humidity: number | null;
  windSpeed: number | null;
}

export interface CompassData {
  magneticHeading: number;
  trueHeading: number;
}

export interface CameraPhoto {
  uri: string;
  width: number;
  height: number;
  exif?: Record<string, any>;
  base64?: string;
}

export interface ProcessedImage {
  uri: string;
  location: LocationData;
  timestamp: string;
  weather: WeatherData;
  compass: CompassData;
  hasMockLocation: boolean;
  exifData: Record<string, any>;
}

export interface MockDetectionResult {
  isMocked: boolean;
  mockApps: string[];
  provider: string | null;
}

export interface PhotoDocument {
  photoId: string;
  userId: string;
  imageUrl: string;
  thumbnailUrl: string;
  filename: string;
  fileSize: number;
  metadata: {
    location: {
      latitude: number;
      longitude: number;
      altitude: number | null;
      accuracy: number | null;
      address?: string;
    };
    timestamp: any;
    weather: {
      temperature: number | null;
      condition: string | null;
      humidity: number | null;
    };
    compass: {
      magneticHeading: number;
      trueHeading: number;
    };
    device: {
      hasMockLocation: boolean;
      mockApps: string[];
      provider: string | null;
    };
  };
  exifData: {
    gpsLatitude: number;
    gpsLongitude: number;
    gpsAltitude: number | null;
    customGeoTag: string;
    customMetadata: Record<string, any>;
  };
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
  createdAt: any;
  updatedAt: any;
}

export interface UserDocument {
  userId: string;
  email: string;
  displayName: string;
  photoCount: number;
  lastPhotoTimestamp?: any;
  createdAt: any;
  updatedAt: any;
}