import React from 'react';
import { useAuth } from './AuthContext'; // Adjust the path as per your project structure

const LogoutButton = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            // Redirect or update state as needed after logout
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
