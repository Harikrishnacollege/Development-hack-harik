import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import ToastContainer from "../components/ToastContainer";
import { submitBasicProfile } from "../utils/api";
import { auth } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "../Styles/ProfileCompletion.css";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const { toasts, toast, removeToast } = useToast();
  const { authState, markProfileCompleted } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    profilePhoto: "",
    phone: "",
    address: "",
    dob: "",
    parentName: "",
    parentPhone: "",
  });

  // ---------------- FORM INPUT HANDLER ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- CLOUDINARY IMAGE UPLOAD ----------------
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    try {
      setUploading(true);

      const cloudForm = new FormData();
      cloudForm.append("file", file);
      cloudForm.append("upload_preset", UPLOAD_PRESET);
      cloudForm.append("folder", "profile_photos");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: cloudForm,
        }
      );

      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const data = await res.json();
      console.log(data.secure_url);

      setFormData((prev) => ({
        ...prev,
        profilePhoto: data.secure_url,
      }));

      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // ---------------- SUBMIT PROFILE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { phone, address, dob, parentName, parentPhone, profilePhoto } =
      formData;

    if (!phone || !address || !dob || !parentName || !parentPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!authState?.uid) {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      await submitBasicProfile({
        uid: authState.uid, // ✅ REQUIRED by backend
        profilePhoto: profilePhoto || "",
        phone,
        address,
        dob,
        parentName,
        parentPhone,
      });

      toast.success("Profile completed successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (error) {
      console.error("Profile completion error:", error);
      toast.error(error.message || "Failed to complete profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-completion-page">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="profile-completion-container">
        <div className="completion-header">
          <h1>Complete Your Profile</h1>
          <p>Please provide the following information to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-completion-form">
          {/* Profile Photo */}
          <div className="form-group">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <div className="photo-upload">
              {formData.profilePhoto && (
                <img
                  src={formData.profilePhoto}
                  alt="Profile Preview"
                  className="preview-photo"
                />
              )}

              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                onChange={handlePhotoChange}
                className="file-input"
                disabled={uploading}
              />

              <label htmlFor="profilePhoto" className="file-label">
                {uploading
                  ? "Uploading..."
                  : formData.profilePhoto
                  ? "Change Photo"
                  : "Upload Photo"}
              </label>
            </div>
          </div>

          {/* Phone + DOB */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">
              Address <span className="required">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Parent Info */}
          <div className="form-section">
            <h3>Parent / Guardian Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="parentName">
                  Parent Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="parentPhone">
                  Parent Phone <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || uploading}
            >
              {isLoading ? "Submitting..." : "Complete Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletion;
