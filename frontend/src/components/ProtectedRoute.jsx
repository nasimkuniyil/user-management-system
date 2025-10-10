import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === 'true';
    const location = useLocation();

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (isAdmin) {
        // If an admin is logged in, redirect to the admin dashboard or another admin-specific route
        return <Navigate to="/dashboard" replace />;
    }

    // If a regular user is logged in, render the user-specific content
    return <Outlet />;
};

export default ProtectedRoute;
