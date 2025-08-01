import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css'; // Create this CSS file

function Navbar() {
    const { user, logout, hasRole } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Inventory App</Link>
            </div>
            <ul className="navbar-nav">
                <li><Link to="/">Home</Link></li>
                {user && <li><Link to="/products">Products</Link></li>}
                {/* Add more links for Orders, etc. if you build those pages */}
            </ul>
            <div className="navbar-auth">
                {user ? (
                    <>
                        <span>Welcome, {user.username} ({user.roles.join(', ')})</span>
                        <button onClick={logout} className="button button-link">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="button button-link">Login</Link>
                        <Link to="/register" className="button button-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;