import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user";
import { updateUserProfileWithImage, uploadProfilePicture } from "../../lib/firebase/firestore";

const Profile = () => {
  const { user, setUser } = useUserContext<IUser>();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  if (!user) {
    return <div>No user data found</div>;
  }

  const handleSave = async () => {
    console.log("Save button clicked");
    if (!user.id) {
      console.error("User ID is missing");
      return;
    }

    console.log("Saving user profile with:", { name, phone });

    try {
      let imageUrl = user.image;
      if (image) {
        imageUrl = await uploadProfilePicture(image, user.id);
      }

      const success = await updateUserProfileWithImage(user.id, { name, phone, image: imageUrl });
      if (success) {
        console.log("User profile updated successfully");

        // Update user context
        setUser((prevUser) => {
          const updatedUser = {
            ...prevUser,
            name,
            phone,
            image: imageUrl,
          };
          console.log("Updating user context with:", updatedUser);
          return updatedUser;
        });
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4 flex justify-center">
          <img
            src={user.image || "/images/default-avatar.png"} // Use default image if user image is null
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        {isEditing && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Change Profile Picture</label>
            <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          ) : (
            <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
              {user.name}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Phone</label>
          {isEditing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          ) : (
            <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
              {user.phone}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
            {user.email}
          </div>
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
