import { Outlet } from "react-router-dom";
import Footer from "../../components/general/Footer";
import Navbar from "../../components/general/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default RootLayout;
