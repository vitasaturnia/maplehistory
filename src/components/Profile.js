import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const Profile = () => {
    const [user, setUser] = useState(netlifyIdentity.currentUser());
    const [name, setName] = useState('');

    useEffect(() => {
        netlifyIdentity.on('login', user => setUser(user));
        netlifyIdentity.on('logout', () => setUser(null));

        return () => {
            netlifyIdentity.off('login');
            netlifyIdentity.off('logout');
        };
    }, []);

    const handleSave = () => {
        user.update({ data: { ...user.user_metadata, name: name } })
            .then(() => {
                alert('Profile updated');
            })
            .catch((error) => {
                console.error('Error updating profile: ', error);
            });
    };

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Profile;
