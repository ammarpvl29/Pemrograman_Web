// config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAssynJdOq-sZQSYZkd1C098wmQBqMP65Q",
  authDomain: "to-doit-3b6be.firebaseapp.com",
  databaseURL: "https://to-doit-3b6be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "to-doit-3b6be",
  storageBucket: "to-doit-3b6be.firebasestorage.app",
  messagingSenderId: "259148851304",
  appId: "1:259148851304:web:e466d78545a72048b3f3dd",
  measurementId: "G-Q294ND2QS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export services
export { auth, db };