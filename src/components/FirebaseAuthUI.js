import React, { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from './path-to-your-firebase-setup-file'; // Adjust this path

const FirebaseAuthUI = () => {
    useEffect(() => {
        // Firebase UI configuration
        const uiConfig = {
            signInSuccessUrl: '/', // Redirect after sign-in
            signInOptions: [
                firebaseui.auth.EmailAuthProvider.PROVIDER_ID,
                // Add other providers here
            ],
            // Additional configuration options as needed
        };

        // Check if UI is already initialized to prevent duplicate instances
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(auth);
        }
        ui.start('#firebaseui-auth-container', uiConfig);

        // Cleanup UI on unmount
        return () => {
            ui.delete();
        };
    }, []);

    return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;
