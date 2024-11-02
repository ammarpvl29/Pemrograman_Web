import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const messageDiv = document.getElementById('message');
    const loginButton = document.querySelector('button[type="submit"]');

    // Check if elements exist
    if (!form || !messageDiv || !loginButton) {
        console.error('Required elements not found');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        // Validation
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        try {
            // Attempt login
            await signInWithEmailAndPassword(auth, email, password);
            
            // Show success message
            showMessage('Login successful!', 'success');
            
            // Redirect to todo page after brief delay
            setTimeout(() => {
                window.location.href = 'todo.html';
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);
            let errorMessage;
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                default:
                    errorMessage = 'Login failed. Please try again.';
            }
            
            showMessage(errorMessage, 'error');
            loginButton.disabled = false;
            loginButton.textContent = 'Login';
        }
    });
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = `mt-4 text-center ${type === 'error' ? 'text-error' : 'text-success'}`;
    messageDiv.classList.remove('hidden');
}