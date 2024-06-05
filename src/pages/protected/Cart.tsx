import React, { useState } from "react";
import { useGetUserCartList } from "../../lib/tanstack/queries";
import { useUserContext } from "../../context/AuthProvider";
import CartCard from "../../components/card/CartCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useUserContext();
  const { data: userCartList, isPending } = useGetUserCartList(user?.accountId);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (!user || !user.accountId) return null;

  if (isPending) return <div>Loading...</div>;

  const handleCheckboxChange = (productId: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleCheckout = () => {
    const selectedProducts = userCartList?.item?.filter((cartProduct) =>
      selectedItems.includes(cartProduct.product?.id)
    );
    navigate("/checkout", { state: { selectedProducts } });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">My Cart</h2>
        <div className="space-y-8 mb-8">
          {userCartList &&
            userCartList?.item?.map((cartProduct) => (
              <div key={cartProduct.product?.id} className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(cartProduct.product?.id)}
                  onChange={() => handleCheckboxChange(cartProduct.product?.id)}
                  className="mr-4 h-5 w-5"
                />
                <CartCard
                  product={cartProduct.product}
                  quantity={cartProduct.quantity}
                />
              </div>
            ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
