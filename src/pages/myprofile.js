import React from 'react';
import Layout from '../components/Layout'; // Update the path as needed
import Profile from '../components/Profile'; // Update the path as needed

const ProfilePage = () => {
    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <Profile />
                </div>
            </section>
        </Layout>
    );
};

export default ProfilePage;
