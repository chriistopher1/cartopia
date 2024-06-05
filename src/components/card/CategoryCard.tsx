import { Link } from "react-router-dom";

interface SingleCategory {
  name: string;
  url: string | undefined;
}

const CategoryCard = ({ name, url }: SingleCategory) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Link
      className="relative grow shadow-lg shadow-gray-400 cursor-pointer rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
      to={`/category/${name}`}
    >
      <img
        src={url || ""}
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs md:text-lg lg:text-2xl">
        {capitalizeFirstLetter(name)}
      </p>
    </Link>
  );
};

export default CategoryCard;