import { useUserContext } from "../../../context/AuthProvider";
import { useGetUserOrderList } from "../../../lib/tanstack/queries";
import OrderCard from "../../../components/card/OrderCard";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaHourglassHalf, FaShippingFast, FaCheck } from "react-icons/fa";
import { useState } from "react";

const OrderComplete = () => {
  const { user } = useUserContext();
  const { data: userOrderList, isLoading: isGettingUserOrderList } =
    useGetUserOrderList(user.accountId);
    const [activeCategory, setActiveCategory] = useState("complete");
  if (isGettingUserOrderList) {
    return <div>Loading...</div>;
  }
  const handleRemoveOrder = async () => {
  
  };
  // console.log(userOrderList);

  return (
    <div className="mx-10 md:mx-16">
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
        {userOrderList?.item
          ?.filter((order) => order.status === "complete")
          ?.map((order) => (
            <OrderCard key={order.id} order={order} orderListId={user.order} onRemoveOrder={handleRemoveOrder} />
          ))}
      </div>
    </div>
  );
};

export default OrderComplete;
