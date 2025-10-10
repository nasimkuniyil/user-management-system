import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AdminRoute = () => {
    const { user, isLoggedIn } = useSelector(state => state.auth);

    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const isAdmin = user.role === "admin";


    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />
};
