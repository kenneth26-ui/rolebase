// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWc7tdi1OeG4mzw0AHE2kDpW2DiB7bAaY",
  authDomain: "carmass-c8b68.firebaseapp.com",
  projectId: "carmass-c8b68",
  storageBucket: "carmass-c8b68.firebasestorage.app",
  messagingSenderId: "79555215990",
  appId: "1:79555215990:web:5b9c40762170424f215557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)
export{db, storage}