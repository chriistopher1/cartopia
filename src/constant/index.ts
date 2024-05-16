export const formatToIDR = (price: number | undefined) => {
  if (price == undefined) return;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
