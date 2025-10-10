// components/UserNavbar.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileEditModal from "./ProfileEditModal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const UserNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-semibold">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={toggleModal}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Edit profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {isModalOpen && <ProfileEditModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}
        </nav>
    );
};

export default UserNavbar;
