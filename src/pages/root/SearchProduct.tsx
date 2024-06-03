import  { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilterProductBasedOnCategory, useFindRelatedProduct } from '../../lib/tanstack/queries';
import ProductCard from '../../components/card/ProductCard';

const capitalizeFirstLetter = (str: string | undefined) => {
    if(str == undefined) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

const SearchProduct = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || query == "") {
      navigate(-1); 
    }
  }, [query, navigate]);

  const { data : relatedProducts, isPending : isFetchingRelatedProducts } = useFindRelatedProduct(query);

  if(isFetchingRelatedProducts) return <div>Loading..</div>

//   console.log(filteredProducts)

  return (
    <div className='mx-2 mb-4'>
      <h1 className='font-bold text-2xl md:text-4xl'>Searched : {capitalizeFirstLetter(query)}</h1>
      <div className="flex flex-wrap gap-6 w-full">
        {relatedProducts &&
          relatedProducts.map((product) => (
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

export default SearchProduct;
