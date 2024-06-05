import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../components/card/CartCard";
import { IProductCart } from "../../types";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProducts = location.state?.selectedProducts as IProductCart[];

  const [deliveryMethods, setDeliveryMethods] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  if (!selectedProducts || selectedProducts.length === 0) {
    return <div>No items selected for checkout.</div>;
  }

  const calculateSubtotal = () => {
    return selectedProducts.reduce((total, cartProduct) => {
      return total + (cartProduct.product?.price || 0) * cartProduct.quantity;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDeliveryMethodChange = (productId: string, method: string) => {
    setDeliveryMethods((prevMethods) => ({
      ...prevMethods,
      [productId]: method,
    }));
    setError(null); // Clear error when user selects a delivery method
  };

  const handlePayment = () => {
    // Check if all products have a selected delivery method
    const allMethodsSelected = selectedProducts.every(
      (product) => deliveryMethods[product.product?.id]
    );

    if (!allMethodsSelected) {
      setError("Please select a delivery method for each item.");
      return;
    }

    navigate("/payment", { state: { selectedProducts, deliveryMethods, subtotal } });
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
        <div className="space-y-8">
          {selectedProducts.map((cartProduct) => (
            <div key={cartProduct.product?.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <CartCard
                product={cartProduct.product}
                quantity={cartProduct.quantity}
              />
              <div className="mt-4">
                <label htmlFor={`delivery-method-${cartProduct.product?.id}`} className="block mb-2 font-medium text-gray-700">
                  Delivery Method:
                </label>
                <select
                  id={`delivery-method-${cartProduct.product?.id}`}
                  value={deliveryMethods[cartProduct.product?.id] || ''}
                  onChange={(e) => handleDeliveryMethodChange(cartProduct.product?.id, e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select delivery method</option>
                  <option value="regular">Regular</option>
                  <option value="cargo">Cargo</option>
                  <option value="instant">Instant</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <div className="mt-4 text-red-600 text-center">
            {error}
          </div>
        )}
        <div className="mt-8 p-4 border-t-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Subtotal:</h3>
            <span className="text-xl">{formatCurrency(subtotal)}</span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
