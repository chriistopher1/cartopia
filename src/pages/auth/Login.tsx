import React, { useState } from "react";
import { useSignInAccount } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { mutateAsync, isPending } = useSignInAccount();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (formData.email === "" || formData.password === "") {
      toast.error("All fields are required.");
      return;
    }

    try {
      const checkUser = await mutateAsync(formData);

      if (checkUser == null) {
        console.log("Error");
        toast.error("Invalid credentials.");
        return;
      }
      window.location.href = "/";
      console.log("Sign-in successful!");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col relative justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white border-2 border-gray-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.password}
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            <AiOutlineLoading3Quarters
              className={`${isPending ? "inline animate-spin" : "hidden"} mr-2`}
            />
            <span>Login</span>
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="font-semibold underline text-blue-500"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
