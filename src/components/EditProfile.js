import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged, updatePassword, updateEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState('');
    const [newIngameUsername, setNewIngameUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newGuild, setNewGuild] = useState('');
    const [newYearJoined, setNewYearJoined] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isIngameUsernameSet, setIsIngameUsernameSet] = useState(false);
    const [isGuildSet, setIsGuildSet] = useState(false);
    const [isYearJoinedSet, setIsYearJoinedSet] = useState(false);

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
                            setUsername(profileData.username || '');

                            if (profileData.ingameUsername) {
                                setIsIngameUsernameSet(true);
                                setNewIngameUsername(profileData.ingameUsername);
                            }
                            if (profileData.guild) {
                                setIsGuildSet(true);
                                setNewGuild(profileData.guild);
                            }
                            if (profileData.yearJoined) {
                                setIsYearJoinedSet(true);
                                setNewYearJoined(profileData.yearJoined);
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
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);

            setDoc(userDocRef, { ingameUsername: newIngameUsername }, { merge: true })
                .then(() => {
                    setSuccessMessage('Ingame Username updated successfully.');
                    setIsIngameUsernameSet(true);
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

    const handleUseIngameUsername = () => {
        if (profile && profile.ingameUsername) {
            setUsername(profile.ingameUsername);
            // Update the username on the server here if necessary
            setSuccessMessage('Username set to Ingame Username.');
        } else {
            setErrorMessage('You did not set IGN yet.');
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
                    setIsGuildSet(true);
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        guild: newGuild,
                    }));
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
                    setIsYearJoinedSet(true);
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        yearJoined: newYearJoined,
                    }));
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

                <div>
                    <h3 className="has-text-weight-bold">Profile Picture</h3>
                    <input
                        type="file"
                        onChange={(e) => setNewProfilePicture(e.target.files[0])}
                    />
                    <div>
                        <button onClick={handleUpdateProfilePicture} className="button is-warning is-outlined">Update Profile Picture</button>
                    </div>
                </div>

                <div>
                    <h3 className="has-text-weight-bold">Username</h3>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div>
                        <h3 className="has-text-weight-bold">Username</h3>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="buttons">
                            <button onClick={handleUpdateIngameUsername} className="button is-warning is-outlined">
                                {isIngameUsernameSet ? "Change Username" : "Set Username"}
                            </button>
                            <button onClick={handleUseIngameUsername} className="button is-warning is-outlined">Use Ingame Username</button>
                        </div>
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

                <div>
                    <h3 className="has-text-weight-bold">Ingame Username</h3>
                    <input
                        type="text"
                        value={newIngameUsername}
                        onChange={(e) => setNewIngameUsername(e.target.value)}
                    />
                    <div>
                        <button onClick={handleUpdateIngameUsername} className="button is-warning is-outlined">
                            {isIngameUsernameSet ? "Change Ingame Username" : "Set Ingame Username"}
                        </button>
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
                        <button onClick={handleUpdateGuild} className="button is-warning is-outlined">
                            {isGuildSet ? "Update Guild" : "Set Guild"}
                        </button>
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
                        <button onClick={handleUpdateYearJoined} className="button is-warning is-outlined">
                            {isYearJoinedSet ? "Update Year Joined" : "Set Year Joined"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

};

export default EditProfile;
