import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        return response.data; // Should contain the JWT token
    } catch (error) {
        throw error; // Let the calling component handle errors
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};