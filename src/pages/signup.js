import React from 'react';
import SignUp from '../components/SignUp'; // Assuming SignUp is the name of the sign-up component
import Layout from "../components/Layout";

const SignUpPage = () => {
    return (
        <Layout>
            <section className="section is-full-height">
                <div className="container">
                    <h1>Register</h1>
                    <SignUp />
                </div>
            </section>
        </Layout>
    );
};

export default SignUpPage;
