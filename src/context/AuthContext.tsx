import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Define User type
export interface User {
  uid: string;
  name?: string;
  photoUrl?: string;
}

// Define AuthContext type
export interface AuthContextType {
  user: User | null;
  setProfile: (name: string, photoUrl?: string) => Promise<void>;
}

// Create AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      // Read UID from AsyncStorage or generate a new one
      let uid = await AsyncStorage.getItem('uid');
      
      if (!uid) {
        uid = uuidv4();
        await AsyncStorage.setItem('uid', uid);
      }

      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // User exists in Firestore, merge data into state
        const userData = userDocSnap.data() as Omit<User, 'uid'>;
        setUser({
          uid,
          ...userData,
        });
      } else {
        // User doesn't exist in Firestore, set basic user with UID
        setUser({ uid });
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      // Fallback: create user with generated UID
      const fallbackUid = uuidv4();
      setUser({ uid: fallbackUid });
    }
  };

  const setProfile = async (name: string, photoUrl?: string) => {
    if (!user) {
      throw new Error('No user found');
    }

    try {
      const profileData: Partial<User> = { name };
      if (photoUrl) {
        profileData.photoUrl = photoUrl;
      }

      // Write to Firestore (merge with existing data)
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, profileData, { merge: true });

      // Update context state
      setUser(prevUser => ({
        ...prevUser!,
        ...profileData,
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user,
    setProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 