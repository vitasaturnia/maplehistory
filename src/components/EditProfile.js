import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged, updatePassword, updateEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState('');
    const [newIGN, setNewIGN] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newGuild, setNewGuild] = useState('');
    const [newYearJoined, setNewYearJoined] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
                                setUsername(profileData.username);
                            }
                            if (profileData.ingameUsername) {
                                setNewIGN(profileData.ingameUsername);
                            }
                            if (profileData.guild) {
                                setNewGuild(profileData.guild);
                            }
                            if (profileData.yearJoined) {
                                setNewYearJoined(profileData.yearJoined);
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

            setDoc(userDocRef, { username: username }, { merge: true })
                .then(() => {
                    setSuccessMessage('Username updated successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating username: ' + error.message);
                });
        }
    };

    const handleUseIGN = () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            setDoc(userDocRef, { username: newIGN }, { merge: true })
                .then(() => {
                    setUsername(newIGN);
                    setSuccessMessage('Username updated to IGN successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating username to IGN: ' + error.message);
                });
        }
    };

    const handleUpdateIGN = () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            setDoc(userDocRef, { ingameUsername: newIGN }, { merge: true })
                .then(() => {
                    setSuccessMessage('IGN updated successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating IGN: ' + error.message);
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

    const handleUpdateGuild = () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            setDoc(userDocRef, { guild: newGuild }, { merge: true })
                .then(() => {
                    setSuccessMessage('Guild updated successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating Guild: ' + error.message);
                });
        }
    };

    const handleUpdateYearJoined = () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            setDoc(userDocRef, { yearJoined: newYearJoined }, { merge: true })
                .then(() => {
                    setSuccessMessage('Year Joined updated successfully.');
                })
                .catch((error) => {
                    setErrorMessage('Error updating Year Joined: ' + error.message);
                });
        }
    };

    const handleUpdateProfilePicture = () => {
        // Logic to update the profile picture
        // This will depend on how you handle file uploads and storage
        // For example, uploading to Firebase Storage and then updating the Firestore user document
    };

    return (
        <div className="section has-text-warning">
            <div className="section has-text-centered">
                <h3 className="subtitle has-text-warning has-text-weight-bold">Change Login Credentials</h3>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="has-text-centered">
                    <h3 className="has-text-weight-bold">Username</h3>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="buttons">
                        <button onClick={handleUpdateUsername} className="button is-warning is-outlined">Change Username</button>
                        <button onClick={handleUseIGN} className="button is-warning is-outlined">Use IGN</button>
                    </div>
                </div>

                <div>
                    <h3 className="has-text-weight-bold">Password</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
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
                    <div>
                        <button onClick={handleUpdateEmail} className="button is-warning is-outlined">Update Email Address</button>
                    </div>
                </div>
            </div>
            <div className="section has-text-centered">
                <h3 className="subtitle has-text-warning has-text-weight-bold">Change Profile</h3>

                <div>
                    <h3 className="has-text-weight-bold">IGN</h3>
                    <input
                        type="text"
                        value={newIGN}
                        onChange={(e) => setNewIGN(e.target.value)}
                    />
                    <div>
                        <button onClick={handleUpdateIGN} className="button is-warning is-outlined">Change IGN</button>
                    </div>
                </div>

                <div>
                    <h3 className="has-text-weight-bold">Guild</h3>
                    <input
                        type="text"
                        value={newGuild}
                        onChange={(e) => setNewGuild(e.target.value)}
                    />
                    <div>
                        <button onClick={handleUpdateGuild} className="button is-warning is-outlined">Update Guild</button>
                    </div>
                </div>

                <div>
                    <h3 className="has-text-weight-bold">Year Joined</h3>
                    <input
                        type="text"
                        value={newYearJoined}
                        onChange={(e) => setNewYearJoined(e.target.value)}
                    />
                    <div>
                        <button onClick={handleUpdateYearJoined} className="button is-warning is-outlined">Update Year Joined</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
