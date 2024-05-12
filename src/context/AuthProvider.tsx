import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "../types";
import { getCurrentUserData } from "../lib/firebase/fireauthentication";

export const INITIAL_USER = {
  accountId: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
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
          username: currentAuthenticatedUser.username,
          imageUrl: currentAuthenticatedUser.imageUrl,
          email: currentAuthenticatedUser.email,
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
    console.log(user);
  }, [navigate]);

  const value = {
    user,
    isLoading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
