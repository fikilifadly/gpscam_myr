import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInAnonymously, signOut } from 'firebase/auth';
import { auth } from '@/configs/firebase';
import { firestoreService } from '@/services/firestore';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

/**
 * Custom hook for Firebase authentication
 */
const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        
        // Create or update user document in Firestore
        await firestoreService.createOrUpdateUser({
          userId: user.uid,
          email: user.email || 'anonymous@example.com',
          displayName: user.displayName || 'Anonymous User',
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Sign in anonymously
   */
  const signIn = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out user
   */
  const signOutUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    signIn,
    signOut: signOutUser,
  };
};

export default useAuth;