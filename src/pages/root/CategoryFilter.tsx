import  { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilterProductBasedOnCategory } from '../../lib/tanstack/queries';
import ProductCard from '../../components/card/ProductCard';

const capitalizeFirstLetter = (str: string | undefined) => {
    if(str == undefined) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

const CategoryFilter = () => {
  const { filter } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!filter || filter == "") {
      navigate(-1); 
    }
  }, [filter, navigate]);

  const { data : filteredProducts, isPending : isFilteringProduct } = useFilterProductBasedOnCategory(filter);

  if(isFilteringProduct) return <div>Loading..</div>

//   console.log(filteredProducts)

  return (
    <div className='mx-5 my-5'>
      <h1 className='font-bold text-2xl md:text-4xl'>Category : {capitalizeFirstLetter(filter)}</h1>
      <div className="flex flex-wrap gap-6 w-full">
        {filteredProducts &&
          filteredProducts.map((product) => (
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

export default CategoryFilter;
