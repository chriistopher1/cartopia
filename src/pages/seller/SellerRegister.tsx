import React, { useState } from "react";
import { useSellerRegister } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../context/AuthProvider";

const SellerRegister = () => {
  const { user } = useUserContext();

  if (user.seller.id !== "") window.location.href = "/seller/dashboard";

  const { mutateAsync: register, isPending: isRegisteringSeller } = useSellerRegister();

  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    email: "",
    password: "",
    phoneNum: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    const registerStatus = await register({
      address: formData.address,
      shopName: formData.shopName,
      email: formData.email,
      password: formData.password,
      phoneNum: formData.phoneNum,
      uid: user.accountId,
    });

    if (registerStatus) {
      toast.success("Seller Registered", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        window.location.href = "/seller/dashboard";
      }, 600);
    } else {
      toast.error("Error on registering seller", {
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
    <div className="flex flex-col relative justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white border-2 border-gray-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Seller Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="shopName" className="block text-sm font-semibold mb-2 text-gray-700">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              placeholder="Enter your shop name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.shopName}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold mb-2 text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.address}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNum" className="block text-sm font-semibold mb-2 text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNum"
              name="phoneNum"
              placeholder="Enter your phone number"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.phoneNum}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center gap-5 justify-center ${
              isRegisteringSeller ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isRegisteringSeller}
          >
            <AiOutlineLoading3Quarters
              className={`${isRegisteringSeller ? "inline animate-spin" : "hidden"} mr-2`}
            />
            <span>Register</span>
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">
            Already have an account?{" "}
            <Link to="/seller/login" className="font-semibold underline text-blue-500">
              Click here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
