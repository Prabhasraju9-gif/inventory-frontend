import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage'; // For create/update
import ProductDetailPage from './pages/ProductDetailPage';

// A simple Protected Route component
const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, loading, hasRole } = useAuth(); // Assuming useAuth provides user and hasRole

    if (loading) {
        return <div className="container">Loading application...</div>;
    }

    if (!user) {
        // Not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        // Authenticated but does not have the required role, redirect to home or unauthorized page
        console.warn(`User ${user.username} (Roles: ${user.roles.join(', ')}) does not have required role: ${requiredRole}`);
        return <Navigate to="/" replace />; // Or a custom unauthorized page
    }

    return children;
};

// This component wraps the Routes to access AuthContext
function AppContent() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading Application...</div>;

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
                    <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />

                    {/* Protected Routes */}
                    <Route path="/products" element={
                        <ProtectedRoute>
                            <ProductListPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/products/new" element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <ProductFormPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/products/edit/:id" element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <ProductFormPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/products/:id" element={
                        <ProtectedRoute>
                            <ProductDetailPage />
                        </ProtectedRoute>
                    } />
                    {/* Add more routes for Orders, Users (if admin panel) here with appropriate ProtectedRoute */}
                </Routes>
            </div>
        </>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;