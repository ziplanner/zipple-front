import React, { useState, useEffect } from "react";

interface Category {
  name: string;
  subCategories: string[];
}

interface ServiceLeftMenuProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const ServiceLeftMenu: React.FC<ServiceLeftMenuProps> = ({
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

  const handleCategoryClick = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="w-[230px] h-auto p-6 pl-3 flex flex-col">
      <h2 className="font-semibold text-text_sub2 text-lg mb-4">생활 서비스</h2>
      <ul className="space-y-1 flex-1">
        {categories.map((category) => (
          <li key={category.name}>
            {/* 상위 메뉴 */}
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`w-full text-left py-2 px-3 font-medium transition-colors duration-300 ${
                openCategory === category.name
                  ? "text-primary border-l-2 border-primary bg-selectedoption_default"
                  : "text-text_sub hover:border-l-2 hover:border-primary hover:bg-token_bg hover:text-text"
              }`}
            >
              {category.name}
            </button>

            {/* 하위 메뉴 (기본적으로 첫 번째 카테고리가 열려 있음) */}
            {openCategory === category.name && (
              <ul className="ml-4 mt-2 space-y-1">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory}>
                    <button
                      onClick={() => onCategoryClick(subCategory)}
                      className={`w-full text-left py-2 px-3 text-body3_r transition-colors duration-300 ${
                        activeCategory === subCategory
                          ? "text-primary bg-gray-100"
                          : "text-text_sub hover:bg-token_bg hover:text-text"
                      }`}
                    >
                      {subCategory}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceLeftMenu;
