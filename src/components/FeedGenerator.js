import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, increment, serverTimestamp, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const POSTS_PER_PAGE = 10;

export default function FeedGenerator() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            if (loading || !hasMore) return;
            setLoading(true);

            const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

            try {
                const snapshot = await getDocs(postsQuery);
                const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setHasMore(newPosts.length === POSTS_PER_PAGE);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }

            setLoading(false);
        };

        fetchPosts();
    }, [loading, hasMore]);

    const likePost = async (postId) => {
        try {
            const postRef = doc(db, 'posts', postId);
            await setDoc(postRef, { likes: increment(1) }, { merge: true });

            // Record the like in a separate "likes" collection
            const likeData = {
                postId: postId,
                userId: 'nEokqhnR2GarUS9usWQUHiuYqUg2', // Replace with the actual user ID
                timestamp: serverTimestamp()
            };
            const likesCollectionRef = collection(db, 'likes');
            await setDoc(doc(likesCollectionRef, postId + '_' + likeData.userId), likeData);

        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    return (
        <div className="feed-container minheight100">
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <div className="post-content">
                        <h3 className="post-title">{post.content}</h3>
                        {/* Add the like button */}
                        <div className="like-icons">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="icon"
                                onClick={() => likePost(post.id)}
                            />
                            {/* Display the number of likes */}
                            <span className="like-count has-text-warning">{post.likes || 0}</span>
                        </div>
                        <p className="post-meta">
                            Created by {post.username || 'Unknown User'} on {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                        </p>
                    </div>
                    <p className="is-italic has-text-warning">Read More</p>
                </div>
            ))}
            {loading && <div className="loading is-italic as-text-warning">Loading more posts...</div>}
            {!hasMore && (
                <div className="is-full-width">
                    <div className="divider">
                        <span></span>
                        <span>End of Feed</span>
                        <span></span>
                    </div>
                    <div className="end-of-feed is-italic has-text-warning">No more posts to load.</div>
                </div>
            )}
        </div>
    );
}
