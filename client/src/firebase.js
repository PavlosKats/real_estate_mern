// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-cc24a.firebaseapp.com",
  projectId: "mern-estate-cc24a",
  storageBucket: "mern-estate-cc24a.appspot.com",
  messagingSenderId: "284584499735",
  appId: "1:284584499735:web:d8f853dcf82f896abd5a52"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);