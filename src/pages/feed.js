import React from 'react';
import FeedGenerator from '../components/FeedGenerator'; // Adjust the path as per your project structure
import Layout from "../components/Layout";
export default function FeedPage() {
    return (
        <Layout>
        <div className="feed-page has-text-centered">
            <h1 className="title has-text-warning">Latest Posts</h1>
            <FeedGenerator />
        </div>
        </Layout>
    );
}
