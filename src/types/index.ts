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
};

export type CategoryArray = {
  name: string[];
  url: (string | null)[];
};

export type Product = {
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
