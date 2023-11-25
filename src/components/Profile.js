import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase'; // Import your Firebase configuration
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const Profile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // If the user is authenticated, fetch their profile data from Firestore
                const userId = currentUser.uid;

                // Reference to the user's document
                const userDocRef = doc(db, 'users', userId);

                // Retrieve the document data
                getDoc(userDocRef)
                    .then((userDocSnapshot) => {
                        if (userDocSnapshot.exists()) {
                            // Assuming there's only one profile per user
                            const profileData = userDocSnapshot.data();
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
                                <p><strong>Ingame Username:</strong> {profile.username}</p>
                            )}
                            {profile.guild && (
                                <p><strong>Guild:</strong> {profile.guild}</p>
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
