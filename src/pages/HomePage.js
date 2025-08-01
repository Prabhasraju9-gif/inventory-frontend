import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
    const { user } = useAuth();

    return (
        <div className="container">
            <h2>Welcome to the Inventory Management System!</h2>
            {user ? (
                <>
                    <p>Hello, {user.username}!</p>
                    <p>Your role: {user.roles.join(', ')}</p>
                    <p>Navigate using the links above to manage inventory.</p>
                </>
            ) : (
                <p>Please log in or register to manage your inventory.</p>
            )}
        </div>
    );
}

export default HomePage;