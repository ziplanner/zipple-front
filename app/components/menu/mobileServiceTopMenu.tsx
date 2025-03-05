import React, { useState, useEffect } from "react";

interface Category {
  name: string;
  subCategories: string[];
}

interface MobileServiceTopMenuProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const MobileServiceTopMenu: React.FC<MobileServiceTopMenuProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // 첫 번째 카테고리를 기본 활성화
  useEffect(() => {
    if (categories.length > 0) {
      setOpenCategory(categories[0].name);
    }
  }, [categories]);

  const handleCategoryClick = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="w-full h-auto flex flex-col sm:w-full pb-2 sm:border-b sm:border-gray-200">
      <h2 className="font-semibold text-text_sub2 text-lg mb-4 sm:text-base">
        생활 서비스
      </h2>

      {/* 상위 메뉴 - 가로 스크롤 */}
      <ul className="flex flex-row space-x-3 overflow-x-auto whitespace-nowrap no-scrollbar">
        {categories.map((category) => (
          <li key={category.name} className="relative flex-shrink-0">
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`transition-colors duration-300 text-xs px-2 py-1 ${
                openCategory === category.name
                  ? "text-primary border-l-2 border-primary bg-selectedoption_default text-body2_sb sm:border-b-2 sm:border-l-0"
                  : "text-text_sub text-body2_r hover:border-l-2 hover:border-primary hover:bg-token_bg hover:text-text sm:hover:border-b-2 sm:hover:border-l-0"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      {/* 하위 메뉴 - 가로 스크롤 */}
      {openCategory && (
        <ul className="flex flex-row space-x-2 overflow-x-auto whitespace-nowrap no-scrollbar mt-2">
          {categories
            .find((category) => category.name === openCategory)
            ?.subCategories.map((subCategory) => (
              <li key={subCategory} className="flex-shrink-0">
                <button
                  onClick={() => onCategoryClick(subCategory)}
                  className={`py-1 px-2 transition-colors duration-300 text-[11px] ${
                    activeCategory === subCategory
                      ? "text-primary font-normal bg-gray-100"
                      : "text-text_sub hover:bg-gray-50"
                  }`}
                >
                  {subCategory}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MobileServiceTopMenu;
