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

                db.collection('userProfiles')
                    .where('userId', '==', userId)
                    .get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            // Assuming there's only one profile per user
                            const profileData = querySnapshot.docs[0].data();
                            setProfile(profileData);
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
        <div>
            {user ? (
                <div>
                    <h2>Your Profile</h2>
                    {profile ? (
                        <div>
                            <p><strong>Ingame Username:</strong> {profile.username}</p>
                            <p><strong>Guild:</strong> {profile.guild}</p>
                            <p><strong>Join Date:</strong> {profile.joinDate}</p>
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
