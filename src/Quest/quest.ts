import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_FIREBASE_KEY,
  authDomain: process.env.API_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.API_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.API_FIREBASE_APP_ID,
  measurementId: process.env.API_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;