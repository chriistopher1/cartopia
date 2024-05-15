import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IProduct, IProductCart } from "../../types";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { formatToIDR } from "../../constant";
import { FaCartShopping } from "react-icons/fa6";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { useUserContext } from "../../context/AuthProvider";
import {
  useAddItemToCart,
  useAddItemToSaved,
  useGetUserCartList,
  useGetUserSavedList,
} from "../../lib/tanstack/queries";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const checkIfItemInTheList = (
  currentProduct: IProduct,
  itemList: IProductCart[] | undefined
): boolean => {
  if (itemList == undefined) return false;
  for (let index = 0; index < itemList.length; index++) {
    const element = itemList[index];

    if (element.product?.id == currentProduct.id) return true;
  }

  return false;
};

const Product = () => {
  const navigate = useNavigate();

  const { user } = useUserContext();

  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product as IProduct;

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

  useEffect(() => {
    if (product == undefined || id != product.id) navigate(-1);
  }, []);

  useEffect(() => {
    if (userCartList != undefined) {
      const checkItem = checkIfItemInTheList(product, userCartList.item);

      setIsAddedToCartList(checkItem);
    }
  }, [userCartList]);

  useEffect(() => {
    if (userSavedList != undefined) {
      const checkItem = checkIfItemInTheList(product, userSavedList.item);

      setIsAddedToSavedList(checkItem);
    }
  }, [userSavedList]);

  if (isGettingUserCartList || isGettingUserSavedList)
    return <div>Loading..</div>;

  // console.log(isAddedToSavedList);

  // add item to cart
  const handleAddItemToCart = async () => {
    if (user.accountId == "") window.location.href = "/login";

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
      setIsAddedToSavedList(true);
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

  return (
    <div>
      <div className="flex flex-col md:flex-row max-md:px-10 max-md:py-5 md:gap-12 shadow-lg shadow-gray-400 mb-12 border border-black">
        <img
          src={product.imageUrl}
          className="w-full md:w-[35%] lg:w-[25%] h-auto object-cover"
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
              ({product.review})
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
            <span className="font-bold">Stock : <h5 className="inline text-red-500">{product.stock}</h5></span>
          </div>

          <div className="flex gap-3 items-center">
            <button className="text-lg sm:text-xl  bg-[#63a5ea] rounded-lg text-white py-2 px-8  font-bold">
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
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-5 md:gap-16 border-b mb-12 border-gray-500">
        <h4 className="font-semibold text-sm sm:text-lg md:text-xl text-gray-500">
          Description
        </h4>
        <h4 className="font-semibold text-sm sm:text-lg md:text-xl text-gray-500">
          Additional Information
        </h4>
        <h4 className="font-semibold text-sm sm:text-lg md:text-xl text-gray-500">
          Review ({product.review})
        </h4>
      </div>
    </div>
  );
};

export default Product;
