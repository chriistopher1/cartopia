import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateUserProfile } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Profile = () => {
  const { user, checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || undefined);
  const [phone, setPhone] = useState(user?.phone || undefined);
  const [address, setAddress] = useState(user?.address || undefined);
  const [image, setImage] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  if (!user) {
    return <div>No user data found</div>;
  }

  const { mutateAsync: updateUserProfile, isPending: isUpdatingUserProfile } =
    useUpdateUserProfile();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Please select a valid image file (jpg, png)");
        return;
      }
      setImage(file);
    }
  };

  const handleSave = async () => {
    const reader = new FileReader();

    if (image) {
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        console.log(base64String);

        const userProfileUpdated = await updateUserProfile({
          profileData: {
            name: name,
            phone: phone,
            address: address,
          },
          userAccountId: user.accountId,
          imageUrl: base64String,
        });

        if (userProfileUpdated) {
          checkAuthUser();
          toast.success("User profile is updated");
          navigate("/");
        } else {
          toast.error("Update profile failed");
        }
      };
    } else {
      const userProfileUpdated = await updateUserProfile({
        profileData: {
          name: name,
          phone: phone,
          address: address,
        },
        userAccountId: user.accountId,
      });

      if (userProfileUpdated) {
        checkAuthUser();
        toast.success("User profile is updated");
        navigate("/");
      } else {
        toast.error("Update profile failed");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        
        <div className="mb-4 flex justify-center">
          <img
            src={user.imageUrl || "/images/default-avatar.png"} // Use default image if user image is null
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">User Information</h3>
          {isEditing && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Change Profile Picture
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
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
            <label className="block text-sm font-semibold mb-1">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
                {user.address}
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
        </div>

        {user.seller && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Seller Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Seller Name</label>
              <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
                {user.seller.name}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Seller Address</label>
              <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
                {user.seller.address}
              </div>
            </div>
          </div>
        )}

        {isEditing ? (
          <button
            onClick={handleSave}
            className={`w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ${
              isUpdatingUserProfile ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUpdatingUserProfile}
          >
            <AiOutlineLoading3Quarters
              className={`${
                isUpdatingUserProfile ? "inline animate-spin" : "hidden"
              } mr-2`}
            />
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
