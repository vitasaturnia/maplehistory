import React from 'react';
import Register from '../components/Register'; // Assuming Register is the name of the sign-up component
import Layout from "../components/Layout";

const SignUpPage = () => {
    return (
        <Layout>
            <section className="section minheight100">
                <div className="container">
                    <h1>Register</h1>
                    <Register />
                </div>
            </section>
        </Layout>
    );
};

export default SignUpPage;
