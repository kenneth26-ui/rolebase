import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWc7tdi1OeG4mzw0AHE2kDpW2DiB7bAaY",
  authDomain: "carmass-c8b68.firebaseapp.com",
  projectId: "carmass-c8b68",
  storageBucket: "carmass-c8b68.firebasestorage.app",
  messagingSenderId: "79555215990",
  appId: "1:79555215990:web:5b9c40762170424f215557"
};

// Singleton check to prevent multiple app initializations during Next.js HMR
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with long-polling fallback for local development
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

const storage = getStorage(app);

export { db, storage };