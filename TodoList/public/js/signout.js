// signout.js
import { signOutUser } from './firebase/auth.js';
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

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
  
  // Inisialisasi Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

document.getElementById('signOutBtn').addEventListener('click', async () => {
    try {
        const result = await signOutUser();
        if (result.success) {
            // Redirect ke login page
            window.location.href = 'index.html';
        } else {
            console.error('Sign out failed:', result.message);
            alert(result.message);
        }
    } catch (error) {
        console.error('Sign out error:', error);
        alert('Error signing out');
    }
});