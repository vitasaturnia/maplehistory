import React, { useState } from 'react';
import Layout from "../components/Layout"
import { doc, setDoc } from 'firebase/firestore';
import { updateEmail, updatePassword } from "firebase/auth";
import { db, auth } from '../../firebase'; //

const Editaccount = () => {
    const [username, setUsername] = useState('');
    const [guildName, setGuildName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef, { username, guildName }, { merge: true });
            setSuccessMessage('Profile updated successfully.');
        } catch (error) {
            setError('Failed to update profile.');
        }
    };

    const handleEmailAndPasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            if (newEmail) {
                await updateEmail(auth.currentUser, newEmail);
            }
            if (newPassword) {
                await updatePassword(auth.currentUser, newPassword);
            }
            setSuccessMessage('Email and/or password updated successfully.');
        } catch (error) {
            setError('Failed to update email/password.');
        }
    };

    return (
        <Layout>
            <section className="has-text-centered">
        <div>
            <h1>My Profile</h1>
            <form onSubmit={handleProfileUpdate}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Guild Name:</label>
                    <input type="text" value={guildName} onChange={(e) => setGuildName(e.target.value)} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            <br/>
            <form onSubmit={handleEmailAndPasswordUpdate}>
                <div>
                    <label>New Email:</label>
                    <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <button type="submit">Update Email/Password</button>
            </form>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
            </section>
        </Layout>
    );
};

export default Editaccount;
