import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaStar, FaComments } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { useUserContext } from "../../context/AuthProvider";
import {
  useAddItemToCart,
  useAddItemToSaved,
  useGetUserCartList,
  useGetUserInfoFromSellerId,
  useGetUserSavedList,
} from "../../lib/tanstack/queries";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Review from "../../components/product/Review";
import Modal from "../../components/product/Modal";
import { IProduct } from "../../types";
import { checkIfItemInTheList, formatToIDR } from "../../constant";

const Product = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product as IProduct;

  const [open, setOpen] = useState<boolean>(false);
  const [newQuantity, setNewQuantity] = useState<number>(1);
  const [isAddedToCartList, setIsAddedToCartList] = useState<boolean>(false);
  const [isAddedToSavedList, setIsAddedToSavedList] = useState<boolean>(false);

  const { mutateAsync: addItemToCart, isPending: isAddingItemToCart } =
    useAddItemToCart();
  const { mutateAsync: addItemToSaved, isPending: isAddingItemToSaved } =
    useAddItemToSaved();

  const { data: userCartList, isPending: isGettingUserCartList } =
    useGetUserCartList(user.accountId);
  const { data: userSavedList, isPending: isGettingUserSavedList } =
    useGetUserSavedList(user.accountId);

  const { data: sellerInfo, isPending: isGettingSellerInfo } =
    useGetUserInfoFromSellerId(product.sellerId);

  useEffect(() => {
    if (!product || id !== product.id) {
      navigate(-1);
    }
  }, [product, id, navigate]);

  useEffect(() => {
    if (userCartList) {
      const checkItem = checkIfItemInTheList(product, userCartList.item);
      setIsAddedToCartList(checkItem);
    }
  }, [userCartList, product]);

  useEffect(() => {
    if (userSavedList) {
      const checkItem = checkIfItemInTheList(product, userSavedList.item);
      setIsAddedToSavedList(checkItem);
    }
  }, [userSavedList, product]);

  if (isGettingUserCartList || isGettingUserSavedList || isGettingSellerInfo)
    return <div>Loading...</div>;

  const handleAddItemToCart = async () => {
    if (!user.accountId) {
      window.location.href = "/login";
      return;
    }

    if (isAddedToCartList) {
      toast.error("Item is already in cart", {
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

    const isAddedToCart = await addItemToCart({
      newProduct: {
        product: product,
        quantity: newQuantity,
      },
      uid: user.accountId,
    });

    if (isAddedToCart) {
      toast.success("Success on adding item to cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsAddedToCartList(true);
    } else {
      toast.error("Error on adding item to cart", {
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

  const handleAddItemToSaved = async () => {
    if (!user.accountId) {
      window.location.href = "/login";
      return;
    }

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
        product: product,
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

  const handleBuyNow = () => {
    if (!user.accountId) {
      window.location.href = "/login";
      return;
    }

    if (!user.address) {
      toast.error("Your address is empty, please set it up first at profile");
      return;
    }

    navigate("/checkout", {
      state: {
        selectedProducts: [
          {
            product: product,
            quantity: newQuantity,
          },
        ],
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row max-md:px-10 max-md:py-5 md:gap-12 shadow-lg shadow-gray-400 mb-12 border border-black">
        <img
          src={product.imageUrl}
          className="w-full md:w-[35%] lg:w-[25%] h-auto md:h-[300px] object-cover"
          alt={product.name}
          style={{ objectFit: "contain" }}
        />

        <div className="flex flex-col gap-2 md:gap-6 py-10 md:py-16 md:w-1/2 lg:w-1/3">
          <h3 className="font-bold text-2xl md:text-4xl">{product.name}</h3>
          <h3 className="text-gray-700 flex items-center sm:text-md md:text-lg">
            <FaStar className="text-yellow-400 text-lg sm:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg sm:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg sm:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg sm:text-xl md:text-2xl" />
            <FaStar className="text-yellow-400 text-lg sm:text-xl md:text-2xl" />
            <span className="text-lg sm:text-xl md:text-2xl pl-2">
              ({product.sold})
            </span>
          </h3>
          <h4 className="font-semibold text-lg sm:text-xl md:text-2xl">
            {formatToIDR(product.price)}
          </h4>
          <p className="border-b-2 border-gray-600 pb-5 mb-5">
            {product.description}
          </p>
          <div className="flex gap-5 items-center">
            <div className="flex items-center justify-around gap-5 border border-gray-500 w-fit px-3 rounded-lg max-md:mb-4">
              <button
                className="text-xl font-bold text-[#63a5ea]"
                onClick={() => {
                  if (newQuantity > 1) {
                    setNewQuantity((prevCount) => prevCount - 1);
                  }
                }}
              >
                -
              </button>
              <h1 className="text-xl font-semibold">{newQuantity}</h1>

              <button
                className="text-xl font-bold text-[#63a5ea]"
                onClick={() => {
                  if (
                    product.stock !== undefined &&
                    newQuantity < product.stock
                  ) {
                    setNewQuantity((prevCount) => prevCount + 1);
                  }
                }}
              >
                +
              </button>
            </div>
            <span className="font-bold">
              Stock : <h5 className="inline text-red-500">{product.stock}</h5>
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <button
              className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button className="text-[#63a5ea]" onClick={handleAddItemToCart}>
              {isAddingItemToCart ? (
                <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
              ) : isAddedToCartList ? (
                <FaCartShopping className="text-3xl" />
              ) : (
                <IoCartOutline className="text-3xl" />
              )}
            </button>
            <button className="text-[#63a5ea]" onClick={handleAddItemToSaved}>
              {isAddingItemToSaved ? (
                <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
              ) : isAddedToSavedList ? (
                <FaHeart className="text-3xl" />
              ) : (
                <IoHeartOutline className="text-3xl" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={sellerInfo?.imageUrl}
              className="w-8 h-8 rounded-md"
              alt="Seller"
            />
            <Link
              to={`/seller/${product.sellerId}`}
              className="hover:underline font-semibold cursor-pointer"
            >
              {sellerInfo?.seller.name}
            </Link>
            <Link
              to={`/chat/${product.id}/${user.accountId}`}
              state={{ seller: sellerInfo, product: product }}
              className="text-[#63a5ea] hover:underline flex items-center gap-2"
            >
              <FaComments className="text-xl" />
              <span>Message</span>
            </Link>
          </div>
        </div>
      </div>
      <Review productId={product.id} />
    </div>
  );
};

export default Product;
