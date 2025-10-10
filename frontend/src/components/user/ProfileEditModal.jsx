import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import API from "../../api/axios";

const ProfileEditModal = ({ isModalOpen, toggleModal }) => {
  const token = useSelector((state) => state.auth.token);

  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");

  // 🔹 Fetch profile when modal opens
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/user/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(data.user);
        setEditedProfile(data.user);
        if (data.user.profileImage) {
          setImagePreview(`http://localhost:4000${data.user.profileImage}`);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isModalOpen) fetchProfile();
  }, [isModalOpen, token]);

  // 🔹 Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Image change + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Validate before submit
  const validateForm = () => {
    const errors = {};

    if (!editedProfile.name?.trim()) {
      errors.name = "Username is required.";
    } else if (editedProfile.name.length < 3) {
      errors.name = "Username must be at least 3 characters.";
    }

    if (!editedProfile.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(editedProfile.email)) {
      errors.email = "Invalid email format.";
    }

    if (imageFile && !["image/jpeg", "image/png"].includes(imageFile.type)) {
      errors.image = "Profile image must be JPG or PNG.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 🔹 Save profile changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      let profileImageUrl = profile.profileImage;

      // Upload image if new one selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await API.post(
          "/user/profile-upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        profileImageUrl = uploadRes.data.imageUrl;
      }

      const updatedData = { ...editedProfile, profileImage: profileImageUrl };

      const { data } = await API.put(
        "/user/profile/edit/",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfile(data.user);
      toggleModal(false);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message || "Failed to update profile. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg overflow-y-auto">
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        <form onSubmit={handleSaveChanges}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="name"
              value={editedProfile.name || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={editedProfile.email || ""}
              onChange={handleChange}
              disabled
              className="w-full px-3 py-2 border rounded-lg"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            <input type="file" onChange={handleImageChange} className="w-full" />
            {formErrors.image && (
              <p className="text-red-500 text-sm">{formErrors.image}</p>
            )}
            {imagePreview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => toggleModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
