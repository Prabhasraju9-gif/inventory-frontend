import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode v4+

const AuthContext = createContext(null);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const [user, setUser] = useState(null);

    // Function to parse token and set user data
    const parseToken = useCallback((jwtToken) => {
        if (jwtToken) {
            try {
                const decoded = jwtDecode(jwtToken);
                // Assuming your JWT contains 'sub' for username/email and 'roles' for authorities
                const roles = decoded.roles || []; // Adjust based on your JWT structure
                setUser({
                    // Use 'sub' as the primary identifier, which could be username or email
                    username: decoded.sub, // Keep username property for consistency in UI, but it's the email
                    email: decoded.sub,   // Add email property if your token's 'sub' is email
                    roles: roles.map(role => role.authority || role) // Handle both String and GrantedAuthority objects
                });
            } catch (error) {
                console.error("Failed to decode JWT or token is invalid:", error);
                setToken(null);
                localStorage.removeItem('jwtToken');
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    // Effect to parse token on initial load or token change
    useEffect(() => {
        parseToken(token);
    }, [token, parseToken]);

    // Login function: now accepts email and password
    const login = async (email, password) => {
        try {
            // Send email instead of username in the request body
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            const newToken = response.data.token; // Assuming backend sends 'token' field
            setToken(newToken);
            localStorage.setItem('jwtToken', newToken);
            parseToken(newToken); // Update user state immediately
            return true; // Indicate successful login
        } catch (error) {
            console.error('Login failed:', error);
            setToken(null);
            localStorage.removeItem('jwtToken');
            setUser(null);
            throw error; // Re-throw to be caught by LoginPage component
        }
    };

    const register = async (userData) => { // This already expects email
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
            return response.data; // Or whatever success message/data backend returns
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('jwtToken');
        setUser(null);
    };

    const isAuthenticated = !!token;

    // Helper to check if user has a specific role (still uses user.roles array)
    const hasRole = useCallback((requiredRole) => {
        if (!user || !user.roles) return false;
        return user.roles.includes(requiredRole);
    }, [user]);

    const authContextValue = {
        token,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        hasRole
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};