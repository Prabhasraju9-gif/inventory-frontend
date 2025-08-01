import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
//import './LoginPage.css'; 

function LoginPage() {
    // Change 'username' state to 'email'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // For success messages, if any

    const { login } = useAuth(); // Destructure login function from AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError('');      // Clear previous errors
        setMessage('');    // Clear previous messages

        try {
            // Call the login function with email and password
            await login(email, password); // Pass email instead of username
            setMessage('Login successful!');
            navigate('/products'); // Redirect to products page on success
        } catch (err) {
            console.error('Login error:', err);
            // Check if there's a specific error message from the backend
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred during login. Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label> {/* Change label to Email */}
                    <input
                        type="email" // Use type="email" for better browser validation
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default LoginPage;