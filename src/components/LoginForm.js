import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const LoginForm = () => {
    const handleLogin = () => {
        netlifyIdentity.open('login');
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half">
                    <button onClick={handleLogin} className="button is-success">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
