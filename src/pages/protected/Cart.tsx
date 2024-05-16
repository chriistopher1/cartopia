import React from "react";
import { useGetUserCartList } from "../../lib/tanstack/queries";
import { useUserContext } from "../../context/AuthProvider";
import { IUser } from "../../types";
import CartCard from "../../components/card/CartCard";

const Cart = () => {
  const { user } = useUserContext();
  const { data: userCartList, isPending } = useGetUserCartList(user?.accountId);

  if (!user || !user.accountId) return null;

  if (isPending) return <div>Loading...</div>;

  // console.log(userCartList);

  return (
    <div>
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mx-4 md:mx-12 mb-4 border-b-2 border-[#63a5ea] pb-2 w-fit ">
        My Cart
      </h2>
      <div className="flex flex-col gap-4 mb-8 mx-4 md:mx-12">
        {userCartList &&
          userCartList?.item?.map((cartProduct) => (
            <CartCard
              key={cartProduct.product?.id}
              product={cartProduct.product}
              quantity={cartProduct.quantity}
            />
          ))}
      </div>
    </div>
  );
};

export default Cart;
