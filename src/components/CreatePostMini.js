
import React from 'react';
import '../assets/postcreator.css'; // Import your custom CSS file
import '../assets/post.css'; // input and icon styling classes from there

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const InputWithIcons = () => {
    return (
        <div className="centered-container">
            <div className="custom-box">
                <div className="input-container custom-input-wrapper">
                    <input className="custom-input" type="text" placeholder="What's on your mind?" />
                    <FontAwesomeIcon icon={faPaperPlane} className="icon fa-paper-plane" />
                </div>
                <div className="icon-bar">
                    <div className="icon">
                        <i className="fas fa-video"></i> Video
                    </div>
                    <div className="icon">
                        <i className="fas fa-image"></i> Picture
                    </div>
                    <div className="icon">
                        <i className="far fa-smile"></i> Mood
                    </div>
                </div>
            </div>
        </div>

    );
};

export default InputWithIcons;
