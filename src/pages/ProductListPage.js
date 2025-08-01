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