import { useMutation, useQuery } from "@tanstack/react-query";
import { IProductCart, IUser } from "../../types";
import {
  registerAccount,
  signInAccount,
  signOutAccount,
} from "../firebase/fireauthentication";
import { QUERY_KEYS } from "./queryKeys";
import { getCategoryAsset } from "../firebase/firestorage";
import { addItemToCart, addItemToSaved, getAllProduct, getUserCartList, getUserDataByUid, getUserSavedList } from "../firebase/firestore";

//User
export const useSignUpAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string, name: string, phone: string }) =>
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

export const useGetUserCartList = (uid: string | undefined ) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_CART_LIST, uid],
    queryFn: () => getUserCartList(uid),
  });
};

export const useGetUserSavedList = (uid: string | undefined ) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SAVED_LIST, uid],
    queryFn: () => getUserSavedList(uid),
  });
};


// Asset
export const useGetCategoryAsset = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORY_ASSET],
    queryFn: getCategoryAsset,
  });
};

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCT],
    queryFn: getAllProduct,
  });
};


// Cart
export const useAddItemToCart = () => {
  return useMutation({
    mutationFn: (newInstance : {newProduct : IProductCart, uid:string | undefined}) =>
      addItemToCart(newInstance),
  });
};

//Saved
export const useAddItemToSaved = () => {
  return useMutation({
    mutationFn: (newInstance : {newProduct : IProductCart, uid:string | undefined}) =>
      addItemToSaved(newInstance),
  });
};