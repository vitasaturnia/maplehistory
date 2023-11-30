import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/Authcontext'; // Update this path
import { updatePassword, updateEmail } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Ensure this path is correct

const EditProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newIGN, setNewIGN] = useState('');
    const [newGuild, setNewGuild] = useState('');
    const [newYearJoined, setNewYearJoined] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch profile data and set the states
    }, [currentUser]);

    const handleUpdateUsername = () => {
        // Logic for updating the username
    };

    const handleUseIGN = () => {
        // Logic for using IGN as username
    };

    const handleUpdatePassword = () => {
        // Logic for updating the password
    };

    const handleUpdateEmail = () => {
        // Logic for updating the email
    };

    const handleUpdateIGN = () => {
        // Logic for updating IGN
    };

    const handleUpdateGuild = () => {
        // Logic for updating Guild
    };

    const handleUpdateYearJoined = () => {
        // Logic for updating Year Joined
    };

    return (
        <div className="section has-text-warning">
            <div className="section has-text-centered">
                {/* Change Login Credentials */}
                <h3 className="subtitle has-text-warning has-text-weight-bold">Change Login Credentials</h3>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Username Update */}
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

                {/* Password Update */}
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

                {/* Email Update */}
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
                {/* Change Profile */}
                <h3 className="subtitle has-text-warning has-text-weight-bold">Change Profile</h3>

                {/* IGN Update */}
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

                {/* Guild Update */}
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

                {/* Year Joined Update */}
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
