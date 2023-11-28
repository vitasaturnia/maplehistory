import React, { useState, useEffect, useRef, useCallback } from 'react';
import { collection, query, orderBy, onSnapshot, startAfter, limit } from 'firebase/firestore';
import { db } from '../../firebase';

const POSTS_PER_PAGE = 3;

export default function FeedGenerator() {
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(null);

    const fetchPosts = useCallback(() => {
        if (loading) return;
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
            setLoading(false);
        });

        return () => unsubscribe();
    }, [lastVisible, loading]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
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
    }, [fetchPosts]);

    return (
        <div className="feed-container minheight100">
            {posts.map((post) => (
                <div key={post.id}>
                    {/* Render your post content here */}
                </div>
            ))}
            <div ref={loadingRef} className="loading-indicator">
                {loading && <p>Loading more posts...</p>}
            </div>
        </div>
    );
}
