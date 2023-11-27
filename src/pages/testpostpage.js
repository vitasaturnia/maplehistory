// PostsPage.js

import React from 'react';
import PostWithComments from '../components/PostWithComments';
import mockPosts from '../components/MockData';
import '../components/post.css';

const PostsPage = () => {
    return (
        <div className="test-container">
            {mockPosts.map(post => (
                <PostWithComments key={post.id} username={post.username} postDate={post.postDate} content={post.content} />
            ))}
        </div>
    );
};

export default PostsPage;
