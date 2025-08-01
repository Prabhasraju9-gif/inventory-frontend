import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/product'; // Import the function from your new product.js
import { useAuth } from '../contexts/AuthContext'; // Still need this to check authentication state

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth(); // Use this to conditionally render

    useEffect(() => {
        if (!isAuthenticated) {
            // Do not fetch if the user is not authenticated
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            try {
                // This is the new, correct way.
                // You no longer pass the token as an argument.
                const data = await getProducts(); 
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to fetch products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [isAuthenticated]); // Rerun when authentication state changes

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    // Render the list of products here
    return (
        <div>
            <h2>Product List</h2>
            {products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name} - ${product.price}</li>
                    ))}
                </ul>
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
}

export default ProductsPage;

/*import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../api/product';
import { useAuth } from '../contexts/AuthContext';

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { getAuthHeaders, hasRole } = useAuth();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const token = getAuthHeaders().Authorization.split(' ')[1]; // Extract token
            const data = await getProducts(token);
            setProducts(data);
        } catch (err) {
            setError('Failed to fetch products: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = getAuthHeaders().Authorization.split(' ')[1];
                await deleteProduct(id, token);
                fetchProducts(); // Refresh the list
            } catch (err) {
                setError('Failed to delete product: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    if (loading) return <div className="container">Loading products...</div>;
    if (error) return <div className="container error-message">{error}</div>;

    return (
        <div className="container">
            <h2>Product List</h2>
            {hasRole('ADMIN') && (
                <Link to="/products/new" className="button">Add New Product</Link>
            )}

            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            {hasRole('ADMIN') && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                <td>${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</td>
                                <td>{product.stockQuantity}</td>
                                {hasRole('ADMIN') && (
                                    <td>
                                        <button className="button button-secondary" onClick={() => navigate(`/products/edit/${product.id}`)}>Edit</button>
                                        {' '}
                                        <button className="button button-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductListPage;*/