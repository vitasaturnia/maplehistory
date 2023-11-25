import React from 'react';
import EditProfile from '../components/EditProfile';
import Layout from "../components/Layout";
const EditAccountPage = () => {
    return (
        <Layout>
        <div className="section has-text-warning has-text-centered">
            <h1 className="title has-text-warning">Edit Your Account</h1>
            <EditProfile />
        </div>
        </Layout>
    );
};

export default EditAccountPage;
