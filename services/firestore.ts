import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  GeoPoint,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/configs/firebase';
import { ProcessedImage } from '@/types/index.types';

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
    timestamp: Timestamp;
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserDocument {
  userId: string;
  email: string;
  displayName: string;
  photoCount: number;
  lastPhotoTimestamp?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Service for Firestore database operations
 */
class FirestoreService {
  private readonly PHOTOS_COLLECTION = 'photos';
  private readonly USERS_COLLECTION = 'users';
  private readonly USER_PHOTOS_SUBCOLLECTION = 'user_photos';

  /**
   * Upload image to Firebase Storage and save metadata to Firestore
   */
  async savePhotoWithMetadata(
    userId: string,
    image: ProcessedImage,
    file: Blob,
    thumbnailBlob: Blob
  ): Promise<string> {
    try {
      const photoId = this.generatePhotoId();
      
      // Upload main image
      const imagePath = `photos/${userId}/${photoId}/original.jpg`;
      const imageRef = ref(storage, imagePath);
      const imageSnapshot = await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageSnapshot.ref);

      // Upload thumbnail
      const thumbnailPath = `photos/${userId}/${photoId}/thumbnail.jpg`;
      const thumbnailRef = ref(storage, thumbnailPath);
      const thumbnailSnapshot = await uploadBytes(thumbnailRef, thumbnailBlob);
      const thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);

      // Prepare photo document
      const photoDoc: Omit<PhotoDocument, 'photoId'> = {
        userId,
        imageUrl,
        thumbnailUrl,
        filename: imageSnapshot.metadata.name,
        fileSize: imageSnapshot.metadata.size,
        metadata: {
          location: {
            latitude: image.location.latitude,
            longitude: image.location.longitude,
            altitude: image.location.altitude,
            accuracy: image.location.accuracy,
          },
          timestamp: Timestamp.fromDate(new Date(image.timestamp)),
          weather: {
            temperature: image.weather.temperature,
            condition: image.weather.condition,
            humidity: image.weather.humidity,
          },
          compass: {
            magneticHeading: image.compass.magneticHeading,
            trueHeading: image.compass.trueHeading,
          },
          device: {
            hasMockLocation: image.hasMockLocation,
            mockApps: [], // Will be populated from mock detection
            provider: null,
          },
        },
        exifData: {
          gpsLatitude: image.location.latitude,
          gpsLongitude: image.location.longitude,
          gpsAltitude: image.location.altitude,
          customGeoTag: `X-DataGeoTag: ${image.location.latitude}, ${image.location.longitude}`,
          customMetadata: {
            'X-Weather': image.weather.condition,
            'X-Temperature': image.weather.temperature,
            'X-Compass': image.compass.trueHeading,
            'X-Altitude': image.location.altitude,
            'X-MockLocation': image.hasMockLocation,
            'X-Timestamp': image.timestamp,
            'X-Accuracy': image.location.accuracy,
          },
        },
        status: 'completed',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      // Save to main photos collection
      const docRef = await addDoc(collection(db, this.PHOTOS_COLLECTION), {
        photoId,
        ...photoDoc,
      });

      // Also save to user's subcollection for faster queries
      await this.addToUserPhotos(userId, photoId, {
        imageUrl: thumbnailUrl, // Use thumbnail for list views
        timestamp: photoDoc.metadata.timestamp,
        location: new GeoPoint(image.location.latitude, image.location.longitude),
      });

      // Update user's photo count
      await this.updateUserPhotoCount(userId);

      return docRef.id;
    } catch (error) {
      console.error('Error saving photo to Firestore:', error);
      throw new Error('Failed to save photo metadata');
    }
  }

  /**
   * Add photo to user's personal photos subcollection
   */
  private async addToUserPhotos(
    userId: string, 
    photoId: string, 
    data: {
      imageUrl: string;
      timestamp: Timestamp;
      location: GeoPoint;
    }
  ): Promise<void> {
    const userPhotosRef = collection(db, this.USERS_COLLECTION, userId, this.USER_PHOTOS_SUBCOLLECTION);
    await addDoc(userPhotosRef, {
      photoId,
      ...data,
      createdAt: Timestamp.now(),
    });
  }

  /**
   * Update user's photo count and last photo timestamp
   */
  private async updateUserPhotoCount(userId: string): Promise<void> {
    const userRef = doc(db, this.USERS_COLLECTION, userId);
    
    // Get current user data
    const userPhotosQuery = query(
      collection(db, this.USERS_COLLECTION, userId, this.USER_PHOTOS_SUBCOLLECTION),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
    
    const userPhotosSnapshot = await getDocs(userPhotosQuery);
    const lastPhoto = userPhotosSnapshot.docs[0]?.data();

    await updateDoc(userRef, {
      photoCount: await this.getUserPhotoCount(userId),
      lastPhotoTimestamp: lastPhoto?.timestamp || null,
      updatedAt: Timestamp.now(),
    });
  }

  /**
   * Get user's photo count
   */
  private async getUserPhotoCount(userId: string): Promise<number> {
    const userPhotosRef = collection(db, this.USERS_COLLECTION, userId, this.USER_PHOTOS_SUBCOLLECTION);
    const snapshot = await getDocs(userPhotosRef);
    return snapshot.size;
  }

  /**
   * Get user's photos with pagination
   */
  async getUserPhotos(
    userId: string, 
    pageLimit: number = 20, 
    startAfter?: Timestamp
  ): Promise<PhotoDocument[]> {
    try {
      let photosQuery = query(
        collection(db, this.PHOTOS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(pageLimit)
      );

      if (startAfter) {
        photosQuery = query(photosQuery, where('createdAt', '<', startAfter));
      }

      const snapshot = await getDocs(photosQuery);
      return snapshot.docs.map(doc => doc.data() as PhotoDocument);
    } catch (error) {
      console.error('Error getting user photos:', error);
      throw new Error('Failed to fetch photos');
    }
  }

  /**
   * Get photos by location radius
   */
  async getPhotosByLocation(
    latitude: number,
    longitude: number,
    radiusInKm: number = 10,
    limitCount: number = 50
  ): Promise<PhotoDocument[]> {
    // Note: Firestore doesn't support native geo-queries
    // This would require a geohash implementation or separate geofirestore library
    // For now, we'll return recent photos and filter client-side
    
    const photosQuery = query(
      collection(db, this.PHOTOS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(photosQuery);
    const allPhotos = snapshot.docs.map(doc => doc.data() as PhotoDocument);

    // Filter by distance client-side (for demo purposes)
    return allPhotos.filter(photo => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        photo.metadata.location.latitude,
        photo.metadata.location.longitude
      );
      return distance <= radiusInKm;
    });
  }

  /**
   * Calculate distance between two coordinates in kilometers
   */
  private calculateDistance(
    lat1: number, lon1: number, lat2: number, lon2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  /**
   * Generate unique photo ID
   */
  private generatePhotoId(): string {
    return `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create or update user document
   */
  async createOrUpdateUser(userData: {
    userId: string;
    email: string;
    displayName: string;
  }): Promise<void> {
    const userRef = doc(db, this.USERS_COLLECTION, userData.userId);
    
    const userDoc: UserDocument = {
      ...userData,
      photoCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // This will create or update the user document
    await updateDoc(userRef, userDoc, { merge: true });
  }

  /**
   * Get user document
   */
  async getUser(userId: string): Promise<UserDocument | null> {
    const userRef = doc(db, this.USERS_COLLECTION, userId);
    const snapshot = await getDocs(collection(db, this.USERS_COLLECTION));
    const userDoc = snapshot.docs.find(doc => doc.id === userId);
    return userDoc?.data() as UserDocument || null;
  }
}

export const firestoreService = new FirestoreService();