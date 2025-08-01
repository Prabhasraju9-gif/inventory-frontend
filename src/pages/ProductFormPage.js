import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../api/product';
import { useAuth } from '../contexts/AuthContext';

function ProductFormPage() {
    const { id } = useParams(); // Get ID from URL for editing
    const navigate = useNavigate();
    const { getAuthHeaders } = useAuth();
    const [product, setProduct] = useState({ name: '', price: '', stockQuantity: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const isEditing = Boolean(id);

    useEffect(() => {
        const fetchProduct = async () => {
            if (isEditing) {
                setLoading(true);
                try {
                    const token = getAuthHeaders().Authorization.split(' ')[1];
                    const data = await getProductById(id, token);
                    setProduct({
                        name: data.name,
                        price: data.price,
                        stockQuantity: data.stockQuantity
                    });
                } catch (err) {
                    setError('Failed to load product: ' + (err.response?.data?.message || err.message));
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProduct();
    }, [id, isEditing, getAuthHeaders]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const token = getAuthHeaders().Authorization.split(' ')[1];
            if (isEditing) {
                await updateProduct(id, product, token);
            } else {
                await createProduct(product, token);
            }
            navigate('/products'); // Redirect to product list
        } catch (err) {
            setError('Failed to save product: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) return <div className="container">Loading product data...</div>;
    if (error) return <div className="container error-message">{error}</div>;

    return (
        <div className="container">
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="stockQuantity">Stock Quantity:</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        name="stockQuantity"
                        value={product.stockQuantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="button" disabled={loading}>
                    {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
                </button>
                <button type="button" className="button button-secondary" onClick={() => navigate('/products')} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default ProductFormPage;