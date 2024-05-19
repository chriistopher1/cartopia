import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IProduct, IProductCart, IUser } from "../../types";
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
  addNewProduct,
  deleteProduct,
  findRelatedProduct,
  getAllProduct,
  getAllSellerProduct,
  getProductReview,
  getUserCartList,
  getUserDataByUid,
  getUserSavedList,
  removeItemFromCart,
  removeItemFromSaved,
  sellerRegister,
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

// Seller
export const useSellerRegister = () => {
  return useMutation({
    mutationFn: (newInstance: {
      shopName : string | undefined
      address: string | undefined;
      uid: string | undefined;
    }) => sellerRegister(newInstance),
  });
};

// Product
export const useGetAllSellerProduct = (sellerId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_SELLER_PRODUCT, sellerId],
    queryFn: () => getAllSellerProduct(sellerId),
  });
};

export const useAddNewProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newInstance : {
      category: string | undefined,
        description: string | undefined,
        imageUrl: string | undefined,
        name: string | undefined,
        price: number | undefined,
        stock: number | undefined,
        sellerId: string | undefined,
    }) => addNewProduct(newInstance),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_SELLER_PRODUCT, QUERY_KEYS.GET_ALL_PRODUCT],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newInstance : IProduct | undefined) => deleteProduct(newInstance),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_SELLER_PRODUCT, QUERY_KEYS.GET_ALL_PRODUCT],
      });
    },
  });
};
