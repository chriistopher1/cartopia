import { useGetCategoryAsset } from "../../lib/tanstack/queries";
import CategoryCard from "../card/CategoryCard";

const Category = () => {
 
  const { data: categories, isPending } = useGetCategoryAsset()

  if(isPending) return <div>Loading..</div>
  console.log(categories)
  return (
    <div className="mx-4 md:mx-24 py-12">
      <h2 className="border-b-2 border-black mb-5 text-lg md:text-2xl font-bold pb-4">
        Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories?.name.map((categoryName, index) => (
          <CategoryCard key={index} name={categoryName} url={categories.url[index]} />
        ))}
      </div>
    </div>
  );
};

export default Category;
