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
    <div className="flex">
      <div className={`w-64 bg-gray-800 h-screen ${isMenuOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"} transform fixed top-0 left-0 overflow-y-auto transition-transform duration-300 z-30`}>
        {/* Sidebar content */}
        <button onClick={() => setIsMenuOpen(false)}>Close</button>
      </div>

      <div className={`flex-1 ${isMenuOpen ? "ml-64" : ""}`}>
        {/* Main content */}
        <div className="container mx-auto p-6">
          <h3 className="font-bold text-2xl md:text-3xl border-b-2 w-fit pb-2 border-black mb-6">
            Your Products
          </h3>
          {/* Remaining content */}
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
      </div>
    </div>
  );
};

export default SellerDashboard;
