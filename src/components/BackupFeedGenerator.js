import React, { useState, useEffect, useRef, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, startAfter, limit, doc, setDoc, updateDoc, serverTimestamp, increment, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { useTransition, animated } from 'react-spring';

const POSTS_PER_PAGE = 3;

export default function FeedGenerator() {
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const loadingRef = useRef(null);

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

            setLikedPosts(prevLikedPosts => new Set(prevLikedPosts.add(postId)));
        } catch (error) {
            console.error("Error liking the post: ", error);
        }
    };

    const unlikePost = async (postId) => {
        if (!currentUserId) {
            console.error("User not authenticated");
            return;
        }

        const likeId = `${currentUserId}_${postId}`;
        const likeRef = doc(db, 'likes', likeId);
        const postRef = doc(db, 'posts', postId);

        try {
            await deleteDoc(likeRef);

            await updateDoc(postRef, {
                likeCount: increment(-1),
            });

            setLikedPosts(prevLikedPosts => {
                const newLikedPosts = new Set(prevLikedPosts);
                newLikedPosts.delete(postId);
                return newLikedPosts;
            });
        } catch (error) {
            console.error("Error unliking the post: ", error);
        }
    };

    const isPostLiked = useCallback(
        (postId) => likedPosts.has(postId),
        [likedPosts]
    );

    const fetchPosts = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);

        let postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(POSTS_PER_PAGE));
        if (lastVisible) {
            postsQuery = query(
                collection(db, 'posts'),
                orderBy('timestamp', 'desc'),
                startAfter(lastVisible),
                limit(POSTS_PER_PAGE)
            );
        }

        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
            const newPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPosts(prev => [...prev, ...newPosts]);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(newPosts.length === POSTS_PER_PAGE);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [lastVisible, loading, hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore) {
                    fetchPosts();
                }
            },
            { threshold: 1.0 }
        );

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => {
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current);
            }
        };
    }, [fetchPosts, hasMore]);

    const transitions = useTransition(posts, {
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        keys: post => post.id
    });

    return (
        <div className="feed-container minheight100">
            {transitions((styles, post) => (
                <animated.div style={styles} className="post-card" key={post.id}>
                    <div className="mobilepostcontent">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="like-icons">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={`heart-icon icon ${isPostLiked(post.id) ? 'liked' : ''}`}
                                onClick={() => isPostLiked(post.id) ? unlikePost(post.id) : likePost(post.id)}
                            />
                        </div>
                        <p className="post-meta">
                            Created by {post.username ? post.username : 'Unknown User'} on {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                        </p>
                    </div>

                    {/* Comment section */}
                    <div className="comment-section">
                        {/* Show only 1 comment */}
                        <div className="comment">
                            <div className="comment-bubble">
                                {/* Comment content */}
                                <p>This is a comment. Lorem ipsum dolor sit amet.</p>

                                {/* Option to see responses */}
                                <div className="see-responses">
                                    <span>Show responses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </animated.div>
            ))}
            <div ref={loadingRef} className="loading-indicator">
                {loading && <p>Loading more posts...</p>}
            </div>
            {!hasMore && <div className="end-of-feed">End of Feed</div>}
        </div>
    );
}
