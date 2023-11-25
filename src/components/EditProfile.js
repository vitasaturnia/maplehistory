import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged, updatePassword, updateEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [newIngameUsername, setNewIngameUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newGuild, setNewGuild] = useState('');
    const [newYearJoined, setNewYearJoined] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isIngameUsernameSet, setIsIngameUsernameSet] = useState(false); // Track whether the ingame username is already set

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // If the user is authenticated, fetch their profile data from Firestore
                const userId = currentUser.uid; // Get the UID of the authenticated user
                const userDocRef = doc(db, 'users', userId); // Use the UID as the document name

                getDoc(userDocRef)
                    .then((userDocSnapshot) => {
                        if (userDocSnapshot.exists()) {
                            const profileData = userDocSnapshot.data();
                            setProfile(profileData);

                            // Check if the ingame username is already set
                            if (profileData.ingameUsername) {
                                setIsIngameUsernameSet(true);
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

    const handleUpdateIngameUsername = () => {
        if (user) {
            // Update the ingame username in Firestore
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            setDoc(userDocRef, { ingameUsername: newIngameUsername }, { merge: true })
                .then(() => {
                    setSuccessMessage('Ingame Username updated successfully.');
                    // Update the local profile data if needed
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        ingameUsername: newIngameUsername,
                    }));
                })
                .catch((error) => {
                    setErrorMessage('Error updating Ingame Username: ' + error.message);
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

    const handleUpdateGuildAndYearJoined = () => {
        if (user) {
            // Update the guild and year joined in Firestore
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            setDoc(userDocRef, { guild: newGuild, year_joined: newYearJoined }, { merge: true })
                .then(() => {
                    setSuccessMessage('Guild and Year Joined updated successfully.');
                    // Update the local profile data if needed
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        guild: newGuild,
                        year_joined: newYearJoined,
                    }));
                })
                .catch((error) => {
                    setErrorMessage('Error updating Guild and Year Joined: ' + error.message);
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
                    <h3 className="has-text-weight-bold">Ingame Username</h3>
                    <input
                        type="text"
                        value={newIngameUsername}
                        onChange={(e) => setNewIngameUsername(e.target.value)}
                    />
                    <br />
                    <div>
                        {isIngameUsernameSet ? (
                            <button onClick={handleUpdateIngameUsername} className="button is-warning is-outlined">Update Ingame Username</button>
                        ) : (
                            <button onClick={handleUpdateIngameUsername} className="button is-warning is-outlined">Set Ingame Username</button>
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
                <div>
                    <h3 className="has-text-weight-bold">Guild</h3>
                    <input
                        type="text"
                        value={newGuild}
                        onChange={(e) => setNewGuild(e.target.value)}
                    />
                    <br />
                </div>
                <div>
                    <h3 className="has-text-weight-bold">Year Joined</h3>
                    <input
                        type="text"
                        value={newYearJoined}
                        onChange={(e) => setNewYearJoined(e.target.value)}
                    />
                    <br />
                    <div>
                        <button onClick={handleUpdateGuildAndYearJoined} className="button is-warning is-outlined">Update Guild and Year Joined</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
