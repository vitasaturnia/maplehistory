import React from 'react';
import Login from '../components/Login';
import Layout from "../components/Layout";

const LoginPage = () => {
    return (
        <Layout>
            <section className="section is-full-height">
            <div className="container">
            <h1>Login</h1>
            <Login />
        </div>
        </section>
        </Layout>
    );
};

export default LoginPage;
