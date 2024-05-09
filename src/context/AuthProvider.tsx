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
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAuthenticatedUser = await getCurrentUserData();

      if (currentAuthenticatedUser == undefined) navigate("/login");

      console.log("authprovider : ", currentAuthenticatedUser);

      if (currentAuthenticatedUser) {
        setUser({
          accountId: currentAuthenticatedUser.accountId,
          name: currentAuthenticatedUser.name,
          username: currentAuthenticatedUser.username,
          imageUrl: currentAuthenticatedUser.imageUrl,
          email: currentAuthenticatedUser.email,
        });
        console.log("tolol : ", user);
        setIsAuthenticated(true);
        return true;
      }
      navigate("/login");
      return false;
    } catch (error) {
      console.log(error);
      navigate("/login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      const currentAuthenticatedUser = await getCurrentUserData();

      if (currentAuthenticatedUser != undefined) {
        setUser({
          accountId: currentAuthenticatedUser.accountId,
          name: currentAuthenticatedUser.name,
          username: currentAuthenticatedUser.username,
          imageUrl: currentAuthenticatedUser.imageUrl,
          email: currentAuthenticatedUser.email,
        });
      }
    };

    updateUser();

  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
