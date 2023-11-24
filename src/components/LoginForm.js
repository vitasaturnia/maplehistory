import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const LoginForm = () => {
    useEffect(() => {
        // Open the login modal as soon as the component mounts
        netlifyIdentity.open('login');

        // Optional: Close the modal when the component unmounts
        return () => netlifyIdentity.close();
    }, []);

    return (
        <div className="container">
            {/*
                You can add additional content here if needed,
                but the primary functionality will be handled by the Netlify modal
            */}
        </div>
    );
};

export default LoginForm;
