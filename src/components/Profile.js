import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from "gatsby";
import { AuthContext } from '../context/Authcontext';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [formValues, setFormValues] = useState({ username: '', ingameUsername: '', server: '', guild: '', year_joined: '', legion: '' });
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            const userId = currentUser.uid;
            const userDocRef = doc(db, 'users', userId);

            getDoc(userDocRef)
                .then((userDocSnapshot) => {
                    if (userDocSnapshot.exists()) {
                        const data = userDocSnapshot.data();
                        setProfile(data);
                        setFormValues(data);
                    } else {
                        setProfile(null);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                });
        } else {
            setProfile(null);
        }
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentUser) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            try {
                await updateDoc(userDocRef, formValues);
                setProfile(formValues);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile.');
            }
        }
    };

    const renderProfilePicture = () => {
        if (profile && profile.profilePictureUrl) {
            return <img className="is-rounded" src={profile.profilePictureUrl} alt="Profile Picture" />;
        }
        return <div className="default-profile-pic is-rounded" style={{ backgroundColor: '#5218fa', width: '128px', height: '128px' }}></div>;
    };

    return (
        <div className="section has-text-warning">
            {currentUser ? (
                <div className="section has-text-centered">
                    <h2 className="title has-text-warning">Your Profile</h2>
                    {profile ? (
                        <>
                            <div className="has-text-centered">
                                <figure className="image is-128x128 is-inline-block" style={{ justifyContent: 'center', display: 'flex' }}>
                                    {renderProfilePicture()}
                                </figure>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Username: </label>
                                    <input type="text" name="username" value={formValues.username} onChange={handleInputChange} />
                                </div>
                                {/* Repeat the above for each field (ingameUsername, server, etc.) */}
                                <button type="submit">Update Profile</button>
                            </form>
                        </>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            ) : (
                <div className="has-text-centered">
                    Please <Link to="/login" className="has-text-weight-bold">login</Link> to view your profile.
                </div>
            )}
        </div>
    );
};

export default Profile;
