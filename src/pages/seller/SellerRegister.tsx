import React, { useState } from "react";
import {
  useSellerRegister,
  useSignInAccount,
} from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../context/AuthProvider";
import { register } from "module";

const SellerRegister = () => {
  const { user } = useUserContext();

  if (user.seller.id != "") window.location.href = "/seller/dashboard"

  const { mutateAsync: register, isPending: isRegisteringSeller } =
    useSellerRegister();

  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
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

    if(formData.address == "" || formData.shopName == "") {
      toast.error("All field must be filled.")
    }

    const registerStatus = await register({
      address: formData.address,
      shopName: formData.shopName,
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
        window.location.href = "/seller/dashboard"
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
    <div className="flex flex-col relative justify-center items-center h-screen">
      <div className="bg-gray-200 border-2 border-gray-400 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Seller Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="shopName"
              className="block text-sm font-semibold mb-1"
            >
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              placeholder="Enter your shop name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white"
              value={formData.shopName}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-semibold mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.address}
              autoComplete="off"
              onChange={handleInputChange}
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
              className={`${
                isRegisteringSeller ? "inline animate-spin" : "hidden"
              } mr-2`}
            />
            <span>Register</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;
