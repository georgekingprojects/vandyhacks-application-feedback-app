import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxxzWovFxgGNJ9K0MtbZoYkScatu6ichY",
  authDomain: "spotify-submission-portal.firebaseapp.com",
  projectId: "spotify-submission-portal",
  storageBucket: "spotify-submission-portal.appspot.com",
  messagingSenderId: "750557205175",
  appId: "1:750557205175:web:799a20a6b0d6f789e4b332",
};

// Initialize Firebase and cloud storage
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
