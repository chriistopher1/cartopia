import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreditCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subtotal = location.state?.subtotal as number;
  const selectedProducts = location.state?.selectedProducts;
  const deliveryMethods = location.state?.deliveryMethods;

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subtotal || !selectedProducts || !deliveryMethods) {
      setError("Missing payment data.");
    } else {
      setError(null); // Reset error if all data is present
    }
  }, [subtotal, selectedProducts, deliveryMethods]);

  const handleCreditCardPayment = () => {
    // Validate credit card information
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3,4}$/;

    if (!cardNumberRegex.test(cardNumber)) {
      setError("Invalid card number. Please enter a 16-digit card number.");
      return;
    }

    if (!expiryDateRegex.test(expiryDate)) {
      setError("Invalid expiry date. Please enter in MM/YY format.");
      return;
    }

    if (!cvvRegex.test(cvv)) {
      setError("Invalid CVV. Please enter a 3 or 4-digit CVV.");
      return;
    }

    // Implement credit card payment logic here
    toast.success("Credit Card Payment Successful");
    navigate("/user/order");
  };

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

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Credit Card Payment</h2>
        <div className="mb-8">
          <h3 className="font-semibold text-lg">Order Summary</h3>
          <div className="space-y-4 mb-4">
            {selectedProducts?.map((product) => (
              <div key={product.product?.id} className="flex justify-between">
                <span>{product.product?.name} (x{product.quantity})</span>
                <span>{formatCurrency(product.product?.price * product.quantity)}</span>
                <span>+ Delivery: {formatCurrency(calculateDeliveryCost(product.product?.price * product.quantity, deliveryMethods[product.product?.id]))}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Credit Card Information</h3>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.target.value);
              setError(null);
            }}
            className="border rounded-md px-3 py-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChange={(e) => {
              setExpiryDate(e.target.value);
              setError(null);
            }}
            className="border rounded-md px-3 py-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => {
              setCvv(e.target.value);
              setError(null);
            }}
            className="border rounded-md px-3 py-2 w-full mb-4"
          />
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          onClick={handleCreditCardPayment}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 w-full"
        >
          Pay with Credit Card
        </button>
      </div>
    </div>
  );
};

export default CreditCard;