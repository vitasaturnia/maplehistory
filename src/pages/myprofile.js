import React from 'react';
import Profile from '../components/Profile'; // Import the Profile component
import Layout from '../components/Layout';

const MyProfile = () => {
    return (
        <Layout>
        <div className="has-text-centered">
            <Profile /> {/* Render the Profile component */}
        </div>
            <section className="section has-text-centered">
                <button className="button is-warning is-outliend">New post</button>

            </section>
        </Layout>
    );
};

export default MyProfile;
