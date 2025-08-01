import api from './axiosConfig'; // Import the configured Axios instance

const API_URL = '/products';

// Function to fetch all products
export const getProducts = () => {
    // The interceptor in axiosConfig.js will automatically add the JWT token
    return api.get(API_URL);
};

// Function to get a single product by its ID
export const getProductById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

// Function to create a new product
export const createProduct = (productData) => {
    return api.post(API_URL, productData);
};

// Function to update an existing product
export const updateProduct = (id, productData) => {
    return api.put(`${API_URL}/${id}`, productData);
};

// Function to delete a product by its ID
export const deleteProduct = (id) => {
    return api.delete(`${API_URL}/${id}`);
};


/*import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/products` || 'http://localhost:8080/products';

// This function will be called with the token obtained from AuthContext
const createAuthHeaders = (token) => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };
};

export const getProducts = async (token) => {
    const response = await axios.get(API_BASE_URL, { headers: createAuthHeaders(token) });
    return response.data;
};

export const getProductById = async (id, token) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, { headers: createAuthHeaders(token) });
    return response.data;
};

export const createProduct = async (productData, token) => {
    const response = await axios.post(API_BASE_URL, productData, { headers: createAuthHeaders(token) });
    return response.data;
};

export const updateProduct = async (id, productData, token) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, productData, { headers: createAuthHeaders(token) });
    return response.data;
};

export const deleteProduct = async (id, token) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, { headers: createAuthHeaders(token) });
    return response.data;
};*/