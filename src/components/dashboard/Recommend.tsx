import { useGetAllProduct, useGetPopularProduct } from "../../lib/tanstack/queries";
import ProductCard from "../card/ProductCard";

const Recommend = () => {
  const { data: allProduct, isPending } = useGetPopularProduct();

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="mx-4 md:mx-24 mb-10">
      <h2 className="border-b-2 border-black mb-8 text-xl md:text-3xl font-bold pb-4 text-center">
        Popular Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allProduct &&
          allProduct.map((product) => (
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

export default Recommend;
