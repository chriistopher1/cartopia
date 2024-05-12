import { useEffect } from "react";
import { useUserContext } from "../../context/AuthProvider";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { checkAuthUser } = useUserContext();

  useEffect(() => {
    console.log("haloooo")
    checkAuthUser();
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
