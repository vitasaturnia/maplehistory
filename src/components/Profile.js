// Modify the MyProfile component
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
                console.log('UserID:', userId); // Log the user's ID

                // Get the user's email from Firebase Authentication
                const userEmail = currentUser.email;
                console.log('User Email:', userEmail); // Log the user's email

                // Reference to the user's document
                const userDocRef = doc(db, 'users', userId);

                // Retrieve the document data
                getDoc(userDocRef)
                    .then((userDocSnapshot) => {
                        console.log('User Document Exists:', userDocSnapshot.exists); // Log if the document exists

                        if (userDocSnapshot.exists()) {
                            // Assuming there's only one profile per user
                            const profileData = userDocSnapshot.data();
                            console.log('Profile Data:', profileData); // Log the profile data
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
                <div className="section has-text-centered">
                    <h2>Your Profile</h2>
                    {profile ? (
                        <div>
                            {profile.email && (
                                <p className="has-text-warning is-bold"><strong>Email:</strong> {profile.email}</p> // Display the user's email
                            )}
                            {profile.username && (
                                <p><strong>Ingame Username:</strong> {profile.username}</p>
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
                <div className="has-text-centered has-text-warning">
                    <p>Please sign in to view your profile.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
