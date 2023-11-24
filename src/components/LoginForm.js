import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const LoginForm = () => {
    useEffect(() => {
        // Automatically open the Netlify Identity login form
        netlifyIdentity.open('login');

        // Optionally, add a cleanup function to close the widget
        // when the component unmounts
        return () => {
            netlifyIdentity.close();
        };
    }, []);

    return null; // No UI needed, as the widget handles the form
};

export default LoginForm;
