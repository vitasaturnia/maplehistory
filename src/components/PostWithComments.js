import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare, faPaperPlane, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../components/post.css'; // Adjust path as needed

const PostWithComments = ({ username, postDate, content, isLiked, onLike, onUnlike }) => {
    const [comment, setComment] = useState('');
    const formattedDate = new Date(postDate).toLocaleDateString('en-US');

    // Handles input change in the comment field
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // Handles the submission of a comment
    const handleCommentSubmit = () => {
        // Logic to submit comment goes here
        console.log(comment); // Placeholder for comment submission logic
        setComment(''); // Reset the comment field after submission
    };

    return (
        <div className="post-container">
            <div className="post-header has-text-centered">
                <div className="username">{username}</div>
                <div className="profile-pic"></div>
                <div className="post-date">{formattedDate}</div>
            </div>
            <div className="post-content">
                <p>{content}</p>
            </div>
            <div className="options-bar">
                <button className="like-button" onClick={isLiked ? onUnlike : onLike}>
                    <FontAwesomeIcon className="buttonglow" icon={faHeart} />
                    <p>{isLiked ? 'Unlike' : 'Like'}</p>
                </button>
                <button className="comment-button">
                    <FontAwesomeIcon className="buttonglow" icon={faComment} />
                    <p>Comment</p>
                </button>
                <button className="share-button">
                    <FontAwesomeIcon className="buttonglow" icon={faShare} />
                    <p>Share</p>
                </button>
            </div>
            <div className="comments-section">
                <div className="more-comments">More comments</div>
                <div className="comment-bubble">
                    <p>This is a sample comment.</p>
                </div>
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
