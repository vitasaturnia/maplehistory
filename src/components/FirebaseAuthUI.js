import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../../firebase'; // Ensure this path is correct

const FirebaseAuthUI = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const uiConfig = {
                signInSuccessUrl: '/',
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID, // Correct provider ID
                ],
                callbacks: {
                    signInSuccessWithAuthResult: (authResult) => {
                        console.log('Sign-in success:', authResult);
                        return true; // Return type determines redirect behavior
                    },
                    uiShown: () => {
                        console.log('FirebaseUI Widget rendered');
                    },
                },
            };

            const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
            ui.start('#firebaseui-auth-container', uiConfig);

            return () => {
                ui.delete();
            };
        }
    }, []);

    return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;
