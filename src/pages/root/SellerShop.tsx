import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/card/ProductCard";
import { useUserContext } from "../../context/AuthProvider";
import { useGetAllSellerProduct, useGetUserInfoFromSellerId } from "../../lib/tanstack/queries";

const SellerShop = () => {
  const { user } = useUserContext();
  const { sellerId } = useParams();
    const navigate = useNavigate()


    if(sellerId == "") {
        navigate(-1)
    }

  const { data: sellerProduct, isPending: isGettingSellerProduct } =
    useGetAllSellerProduct(sellerId);
  const { data: sellerInfo, isPending: isGettingSellerInfo } =
    useGetUserInfoFromSellerId(sellerId);

  if (isGettingSellerProduct || isGettingSellerInfo) return <div>Loading..</div>;

  console.log(sellerProduct);

  return (
    <div className="flex flex-col gap-4 mx-5 my-5">
      <h3 className="flex items-center gap-4 font-bold text-2xl md:text-3xl border-b-2 w-fit pb-2 border-black">
    <img src={sellerInfo?.imageUrl} className="w-8 h-8 rounded-lg"/>
       <p className="text-black font-bold">{sellerInfo?.seller.name}</p>
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

export default SellerShop;
