// src/pages/layout/SellerLayout.js
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthProvider";
import SideBar from "../../components/seller/SideBar";
import { useEffect } from "react";
import Navbar from "../../components/general/Navbar";
import Footer from "../../components/general/Footer";

const SellerLayout = () => {
  const navigate = useNavigate();
  const { user, isLoading, checkAuthUser } = useUserContext();

  useEffect(() => {
    const checkCurrentUser = async () => {
      const checkUser = await checkAuthUser();
      if (!checkUser) navigate("/login");
    };

    checkCurrentUser();
  }, [checkAuthUser, navigate]);

  useEffect(() => {
    if (!isLoading && user && user.seller.id === "") {
      navigate("/seller/register");
    }
  }, [isLoading, user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 ml-64 p-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SellerLayout;
