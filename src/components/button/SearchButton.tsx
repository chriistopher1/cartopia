import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFindRelatedProduct } from "../../lib/tanstack/queries";

const mobileViewCss =
  "w-full py-2 rounded-md text-center hover:text-white hover:bg-[#63a5ea] font-semibold text-xl";

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

    const{data ,isPending} = useFindRelatedProduct("BMW")

    console.log(data)

    const handleUserEnter = () => {



    }

  return (
    <div>
      <div className="w-full text-center lg:hidden">
        {isOpen ? (
          <input
            type="text"
            onBlur={() => {
              setIsOpen(false);
            }}
            autoFocus
            className="border rounded-md py-2 w-48 h-10"
          />
        ) : (
          <Link
            to={""}
            className={`flex justify-center ${mobileViewCss} lg:hidden`}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <FaSearch />
          </Link>
        )}
      </div>

      <div className="max-lg:hidden">
        {isOpen ? (
          <input
            type="text"
            onBlur={() => {
              setIsOpen(false);
            }}
            autoFocus
            className="border rounded-md py-2 w-28 h-10"
          />
        ) : (
          <FaSearch
            className="text-[#63a5ea] cursor-pointer flex justify-center"
            onClick={() => {
              setIsOpen(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SearchButton;
