// /src/pages/newpost.js

import React from 'react';
import Layout from '../components/Layout'; // You may have a Layout component
import CreatePost from '../components/CreatePost';

export default function NewPostPage() {
    return (
        <Layout>
            <div>
                <h1>Create a New Post</h1>
                <CreatePost />
            </div>
        </Layout>
    );
}
