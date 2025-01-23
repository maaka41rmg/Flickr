// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Asegúrate de importar getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqZeXSxKirxygijNgs-pBYdcM1f3B1RfI",
  authDomain: "flickr-c5285.firebaseapp.com",
  projectId: "flickr-c5285",
  storageBucket: "flickr-c5285.appspot.com", // Corregido el dominio del storage
  messagingSenderId: "307070163738",
  appId: "1:307070163738:web:a3f8f2759f5869113a6aa3",
  measurementId: "G-012W5HV56Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
