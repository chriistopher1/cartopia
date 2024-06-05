import React, { useState } from "react";
import ImageUploader from "../../components/seller/ImageUploader";
import { IProduct } from "../../types";
import { toast } from "react-toastify";
import { addNewProductImage } from "../../lib/firebase/firestorage";
import { useAddNewProduct } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUserContext } from "../../context/AuthProvider";
import { categories } from "../../constant";

const SellerAddProduct = () => {
  const { user, isLoading } = useUserContext();

  const [newProduct, setNewProduct] = useState({
    category: "",
    description: "",
    imageUrl: "",
    name: "",
    price: 0,
    stock: 0,
    sellerId: "",
  });

  const { mutateAsync: addNewProduct, isPending: isAddingNewProduct } =
    useAddNewProduct();

  const handleImageUpload = (imageUrl: string) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      imageUrl: imageUrl,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newProduct);

    if (user.seller.id) {
      newProduct.sellerId = user.seller.id;
    } else {
      toast.error("Seller info is missing.");
    }

    if (newProduct.imageUrl == "") {
      toast.error("Image is either empty or not yet cropped");
      return;
    }

    if (
      newProduct.category == "" ||
      newProduct.description == "" ||
      newProduct.imageUrl == "" ||
      newProduct.name == "" ||
      newProduct.price == 0 ||
      newProduct.stock == 0 ||
      newProduct.sellerId == ""
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (newProduct.stock < 1) {
      toast.error("Product stock must be atleast 1");
      return;
    }
    if (newProduct.price < 1) {
      toast.error("Product price must be atleast 1");
      return;
    }

    const newProductIsAdded = await addNewProduct(newProduct);

    if (newProductIsAdded) {
      toast.success("Successfull on adding new product");
      setTimeout(() => {
        window.location.href = "/seller/dashboard";
      }, 600);
    } else {
      toast.error("Error on adding new product");
    }
  };

  if (isLoading) return <div>Loading..</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.userInterface}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <ImageUploader onImageUpload={handleImageUpload} />
        <button
          type="submit"
          className={`mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 ${
            isAddingNewProduct ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isAddingNewProduct}
        >
          <AiOutlineLoading3Quarters
            className={`${
              isAddingNewProduct ? "inline animate-spin" : "hidden"
            } mr-2`}
          />
          <span>Add Product</span>
        </button>
      </form>
    </div>
  );
};

export default SellerAddProduct;
