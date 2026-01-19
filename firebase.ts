
// Fix: Use standard modular Firebase imports for v9+ compatibility
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXT0Q0HcnUq_zNHviZ5lCAilYkCI7kSb0",
  authDomain: "lenda-website-82ea6.firebaseapp.com",
  projectId: "lenda-website-82ea6",
  storageBucket: "lenda-website-82ea6.firebasestorage.app",
  messagingSenderId: "969621218285",
  appId: "1:969621218285:web:a0584b8400fca7154f3de4"
};

// Initialize App
const app = initializeApp(firebaseConfig);

// Realtime Database for Messages and Quotes
export const db = getDatabase(app);

// Firestore for Blog Posts
export const firestore = getFirestore(app);
