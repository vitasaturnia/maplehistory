import React, { useState } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
    const [isSignupComplete, setIsSignupComplete] = useState(false);

    const handleSuccessfulSignup = () => {
        setIsSignupComplete(true);
    };

    return (
        <Layout>
            <section className="section has-text-centered">
                <div className="container has-text-centered">
                    {!isSignupComplete ? (
                        <>
                            <h1 className="title has-text-warning has-text-centered">Sign Up</h1>
                            <SignupForm onSuccessfulSignup={handleSuccessfulSignup} />
                        </>
                    ) : (
                        <>
                            <h1 className="title has-text-warning has-text-centered">Login</h1>
                            <h3 className="subtitle has-text-centered has-text-warning">
                                Registration completed, you can login below.
                            </h3>
                            <LoginForm />
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default SignupPage;
