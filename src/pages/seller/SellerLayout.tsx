
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SellerLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default SellerLayout;
