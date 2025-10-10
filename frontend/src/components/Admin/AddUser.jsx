import axios from "axios";
import { useState } from "react";
import ValidationMessage from "../common/Validation";
import { useDispatch, useSelector } from "react-redux";
import API from "../../api/axios";

/* eslint-disable react/prop-types */
const AddUser = ({ isModalOpen, toggleModal }) => {
    // const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('https://static.thenounproject.com/png/801397-200.png');
    const [validationErrors, setValidationErrors] = useState({});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        toggleModal(!isModalOpen)

        // dispatch(setError(''))
        return;
    }

    const validateInput = () => {
        const errors = {};
        if (!formData.name || formData.name.trim().length < 3) {
            errors.username = "Username must be at least 3 characters.";
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Enter a valid email address.";
        }
        if (!formData.password || formData.password.length < 6) {
            errors.password = "Password must be at least 8 characters.";
        }
        return errors;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const errors = validateInput();
        setValidationErrors(errors)
        if (Object.keys(errors).length > 0) {
            console.log('Validation Errors:', errors);
            return;
        }
        setError("");
        try {
            const response = await API.post('/auth/register', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('user added : ',response.data);
            toggleModal()
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            setError(error.response?.data || { message: "An unexpected error occurred." });
        }
    }
    if (!isModalOpen) return null;

    return (
        isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4" style={{ zIndex: 50, marginLeft: 0 }}>
                <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg sm:max-w-md md:max-w-sm max-h-screen overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Profile</h2>
                    <form onSubmit={handleSave}>
                        {error && <ValidationMessage message={error.message} />}
                        {/* Username Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={handleChange}
                                name="name"
                                placeholder="Enter username"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {validationErrors.username && <ValidationMessage message={validationErrors.username} />}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                name="email"
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {validationErrors.email && <ValidationMessage message={validationErrors.email} />}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">password</label>
                            <input
                                type="password"
                                value={formData.password || ''}
                                onChange={handleChange}
                                name="password"
                                placeholder="Enter password"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {validationErrors.password && <ValidationMessage message={validationErrors.password} />}
                        </div>

                        {/* Cancel and Save Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default AddUser