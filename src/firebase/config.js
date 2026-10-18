import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Read configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if valid Firebase configuration is present
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey.length > 10 && 
    !firebaseConfig.apiKey.includes('YOUR_')
  );
};

// Initialize Firebase App safely
let app = null;
let auth = null;
let googleProvider = null;

try {
  if (isFirebaseConfigured()) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  }
} catch (error) {
  console.warn('Firebase initialization notice:', error.message);
}

// Google Sign In
export const loginWithGoogle = async () => {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error('Firebase is not yet configured. Please add your credentials in .env or use Guest Demo mode.');
  }
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Email & Password Sign In
export const loginWithEmail = async (email, password) => {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error('Firebase is not yet configured. Please add your credentials in .env or use Guest Demo mode.');
  }
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Email & Password Registration
export const signUpWithEmail = async (email, password, displayName) => {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error('Firebase is not yet configured. Please add your credentials in .env or use Guest Demo mode.');
  }
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(result.user, { displayName });
  }
  return result.user;
};

// Anonymous / Guest Sign In
export const loginAnonymously = async () => {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error('Firebase is not yet configured. Please add your credentials in .env or use Guest Demo mode.');
  }
  const result = await signInAnonymously(auth);
  return result.user;
};

// Sign Out
export const logoutUser = async () => {
  if (auth) {
    await signOut(auth);
  }
};

// Listen to Auth State Changes
export const subscribeToAuthChanges = (callback) => {
  if (auth) {
    return onAuthStateChanged(auth, callback);
  }
  // Return dummy unsubscribe if Firebase is not active
  return () => {};
};

export { auth };
