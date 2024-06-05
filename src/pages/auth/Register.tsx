import React, { useState } from "react";
import { useSignUpAccount } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../../types/user"; // Import the IUser interface

const Register = () => {
  const navigate = useNavigate();

  const { mutateAsync: signUp, isPending: isLoadingSignUp } = useSignUpAccount();

  const [formData, setFormData] = useState<Omit<IUser, "id">>({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: "/images/default-avatar.png", // Default image for new users
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10,13}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return password.length >= 8 && passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    // Validation
    if (
      formData.email === "" ||
      formData.name === "" ||
      formData.phone === "" ||
      formData.password === ""
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Phone number must be 10-13 digits long and only contain numbers.");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 8 characters long and include at least one symbol and one digit.");
      return;
    }

    // Sign up new user data
    try {
      const signUpNewUser = await signUp(formData);

      if (signUpNewUser == null) {
        toast.error("Register error, please try again.");
        return;
      }
      setTimeout(() => {
        toast.success("Login using your credential", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/login");
      }, 800);

      console.log("Sign-in successful!");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col relative justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white border-2 border-gray-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50"
              value={formData.phone}
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
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center gap-5 justify-center ${
              isLoadingSignUp ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoadingSignUp}
          >
            <AiOutlineLoading3Quarters
              className={`${isLoadingSignUp ? "inline animate-spin" : "hidden"} mr-2`}
            />
            <span>Register</span>
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold underline text-blue-500"
            >
              Click here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
