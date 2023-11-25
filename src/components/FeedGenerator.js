import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, startAfter, limit, doc, setDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../../firebase';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";

const POSTS_PER_PAGE = 10;

export default function FeedGenerator() {
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const currentUserId = currentUser ? currentUser.uid : null;

    const likePost = async (postId) => {
        if (!currentUserId) {
            console.error("User not authenticated");
            return;
        }

        const likeId = `${currentUserId}_${postId}`;
        const likeRef = doc(db, 'likes', likeId);
        const postRef = doc(db, 'posts', postId);

        try {
            await setDoc(likeRef, {
                userId: currentUserId,
                postId: postId,
                timestamp: serverTimestamp(),
            });

            await updateDoc(postRef, {
                likeCount: increment(1),
            });
        } catch (error) {
            console.error("Error liking the post: ", error);
        }
    };

    const fetchPosts = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);

        let postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(POSTS_PER_PAGE));
        if (lastVisible) {
            postsQuery = query(
                collection(db, 'posts'),
                orderBy('timestamp', 'desc'),
                startAfter(lastVisible.timestamp, lastVisible.id),
                limit(POSTS_PER_PAGE)
            );
        }

        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
            const newPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPosts((prev) => {
                // Filter out posts with duplicate IDs to avoid rendering them again
                const uniqueNewPosts = newPosts.filter((newPost) => !prev.some((prevPost) => prevPost.id === newPost.id));
                return [...prev, ...uniqueNewPosts];
            });

            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(newPosts.length === POSTS_PER_PAGE);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [lastVisible, loading]);

    useEffect(() => {
        fetchPosts();
        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
            debouncedHandleScroll.cancel();
        };
    }, [fetchPosts]);

    const debouncedHandleScroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 || loading) return;
        fetchPosts();
    }, 100);

    return (
        <div className="feed-container minheight100">
            {posts.map(post => (
                <div className="post-card" key={post.id}>
                    <div className="post-content">
                        <h3 className="post-title">{post.content}</h3>
                        <div className="like-icons">
                            <FontAwesomeIcon icon={faHeart} className="icon" onClick={() => likePost(post.id)} />
                        </div>
                        <p className="post-meta">
                            Created by {post.username ? post.username : 'Unknown User'} on {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                        </p>
                    </div>
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
