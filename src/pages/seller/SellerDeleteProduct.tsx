import ProductCard from "../../components/card/ProductCard";
import { useUserContext } from "../../context/AuthProvider";
import { useGetAllSellerProduct } from "../../lib/tanstack/queries";

const SellerDeleteProduct = () => {
  const { user } = useUserContext();

  const { data: sellerProduct, isPending: isGettingSellerProduct } =
    useGetAllSellerProduct(user.seller.id);

  if (isGettingSellerProduct) return <div>Loading..</div>;

  console.log(sellerProduct);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-2xl md:text-3xl border-b-2 w-fit pb-2 border-black">
        Product To Be Deleted
      </h3>
      <div className="flex flex-wrap gap-6 w-full">
        {sellerProduct &&
          sellerProduct.map((product) => (
            <ProductCard
              key={product?.id}
              category={product?.category}
              description={product?.description}
              imageUrl={product?.imageUrl}
              name={product?.name}
              price={product?.price}
              sold={product?.sold}
              stock={product?.stock}
              id={product?.id}
              sellerId={product?.sellerId}
              reviewId={product?.reviewId}
            />
          ))}
      </div>
    </div>
  );
};

export default SellerDeleteProduct;
