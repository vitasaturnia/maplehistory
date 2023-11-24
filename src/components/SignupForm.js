import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const SignupForm = ({ onSuccessfulSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const handleSignupSuccess = (user) => {
            console.log('Signup successful for:', user);
            onSuccessfulSignup(); // Call the passed-in callback function
        };

        netlifyIdentity.on('signup', handleSignupSuccess);

        return () => {
            netlifyIdentity.off('signup', handleSignupSuccess);
        };
    }, [onSuccessfulSignup]);

    const handleSubmit = (e) => {
        e.preventDefault();
        netlifyIdentity.signup(email, password)
            .then((user) => {
                console.log('Signup submission successful:', user);
                // Optionally call onSuccessfulSignup here for immediate feedback
                // onSuccessfulSignup();
            })
            .catch((error) => {
                console.error('Error during signup:', error);
                // Handle signup error here
            });
    };

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half">
                    <form onSubmit={handleSubmit} className="box">
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="e.g. alex@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="*******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <button className="button is-link">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
