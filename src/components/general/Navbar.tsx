import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import { useUserContext } from "../../context/AuthProvider";
import { IUser } from "../../types";
import { useSignOutAccount } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchButton from "../button/SearchButton";

const mobileViewCss =
  "w-full py-2 rounded-md text-center hover:text-white hover:bg-[#63a5ea] font-semibold text-xl lg:font-normal lg:text-lg lg:w-auto lg:px-3 lg:py-1";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useUserContext();
  const { mutateAsync: signOut, isPending } = useSignOutAccount();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const isHaveUser = () => (currentUser?.accountId !== "" ? true : false);

  const handleSignOut = () => {
    signOut();
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-between p-4 lg:px-8">
        <Link to={"/"}>
          <span className="self-center text-xl lg:text-3xl font-bold whitespace-nowrap dark:text-white">
            Cartopia
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          {menuOpen ? (
            <IoClose className="text-4xl" />
          ) : (
            <IoMenu className="text-4xl" />
          )}
        </button>
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col items-center justify-center lg:flex lg:flex-row lg:items-center lg:gap-5 w-full lg:w-auto mt-4 lg:mt-0 space-y-4 lg:space-y-0`}
        >
          <Link to={"/"} className={`${mobileViewCss}`}>
            Home
          </Link>
          <Link to={"/shop"} className={`${mobileViewCss}`}>
            Shop
          </Link>
          <Link to={"/about"} className={`${mobileViewCss}`}>
            About
          </Link>
          <Link to={"/blog"} className={`${mobileViewCss}`}>
            Blog
          </Link>
          <Link to={"/user/order"} className={`${mobileViewCss}`}>
            Order
          </Link>
          <Link to={"/seller/dashboard"} className={`${mobileViewCss}`}>
            Seller
          </Link>
          <Link
            to={isHaveUser() ? "/profile" : "/login"}
            className={`flex items-center gap-2 ${mobileViewCss}`}
          >
            <img
              src={currentUser?.imageUrl}
              className={`${isHaveUser() ? "" : "hidden"} w-8 h-8 rounded-2xl`}
            />
            <span className={`${isHaveUser() ? "" : "hidden"}`}>
              {currentUser?.name}
            </span>
            <FaUser className={`${isHaveUser() ? "hidden" : ""}`} />
            <span className={`${isHaveUser() ? "hidden" : ""}`}>
              Login/Register
            </span>
          </Link>
          <SearchButton className={`${mobileViewCss}`} />
          <Link to={"/cart"} className={`flex items-center ${mobileViewCss}`}>
            <FaCartShopping />
          </Link>
          <Link to={"/saved"} className={`flex items-center ${mobileViewCss}`}>
            <FaHeart />
          </Link>
          {isHaveUser() && (
            <button
              className={`${mobileViewCss}`}
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
          {isPending && (
            <AiOutlineLoading3Quarters className="inline animate-spin text-xl lg:ml-2" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
