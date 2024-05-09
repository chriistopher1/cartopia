interface singleCategory {
  name: string;
  url: string | null;
}

const CategoryCard = (category: singleCategory) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="relative grow">
      <img src={category.url || ""} alt={category.name} className="w-auto h-full" />
      <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs md:text-2xl">
        {capitalizeFirstLetter(category.name)}
      </p>
    </div>
  );
};

export default CategoryCard;
