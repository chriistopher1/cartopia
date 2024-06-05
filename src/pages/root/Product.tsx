import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../types";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { checkIfItemInTheList, formatToIDR } from "../../constant";
import { FaCartShopping } from "react-icons/fa6";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { useUserContext } from "../../context/AuthProvider";
import {
  useAddItemToCart,
  useAddItemToOrder,
  useAddItemToSaved,
  useGetUserCartList,
  useGetUserSavedList,
} from "../../lib/tanstack/queries";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Review from "../../components/product/Review";
import Modal from "../../components/product/Modal";

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

  const { mutateAsync: addItemToCart, isPending: isAddingItemToCart } = useAddItemToCart();
  const { mutateAsync: addItemToSaved, isPending: isAddingItemToSaved } = useAddItemToSaved();
  const { mutateAsync: addItemToOrder, isPending: isAddingItemToOrder } = useAddItemToOrder();

  const { data: userCartList, isPending: isGettingUserCartList } = useGetUserCartList(user.accountId);
  const { data: userSavedList, isPending: isGettingUserSavedList } = useGetUserSavedList(user.accountId);

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

  if (isGettingUserCartList || isGettingUserSavedList) return <div className="flex justify-center items-center h-screen">Loading...</div>;

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

  const handleAddItemToOrder = async () => {
    if (!user.accountId) {
      window.location.href = "/login";
      return;
    }

    if (!user.address) {
      toast.error("Your address is empty, please set it up first at profile");
      return;
    }

    const isAddedToOrder = await addItemToOrder({
      addressTo: user.address,
      newProduct: {
        product: product,
        quantity: newQuantity,
      },
      sellerId: product.sellerId,
      uid: user.accountId,
    });

    if (isAddedToOrder) {
      toast.success("Success on adding item to order", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/user/order");
    } else {
      toast.error("Error on adding item to order", {
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 shadow-lg shadow-gray-400 mb-12 border border-gray-200 p-6 rounded-lg">
        <img src={product.imageUrl} className="w-full h-auto object-cover rounded-lg" />
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-3xl">{product.name}</h3>
          <div className="flex items-center text-yellow-400 text-lg">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="mr-1" />
            ))}
            <span className="text-lg text-gray-700 pl-2">({product.sold})</span>
          </div>
          <h4 className="font-semibold text-xl text-blue-600">{formatToIDR(product.price)}</h4>
          <p className="text-gray-700 mb-2"><strong>Store:</strong> {product.storeName}</p>
          <p className="border-b-2 border-gray-600 pb-5 mb-5 text-gray-700">{product.description}</p>
          <div className="flex gap-5 items-center mb-5">
            <div className="flex items-center gap-5 border border-gray-500 px-3 rounded-lg">
              <button
                className="text-xl font-bold text-blue-500"
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
                className="text-xl font-bold text-blue-500"
                onClick={() => {
                  if (product.stock !== undefined && newQuantity < product.stock) {
                    setNewQuantity((prevCount) => prevCount + 1);
                  }
                }}
              >
                +
              </button>
            </div>
            <span className="font-bold text-gray-700">
              Stock: <span className="text-red-500">{product.stock}</span>
            </span>
          </div>
          <div className="flex gap-3 items-center mb-5">
            <button
              className="border border-neutral-300 rounded-lg py-2 px-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              onClick={() => setOpen(true)}
            >
              Buy Now
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold">Place Order Confirmation</h1>
                <div className="flex gap-5 items-center">
                  <img src={product.imageUrl} className="w-1/3 rounded-lg" />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <h3 className="font-semibold text-lg">
                      Quantity: <span className="text-red-500">{newQuantity}</span>
                    </h3>
                    <h3 className="font-bold text-lg text-red-500">
                      {product.price && formatToIDR(product.price * newQuantity)}
                    </h3>
                    <div className="flex gap-4">
                      <button
                        className={`border border-neutral-300 rounded-lg py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold ${isAddingItemToOrder ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => setOpen(false)}
                        disabled={isAddingItemToOrder}
                      >
                        Exit
                      </button>
                      <button
                        className={`border border-neutral-300 rounded-lg py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold ${isAddingItemToOrder ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={handleAddItemToOrder}
                        disabled={isAddingItemToOrder}
                      >
                        <AiOutlineLoading3Quarters
                          className={`${isAddingItemToOrder ? "inline animate-spin" : "hidden"} mr-2`}
                        />
                        <span className={`${isAddingItemToOrder ? "hidden" : ""}`}>Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            <button className="text-blue-500" onClick={handleAddItemToCart}>
              {isAddingItemToCart ? (
                <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
              ) : isAddedToCartList ? (
                <FaCartShopping className="text-3xl" />
              ) : (
                <IoCartOutline className="text-3xl" />
              )}
            </button>
            <button className="text-blue-500" onClick={handleAddItemToSaved}>
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
      <Review productId={product.id} />
    </div>
  );
};

export default Product;
