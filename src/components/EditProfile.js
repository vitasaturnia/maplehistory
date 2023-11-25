import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged, updatePassword, updateEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; // Import Firestore functions

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false); // Track whether the username is already set

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // If the user is authenticated, fetch their profile data from Firestore
                const userId = user.uid; // Get the UID of the authenticated user
                const userDocRef = doc(db, 'users', userId); // Use the UID as the document name

                getDoc(userDocRef)
                    .then((userDocSnapshot) => {
                        if (userDocSnapshot.exists()) {
                            const profileData = userDocSnapshot.data();
                            setProfile(profileData);

                            // Check if the username is already set
                            if (profileData.username) {
                                setIsUsernameSet(true);
                            }
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
            updatePassword(user, newPassword)
                .then(() => {
                    setSuccessMessage('Password updated successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating password: ' + error.message);
                });
        }
    };

    const handleUpdateEmail = () => {
        if (user) {
            // Update the email address using Firebase Authentication
            updateEmail(user, newEmail)
                .then(() => {
                    setSuccessMessage('Email address updated successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating email address: ' + error.message);
                });
        }
    };

    return (
        <div className="section has-text-warning">
            <div className="section has-text-centered">
                <h3 className="subtitle has-text-warning has-text-weight-bold">Change login credentials</h3>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div>
                    <h3>Username</h3>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <br/>
                    <div>
                        {isUsernameSet ? (
                            <button onClick={handleUpdateUsername} className="button is-warning is-outlined">Update Username</button>
                        ) : (
                            <button onClick={handleUpdateUsername} className="button is-warning is-outlined">Set Username</button>
                        )}
                    </div>
                </div>
                <div>
                    <h3>Password</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <br/>
                    <div>
                        <button onClick={handleUpdatePassword} className="button is-warning is-outlined">Update Password</button>
                    </div>
                </div>
                <div>
                    <h3>Email Address</h3>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <br/>
                    <div>
                        <button onClick={handleUpdateEmail} className="button is-warning is-outlined">Update Email Address</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
