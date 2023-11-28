import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../../firebase"; // Adjust the path as per your project structure

export const Authcontext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Add more auth functions as needed (e.g., login, logout, signup)

    return (
        <Authcontext.Provider value={{ currentUser, loading }}>
            {!loading && children}
        </Authcontext.Provider>
    );
};

export const useAuth = () => useContext(Authcontext);
