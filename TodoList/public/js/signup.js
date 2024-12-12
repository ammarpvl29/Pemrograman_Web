// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);  

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const fullName = document.getElementById('fullName').value;
        const submitButton = document.querySelector('button[type="submit"]');

        // Validasi
        if (!email || !password || !confirmPassword || !fullName) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="loading loading-spinner"></span>
                Creating account...
            `;

            // Bikin user account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Auth profile
            await updateProfile(user, {
                displayName: fullName
            });

            // Simpan di Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                fullName: fullName,
                email: email,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            });

            console.log('Profile updated successfully');
            showMessage('Account created successfully!', 'success');

            // Force reload auth state
            await user.reload();
            
            // Redirect ke login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage;
            
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Email already registered';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters';
                    break;
                default:
                    errorMessage = `Failed to create account: ${error.message}`;
            }
            
            showMessage(errorMessage, 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Sign Up';
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