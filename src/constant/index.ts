import { IProduct, IProductCart } from "../types";

export const categories = [
  { value: "electronics", userInterface: "Electronics" },
  { value: "fashion", userInterface: "Fashion" },
  { value: "home", userInterface: "Home" },
  { value: "books", userInterface: "Books" },
  { value: "toys", userInterface: "Toys" },
  { value: "cars", userInterface: "Cars" },
];

export const formatToIDR = (price: number | undefined) => {
  if (price == undefined) return;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

export const checkIfItemInTheList = (
  currentProduct: IProduct,
  itemList: IProductCart[] | undefined
): boolean => {
  if (itemList == undefined) return false;
  for (let index = 0; index < itemList.length; index++) {
    const element = itemList[index];

    if (element.product?.id == currentProduct.id) return true;
  }

  return false;
};

export const checkStatus = (status: string | undefined) => {
  if (status === undefined) return "";

  if (status == "pending") return "text-red-500";
  if (status == "shipping") return "text-blue-500";
  if (status == "complete") return "text-green-500";
};
