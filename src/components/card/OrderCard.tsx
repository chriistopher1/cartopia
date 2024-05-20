import { Timestamp } from "firebase/firestore";
import { IOrderItem } from "../../types";
import { checkStatus, formatToIDR } from "../../constant";
import {
  useCompleteOrder,
  useMakePayment,
  useMakeReview,
} from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { makeReview } from "../../lib/firebase/firestore";
import { useState } from "react";
import Modal from "../product/Modal";
import ImageUploader from "../seller/ImageUploader";
import { useNavigate } from "react-router-dom";

const styling = "font-semibold";

interface OrderProps {
  order: IOrderItem;
  orderListId: string | undefined;
}

const OrderCard = (newInstance: OrderProps) => {
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
  } = newInstance.order;

  const navigate = useNavigate()

  const { mutateAsync: makePayment, isPending: isMakingPayment } =
    useMakePayment();
  const { mutateAsync: completeOrder, isPending: isCompletingOrder } =
    useCompleteOrder();

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  // make payment
  const handlePayment = async () => {
    if (!id) return;

    const isPaid = await makePayment({
      orderId: id,
      orderListId: newInstance.orderListId,
    });

    if (isPaid) {
      toast.success("Payment Succesful, Status changed to shipping");
    } else {
      toast.error("Payment Failure, please try again");
    }
  };

  // complete order
  const handleCompleteOrder = async () => {
    if (!id) return;

    const isComplete = await completeOrder({
      orderId: id,
      orderListId: newInstance.orderListId,
    });

    if (isComplete) {
      toast.success("Order completed, Status changed to complete");
    } else {
      toast.error("Order completion failed, please try again");
    }
  };

  return (
    <div className="order-card border shadow-md p-4 mb-4 rounded-md">
      <h2 className="font-bold text-lg mb-2">Order ID: {id}</h2>
      <p className={`${styling}`}>Date: {formatDate(date)}</p>
      <p className={`${styling}`}>Shipping Date: {formatDate(shippingDate)}</p>
      <p className={`${styling}`}>
        Status: <span className={`${checkStatus(status)}`}>{status}</span>
      </p>
      <p className={`${styling}`}>From: {addressFrom}</p>
      <p className={`${styling}`}>To: {addressTo}</p>
      <p className={`${styling}`}>Is Reviewed : {isReviewed ? (<span>Reviewed</span>):(<span>Not Reviewed</span>)}</p>
      <p className={`${styling} `}>
        Total Price:{" "}
        <span className="text-yellow-500">
          {totalPrice ? `${formatToIDR(totalPrice)}` : "N/A"}
        </span>
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
      {status && status == "pending" ? (
        <button
          className={`border-2 border-black bg-rose-500 px-4 py-2 rounded-lg text-white hover:bg-rose-700 font-medium ${
            isMakingPayment ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePayment}
          disabled={isMakingPayment}
        >
          <AiOutlineLoading3Quarters
            className={`${
              isMakingPayment ? "inline animate-spin" : "hidden"
            } mr-2`}
          />
          <span>Pay Now</span>
        </button>
      ) : status && status == "shipping" ? (
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
      ) : status && !isReviewed && item !== undefined && status == "complete" ? (
        <>
          <button
            className={`border-2 border-black bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-700 font-medium `}
            onClick={() => navigate("/make-review" , {state : {
              orderId : id,
              orderListId : newInstance.orderListId,
              productName : item[0].product?.name,
              productReviewId : item[0].product?.reviewId
            }})}
          >
            <span>Review</span>
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderCard;
