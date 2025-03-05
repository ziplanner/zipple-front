import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="relative w-full sm:max-w-md md:max-w-lg">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="어떤 서비스가 필요하세요?"
        className="text-mobile_body2_r px-2.5 lg:text-body2_r w-full py-2 md:px-3 lg:py-3 lg:px-4 text-gray-600 bg-white 
        border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-0.5 focus:ring-pimary focus:border-selectedoption_border"
      />
      <button className="absolute inset-y-0 right-4 flex items-center">
        <Search className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
};

export default SearchBar;
