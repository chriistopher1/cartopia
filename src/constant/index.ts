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