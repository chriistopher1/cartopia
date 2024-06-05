import { useGetCategoryAsset } from "../../lib/tanstack/queries";
import CategoryCard from "../card/CategoryCard";

const Category = () => {
 
  const { data: categories, isPending } = useGetCategoryAsset()

  if(isPending) return <div>Loading..</div>
  console.log(categories)
  return (
    <div className="mx-4 md:mx-24 py-12">
      <h2 className="border-b-2 border-black mb-5 text-lg md:text-2xl font-bold pb-4">Category</h2>
      <div className="flex gap-2 md:gap-5">
        {categories?.name.map((categoryName, index) => (
          <CategoryCard key={index} name={categoryName} url={categories.url[index]}/>
        ))}

      </div>
    </div>
  );
};

export default Category;
