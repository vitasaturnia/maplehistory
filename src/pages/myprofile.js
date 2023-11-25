import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const MyProfile = () => {
    const [profileData, setProfileData] = useState({ username: '', guildName: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Check if user is authenticated
                if (auth.currentUser) {
                    const userRef = doc(db, "users", auth.currentUser.uid);
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        setProfileData(docSnap.data());
                    } else {
                        setError('No profile data found.');
                    }
                } else {
                    setError('User not authenticated.');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Error fetching profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <div>
                    <p><strong>Username:</strong> {profileData.username}</p>
                    <p><strong>Guild Name:</strong> {profileData.guildName}</p>
                    {/* Additional profile information can be added here */}
                </div>
            )}
        </div>
    );
};

export default MyProfile;
