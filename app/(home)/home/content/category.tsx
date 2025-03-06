import React from "react";
import apartmentIcon from "@/app/image/icon/category/01.svg";
import houseIcon from "@/app/image/icon/category/02.svg";
import villaIcon from "@/app/image/icon/category/03.svg";
import roomIcon from "@/app/image/icon/category/04.svg";
import storeIcon from "@/app/image/icon/category/05.svg";
import buildingIcon from "@/app/image/icon/category/06.svg";
import officeIcon from "@/app/image/icon/category/07.svg";
import factoryIcon from "@/app/image/icon/category/08.svg";
import hospitalIcon from "@/app/image/icon/category/09.svg";
import hotelIcon from "@/app/image/icon/category/10.svg";
import officetelIcon from "@/app/image/icon/category/11.svg";
import viewAllIcon from "@/app/image/icon/category/12.svg";
import CategoryItem from "@/app/components/category/categoryItem";

const categoryList = [
  { icon: apartmentIcon, label: "아파트" },
  { icon: houseIcon, label: "주택/다가구" },
  { icon: villaIcon, label: "빌라/다세대" },
  { icon: roomIcon, label: "원룸/투룸" },
  { icon: storeIcon, label: "상가 점포" },
  { icon: buildingIcon, label: "빌딩/상업시설" },
  { icon: officeIcon, label: "사무실" },
  { icon: factoryIcon, label: "공장/창고/지식센터" },
  { icon: hospitalIcon, label: "병원/요양원" },
  { icon: hotelIcon, label: "호텔/모텔/펜션" },
  { icon: officetelIcon, label: "오피스텔" },
  { icon: viewAllIcon, label: "전체보기" },
];

const CategoryList: React.FC = () => {
  return (
    <div className="md:py-20 py-10 max-w-[1040px] mx-auto md:px-5 px-4">
      <h1 className="flex justify-start text-mobile_h2_s md:text-h1_s mb-7">
        어떤 중개사를 찾고 계신가요?
      </h1>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 sm_md:grid-cols-4
      md_md:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4"
      >
        {categoryList.map((category, index) => (
          <CategoryItem
            key={index}
            icon={category.icon}
            label={category.label}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
