import { useState, useCallback } from 'react';
import firebaseService from '@/services/firebase';

import { PhotoData, AsyncVoidFunction, PromiseVoid } from '@/types/index.';
import { UseFirebase, States } from './useFirebase.types';

/**
 * Load all photos from Firebase
 *
 * @param {States} states - state setters
 * @returns {PromiseVoid} Promise that resolves when photos are loaded
 */
const _loadPhotos = (states: States) => async (): PromiseVoid => {
  const { setError, setLoading, setPhotos } = states;
  
  setLoading(true);
  setError(null);
  try {
    const allPhotos = await firebaseService.getAllPhotos();
    setPhotos(allPhotos);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
    setLoading(false);
  }
};

/**
 * Upload new photo to Firebase
 *
 * @param {States} states - state setters
 * @returns {Function} Function that accepts photo data and returns Promise with photo ID
 */
const _uploadPhoto = (states: States) => async (
  photoData: Omit<PhotoData, 'id' | 'createdAt'>
): Promise<string> => {
  const { setError, setLoading } = states;
  
  setLoading(true);
  setError(null);
  try {
    const photoId = await firebaseService.addPhoto(photoData);
    return photoId;
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error");
    throw err;
  } finally {
    setLoading(false);
  }
};

/**
 * Delete photo from Firebase by ID
 *
 * @param {States} states - state setters
 * @returns {Function} Function that accepts photo ID and returns async void function
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };
};

/**
 * states
 * 
 * @return {States} states
 * @private
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
 * Custom hook for managing Firebase photo operations with modular approach
 * 
 * @returns {UseFirebase} Object containing photos state and operations
 */
const useFirebase = (): UseFirebase => {
  const states = _states();

  return {
    ...states,
    loadPhotos: _loadPhotos(states),
    uploadPhoto: _uploadPhoto(states),
    deletePhoto: _deletePhoto(states),
  };
};

export default useFirebase;