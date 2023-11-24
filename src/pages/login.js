import React, { useState } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm'; // Import the SignupForm component

const LoginPage = () => {
    const [showSignup, setShowSignup] = useState(false);

    const toggleForm = () => {
        setShowSignup(!showSignup);
    };

    return (
        <Layout>
            <section className="section">
                <div className="container">
                    {showSignup ? (
                        <>
                            <h1 className="title has-text-centered has-text-warning">Sign Up</h1>
                            <h3 className="subtitle is-italic has-text-centered has-text-warning" onClick={toggleForm} style={{ cursor: 'pointer' }}>
                                Login
                            </h3>
                            <SignupForm />
                        </>
                    ) : (
                        <>
                            <h1 className="title has-text-centered has-text-warning">Login</h1>
                            <h3 className="subtitle is-italic has-text-centered has-text-warning" onClick={toggleForm} style={{ cursor: 'pointer' }}>
                                Sign Up
                            </h3>
                            <LoginForm />
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default LoginPage;
