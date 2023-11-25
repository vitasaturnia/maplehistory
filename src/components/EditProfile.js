import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged, createUserWithEmailAndPassword, updatePassword, updateEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userId = currentUser.uid;
                const userDocRef = doc(db, 'users', userId);

                getDoc(userDocRef)
                    .then((userDocSnapshot) => {
                        if (userDocSnapshot.exists()) {
                            const profileData = userDocSnapshot.data();
                            setProfile(profileData);

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

        return () => unsubscribe();
    }, []);

    const handleUpdateUsername = () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            // Check if the document exists and create it if not
            getDoc(userDocRef)
                .then((userDocSnapshot) => {
                    if (!userDocSnapshot.exists()) {
                        setDoc(userDocRef, {});
                    }
                })
                .then(() => {
                    // Update the username in Firestore
                    return updateDoc(userDocRef, { username: newUsername });
                })
                .then(() => {
                    setSuccessMessage('Username updated successfully.');
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
                <h3 className="subtitle has-text-warning has-text-weight-bold">Change Login Credentials</h3>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div>
                    <h3 className="has-text-weight-bold">Username</h3>
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <br />
                    <div>
                        {isUsernameSet ? (
                            <button onClick={handleUpdateUsername} className="button is-warning is-outlined">Update Username</button>
                        ) : (
                            <button onClick={handleUpdateUsername} className="button is-warning is-outlined">Set Username</button>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="has-text-weight-bold">Password</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <br />
                    <div>
                        <button onClick={handleUpdatePassword} className="button is-warning is-outlined">Update Password</button>
                    </div>
                </div>
                <div>
                    <h3 className="has-text-weight-bold">Email Address</h3>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <br />
                    <div>
                        <button onClick={handleUpdateEmail} className="button is-warning is-outlined">Update Email Address</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
