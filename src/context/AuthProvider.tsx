import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "../types";
import { getCurrentUserData } from "../lib/firebase/fireauthentication";

export const INITIAL_USER = {
  accountId: "",
  name: "",
  email: "",
  imageUrl: "",
  address: "",
  phone: "",
  seller:{
    id: "",
    name: "",
    address : ""
  },
  cart: "", 
  saved : "",
  order : ""
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser,
  isLoading: boolean,
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true)
    try {
      const currentAuthenticatedUser = await getCurrentUserData();

      // if (currentAuthenticatedUser == undefined) navigate("/login");

      console.log("authprovider : ", currentAuthenticatedUser);

      if (currentAuthenticatedUser) {
        setUser({
          accountId: currentAuthenticatedUser.accountId,
          name: currentAuthenticatedUser.name,
          imageUrl: currentAuthenticatedUser.imageUrl,
          email: currentAuthenticatedUser.email,
          address: currentAuthenticatedUser.address,
          phone: currentAuthenticatedUser.phone,
          seller:{
            id: currentAuthenticatedUser.seller.id,
            name: currentAuthenticatedUser.seller.name,
            address : currentAuthenticatedUser.seller.address
          },
          cart : currentAuthenticatedUser.cart,
          saved : currentAuthenticatedUser.saved,
          order : currentAuthenticatedUser.order
          
        });

        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    
    checkAuthUser()
    // console.log(user);
  }, [navigate]);

  const value = {
    user,
    isLoading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
