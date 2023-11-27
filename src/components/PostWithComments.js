import React, { useState } from 'react';
import '../components/post.css'; // Pas het pad aan indien nodig
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComment,
    faShare,
    faPaperPlane,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';

const PostWithComments = ({ username, postDate, content }) => {
    const formattedDate = new Date(postDate).toLocaleDateString('en-US');
    const [comment, setComment] = useState(''); // State voor het beheren van de comment input

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        // Logica voor het indienen van commentaar
        console.log(comment); // Dit is slechts een placeholder
        setComment(''); // Reset het commentaarveld na het indienen
    };

    return (
        <div className="post-container">
            <div className="post-header has-text-centered">
                <div className="username">Tony777</div>
                <div className="profile-pic"></div>
                <div className="post-date">14-06-1964</div>
            </div>
            <div className="post-content">
                <p>{content}</p>
            </div>
            <div className="options-bar">
                <button className="like-button">
                    <FontAwesomeIcon icon={faHeart} /> Like
                </button>
                <button className="comment-button">
                    <FontAwesomeIcon icon={faComment} /> Comment
                </button>
                <button className="share-button">
                    <FontAwesomeIcon icon={faShare} /> Share
                </button>
            </div>
            <div className="comments-section">
                <div className="more-comments">Meer reacties</div>
                <div className="comment-bubble">
                    <p>Dit is een voorbeeldreactie.</p>
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
