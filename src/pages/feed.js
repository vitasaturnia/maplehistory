import React from 'react';
import FeedGenerator from '../components/FeedGenerator';
import CreatePostMini from '../components/CreatePostMini';

import Layout from "../components/Layout";
export default function FeedPage() {
    return (
        <Layout>
        <div className="has-text-centered">
            <CreatePostMini/>
            <FeedGenerator />
        </div>
        </Layout>
    );
}
