import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

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
        getFirestore(app); // Initialize Firestore if needed

        // Firebase UI configuration
        const uiConfig = {
            signInSuccessUrl: '/', // Redirect after sign-in
            signInOptions: [
                firebaseui.auth.EmailAuthProvider.PROVIDER_ID,
                // You can add other providers here like Google, Facebook, etc.
            ],
            // Additional configuration options as needed
        };

        // Check if UI is already initialized to prevent duplicate instances
        if (firebaseui.auth.AuthUI.getInstance()) {
            const ui = firebaseui.auth.AuthUI.getInstance();
            ui.start('#firebaseui-auth-container', uiConfig);
        } else {
            const ui = new firebaseui.auth.AuthUI(auth);
            ui.start('#firebaseui-auth-container', uiConfig);
        }

        // Cleanup UI on unmount
        return () => {
            const ui = firebaseui.auth.AuthUI.getInstance();
            if (ui) {
                ui.delete();
            }
        };
    }, []);

    return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;
