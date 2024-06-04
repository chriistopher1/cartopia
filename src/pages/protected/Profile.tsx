import React from "react";
import { useUserContext } from "../../context/AuthProvider";
import { useGetUserOrderList } from "../../lib/tanstack/queries";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/user"; // Import the IUser interface

const Profile = () => {
  const { user } = useUserContext<IUser>();
  const navigate = useNavigate();
  const { data: orders, isLoading: isLoadingOrders, error: ordersError } = useGetUserOrderList(user?.id);

  if (!user) {
    return <div>No user data found</div>;
  }

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
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Name</label>
          <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
            {user.name}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Phone</label>
          <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
            {user.phone}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <div className="w-full border rounded-md px-3 py-2 bg-gray-200">
            {user.email}
          </div>
        </div>
        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
      </div>

      <div className="p-8 mt-8 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Order List</h2>
        {isLoadingOrders && <div>Loading orders...</div>}
        {ordersError && <div>Error loading orders</div>}
        {orders && orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="mb-4">
                <div className="border rounded-md px-3 py-2 bg-gray-200">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Total:</strong> ${order.total}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No orders found</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
