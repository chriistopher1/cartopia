import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProductOrderItem } from "../../types";
import { useAddItemToOrder } from "../../lib/tanstack/queries";
import { useUserContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const Payment = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();
  const location = useLocation();
  const subtotal = location.state?.subtotal as number;
  const selectedProducts = location.state?.selectedProducts as IProductOrderItem[];
  const deliveryMethods = location.state?.deliveryMethods as { [key: string]: string };

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: addItemToOrder, isPending: isAddingItemToOrder } = useAddItemToOrder();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDeliveryCost = (price: number, method: string) => {
    switch (method) {
      case "regular":
        return price * 0.02;
      case "cargo":
        return price * 0.04;
      case "instant":
        return price * 0.06;
      default:
        return 0;
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    selectedProducts.map(async (product) => {
      await addItemToOrder({
        addressTo: user.address,
        newProduct: product,
        sellerId: product.product?.sellerId,
        uid: user.accountId,
        isPaid: true,
      });
    });

    if (paymentMethod === "credit_card") {
      navigate("/credit-card", { state: { subtotal, selectedProducts, deliveryMethods } });
    } else {
      navigate("/user/order");
    }
  };

  console.log(selectedProducts);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <div className="mb-8">
          <h3 className="font-semibold text-lg">Order Summary</h3>
          <div className="space-y-4 mb-4">
            {selectedProducts.map((product) => {
              const productPrice = (product.product?.price || 0) * product.quantity;
              const deliveryCost = calculateDeliveryCost(productPrice, deliveryMethods[product.product?.id] || '');
              return (
                <div key={product.product?.id} className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>{product.product?.name} (x{product.quantity})</span>
                    <span>{formatCurrency(productPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery ({deliveryMethods[product.product?.id]}):</span>
                    <span>{formatCurrency(deliveryCost)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 border-t pt-4">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Select Payment Method:</h3>
          <select
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setError(null);
            }}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="" disabled>Select payment method</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="e_wallet">E-Wallet</option>
          </select>
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mt-4">
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 w-full"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
