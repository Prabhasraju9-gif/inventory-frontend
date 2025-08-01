import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/product';
import { useAuth } from '../contexts/AuthContext';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getAuthHeaders } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError('');
            try {
                const token = getAuthHeaders().Authorization.split(' ')[1];
                const data = await getProductById(id, token);
                setProduct(data);
            } catch (err) {
                setError('Failed to load product: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, getAuthHeaders]);

    if (loading) return <div className="container">Loading product details...</div>;
    if (error) return <div className="container error-message">{error}</div>;
    if (!product) return <div className="container">Product not found.</div>;

    return (
        <div className="container">
            <h2>Product Details</h2>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
            <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
            <button className="button button-secondary" onClick={() => navigate('/products')}>Back to Product List</button>
        </div>
    );
}

export default ProductDetailPage;