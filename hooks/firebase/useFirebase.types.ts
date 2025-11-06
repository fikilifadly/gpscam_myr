import { PhotoData, AsyncVoidFunction, SetterState, SetterBoolean } from "@/types/index.";

export type States = {
  photos: PhotoData[],
  setPhotos: SetterState<PhotoData[]>,
  loading: boolean,
  setLoading: SetterBoolean<boolean>,
  error: string | null,
  setError: SetterState<string|null>,
}

export interface UseFirebase extends States {
  loadPhotos: () => Promise<void>;
  uploadPhoto: (photoData: Omit<PhotoData, 'id' | 'createdAt'>) => Promise<string>;
  deletePhoto: (photoId: string) => AsyncVoidFunction; 
};
