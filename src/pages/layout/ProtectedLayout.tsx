import { useEffect } from "react";
import { useUserContext } from "../../context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/general/Footer";
import Navbar from "../../components/general/Navbar";

const ProtectedLayout = () => {
  const { checkAuthUser, isLoading } = useUserContext();

  const navigate = useNavigate()

  useEffect(() => {

    const checkCurrentUser = async () => {

      const checkUser = await checkAuthUser();
  
      if(!checkUser) navigate("/login")

    }

    checkCurrentUser();

  }, []);

  return (
    <div>
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default ProtectedLayout;
