import React, { useEffect, useState } from "react";
import { useSignUpAccount, useSignInAccount } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const { mutateAsync: signUp, isPending: isLoadingSignUp } =
    useSignUpAccount();

  const { mutateAsync: signIn, isPending: isLoadingSignIn } =
    useSignInAccount();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
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
    try {
      const signUpNewUser = signUp(formData);

      if (signUpNewUser == null) {
        toast.error("Register error, please try again.");
        return;
      }

      // const checkUser = signIn({
      //   email: formData.email,
      //   password: formData.password,
      // });

      // if (checkUser == null) {
      //   console.log("Error");
      //   toast.error("Invalid credentials.");
      //   return;
      // }
      navigate("/login");

      console.log("Sign-in successful!");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col relative justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.password}
              autoComplete="off"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center gap-5 justify-center ${
              isLoadingSignIn || isLoadingSignUp
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isLoadingSignIn || isLoadingSignUp}
          >
            <AiOutlineLoading3Quarters
              className={`${
                isLoadingSignIn || isLoadingSignUp
                  ? "inline animate-spin"
                  : "hidden"
              } mr-2`}
            />
            <span>Register</span>
          </button>
        </form>
        <span>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold underline text-[#63a5ea]"
          >
            Click here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
