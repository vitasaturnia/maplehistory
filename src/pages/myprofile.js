import React from 'react';
import Profile from '../components/Profile'; // Import the Profile component
import Layout from '../components/Layout';

const MyProfile = () => {
    return (
        <Layout>
        <div>
            <Profile /> {/* Render the Profile component */}
        </div>
        </Layout>
    );
};

export default MyProfile;
