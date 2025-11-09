import { useState, useCallback, useEffect } from 'react';
import firebaseService from '@/services/firebase';
import { PhotoData, AsyncVoidFunction, PromiseVoid } from '@/types/index.';
import { UseFirebase, States } from './useFirebase.types';

/**
 * Load all photos from Firebase
 */
const _loadPhotos = (states: States) => async (): PromiseVoid => {
  const { setError, setLoading, setPhotos } = states;
  
  setLoading(true);
  setError(null);
  try {
    const allPhotos = await firebaseService.getAllPhotos();
    setPhotos(allPhotos);
    console.log(`✅ Loaded ${allPhotos.length} photos`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Error loading photos:", errorMessage);
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

/**
 * Upload new photo to Firebase
 */
const _uploadPhoto = (states: States) => async (
  photoData: Omit<PhotoData, 'id' | 'createdAt'>
): Promise<string> => {
  const { setError, setLoading } = states;
  
  setLoading(true);
  setError(null);
  try {
    const photoId = await firebaseService.addPhoto(photoData);
    console.log("✅ Photo uploaded with ID:", photoId);
    return photoId;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Error uploading photo:", errorMessage);
    setError(errorMessage);
    throw err;
  } finally {
    setLoading(false);
  }
};

/**
 * Delete photo from Firebase by ID
 */
const _deletePhoto = (states: States) => (
  photoId: string
): AsyncVoidFunction => {
  const { setError, setLoading } = states;
  
  return async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const deleteFn = firebaseService.deletePhoto(photoId);
      await deleteFn();
      console.log("✅ Photo deleted successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("❌ Error deleting photo:", errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
};

/**
 * Set up real-time photo updates
 */
const _setupRealTimeListener = (states: States) => {
  const { setPhotos } = states;
  
  const handlePhotosUpdate = (newPhotos: PhotoData[]) => {
    console.log("🔄 Real-time update received:", newPhotos.length, "photos");
    setPhotos(newPhotos);
  };
  
  firebaseService.setupRealTimeListener(handlePhotosUpdate);
  
  return () => {
    firebaseService.cleanupRealTimeListener(handlePhotosUpdate);
  };
};

/**
 * states
 */
const _states = (): States => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return {
    photos,
    loading,
    error,    
    setPhotos,
    setLoading,
    setError,
  }
}

/**
 * Custom hook for managing Firebase photo operations with real-time updates
 */
const useFirebase = (): UseFirebase => {
  const states = _states();

  useEffect(() => {
    console.log("🎯 Setting up real-time Firebase listener");
    const cleanup = _setupRealTimeListener(states);
    
    return () => {
      console.log("🧹 Cleaning up real-time Firebase listener");
      cleanup();
    };
  }, []);

  return {
    ...states,
    loadPhotos: _loadPhotos(states),
    uploadPhoto: _uploadPhoto(states),
    deletePhoto: _deletePhoto(states),
  };
};

export default useFirebase;