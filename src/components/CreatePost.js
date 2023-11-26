import React, { useState } from 'react';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import {
    collection,
    addDoc,
    updateDoc,
    doc
} from 'firebase/firestore';

export default function CreatePost() {
    const [postContent, setPostContent] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!postContent.trim()) {
            setErrorMessage('Please enter some content for your post.');
            return;
        }

        try {
            const currentUser = getAuth().currentUser;

            if (currentUser) {
                const postData = {
                    userId: currentUser.uid,
                    content: postContent,
                    timestamp: new Date(),
                };

                const postsCollection = collection(db, 'posts');
                const postRef = await addDoc(postsCollection, postData);

                await updateDoc(doc(db, 'posts', postRef.id), { postId: postRef.id });

                setSuccessMessage('Post created successfully.');
                setPostContent('');
            } else {
                setErrorMessage('You must be logged in to create a post.');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setErrorMessage('Error creating post.');
        }
    };

    return (
        <div className="is-full-height has-text-centered mt-5">
            <div className="columns">
                <div className="column">
                    <div className="centeredcontainer">
                        <div className="box has-background-black has-text-warning">
                            <h2 className="title has-text-warning">Create a New Post</h2>
                            <form onSubmit={handlePostSubmit}>
                                <div className="field">
                                    <div className="control">
                                        <textarea
                                            className="postarea"
                                            placeholder="What's on your mind?"
                                            value={postContent}
                                            onChange={(e) => setPostContent(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-warning is-outlined" type="submit">
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {successMessage && (
                                <p className="has-text-success mt-5">{successMessage}</p>
                            )}
                            {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
