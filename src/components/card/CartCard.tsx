import { useEffect, useState } from "react";
import { checkIfItemInTheList, formatToIDR } from "../../constant";
import { IProductCart } from "../../types";

import { CgNotes } from "react-icons/cg";
import { FaHeart, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import {
  useAddItemToSaved,
  useGetUserSavedList,
  useRemoveItemFromCart,
} from "../../lib/tanstack/queries";
import { useUserContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoHeartOutline } from "react-icons/io5";

const CartCard = (newProduct: IProductCart) => {
  const { user } = useUserContext();

  const [newQuantity, setNewQuantity] = useState<number>(
    newProduct.quantity ?? 1
  );

  const [isAddedToSavedList, setIsAddedToSavedList] = useState<boolean>(false);

  const { mutateAsync: addItemToSaved, isPending: isAddingItemToSaved } =
    useAddItemToSaved();

  const { data: userSavedList } =
    useGetUserSavedList(user.accountId);

  const { mutateAsync: removeItemFromCart, isPending: isRemovingItemFromCart } = useRemoveItemFromCart()

  useEffect(() => {
    if (userSavedList != undefined && newProduct.product != undefined) {
      const checkItem = checkIfItemInTheList(
        newProduct?.product,
        userSavedList.item
      );

      setIsAddedToSavedList(checkItem);
    }
  }, [userSavedList]);

  // add item to saved
  const handleAddItemToSaved = async () => {
    if (user.accountId == "") window.location.href = "/login";

    if (isAddedToSavedList) {
      toast.error("Item is already in saved", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    const isAddedToCart = await addItemToSaved({
      newProduct: {
        product: newProduct.product,
        quantity: newQuantity,
      },
      uid: user.accountId,
    });

    if (isAddedToCart) {
      toast.success("Success on adding item to saved", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsAddedToSavedList(true);
    } else {
      toast.error("Error on adding item to saved", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

// remove item from cart
const handleRemoveItemFromCart = async () => {
  if (user.accountId == "") window.location.href = "/login";

  const isRemovedFromCart = await removeItemFromCart({
    idToBeDeleted : newProduct.product?.id,
    uid: user.accountId
});

  if (isRemovedFromCart) {
    toast.success("Success on removing item from cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsAddedToSavedList(true);
  } else {
    toast.error("Error on removing item from cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

  return (
    <div className="flex items-center justify-between bg-white shadow-lg  shadow-gray-400 border-2 border-black">
      <div className="flex items-center gap-3">
        <img
          src={newProduct.product?.imageUrl}
          className="w-[40%] md:w-[18%] h-full object-contain"
        />
        <h4 className="font-semibold text-xs sm:text-md md:text-xl lg:text-2xl">
          {newProduct.product?.name}
        </h4>
      </div>
      <div className="flex flex-col mt-9 md:mt-8 mr-3 gap-2 md:gap-6 items-end">
        <h4 className="font-semibold text-xs sm:text-md md:text-xl lg:text-2xl">
          {newProduct &&
            newProduct.product?.price &&
            newProduct.quantity &&
            formatToIDR(newProduct.product.price * newQuantity)}
        </h4>
        <div className="flex items-center gap-3 md:gap-5">
          <CgNotes className="text-[#63a5ea] md:text-xl cursor-pointer" />
          <button className="text-[#63a5ea]" onClick={handleAddItemToSaved}>
            {isAddingItemToSaved ? (
              <AiOutlineLoading3Quarters className="animate-spin md:text-xl" />
            ) : isAddedToSavedList ? (
              <FaHeart className="md:text-xl" />
            ) : (
              <IoHeartOutline className="md:text-2xl" />
            )}
          </button >
          <button  onClick={handleRemoveItemFromCart}>{isRemovingItemFromCart ? (<AiOutlineLoading3Quarters className="animate-spin md:text-xl" />) : (<FaRegTrashAlt className="text-[#63a5ea] md:text-xl cursor-pointer"/>)}</button>
          
          <div className="flex items-center justify-around gap-3 md:gap-5 border border-gray-500 w-fit px-3 rounded-lg ">
            <button
              className="text-lg md:text-xl font-bold text-[#63a5ea]"
              onClick={() => {
                if (newQuantity == undefined) return;
                if (newQuantity && newQuantity > 1) {
                  setNewQuantity((prevCount) => prevCount - 1);
                }
              }}
            >
              -
            </button>
            <h1 className="text-xs md:text-xl font-semibold">{newQuantity}</h1>

            <button
              className="text-lg md:text-xl font-bold text-[#63a5ea]"
              onClick={() => {
                if (
                  newProduct.product?.stock !== undefined &&
                  newQuantity < newProduct.product.stock
                ) {
                  setNewQuantity((prevCount) => prevCount + 1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
