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
  url: (string | null)[];
};

export type IProduct = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  imageUrl: string | undefined;
  category: string | undefined;
  stock: number | undefined;
  review: number | undefined;
  sellerId: string | undefined;
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
