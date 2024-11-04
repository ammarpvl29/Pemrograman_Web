// profile.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

async function updateProfileUI(user) {
    try {
        if (!user) {
            console.log('No user found');
            return;
        }

        console.log('Updating profile for user:', user.uid);

        // Get element
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileInitials = document.getElementById('profileInitials');

        if (!profileName || !profileEmail || !profileInitials) {
            console.error('Profile elements not found');
            return;
        }

        // Loading state
        profileName.innerHTML = '<span class="loading loading-spinner loading-xs"></span> Loading...';
        profileEmail.innerHTML = '<span class="loading loading-spinner loading-xs"></span> Loading...';

        // Ambil user data dari Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
            console.error('No user document found');
            return;
        }

        const userData = userDoc.data();
        console.log('Fetched user data:', userData);

        // Update UI dengan user data
        profileName.innerHTML = userData.fullName;
        profileEmail.innerHTML = userData.email;
        profileInitials.textContent = userData.fullName[0].toUpperCase();

    } catch (error) {
        console.error('Error updating profile:', error);
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        if (profileName && profileEmail) {
            profileName.innerHTML = 'Error loading profile';
            profileEmail.innerHTML = 'Please try again';
        }
    }
}

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
    console.log('Auth state changed:', user?.uid);
    if (user) {
        await updateProfileUI(user);
    } else {
        window.location.href = 'index.html';
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', async () => {
    const user = auth.currentUser;
    if (user) {
        await updateProfileUI(user);
    }
});