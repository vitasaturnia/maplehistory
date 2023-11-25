import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, startAfter, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const POSTS_PER_PAGE = 10;

export default function FeedGenerator() {
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);

        let postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(POSTS_PER_PAGE));
        if (lastVisible) {
            postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(POSTS_PER_PAGE));
        }

        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
            const newPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(prev => [...prev, ...newPosts]);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(newPosts.length === POSTS_PER_PAGE);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [lastVisible, loading, posts]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 || loading) return;
        fetchPosts();
    }, [fetchPosts, loading]);

    const debouncedHandleScroll = debounce(handleScroll, 100);

    useEffect(() => {
        fetchPosts();
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
            debouncedHandleScroll.cancel();
        };
    }, [fetchPosts, debouncedHandleScroll]);


    return (
        <div className="feed-container minheight100">
            {posts.map(post => (
                // Using a fragment to wrap the post card and the read more button
                <React.Fragment key={post.id}>
                    <div className="post-card">
                        <div className="post-content">
                            <h3 className="post-title">{post.content}</h3>
                            <div className="like-icons">
                                <FontAwesomeIcon icon={faHeart} className="icon" />
                            </div>
                            <p className="post-meta">
                                Created by {post.username || 'Unknown User'} on {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <p className="is-italic has-text-warning">Read More</p>
                </React.Fragment>
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