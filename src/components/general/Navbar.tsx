import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const mobileViewCss = "w-full py-2 rounded-md text-center hover:text-white hover:bg-[#63a5ea] font-semibold";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-around max-lg:justify-between p-4">
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
          <IoMenu className="text-4xl"/>
        </button>
        <div id="navbar-default" className="hidden flex flex-col gap-2 py-5 items-center w-full lg:hidden">
          <Link to={""} className={`${mobileViewCss}`}>Home</Link>
          <Link to={""} className={`${mobileViewCss}`}>Shop</Link>
          <Link to={""} className={`${mobileViewCss}`}>About</Link>
          <Link to={""} className={`${mobileViewCss}`}>Blog</Link>
          <Link to={""} className={`${mobileViewCss}`}>Contact</Link>
          <Link to={""} className={`${mobileViewCss}`}>Pages</Link>
          <Link to={""} className={`flex justify-center items-center gap-2 ${mobileViewCss} `}>
            <FaUser />
            <span>Login/Register</span>
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
        </div>
        <div className="max-lg:hidden lg:flex gap-5">
          <Link to={""} className="font-semibold">Home</Link>
          <Link to={""} className="font-semibold">Shop</Link>
          <Link to={""} className="font-semibold">About</Link>
          <Link to={""} className="font-semibold">Blog</Link>
          <Link to={""} className="font-semibold">Contact</Link>
          <Link to={""} className="font-semibold">Pages</Link>
        </div>
        <div className="max-lg:hidden lg:flex items-center gap-5">
          <Link to={""} className="flex items-center gap-2 text-[#63a5ea]">
            <FaUser />
            <span>Login/Register</span>
          </Link>
          <Link to={""} className="text-[#63a5ea]">
            <FaSearch />
          </Link>
          <Link to={""} className="text-[#63a5ea]">
            <FaCartShopping />
          </Link>
          <Link to={""} className="text-[#63a5ea]">
            <FaHeart />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
