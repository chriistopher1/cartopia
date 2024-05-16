import { useGetAllProduct } from "../../lib/tanstack/queries";
import ProductCard from "../card/ProductCard";

const Recommend = () => {
  const { data: allProduct, isPending } = useGetAllProduct();

  if (isPending) return <div>Loading...</div>;

  // console.log(allProduct);

  return (
    <div className="mx-4 md:mx-24 mb-5">
      <h2 className="border-b-2 border-black mb-5 text-lg md:text-2xl font-bold pb-4">
        Popular Product
      </h2>
      <div className="flex flex-wrap gap-6 w-full">
        {allProduct &&
          allProduct.map((product) => (
            <ProductCard
              key={product?.id}
              category={product?.category}
              description={product?.description}
              imageUrl={product?.imageUrl}
              name={product?.name}
              price={product?.price}
              review={product?.review}
              stock={product?.stock}
              id={product?.id}
              sellerId={product?.sellerId}
            />
          ))}
      </div>
    </div>
  );
};

export default Recommend;
