import React, { useEffect } from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../../firebase'; // Ensure this path is correct
import { EmailAuthProvider } from 'firebase/auth';

const FirebaseAuthUI = () => {
    useEffect(() => {
        const uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                {
                    provider: EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false  // Set to false to not require display names
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
    }, []);

    return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;
