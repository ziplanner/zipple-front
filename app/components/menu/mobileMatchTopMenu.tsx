import React from "react";

interface LeftMenuProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const MobileMatchTopMenu: React.FC<LeftMenuProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <div className="w-[230px] h-auto flex flex-col md:w-[200px] sm:w-full pb-2 sm:border-b sm:border-gray-200">
      <h2 className="font-semibold text-text_sub2 text-lg mb-4 sm:text-base">
        공인중개사 매칭
      </h2>
      <ul className="space-y-1 flex-1 sm:flex sm:flex-row sm:space-x-3 no-scrollbar sm:overflow-x-auto sm:whitespace-nowrap sm:space-y-0">
        {categories.map((category) => (
          <li key={category} className="sm:flex-shrink-0">
            <button
              onClick={() => onCategoryClick(category)}
              className={`w-full text-left py-2 px-3 transition-colors duration-300 md:text-sm sm:text-xs sm:px-2 sm:py-1 ${
                activeCategory === category
                  ? "text-primary border-l-2 border-primary bg-selectedoption_default text-body2_sb sm:border-b-2 sm:border-l-0"
                  : "text-text_sub text-body2_r hover:border-l-2 hover:border-primary hover:bg-token_bg hover:text-text sm:hover:border-b-2 sm:hover:border-l-0"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMatchTopMenu;
