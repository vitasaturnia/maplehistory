import React, { useEffect } from 'react';
import { auth } from '../../firebase'; // Ensure this path is correct
import firebase from 'firebase/compat/app'; // Ensure Firebase is imported correctly

const FirebaseAuthUI = () => {
    useEffect(() => {
        // Only execute in the client side
        if (typeof window !== 'undefined') {
            const firebaseui = require('firebaseui');
            import('firebaseui/dist/firebaseui.css');

            const uiConfig = {
                signInSuccessUrl: '/',
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID, // Correct provider ID for email/password
                    // Add other providers here
                ],
                // Additional configuration options as needed
            };

            let ui = firebaseui.auth.AuthUI.getInstance();
            if (!ui) {
                ui = new firebaseui.auth.AuthUI(auth);
            }
            ui.start('#firebaseui-auth-container', uiConfig);

            return () => {
                ui.delete();
            };
        }
    }, []);

    return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;
