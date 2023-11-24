// FirebaseAuthUI.js
import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { AuthUI, startUI } from 'firebaseui';

const FirebaseAuthUI = () => {
    useEffect(() => {
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCo72n2CJWf6WFGDs8jDGDyz07IM3wQZoM",
            authDomain: "maplehistorymsh.firebaseapp.com",
            projectId: "maplehistorymsh",
            storageBucket: "maplehistorymsh.appspot.com",
            messagingSenderId: "958498273176",
            appId: "1:958498273176:web:fc15f641ea1db91de79ded",
            measurementId: "G-BY6NLMDTPJ"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // Firebase UI configuration
        const uiConfig = {
            signInSuccessUrl: '/', // Redirect after sign-in
            signInOptions: [
                {
                    provider: auth.EmailAuthProvider.PROVIDER_ID,
                },
                // You can add other providers here
            ],
            // Configure other options as needed
        };

        // Initialize Firebase UI
        const ui = new AuthUI(auth);
        startUI('#firebaseui-auth-container', uiConfig);

        // Cleanup UI on unmount
        return () => ui.reset();
    }, []);

    return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;
