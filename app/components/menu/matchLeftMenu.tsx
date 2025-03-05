import React from "react";

interface LeftMenuProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const MatchLeftMenu: React.FC<LeftMenuProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <div className="w-[230px] h-auto p-6 pl-3 flex flex-col">
      <h2 className="font-semibold text-text_sub2 text-lg mb-4">
        공인중개사 매칭
      </h2>
      <ul className="space-y-1 flex-1">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryClick(category)}
              className={`w-full text-left py-2 px-3 transition-colors duration-300 ${
                activeCategory === category
                  ? "text-primary border-l-2 border-primary bg-selectedoption_default text-body2_sb"
                  : "text-text_sub text-body2_r hover:border-l-2 hover:border-primary hover:bg-token_bg hover:text-text"
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

export default MatchLeftMenu;
