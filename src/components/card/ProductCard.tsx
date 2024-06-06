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
      window.location.href = "/seller/dashboard";
    } else {
      toast.error("Failed on deleting product");
    }
  };

  return (
    <Link
      className="flex flex-col items-center w-full max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
      to={`/product/${product.id}`}
      state={{ product }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="flex flex-col items-center p-4">
        <h2 className="font-bold text-md truncate">{product.name}</h2>
        <h3 className="font-semibold text-md">{formatToIDR(product.price)}</h3>
        <div className="flex items-center text-gray-700">
          {product.sold == 0 ? (<> <FaStar className="text-gray-400 text-md" />
          <FaStar className="text-gray-400 text-md" />
          <FaStar className="text-gray-400 text-md" />
          <FaStar className="text-gray-400 text-md" />
          <FaStar className="text-gray-400 text-md" /></>):(<> <FaStar className="text-yellow-400 text-md" />
          <FaStar className="text-yellow-400 text-md" />
          <FaStar className="text-yellow-400 text-md" />
          <FaStar className="text-yellow-400 text-md" />
          <FaStar className="text-yellow-400 text-md" /></>)}
         
          <span className="ml-2 text-md">({product.sold})</span>
          {isDeletingProduct ? (
            <AiOutlineLoading3Quarters
              className={`ml-2 ${
                isDeletingProduct ? "inline animate-spin" : "hidden"
              }`}
            />
          ) : (
            <button
              className={`text-2xl ml-2 hover:text-red-500 ${
                isOnDeletePage ? "" : "hidden"
              }`}
              onClick={handleDeleteProduct}
            >
              <FaRegTrashAlt />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
