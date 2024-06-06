import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRemoveItemFromCart } from "../../lib/tanstack/queries";
import { useUserContext } from "../../context/AuthProvider";
import cardLogo from "../../assets/card-logo.png"; // Add your card logo image path

const CreditCard = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const subtotal = location.state?.subtotal as number;
  const selectedProducts = location.state?.selectedProducts;
  const deliveryMethods = location.state?.deliveryMethods;

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: removeItemFromCart } = useRemoveItemFromCart();

  useEffect(() => {
    if (!subtotal || !selectedProducts || !deliveryMethods) {
      setError("Missing payment data.");
    } else {
      setError(null);
    }
  }, [subtotal, selectedProducts, deliveryMethods]);

  const handleCreditCardPayment = async () => {
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

    for (const product of selectedProducts) {
      await removeItemFromCart({
        uid: user.accountId,
        idToBeDeleted: product.product?.id,
      });
    }

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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 16) {
      setCardNumber(value);
      setError(null);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-digit characters
    if (value.length <= 4) {
      if (value.length === 3 && !value.includes("/")) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
      setExpiryDate(value);
      setError(null);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 4) {
      setCvv(value);
      setError(null);
    }
  };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Credit Card Payment</h2>
        <div className="mb-8">
          <img src={cardLogo} alt="Card Logo" className="mx-auto mb-6 w-32 h-32" />
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-4 mb-4">
            {selectedProducts?.map((product) => (
              <div key={product.product?.id} className="flex justify-between">
                <span>{product.product?.name} (x{product.quantity})</span>
                <span>{formatCurrency(product.product?.price * product.quantity)}</span>
                <span>+ Delivery: {formatCurrency(calculateDeliveryCost(product.product?.price * product.quantity, deliveryMethods[product.product?.id]))}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 border-t pt-4">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">Credit Card Information</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="border rounded-md px-3 py-2 w-full"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="border rounded-md px-3 py-2 w-1/2"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={handleCvvChange}
                className="border rounded-md px-3 py-2 w-1/2"
              />
            </div>
          </div>
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          onClick={handleCreditCardPayment}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full"
        >
          Pay with Credit Card
        </button>
      </div>
    </div>
  );
};

export default CreditCard;
