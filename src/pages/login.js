import React from 'react';
import Layout from '../components/Layout'; // Assuming you have a Layout component
import LoginForm from '../components/LoginForm'; // Update the path as needed

const LoginPage = () => {
    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered has-text-warning">Login</h1>
                    <h3 className="subtitle is-italic has-text-centered has-text-warning">Sign Up</h3>

                    <LoginForm />


                </div>
            </section>
        </Layout>
    );
};

export default LoginPage;
