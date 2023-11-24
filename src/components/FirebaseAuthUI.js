import React, { useEffect } from 'react';
import { auth } from '../../firebase'; // Ensure this path is correct

const FirebaseAuthUI = () => {
    useEffect(() => {
        // Only execute in the client side
        if (typeof window !== 'undefined') {
            const firebaseui = require('firebaseui');
            import('firebaseui/dist/firebaseui.css');

            const uiConfig = {
                signInSuccessUrl: '/',
                signInOptions: [
                    {
                        provider: 'password', // Using 'password' for email/password sign-in
                        requireDisplayName: true
                    },
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
