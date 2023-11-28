import React from 'react';
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";



import { AuthProvider } from './src/context/Authcontext';

export const wrapRootElement = ({ element }) => {
    return (
        <AuthProvider>
            {element}
        </AuthProvider>
    );
};
