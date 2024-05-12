import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { useUserContext } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import { IUser } from "../../types";
import { useSignOutAccount } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const mobileViewCss =
  "w-full py-2 rounded-md text-center hover:text-white hover:bg-[#63a5ea] font-semibold text-xl";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const { user } = useUserContext();

  const navigate = useNavigate();

  const { mutateAsync: signOut, isPending } = useSignOutAccount();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const isHaveUser = () => (currentUser?.accountId != "" ? true : false);

  const handleSignOut = () => {
    signOut();
    setTimeout(() => {
      window.location.href = "/login"
    }, 500);
  };



  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-around max-lg:justify-between p-4 py-8">
        <Link to={"/"}>
          <span className="self-center text-xl lg:text-3xl font-bold whitespace-nowrap dark:text-white">
            Cartopia
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <IoMenu className="text-4xl" />
        </button>
        <div
          id="navbar-default"
          className="hidden flex flex-col gap-2 py-5 items-center w-full lg:hidden"
        >
          <Link to={""} className={`${mobileViewCss}`}>
            Home
          </Link>
          <Link to={""} className={`${mobileViewCss}`}>
            Shop
          </Link>
          <Link to={"/about"} className={`${mobileViewCss}`}>
            About
          </Link>
          <Link to={""} className={`${mobileViewCss}`}>
            Blog
          </Link>
          <Link to={""} className={`${mobileViewCss}`}>
            Contact
          </Link>
          <Link to={""} className={`${mobileViewCss}`}>
            Pages
          </Link>
          <Link
            to={"/login"}
            className={`flex justify-center items-center gap-2 ${mobileViewCss} `}
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
          <Link to={""} className={`flex justify-center ${mobileViewCss}`}>
            <FaSearch />
          </Link>
          <Link to={""} className={`flex justify-center ${mobileViewCss}`}>
            <FaCartShopping />
          </Link>
          <Link to={""} className={`flex justify-center ${mobileViewCss}`}>
            <FaHeart />
          </Link>
          <button
            className={`${mobileViewCss} ${isHaveUser() ? "" : "hidden"}`}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <AiOutlineLoading3Quarters
            className={`${isPending ? "inline animate-spin" : "hidden"} mr-2`}
          />
        </div>
        <div className="max-lg:hidden lg:flex gap-5">
          <Link to={""} className="font-semibold text-lg">
            Home
          </Link>
          <Link to={""} className="font-semibold text-lg">
            Shop
          </Link>
          <Link to={"/about"} className="font-semibold text-lg">
            About
          </Link>
          <Link to={""} className="font-semibold text-lg">
            Blog
          </Link>
          <Link to={""} className="font-semibold text-lg">
            Contact
          </Link>
          <Link to={""} className="font-semibold text-lg">
            Pages
          </Link>
        </div>
        <div className="max-lg:hidden lg:flex items-center gap-5">
          <Link
            to={"/login"}
            className="flex items-center gap-2 text-[#63a5ea]"
          >
            <img
              src={currentUser?.imageUrl}
              className={`${isHaveUser() ? "" : "hidden"} w-8 h-8`}
            />
            <span className={`${isHaveUser() ? "" : "hidden"}`}>
              {currentUser?.name}
            </span>
            <FaUser className={`${isHaveUser() ? "hidden" : ""}`} />
            <span className={`${isHaveUser() ? "hidden" : ""}`}>
              Login/Register
            </span>
          </Link>
          <Link to={""} className="text-[#63a5ea]">
            <FaSearch className="text-xl" />
          </Link>
          <Link to={""} className="text-[#63a5ea]">
            <FaCartShopping className="text-xl" />
          </Link>
          <Link to={""} className="text-[#63a5ea]">
            <FaHeart className="text-xl" />
          </Link>
          <button
            className={`text-[#63a5ea] ${isHaveUser() ? "" : "hidden"}`}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <AiOutlineLoading3Quarters
            className={`${isPending ? "inline animate-spin" : "hidden"} mr-2`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
