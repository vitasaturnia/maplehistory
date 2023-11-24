import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const SignupForm = () => {
    const handleSignup = () => {
        netlifyIdentity.open('signup');
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half">
                    <button onClick={handleSignup} className="button is-link">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
