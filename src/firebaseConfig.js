// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCeHhcz4bmydNx76ueHjsFnCXFbFZrysMs",
  authDomain: "iitj-backend.firebaseapp.com",
  projectId: "iitj-backend",
  storageBucket: "iitj-backend.firebasestorage.app",
  messagingSenderId: "352451986696",
  appId: "1:352451986696:web:4caa0165e67814a4bb98bd",
  measurementId: "G-G8L5103PLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
