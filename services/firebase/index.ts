import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  deleteDoc,
  serverTimestamp,
  onSnapshot, 
  Unsubscribe 
} from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { PhotoData, AsyncFunction, AsyncVoidFunction } from '@/types/index.';

let unsubscribe: Unsubscribe | null = null;
let listeners: ((photos: PhotoData[]) => void)[] = [];

/**
 * Set up real-time listener for photos
 */
const setupRealTimeListener = (onPhotosUpdate: (photos: PhotoData[]) => void): void => {
  console.log("🔄 Setting up real-time photo listener...");
  
  listeners.push(onPhotosUpdate);
  
  if (unsubscribe) {
    console.log("📡 Real-time listener already exists");
    return;
  }

  try {
    const q = query(
      collection(db, 'photos'),
      orderBy('createdAt', 'desc')
    );

    unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        console.log("📸 Real-time update received! Photos count:", querySnapshot.size);
        
        const newPhotos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as PhotoData));
        
        listeners.forEach(listener => listener(newPhotos));
        
        console.log(`🔄 Notified ${listeners.length} listeners with ${newPhotos.length} photos`);
      },
      (error) => {
        console.error("❌ Error in real-time listener:", error);
      }
    );

  } catch (error) {
    console.error("❌ Error setting up real-time listener:", error);
  }
};

/**
 * Clean up real-time listener
 */
const cleanupRealTimeListener = (onPhotosUpdate: (photos: PhotoData[]) => void): void => {
  listeners = listeners.filter(listener => listener !== onPhotosUpdate);
  console.log(`🧹 Removed listener, ${listeners.length} remaining`);
  
  if (listeners.length === 0 && unsubscribe) {
    console.log("🧹 No more listeners, cleaning up real-time listener");
    unsubscribe();
    unsubscribe = null;
  }
};

/**
 * Get all photos from Firestore ordered by creation date (newest first)
 */
const getAllPhotos: AsyncFunction<PhotoData[]> = async (): Promise<PhotoData[]> => {
  try {
    const q = query(
      collection(db, 'photos'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const photos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PhotoData));
    
    console.log(`✅ Loaded ${photos.length} photos from Firestore`);
    return photos;
  } catch (error) {
    console.error('Error getting photos:', error);
    throw error;
  }
};

/**
 * Add new photo to Firestore
 */
const addPhoto = async (photoData: Omit<PhotoData, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'photos'), {
      ...photoData,
      createdAt: serverTimestamp(),
    });
    
    console.log("✅ New photo added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding photo:', error);
    throw error;
  }
};

/**
 * Delete photo from Firestore by ID
 */
const deletePhoto = (photoId: string): AsyncVoidFunction => {
  return async (): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'photos', photoId));
      console.log("✅ Photo deleted:", photoId);
    } catch (error) {
      console.error('Error deleting photo:', error);
      throw error;
    }
  };
};

export default {
  getAllPhotos,
  addPhoto,
  deletePhoto,
  setupRealTimeListener,
  cleanupRealTimeListener,
};