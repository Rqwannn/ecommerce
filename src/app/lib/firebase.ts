import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDfb-1wSlXm4V9cXOu6aUKLc7hsHi7XD_o",
    authDomain: "ecommerce-15602.firebaseapp.com",
    projectId: "ecommerce-15602",
    storageBucket: "ecommerce-15602.firebasestorage.app",
    messagingSenderId: "60111683724",
    appId: "1:60111683724:web:281009553a38115e913ba9",
    measurementId: "G-EBJMQ9SCQC"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User logged in:', result.user);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

const logout = async () => {
  await signOut(auth);
  console.log('User logged out');
};

export { app, auth, db, storage, signInWithGoogle, logout };