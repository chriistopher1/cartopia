import React, { useState } from "react";
import { useGetCategoryAsset, useGetCategoryItems } from "../../lib/tanstack/queries";
import CategoryCard from "../card/CategoryCard";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories, isPending: isCategoriesPending } = useGetCategoryAsset();
  const { data: items, isPending: isItemsPending } = useGetCategoryItems(selectedCategory);

  if (isCategoriesPending) return <div>Loading categories...</div>;

  return (
    <div className="mx-4 md:mx-24 py-12">
      <h2 className="border-b-2 border-black mb-5 text-lg md:text-2xl font-bold pb-4">Category</h2>
      <div className="flex gap-2 md:gap-5 mb-8">
        {categories?.map((category, index) => (
          <CategoryCard 
            key={index} 
            name={category.name} 
            url={category.url} 
            onClick={() => setSelectedCategory(category.name)}
          />
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h3 className="text-lg md:text-2xl font-bold mb-4">{selectedCategory} Items</h3>
          {isItemsPending ? (
            <div>Loading items...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {items?.map((item, index) => (
                <div key={index} className="border rounded p-4">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover mb-4" />
                  <h4 className="text-lg font-bold">{item.name}</h4>
                  <p>{item.description}</p>
                  <p className="font-semibold">${item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
