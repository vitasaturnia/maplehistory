import React from 'react';
import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

const LoginPage = () => {
    return (
        <Layout>
            <section className="section has-text-centered">
                <div className="container has-text-centered">
                    <h1 className="title has-text-warning has-text-centered">Sign Up</h1>
                    <h3 className="subtitle has-text-centered has-text-warning">Login</h3>

                    <SignupForm />
                </div>
            </section>
        </Layout>
    );
};

export default LoginPage;
