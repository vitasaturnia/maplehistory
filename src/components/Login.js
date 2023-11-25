import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged, updateDoc, doc, getDoc, updatePassword } from 'firebase/firestore'; // Import Firestore functions
import { Link } from 'gatsby';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // If the user is authenticated, fetch their profile data from Firestore
                const userId = currentUser.uid;
                const userDocRef = doc(db, 'users', userId);

                // Retrieve the document data
                getDoc(userDocRef)
                    .then((userDocSnapshot) => {
                        if (userDocSnapshot.exists()) {
                            const profileData = userDocSnapshot.data();
                            setProfile(profileData);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching profile:', error);
                    });
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const handleUpdateUsername = () => {
        if (user) {
            // Update the username in Firestore
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            updateDoc(userDocRef, { username: newUsername })
                .then(() => {
                    setSuccessMessage('Username updated successfully.');
                    // Update the local profile data if needed
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        username: newUsername,
                    }));
                })
                .catch((error) => {
                    setErrorMessage('Error updating username: ' + error.message);
                });
        }
    };

    const handleUpdatePassword = () => {
        if (user) {
            // Update the password using Firebase Authentication
            // Ensure newPassword is a valid string containing the new password
            if (newPassword.trim() === '') {
                setErrorMessage('Please enter a valid password.');
                return;
            }

            updatePassword(user, newPassword)
                .then(() => {
                    setSuccessMessage('Password updated successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating password: ' + error.message);
                });
        }
    };

    return (
        <div className="centeredcontainer has-text-centered">
            <h1 className="title has-text-warning">Edit Your Profile</h1>

            <form>
                <div className="field">
                    <label className="label has-text-warning">New Username:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="New Username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label has-text-warning">New Password:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-warning" onClick={handleUpdateUsername}>
                            Update Username
                        </button>
                        <button className="button is-warning" onClick={handleUpdatePassword}>
                            Update Password
                        </button>
                    </div>
                </div>
            </form>

            {successMessage && <p className="has-text-success">{successMessage}</p>}
            {errorMessage && <p className="has-text-danger">{errorMessage}</p>}

            <Link to="/myprofile" className="has-text-warning">
                Back to My Profile
            </Link>
        </div>
    );
};

export default EditProfile;
