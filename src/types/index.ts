export type IUser = {
  accountId: string | undefined;
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  imageUrl: string | undefined;
};

export type CategoryArray = {
  name: string[];
  url: (string | null)[];
};

export type Product = {
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  imageUrl: string | undefined;
  category: string | undefined;
  stock: number | undefined;
  review: number | undefined;
};
