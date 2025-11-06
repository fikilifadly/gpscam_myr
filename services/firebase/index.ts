import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  getDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { PhotoData, AsyncFunction, AsyncVoidFunction, PromiseVoid } from '@/types/index.';

/**
 * Get photos collection reference from Firestore
 * 
 * @returns {dbAny} Firestore collection reference for photos
 * @private
 */
const _getPhotosCollection = () => collection(db, 'photos');

/**
 * Add new photo to Firestore
 * 
 * @param {Omit<PhotoData, 'id' | 'createdAt'>} photoData - Photo data without id and createdAt
 * @returns {Promise<string>} Promise that resolves to the created photo ID
 */
const addPhoto = async (photoData: Omit<PhotoData, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(_getPhotosCollection(), {
      ...photoData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding photo:', error);
    throw error;
  }
};

/**
 * Get all photos from Firestore ordered by creation date (newest first)
 * 
 * @returns {AsyncFunction<PhotoData[]>} Async function that returns array of photos
 */
const getAllPhotos: AsyncFunction<PhotoData[]> = async (): Promise<PhotoData[]> => {
  try {
    const q = query(
      _getPhotosCollection(),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PhotoData));
  } catch (error) {
    console.error('Error getting photos:', error);
    throw error;
  }
};

/**
 * Get single photo by ID from Firestore
 * 
 * @param {string} photoId - ID of the photo to retrieve
 * @returns {Promise<PhotoData | null>} Promise that resolves to photo data or null if not found
 */
const getPhotoById = async (photoId: string): Promise<PhotoData | null> => {
  try {
    const docRef = doc(db, 'photos', photoId);
    const docSnap = await getDoc(docRef);
    
    return docSnap.exists() ? { 
      id: docSnap.id, 
      ...docSnap.data() 
    } as PhotoData : null;
  } catch (error) {
    console.error('Error getting photo:', error);
    throw error;
  }
};

/**
 * Delete photo from Firestore by ID
 * 
 * @param {string} photoId - ID of the photo to delete
 * @returns {AsyncVoidFunction} Async function that deletes the photo
 */
const deletePhoto = (photoId: string): AsyncVoidFunction => {
  return async (): PromiseVoid => {
    try {
      await deleteDoc(doc(db, 'photos', photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  };
};

/**
 * Delete all photos from Firestore (cleanup function)
 * 
 * @returns {AsyncVoidFunction} Async function that deletes all photos
 */
const deleteAllPhotos: AsyncVoidFunction = async () => {
  try {
    const photos = await getAllPhotos();
    const deletePromises = photos.map(photo => 
      deleteDoc(doc(db, 'photos', photo.id!))
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting all photos:', error);
    throw error;
  }
};

export default {
  addPhoto,
  getAllPhotos,
  getPhotoById,
  deletePhoto,
  deleteAllPhotos
};