import React, { useEffect } from 'react';
import useFirebase from '@/hooks/firebase/useFirebase';
import { PhotoData, AsyncVoidFunction } from '@/types/index.';

/**
 * Photo gallery component displaying photos from Firebase
 * 
 * @returns {React.FC} Photo gallery component
 */
const PhotoGallery: React.FC = () => {
  const { 
    photos, 
    loading, 
    error, 
    loadPhotos, 
    uploadPhoto, 
    deletePhoto,
    setError 
  } = useFirebase();

  /**
   * Load photos on component mount
   */
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  /**
   * Handle photo deletion
   * 
   * @param {string} photoId - ID of photo to delete
   */
  const handleDeletePhoto = (photoId: string): void => {
    const deleteFn: AsyncVoidFunction = deletePhoto(photoId);
    
    deleteFn().then(() => {
      // Reload photos after successful deletion
      loadPhotos();
    }).catch((err) => {
      console.error('Failed to delete photo:', err);
    });
  };

  /**
   * Handle photo upload
   * 
   * @param {Omit<PhotoData, 'id' | 'createdAt'>} photoData - Photo data to upload
   */
  const handleUploadPhoto = async (
    photoData: Omit<PhotoData, 'id' | 'createdAt'>
  ): Promise<void> => {
    try {
      const photoId = await uploadPhoto(photoData);
      console.log('Photo uploaded with ID:', photoId);
      await loadPhotos(); // Refresh list
    } catch (err) {
      console.error('Failed to upload photo:', err);
    }
  };

  /**
   * Clear error
   */
  const handleClearError = (): void => {
    setError(null);
  };

  if (loading) return <div>Loading photos...</div>;
  
  if (error) return (
    <div>
      <div>Error: {error}</div>
      <button onClick={handleClearError}>Dismiss</button>
      <button onClick={loadPhotos}>Retry</button>
    </div>
  );

  return (
    <div>
      <h2>Photo Gallery ({photos.length} photos)</h2>
      <button onClick={loadPhotos} disabled={loading}>
        Refresh Photos
      </button>
      
      <div>
        {photos.map(photo => (
          <div key={photo.id} style={{ marginBottom: '20px' }}>
            <img 
              src={photo.imageBase64} 
              alt="Captured" 
              style={{ width: '200px', height: '150px' }}
            />
            <div>
              <p>Location: {photo.location.latitude}, {photo.location.longitude}</p>
              <p>Mock Location: {photo.isMockLocation ? 'Yes' : 'No'}</p>
              <button 
                onClick={() => handleDeletePhoto(photo.id!)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;