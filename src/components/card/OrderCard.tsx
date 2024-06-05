import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { IOrderItem } from "../../types";
import { checkStatus, formatToIDR } from "../../constant";
import { useCompleteOrder } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTrash } from "react-icons/fa";

const OrderCard = ({ order, orderListId, onRemoveOrder }) => {
  const {
    id,
    date,
    shippingDate,
    status,
    addressFrom,
    addressTo,
    totalPrice,
    item,
    isReviewed,
  } = order;

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const { mutateAsync: completeOrder, isPending: isCompletingOrder } = useCompleteOrder();

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  const handleCompleteOrder = async () => {
    if (!id || !item) return;

    const isComplete = await completeOrder({
      orderId: id,
      orderListId: orderListId,
      productId: item[0].product?.id,
      bought: item[0].quantity,
    });

    if (isComplete) {
      toast.success("Order completed, Status changed to complete");
    } else {
      toast.error("Order completion failed, please try again");
    }
  };

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="order-card bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300 ease-in-out flex items-start">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheck}
        className="mr-4 mt-1"
      />
      <div className="flex-1">
        <h2 className="font-bold text-xl mb-2">Order ID: {id}</h2>
        <p className="font-semibold mb-1">Date: {formatDate(date)}</p>
        <p className="font-semibold mb-1">Shipping Date: {formatDate(shippingDate)}</p>
        <p className="font-semibold mb-1">
          Status: <span className={`${checkStatus(status)} capitalize`}>{status}</span>
        </p>
        <p className="font-semibold mb-1">From: {addressFrom}</p>
        <p className="font-semibold mb-1">To: {addressTo}</p>
        <p className="font-semibold mb-1">
          Is Reviewed: {isReviewed ? <span className="text-green-500">Reviewed</span> : <span className="text-red-500">Not Reviewed</span>}
        </p>
        <p className="font-semibold mb-1">
          Total Price: <span className="text-yellow-500">{totalPrice ? `${formatToIDR(totalPrice)}` : "N/A"}</span>
        </p>
        <div className="order-items mt-4">
          <h3 className="font-semibold mb-2">Items:</h3>
          <ul>
            {item && item.length > 0 ? (
              item.map((product, index) => (
                <li key={index} className="border-b py-2 font-medium">
                  {product.product?.name} - Quantity: {product.quantity}
                </li>
              ))
            ) : (
              <li>No items in this order.</li>
            )}
          </ul>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {status === "shipping" && (
            <button
              className={`border-2 border-black bg-sky-500 px-4 py-2 rounded-lg text-white hover:bg-sky-700 font-medium ${
                isCompletingOrder ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCompleteOrder}
              disabled={isCompletingOrder}
            >
              <AiOutlineLoading3Quarters
                className={`${
                  isCompletingOrder ? "inline animate-spin" : "hidden"
                } mr-2`}
              />
              <span>Complete Order</span>
            </button>
          )}
          {status === "complete" && !isReviewed && item && (
            <button
              className="border-2 border-black bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-700 font-medium"
              onClick={() =>
                navigate("/make-review", {
                  state: {
                    orderId: id,
                    orderListId: orderListId,
                    productName: item[0].product?.name,
                    productReviewId: item[0].product?.reviewId,
                    productId: item[0].product?.id,
                  },
                })
              }
            >
              <span>Review</span>
            </button>
          )}
          <button
            className="border-2 border-black bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-700 font-medium"
            onClick={() => onRemoveOrder(id)}
          >
            <FaTrash className="inline mr-2" />
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
