// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEKEY,
  authDomain: "weather-emergency-group-6a7c0.firebaseapp.com",
  projectId: "weather-emergency-group-6a7c0",
  storageBucket: "weather-emergency-group-6a7c0.appspot.com",
  messagingSenderId: "78301318350",
  appId: "1:78301318350:web:879493cca68399f312d49f",
  measurementId: "G-34L1ZNE5WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getStorage } from 'firebase/storage'
const storage = getStorage(app)

export {storage}