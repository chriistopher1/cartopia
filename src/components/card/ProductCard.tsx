import { Link, useLocation } from "react-router-dom";
import { IProduct } from "../../types";
import { FaStar } from "react-icons/fa6";
import { formatToIDR } from "../../constant";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteProduct } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const ProductCard = (product: IProduct) => {
  const location = useLocation();
  const [isOnDeletePage, setIsOnDeletePage] = useState<boolean>(false);

  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } =
    useDeleteProduct();

  useEffect(() => {
    if (location.pathname === "/seller/delete-product") {
      setIsOnDeletePage(true);
    }
  }, [location.pathname]);

  const handleDeleteProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const isDeleted = await deleteProduct(product);

    if (isDeleted) {
      toast.success("Success on deleting product");
      window.location.href = "/seller/dashboard"
    } else {
      toast.error("Failed on deleting product");
    }
  };

  return (
    <Link
      className="flex flex-col items-center w-44 sm:w-44 md:w-60 lg:w-72 shadow-lg shadow-gray-500 cursor-pointer"
      to={`/product/${product.id}`}
      state={{ product }}
    >
      <img src={product.imageUrl} className="w-full h-auto" />
      <div className="flex flex-col items-center p-5 sm:p-7 md:p-9 lg:p-12">
        <h2 className="font-bold text-xs sm:text-md md:text-lg truncate">
          {product.name}
        </h2>
        <h3 className="font-semibold text-xs sm:text-md md:text-lg">
          {formatToIDR(product.price)}
        </h3>
        <h3 className="text-gray-700 flex items-center sm:text-md md:text-lg">
          <FaStar className="text-yellow-400 text-xs sm:text-md md:text-lg" />
          <FaStar className="text-yellow-400 text-xs sm:text-md md:text-lg" />
          <FaStar className="text-yellow-400 text-xs sm:text-md md:text-lg" />
          <FaStar className="text-yellow-400 text-xs sm:text-md md:text-lg" />
          <FaStar className="text-yellow-400 text-xs sm:text-md md:text-lg" />
          <span className="text-xs sm:text-md md:text-lg">
            ({product.sold})
          </span>
          {isDeletingProduct ? (
            <AiOutlineLoading3Quarters
              className={`${
                isDeletingProduct ? "inline animate-spin" : "hidden"
              } ml-2`}
            />
          ) : (
            <button
              className={`text-xl md:text-2xl ml-2 hover:text-red-500 ${
                isOnDeletePage ? "" : "hidden"
              } cursor-pointer`}
              onClick={handleDeleteProduct}
            >
              <FaRegTrashAlt />
            </button>
          )}
        </h3>
      </div>
    </Link>
  );
};

export default ProductCard;
