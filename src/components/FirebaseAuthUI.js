import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../../firebase'; // Adjust the path as needed

const FirebaseAuthUI = () => {
    useEffect(() => {
        // Firebase UI configuration
        const uiConfig = {
            signInSuccessUrl: '/', // Redirect after sign-in
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // You can add other providers here
            ],
            // Configure other options as needed
        };

        // Initialize Firebase UI
        const firebaseui = require('firebaseui');
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', uiConfig);

        // Cleanup UI on unmount
        return () => ui.delete();
    }, []);

    return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;
