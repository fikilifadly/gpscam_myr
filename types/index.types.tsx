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
}

export interface WeatherData {
  temperature: number | null;
  condition: string | null;
  humidity: number | null;
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
}

export interface ProcessedImage extends CameraPhoto {
  location: LocationData;
  timestamp: string;
  weather: WeatherData;
  compass: CompassData;
  hasMockLocation: boolean;
}

export interface MockLocationApp {
  packageName: string;
  name: string;
}
