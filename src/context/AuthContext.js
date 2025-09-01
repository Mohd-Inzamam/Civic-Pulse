// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { app } from "../lib/firebase";  // import your firebase.js config

const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Custom hook
export function useAuth() {
    return useContext(AuthContext);
}
