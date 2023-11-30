import React, { useState, useEffect, useRef, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, startAfter, limit, doc, addDoc, updateDoc, serverTimestamp, increment, deleteDoc, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from "firebase/auth";
import { useTransition, animated } from 'react-spring';
import debounce from 'lodash/debounce';
import PostWithComments from './PostWithComments';

const POSTS_PER_PAGE = 3;

export default function FeedGenerator() {
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const loadingRef = useRef(null);


    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid;
    console.log('Current User ID:', currentUserId);

    const unlikePost = async (postId) => {
        const likeQuery = query(collection(db, 'likes'), where('userId', '==', currentUserId), where('postId', '==', postId));
        const likeSnapshot = await getDocs(likeQuery);
        likeSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            likeCount: increment(-1),
        });

        setLikedPosts(new Set([...likedPosts].filter(id => id !== postId)));
    };

    const sharePost = async (postId) => {
        await addDoc(collection(db, 'shares'), {
            userId: currentUserId,
            postId: postId,
            timestamp: serverTimestamp(),
        });

        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            shareCount: increment(1),
        });
    };

    const isLiked = (postId) => likedPosts.has(postId);

    const fetchPosts = useCallback(debounce(async () => {
        if (loading || !hasMore) return;
        console.log('Fetching posts...');
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
            console.log('Posts snapshot:', snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })));
            const newPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPosts(prev => [...prev, ...newPosts]);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
            setHasMore(newPosts.length === POSTS_PER_PAGE);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching posts:', error);
        });

        return () => unsubscribe();
    }, 300), [lastVisible, loading, hasMore]);

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
            fetchPosts.cancel();
        };
    }, [fetchPosts, hasMore]);

    const transitions = useTransition(posts, {
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        keys: post => post.id
    });

    const likePost = async (postId) => {
        const likeQuery = query(collection(db, 'likes'), where('userId', '==', currentUserId), where('postId', '==', postId));
        const likeSnapshot = await getDocs(likeQuery);

        if (likeSnapshot.empty) {
            await addDoc(collection(db, 'likes'), {
                userId: currentUserId,
                postId: postId,
                timestamp: serverTimestamp(),
            });

            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, {
                likeCount: increment(1),
            });

            setLikedPosts(new Set([...likedPosts, postId]));
        }
    };

    return (
        <div className="feed-container minheight100">
            {transitions((styles, post) => (
                <animated.div style={styles} key={post.id}>
                    <PostWithComments
                        postId={post.id}
                        username={post.username ? post.username : 'Unknown User'}
                        postDate={new Date(post.timestamp.seconds * 1000).toLocaleString()}
                        content={post.content}
                        isLiked={isLiked(post.id)}
                        onLike={() => likePost(post.id)}
                        onUnlike={() => unlikePost(post.id)}
                        onShare={() => sharePost(post.id)}
                    />
                </animated.div>
            ))}
            <div ref={loadingRef} className="loading-indicator">
                {loading && <p>Loading more posts...</p>}
            </div>
            {!hasMore && <div className="end-of-feed">End of Feed</div>}
        </div>
    );
}
