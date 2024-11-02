import { 
    createUserWithEmailAndPassword,
    signOut 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config.js';

export const signUpUser = async (fullName, email, password) => {
    try {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            fullName: fullName,
            email: email,
            createdAt: new Date().toISOString()
        });

        return {
            success: true,
            message: 'Account created successfully!'
        };

    } catch (error) {
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
                errorMessage = 'Failed to create account';
        }
        return {
            success: false,
            message: errorMessage,
            error: error.code
        };
    }
};

// Keep signOut function
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true, message: 'Logged out successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to logout' };
    }
};