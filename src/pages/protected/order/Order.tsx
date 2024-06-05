import { useState } from "react";
import { useUserContext } from "../../../context/AuthProvider";
import { useGetUserOrderList } from "../../../lib/tanstack/queries";
import OrderCard from "../../../components/card/OrderCard";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaHourglassHalf, FaShippingFast, FaCheck } from "react-icons/fa";

const Order = () => {
  const { user } = useUserContext();
  const { data: userOrderList, isLoading: isGettingUserOrderList, refetch } = useGetUserOrderList(user.accountId);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleRemoveOrder = async (orderId) => {
    // Implement your logic to remove the order from the user's order list
    // You might need to call an API or update the Firestore database
    console.log(`Removing order ${orderId}`);
    // Example logic to remove order
    await removeOrderFromUserOrderList(orderId);
    refetch(); // Refetch the order list after removal
  };

  if (isGettingUserOrderList) {
    return <div className="flex justify-center items-center h-screen"><div className="text-xl">Loading...</div></div>;
  }

  return (
    <div className="px-4 py-8 md:px-16">
      <div className="mb-8">
        <h1 className="font-bold text-3xl border-b-2 pb-4 border-gray-300 mb-6">My Orders</h1>
        <div className="flex gap-4 mb-6 flex-wrap">
          <Link
            className={`flex items-center gap-2 border-2 px-4 py-2 rounded-lg text-white font-medium transition duration-300 ease-in-out ${
              activeCategory === "all" ? "bg-blue-500 border-blue-500" : "bg-black border-black"
            }`}
            to="/user/order"
            onClick={() => setActiveCategory("all")}
          >
            <FaBoxOpen /> Cart
          </Link>
          <Link
            className={`flex items-center gap-2 border-2 px-4 py-2 rounded-lg text-white font-medium transition duration-300 ease-in-out ${
              activeCategory === "pending" ? "bg-blue-500 border-blue-500" : "bg-black border-black"
            }`}
            to="/user/order/pending"
            onClick={() => setActiveCategory("pending")}
          >
            <FaHourglassHalf /> Pending
          </Link>
          <Link
            className={`flex items-center gap-2 border-2 px-4 py-2 rounded-lg text-white font-medium transition duration-300 ease-in-out ${
              activeCategory === "shipping" ? "bg-blue-500 border-blue-500" : "bg-black border-black"
            }`}
            to="/user/order/shipping"
            onClick={() => setActiveCategory("shipping")}
          >
            <FaShippingFast /> Shipping
          </Link>
          <Link
            className={`flex items-center gap-2 border-2 px-4 py-2 rounded-lg text-white font-medium transition duration-300 ease-in-out ${
              activeCategory === "complete" ? "bg-blue-500 border-blue-500" : "bg-black border-black"
            }`}
            to="/user/order/complete"
            onClick={() => setActiveCategory("complete")}
          >
            <FaCheck /> Complete
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {userOrderList && userOrderList.item?.map((order) => (
          <OrderCard key={order.id} order={order} orderListId={user.order} onRemoveOrder={handleRemoveOrder} />
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <button
          className="border-2 border-black bg-black px-4 py-2 rounded-lg text-white hover:bg-gray-800 font-medium"
          onClick={() => {
            // Handle checkout logic here
            console.log("Checkout clicked");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Order;
