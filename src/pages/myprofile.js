import React from 'react';
import Profile from '../components/Profile'; // Import the Profile component
import Layout from '../components/Layout';
import { Link } from "gatsby";

const MyProfile = () => {
    return (
        <Layout>
        <div className="has-text-centered">
            <Profile /> {/* Render the Profile component */}
        </div>
            <section className="section has-text-centered">
                <Link to="/newpost">
                <button className="button is-warning is-outliend">New post</button>
                </Link>
            </section>
        </Layout>
    );
};

export default MyProfile;
