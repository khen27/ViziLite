import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDueRrljNJLb7ksYcvySYDGum5mH5C04AU",
  authDomain: "vizilite-d3401.firebaseapp.com",
  projectId: "vizilite-d3401",
  storageBucket: "vizilite-d3401.firebasestorage.app",
  messagingSenderId: "797259164580",
  appId: "1:797259164580:web:d30b3425e78ec0b539af31",
  measurementId: "G-Y2R4NWW094"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Use standard Firestore (may work better with Expo Go)
export const db = getFirestore(app); 