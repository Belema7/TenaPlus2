import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDVvVsISXOeZTT5V0XOaocYd7-LOit0d1Y",
  authDomain: "tenaplus2.firebaseapp.com",
  projectId: "tenaplus2",
  storageBucket: "tenaplus2.firebasestorage.app",
  messagingSenderId: "143339924604",
  appId: "1:143339924604:web:df5828dee592e160cd6df9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);



