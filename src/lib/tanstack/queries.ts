import { useMutation, useQuery } from "@tanstack/react-query";
import { IUser } from "../../types";
import {
  registerAccount,
  signInAccount,
  signOutAccount,
} from "../firebase/fireauthentication";
import { QUERY_KEYS } from "./queryKeys";
import { getInitialAsset } from "../firebase/firestorage";
import { getUserDataByUid } from "../firebase/firestore";

//User
export const useSignUpAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string, name: string, username: string }) =>
      registerAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  });
};

export const useGetUserDataByUid = (uid: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_DATA_BY_UID, uid],
    queryFn: () => getUserDataByUid(uid),
    enabled: !!uid,
  });
};

//Initial Asset
export const useGetInitialAsset = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_INITIAL_ASSET],
    queryFn: getInitialAsset,
  });
};
