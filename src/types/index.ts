import { Timestamp } from "firebase/firestore";

export type IUser = {
  accountId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  imageUrl: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  seller: {
    id: string | undefined;
    name: string | undefined;
    address: string | undefined;
  };
  cart: string | undefined
  saved: string | undefined
};

export type CategoryArray = {
  name: string[];
  url: (string | undefined)[];
};

export type IProduct = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  imageUrl: string | undefined;
  category: string | undefined;
  stock: number | undefined;
  sold: number | undefined;
  sellerId: string | undefined;
  reviewId: string | undefined
};

export type IProductCart = {
  product: IProduct | undefined;
  quantity: number | undefined;
};

export type ICart = {
  id: string | undefined;
  userId: string | undefined;
  item: IProductCart[] | undefined;
};

export type ISaved = {
  id : string | undefined
  userId: string | undefined
  item: IProductCart[] | undefined;
};

export type IReviewItem = {
  createdAt: Timestamp | undefined
  rating : number | undefined
  user: IUser | undefined
  imageUrl : string | undefined
  description : string | undefined
}

export type IReview = {
  id: string | undefined
  item : IReviewItem[] | undefined
  productId : string | undefined
}