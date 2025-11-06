import { PhotoData, AsyncVoidFunction, PromiseVoid } from '@/types/index.';

export interface UsePhotoGallery {
  photos: PhotoData[];
  loading: boolean;
  error: string | null;  
  loadPhotos: () => PromiseVoid;
  handleDeletePhoto: (photoId: string) => AsyncVoidFunction;
  handleViewDetails: (photo: PhotoData) => void;
  handleRefresh: () => void;
  handleImageError: (photoId: string) => void;
  hasImageError: (photoId: string) => boolean;  
  formatCoordinates: (lat: number, lng: number) => string;
  formatDate: (dateString: string) => string;
};
