import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const iconCss = "text-2xl md:text-3xl"

const itemCss = "flex flex-col gap-2 grow"

const titleCss = "font-bold"

const Footer = () => {
  return (
    <footer className="bg-white px-8 py-12 sm:px-16 lg:px-56">

      <div className="flex justify-between border-b-2 pb-5">
        <h2 className="text-2xl md:text-3xl font-bold">Cartopia</h2>
        <div className="flex items-center gap-4 text-[#63a5ea]">
          <FaFacebook className={`${iconCss}`}/>
          <FaInstagram className={`${iconCss}`}/>
          <FaTwitter className={`${iconCss}`}/>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 md:gap-3 justify-evenly">
        <div className={`${itemCss}`} >
          <h2 className={`${titleCss}`}>Company Info</h2>
          <div>About Us</div>
          <div>Carrier</div>
          <div>We are hiring</div>
          <div>Blog</div>
        </div>
        <div className={`${itemCss}`} >
          <h2 className={`${titleCss}`}>Legal</h2>
          <div>About Us</div>
          <div>Carrier</div>
          <div>We are hiring</div>
          <div>Blog</div>
        </div>
        <div className={`${itemCss}`} >
          <h2 className={`${titleCss}`}>Features</h2>
          <div>Business Marketing</div>
          <div>User Analytic</div>
          <div>Live Chat</div>
          <div>Unlimited Support</div>
        </div>
        <div className={`${itemCss}`} >
          <h2 className={`${titleCss}`}>Resources</h2>
          <div>IOS & Android</div>
          <div>Watch a Demo</div>
          <div>Customers</div>
          <div>API</div>
        </div>
        <div className={`${itemCss}`} >
          <h2 className={`${titleCss}`}>Resources</h2>
          <div className="flex border-2 border-[#a1a1a1]">
          <input type="text" className="w-full border-transparent focus:border-transparent focus:ring-0"></input>
          <div className="text-white bg-[#63a5ea] px-8 py-4">Subscribe</div>
          </div>
          
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
        
      </div>

    </footer>
  )
}

export default Footer