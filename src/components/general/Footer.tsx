import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const iconCss = "text-2xl md:text-3xl";

const itemCss = "flex flex-col gap-2 grow";

const titleCss = "font-bold";

const Footer = () => {
  return (
    <footer className="bg-[#272b40] text-white px-8 py-12 sm:px-16 lg:px-56">
      <div className="flex justify-between items-center border-b-2 pb-5">
        <h2 className="text-lg md:text-3xl font-bold">
          Consulting Agency For Your Business
          <br /> <span className="font-normal text-sm md:text-xl">Lorem ipsum dolor sit amet.</span>
        </h2>
        <button className="px-5 md:px-10 py-2 h-fit text-white bg-[#63a5ea] rounded-lg font-bold text-xs md:text-xl lg:text-2xl">
          Contact Us
        </button>
      </div>

      <div className="flex flex-wrap gap-6 md:gap-3 justify-evenly mt-4">
        <div className={`${itemCss}`}>
          <h2 className={`${titleCss}`}>Company Info</h2>
          <Link to="/about">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className={`${itemCss}`}>
          <h2 className={`${titleCss}`}>Legal</h2>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div className={`${itemCss}`}>
          <h2 className={`${titleCss}`}>Features</h2>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
        <div className={`${itemCss}`}>
          <h2 className={`${titleCss}`}>Resources</h2>
          <Link to="/help">Help Center</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/support">Support</Link>
        </div>
        <div className={`${itemCss}`}>
          <h2 className={`${titleCss}`}>Get In Touch</h2>
          <div className="flex items-center gap-2">
            <IoCall className={`${iconCss}`} />
            +62 1234 5678
          </div>
          <div className="flex items-center gap-2">
            <IoLocation className={`${iconCss}`} />
            Jakarta Raya
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className={`${iconCss}`} />
            cartopia@gmail.com
          </div>
          <div className="flex gap-2 mt-2">
            <FaFacebook className={`${iconCss}`} />
            <FaInstagram className={`${iconCss}`} />
            <FaTwitter className={`${iconCss}`} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
