import { Outlet } from "react-router-dom";
import { useUserContext } from "../../context/AuthProvider";
import { useEffect } from "react";

const AuthLayout = () => {
  const { user } = useUserContext();

  useEffect(() => {
    if (user.accountId != "") {
      window.location.href = "/"
    }
  }, [user]);

  return (
    <>
      <Outlet/>
    </>
  );
};

export default AuthLayout;
