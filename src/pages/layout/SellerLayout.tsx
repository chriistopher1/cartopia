import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthProvider";
import SideBar from "../../components/seller/SideBar";
import { useEffect } from "react";

const SellerLayout = () => {
  const navigate = useNavigate();

  const { user, isLoading } = useUserContext();

  if (!isLoading && user && user.seller.id == "") navigate("/seller/register");

  return (
    <div className="my-10 mx-4 md:mx-20">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default SellerLayout;