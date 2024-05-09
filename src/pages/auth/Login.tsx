import React, { useEffect, useState } from "react";
import {
  useSignInAccount,
  useSignOutAccount,
} from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  getCurrentUserData,
} from "../../lib/firebase/fireauthentication";

const Login = () => {
  const { mutateAsync, isPending } = useSignInAccount();

  const { mutateAsync: mutateLogout, isPending: pendingLogout } =
    useSignOutAccount();

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

  const handleSignOut = async () => {
    try {
      await mutateLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const checkUser = await mutateAsync(formData);

      if (checkUser == null) {
        console.log("Error");
        return;
      }

      console.log("Sign-in successful!");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Login;
