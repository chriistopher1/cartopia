import React from "react";
import { Timestamp } from "firebase/firestore";
import { IOrderItem } from "../../types";
import { checkStatus, formatToIDR } from "../../constant";

const styling = "font-medium"

const OrderCard = (order: IOrderItem) => {
  const {
    id,
    date,
    shippingDate,
    status,
    addressFrom,
    addressTo,
    totalPrice,
    item,
  } = order;

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  console.log(item);

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
      <p className={`${styling}`}>Total Price: {totalPrice ? `${formatToIDR(totalPrice)}` : "N/A"}</p>
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
    </div>
  );
};

export default OrderCard;
