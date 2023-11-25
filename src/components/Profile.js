import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // If the user is authenticated, fetch their profile data from Firestore
                const userId = currentUser.uid;

                db.collection('users')
                    .doc(userId) // Use the user's UID as the document ID
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            // Assuming there's only one profile per user
                            const profileData = doc.data();
                            setProfile(profileData);
                        } else {
                            // If the profile document doesn't exist, set profile to null
                            setProfile(null);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching profile:', error);
                    });
            } else {
                // If the user is not authenticated, reset the profile
                setProfile(null);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <div className="section has-text-warning">
            {user ? (
                <div>
                    <h2>Your Profile</h2>
                    {profile ? (
                        <div>
                            {profile.username && (
                                <p><strong>Username:</strong> {profile.username}</p>
                            )}
                            {profile.guild && (
                                <p><strong>Guild:</strong> {profile.guild}</p>
                            )}
                            {profile.year_joined && (
                                <p><strong>Year Joined:</strong> {profile.year_joined}</p>
                            )}
                            {/* Add more profile fields as needed */}
                        </div>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </div>
            ) : (
                <p>Please sign in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;
