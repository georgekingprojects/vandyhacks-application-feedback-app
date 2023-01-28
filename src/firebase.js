import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNfHxFbhPtSKMjUldVMKphHpm9BjrQcDQ",
  authDomain: "vandyhacks-application.firebaseapp.com",
  projectId: "vandyhacks-application",
  storageBucket: "vandyhacks-application.appspot.com",
  messagingSenderId: "780625041712",
  appId: "1:780625041712:web:a08bb04f3d778029c890f5",
};

// Initialize Firebase and cloud storage
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
