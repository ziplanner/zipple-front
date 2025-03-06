import React from "react";
import Image from "next/image";

interface CategoryItemProps {
  icon: string;
  label: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-3 py-2 px-2 md:py-6 md:px-6">
      <div className="flex items-center justify-center bg-sub2 rounded-[40px] w-[60px] h-[60px] md:w-[118px] md:h-[118px]">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
        />
      </div>
      <p className="text-[12px] md:text-[14px] lg:text-[15px] font-medium text-text">
        {label}
      </p>
    </div>
  );
};

export default CategoryItem;
