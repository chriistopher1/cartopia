import { Link } from "react-router-dom";
import { IProduct } from "../../types";
import { FaStar } from "react-icons/fa6";
import { formatToIDR } from "../../constant";



const ProductCard = (product: IProduct) => {
  return (
    <Link
      className="flex flex-col items-center w-40 sm:w-44 md:w-52 lg:w-80 shadow-lg grow shadow-gray-500 cursor-pointer"
      to={`product/${product.id}`}
      state={{ product }}
    >
      <img src={product.imageUrl} className="w-full h-auto" />
      <div className="flex flex-col items-center p-5 sm:p-7 md:p-9 lg:p-12">
        <h2 className="font-bold text-xs sm:text-md md:text-lg">
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
            ({product.review})
          </span>
        </h3>
      </div>
    </Link>
  );
};

export default ProductCard;
