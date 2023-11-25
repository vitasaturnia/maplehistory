import React from 'react';
import Profile from '../components/Profile'; // Import the Profile component
import Layout from '../components/Layout';
import { Link } from "gatsby";

const MyProfilePage = () => {
    return (
        <Layout>
            <section className="minheight100">
                <div className="centeredcontainer">

            <Profile /> {/* Render the Profile component */}
            <section className="section has-text-centered">
                <Link to="/newpost">
                <button className="button is-warning is-outliend">New post</button>
                </Link>
            </section>
                </div>
            </section>

        </Layout>
    );
};

export default MyProfilePage;
