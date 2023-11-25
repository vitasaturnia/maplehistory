import React from 'react';
import Login from '../components/Login';
import Layout from "../components/Layout";

const LoginPage = () => {
    return (
        <Layout>
            <section className="section minheight100">
            <div className="centeredcontainer">
            <h1>Login</h1>
            <Login />
        </div>
        </section>
        </Layout>
    );
};

export default LoginPage;
