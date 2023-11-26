// src/components/InputWithIcons.js

import React from 'react';
import './feed.css'; // Import your custom CSS file

const InputWithIcons = () => {
    return (
        <div className="centered-container">
            <div className="custom-box">
                <input className="custom-input" type="text" placeholder="What's on your mind?" />
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
