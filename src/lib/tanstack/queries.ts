import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IProductCart, IUser } from "../../types";
import {
  registerAccount,
  signInAccount,
  signOutAccount,
} from "../firebase/fireauthentication";
import { QUERY_KEYS } from "./queryKeys";
import { getCategoryAsset } from "../firebase/firestorage";
import {
  addItemToCart,
  addItemToSaved,
  findRelatedProduct,
  getAllProduct,
  getProductReview,
  getUserCartList,
  getUserDataByUid,
  getUserSavedList,
  removeItemFromCart,
  removeItemFromSaved,
} from "../firebase/firestore";



//User
export const useSignUpAccount = () => {
  return useMutation({
    mutationFn: (user: {
      email: string;
      password: string;
      name: string;
      phone: string;
    }) => registerAccount(user),
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

export const useGetUserCartList = (uid: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_CART_LIST, uid],
    queryFn: () => getUserCartList(uid),
  });
};

export const useGetUserSavedList = (uid: string | undefined) => {
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
    mutationFn: (newInstance: {
      newProduct: IProductCart;
      uid: string | undefined;
    }) => addItemToCart(newInstance),
  });
};

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newInstance: {
      uid: string | undefined;
      idToBeDeleted: string | undefined;
    }) => removeItemFromCart(newInstance.uid, newInstance.idToBeDeleted),
    onSuccess: () => {
      // Invalidate the cart list query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_CART_LIST],
      });
    },
  });
};

//Saved
export const useAddItemToSaved = () => {
  return useMutation({
    mutationFn: (newInstance: {
      newProduct: IProductCart;
      uid: string | undefined;
    }) => addItemToSaved(newInstance),
  });
};

export const useRemoveItemFromSaved = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newInstance: {
      uid: string | undefined;
      idToBeDeleted: string | undefined;
    }) => removeItemFromSaved(newInstance.uid, newInstance.idToBeDeleted),
    onSuccess: () => {
      // Invalidate the cart list query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_SAVED_LIST],
      });
    },
  });
};

// Review
export const useGetProductReview = (productId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_REVIEW, productId],
    queryFn: () => getProductReview(productId),
  });
};

// Product
export const useFindRelatedProduct = (search: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FIND_RELATED_PRODUCT, search],
    queryFn: () => findRelatedProduct(search),
  });
};