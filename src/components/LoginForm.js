import React, { useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        netlifyIdentity.login(email, password)
            .then((user) => {
                console.log('Login successful:', user);
                // Redirect or perform further actions after successful login
            })
            .catch((error) => {
                console.error('Error during login:', error);
                // Handle login error here
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
                                <button className="button is-success">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
