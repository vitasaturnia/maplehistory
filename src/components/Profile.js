import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from "gatsby";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

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
        });

        return () => unsubscribe();
    }, []);

    const renderProfilePicture = () => {
        if (profile && profile.profilePictureUrl) {
            return <img className="is-rounded" src={profile.profilePictureUrl} alt="Profile Picture" />;
        } else {
            return <div className="default-profile-pic is-rounded" style={{ backgroundColor: '#5218fa', width: '128px', height: '128px' }}></div>;
        }
    };

    return (
        <div className="section has-text-warning">
            {user ? (
                <div className="section has-text-centered">
                    <h2 className="title has-text-warning">Your Profile</h2>
                    {profile ? (
                        <div>
                            <div className="has-text-centered">
                                <figure className="image is-128x128 is-inline-block" style={{ justifyContent: 'center', display: 'flex' }}>
                                    {renderProfilePicture()}
                                </figure>
                            </div>
                            <p className="has-text-warning">
                                <strong className="has-text-warning">Username:</strong> {profile.username ? profile.username : <span className="is-italic">Not set</span>}
                            </p>
                            <p className="has-text-warning">
                                <strong className="has-text-warning">IGN:</strong> {profile.ingameUsername ? profile.ingameUsername : <span className="is-italic">Not set</span>}
                            </p>
                            <p className="has-text-warning">
                                <strong className="has-text-warning">Guild:</strong> {profile.guild ? profile.guild : <span className="is-italic">Not set</span>}
                            </p>
                            <p className="has-text-warning">
                                <strong className="has-text-warning">Year Joined:</strong> {profile.year_joined ? profile.year_joined : <span className="is-italic">Not set</span>}
                            </p>



                        </div>
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
