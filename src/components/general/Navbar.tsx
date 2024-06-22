import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaHeart, FaEnvelope } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import { useUserContext } from "../../context/AuthProvider";
import { IUser } from "../../types";
import { useSignOutAccount } from "../../lib/tanstack/queries";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchButton from "../button/SearchButton";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase/config";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]); // State to store messages
  const navigate = useNavigate();

  const { user } = useUserContext();
  const { mutateAsync: signOut, isPending } = useSignOutAccount();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (user?.accountId) {
      const q = query(collection(db, "chats_metadata"), where("participants", "array-contains", user.accountId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(msgs);
      });
      return () => unsubscribe();
    }
  }, [user?.accountId]);

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

  const handleChatClick = () => {
    navigate("/messages", { state: { messages, user } });
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex items-center justify-between p-4 lg:px-8">
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
        <div className={`hidden lg:flex lg:items-center lg:space-x-4`}>
          <Link to={"/"} className="text-lg font-semibold hover:text-[#63a5ea]">
            Home
          </Link>
          <Link to={"/shop"} className="text-lg font-semibold hover:text-[#63a5ea]">
            Shop
          </Link>
          <Link to={"/about"} className="text-lg font-semibold hover:text-[#63a5ea]">
            About
          </Link>
          <Link to={"/user/order"} className="text-lg font-semibold hover:text-[#63a5ea]">
            Order
          </Link>
          <Link to={"/seller/dashboard"} className="text-lg font-semibold hover:text-[#63a5ea]">
            Seller
          </Link>
          <SearchButton />
          <Link to={"/cart"} className="flex items-center text-lg font-semibold hover:text-[#63a5ea]">
            <FaCartShopping />
          </Link>
          <Link to={"/saved"} className="flex items-center text-lg font-semibold hover:text-[#63a5ea]">
            <FaHeart />
          </Link>
          <div className="flex items-center text-lg font-semibold hover:text-[#63a5ea] cursor-pointer" onClick={handleChatClick}>
            <FaEnvelope />
          </div>
          <Link
            to={isHaveUser() ? "/profile" : "/login"}
            className="flex items-center text-lg font-semibold hover:text-[#63a5ea]"
          >
            <img
              src={currentUser?.imageUrl}
              className={`${isHaveUser() ? "" : "hidden"} w-8 h-8 rounded-2xl`}
            />
            <span className={`${isHaveUser() ? "" : "hidden"} ml-2`}>
              {currentUser?.name}
            </span>
            <FaUser className={`${isHaveUser() ? "hidden" : "ml-2"}`} />
            <span className={`${isHaveUser() ? "hidden" : "ml-2"}`}>
              Login/Register
            </span>
          </Link>
          {isHaveUser() && (
            <button className="text-lg font-semibold hover:text-[#63a5ea]" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
          {isPending && (
            <AiOutlineLoading3Quarters className="inline animate-spin text-xl lg:ml-2" />
          )}
        </div>
      </div>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:hidden flex flex-col items-start pl-4 pr-4 space-y-4 mt-4`}
      >
        <Link to={"/"} className="text-lg font-semibold hover:text-[#63a5ea]">
          Home
        </Link>
        <Link to={"/shop"} className="text-lg font-semibold hover:text-[#63a5ea]">
          Shop
        </Link>
        <Link to={"/about"} className="text-lg font-semibold hover:text-[#63a5ea]">
          About
        </Link>
        <Link to={"/user/order"} className="text-lg font-semibold hover:text-[#63a5ea]">
          Order
        </Link>
        <Link to={"/seller/dashboard"} className="text-lg font-semibold hover:text-[#63a5ea]">
          Seller
        </Link>
        <SearchButton />
        <Link to={"/cart"} className="flex items-center text-lg font-semibold hover:text-[#63a5ea]">
          <FaCartShopping />
        </Link>
        <Link to={"/saved"} className="flex items-center text-lg font-semibold hover:text-[#63a5ea]">
          <FaHeart />
        </Link>
        <div className="flex items-center text-lg font-semibold hover:text-[#63a5ea] cursor-pointer" onClick={handleChatClick}>
          <FaEnvelope />
        </div>
        <Link
          to={isHaveUser() ? "/profile" : "/login"}
          className="flex items-center text-lg font-semibold hover:text-[#63a5ea]"
        >
          <img
            src={currentUser?.imageUrl}
            className={`${isHaveUser() ? "" : "hidden"} w-8 h-8 rounded-2xl`}
          />
          <span className={`${isHaveUser() ? "" : "hidden"} ml-2`}>
            {currentUser?.name}
          </span>
          <FaUser className={`${isHaveUser() ? "hidden" : "ml-2"}`} />
          <span className={`${isHaveUser() ? "hidden" : "ml-2"}`}>
            Login/Register
          </span>
        </Link>
        {isHaveUser() && (
          <button className="text-lg font-semibold hover:text-[#63a5ea]" onClick={handleSignOut}>
            Sign Out
          </button>
        )}
        {isPending && (
          <AiOutlineLoading3Quarters className="inline animate-spin text-xl lg:ml-2" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
