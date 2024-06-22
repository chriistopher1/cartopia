import React, { useState } from "react";
import ProductCard from "../../components/card/ProductCard";
import { useUserContext } from "../../context/AuthProvider";
import { useGetAllSellerProduct } from "../../lib/tanstack/queries";
import { FaRegChartBar, FaClipboardList, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SellerDashboard: React.FC = () => {
  const { user } = useUserContext();
  const { data: sellerProduct, isPending: isGettingSellerProduct } =
    useGetAllSellerProduct(user.seller.id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isGettingSellerProduct) return <div>Loading..</div>;

  const totalSales = sellerProduct.reduce(
    (acc, product) => acc + product.sold,
    0
  );
  const totalStock = sellerProduct.reduce(
    (acc, product) => acc + product.stock,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
        >
          {isMenuOpen ? (
            <span className="sr-only">Close menu</span>
          ) : (
            <span className="sr-only">Open menu</span>
          )}
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:block">
          {/* Menu content */}
          <div className="p-4 bg-white shadow-md rounded-lg">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Additional menu items */}
          </div>
        </nav>
      )}

      {/* Main content */}
      <h3 className="font-bold text-2xl md:text-3xl border-b-2 w-fit pb-2 border-black mb-6">
        Your Products
      </h3>

      <div className="flex flex-wrap gap-6 w-full mb-6">
        <div className="w-full sm:w-1/2 md:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <FaRegChartBar className="text-4xl text-blue-500" />
            <div>
              <h4 className="font-semibold text-lg">Total Sales</h4>
              <p className="text-2xl font-bold">{totalSales}</p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <FaClipboardList className="text-4xl text-green-500" />
            <div>
              <h4 className="font-semibold text-lg">Total Products</h4>
              <p className="text-2xl font-bold">{sellerProduct.length}</p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <FaClipboardList className="text-4xl text-red-500" />
            <div>
              <h4 className="font-semibold text-lg">Total Stock</h4>
              <p className="text-2xl font-bold">{totalStock}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h3 className="font-bold text-xl md:text-2xl">Manage Your Products</h3>
        <Link
          to="/seller/add-product"
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FaPlusCircle className="text-2xl mr-2" />
          Add New Product
        </Link>
      </div>

      <div className="flex flex-wrap gap-6 w-full">
        {sellerProduct &&
          sellerProduct.map((product) => (
            <ProductCard
              key={product?.id}
              category={product?.category}
              description={product?.description}
              imageUrl={product?.imageUrl}
              name={product?.name}
              price={product?.price}
              sold={product?.sold}
              stock={product?.stock}
              id={product?.id}
              sellerId={product?.sellerId}
              reviewId={product?.reviewId}
            />
          ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
