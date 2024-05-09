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

export type InitialContextType = {
  category: CategoryArray | undefined
}