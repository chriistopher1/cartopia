import { useInitialContext } from "../../context/InitialProvider";
import CategoryCard from "../card/CategoryCard";

const Category = () => {
  const initialContext = useInitialContext();
  const category = initialContext?.category;
  const { name, url } = category || {};

  if (!name || !url || !category) return <div>Loading...</div>;

  return (
    <div className="mx-4 md:mx-24 py-12">
      <h2 className="border-b-2 border-black mb-5 text-lg md:text-2xl font-bold pb-4">Category</h2>
      <div className="flex gap-2 md:gap-5">
        {name.map((categoryName, index) => (
          <CategoryCard name={categoryName} url={url[index]}/>
        ))}

      </div>
    </div>
  );
};

export default Category;
