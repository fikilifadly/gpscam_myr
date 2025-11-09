import { PhotoData } from "@/types/index.";

export interface States {
  photos: PhotoData[];
  loading: boolean;
  error: string | null;
  setPhotos: (photos: PhotoData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface UseFirebase {
  photos: PhotoData[];
  loading: boolean;
  error: string | null;
  loadPhotos: () => Promise<void>;
  uploadPhoto: (photoData: Omit<PhotoData, 'id' | 'createdAt'>) => Promise<string>;
  deletePhoto: (photoId: string) => () => Promise<void>;
}