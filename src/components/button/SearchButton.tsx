import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const mobileViewCss = "w-full py-2 rounded-md text-center hover:text-white hover:bg-[#63a5ea] font-semibold text-xl";

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleUserEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
      setIsOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="w-full text-center lg:hidden">
        {isOpen ? (
          <div className={`flex items-center border-2 py-2 h-10 rounded-md ${isOpen ? "border-blue-500" : "border-gray-300"}`}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleUserEnter}
            onBlur={() => setIsOpen(false)}
            autoFocus
            className="w-full px-2 outline-none focus:outline-none"
           />
          <FaSearch className="text-xl cursor-pointer text-gray-500 hover:text-gray-700 ml-2 mr-2" onClick={handleSearchClick} />
        </div>
        ) : (
          <button
            className={`flex justify-center ${mobileViewCss} lg:hidden`}
            onClick={() => setIsOpen(true)}
          >
            <FaSearch />
          </button>
        )}
      </div>

      <div className="max-lg:hidden">
        {isOpen ? (
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleUserEnter}
            onBlur={() => setIsOpen(false)}
            autoFocus
            className="border rounded-md py-2 w-28 h-10 px-2"
          />
        ) : (
          <FaSearch
            className="text-[#63a5ea] cursor-pointer flex justify-center"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchButton;
