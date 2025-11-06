import type { Dispatch, SetStateAction } from "react";

export type VoidFunction = () => void;
export type SetterState<T> =  Dispatch<SetStateAction<T>>;
export type SetterBoolean<T extends boolean> = Dispatch<SetStateAction<T>>;
export type AsyncVoidFunction = () => Promise<void>;
export type AsyncFunction<T> = () => Promise<T>;
export type PromiseVoid = Promise<void>;
export type $Shape<T> = {
  [K in keyof T]?: T[K];
};

export type ExifData = {
  customGeoTag: string
};

export type Weather = {
  temp: number,
  condition: string,
  humidity: number,
};

export type Location = {
  latitude: number,
  longitude: number,
  altitude: number | null,
  compassHeading: number | null,
  magneticField: number | null,
  weather: Weather | null,
};

export type PhotoData = {
  id?: string,
  imageBase64: string,
  isMockLocation: boolean,
  location: Location,
  exifData: ExifData,
  createdAt?: string;
};

export type FirebaseConfig = {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
};