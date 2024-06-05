import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProduct, IProductOrderItem } from "../../types";
import { useAddItemToOrder } from "../../lib/tanstack/queries";
import { useUserContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const Payment = () => {
  const { user } = useUserContext();

  const navigate = useNavigate()
  const location = useLocation();
  const subtotal = location.state?.subtotal as number;
  const selectedProduct = location.state
    ?.selectedProducts as IProductOrderItem[];

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: addItemToOrder, isPending: isAddingItemToOrder } =
    useAddItemToOrder();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    selectedProduct.map(async (product) => {
      await addItemToOrder({
        addressTo: user.address,
        newProduct: product,
        sellerId: product.product?.sellerId,
        uid: user.accountId,
        isPaid : true
      });
    });

    toast.success("Success payment");
    navigate("/user/order")
  };

  console.log(selectedProduct);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <div className="mb-8">
          <h3 className="font-semibold text-lg">Order Summary</h3>
          <div className="flex justify-between mt-4">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
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
            <option value="" disabled>
              Select payment method
            </option>
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
