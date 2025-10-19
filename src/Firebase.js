// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔥 ini buat Firestore

// Config project-mu
const firebaseConfig = {
  apiKey: "AIzaSyDTu4Bb86WFvh4MoE7mu25MXmm-cotlKLI",
  authDomain: "appniat.firebaseapp.com",
  projectId: "appniat",
  storageBucket: "appniat.firebasestorage.app",
  messagingSenderId: "348199015987",
  appId: "1:348199015987:web:5e154d16400d58fcb8b546",
  measurementId: "G-P2L3EVFQ4V"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Export biar bisa dipakai di file lain
export const auth = getAuth(app);
export const db = getFirestore(app); // 🔥 Firestore instance
export default app;
