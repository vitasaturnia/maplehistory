import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare, faPaperPlane, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { db, auth } from '../../firebase';

const PostWithComments = ({ postId, username, postDate, content, isLiked, onLike, onUnlike, onShare }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    // Fetch comments whenever postId changes
    useEffect(() => {
        const commentsQuery = query(collection(db, 'posts', postId, 'comments'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(fetchedComments);
        });

        return () => unsubscribe();
    }, [postId]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;

        try {
            await addDoc(collection(db, 'posts', postId, 'comments'), {
                userId: auth.currentUser.uid,
                postId: postId,
                text: comment,
                timestamp: serverTimestamp(),
            });
            setComment('');
        } catch (error) {
            console.error("Error submitting comment: ", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!commentId) return;

        try {
            await deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment: ", error);
        }
    };

    return (
        <div className="post-container">
            <div className="post-header has-text-centered">
                <div className="username">{username}</div>
                <div className="profile-pic"></div>
                <div className="post-date">{new Date(postDate).toLocaleDateString('en-US')}</div>
            </div>
            <div className="post-content">
                <p>{content}</p>
            </div>
            <div className="options-bar">
                <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={isLiked ? onUnlike : onLike}>
                    <FontAwesomeIcon className="buttonglow" icon={faHeart} />
                    <p>{isLiked ? 'Unlike' : 'Like'}</p>
                </button>
                <button className="comment-button" onClick={handleCommentSubmit}>
                    <FontAwesomeIcon className="buttonglow" icon={faComment} />
                    <p>Comment</p>
                </button>
                <button className="share-button" onClick={() => onShare(postId)}>
                    <FontAwesomeIcon className="buttonglow" icon={faShare} />
                    <p>Share</p>
                </button>
            </div>
            <div className="comments-section">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-bubble">
                        <p>{comment.text}</p>
                        {auth.currentUser.uid === comment.userId && (
                            <button onClick={() => handleDeleteComment(comment.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        )}
                    </div>
                ))}
                <div className="input-group">
                    <input
                        type="text"
                        className="inputborderfocus"
                        placeholder="Write a comment"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button type="button" onClick={handleCommentSubmit}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostWithComments;
