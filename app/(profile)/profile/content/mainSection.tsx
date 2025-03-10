"use client";

import { useState } from "react";
import ToggleButton from "@/app/components/button/toggleBtn";
import ProfileInfo from "./profileInfo";
import Portfolio from "./portfolio";
import PortfolioSection from "./portfolioSection";
import Review from "./review";
import ReviewSection from "./reviewSection";

const MainSection = () => {
  const [activeTab, setActiveTab] = useState("프로필");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ToggleButton
        buttons={[
          { text: "프로필", path: "프로필" },
          { text: "포토폴리오", path: "포토폴리오" },
          { text: "고객후기", path: "고객후기" },
        ]}
        onTabChange={handleTabChange}
        classname="mb-10"
      />
      {activeTab === "프로필" && (
        <>
          <ProfileInfo
            name="아파트 매매 전문가 한줄소개"
            role="전문가"
            field="아파트"
            description="00시 00구에서 6년간 일해왔으며 고객님들의 니즈에 맞는 상담을 제공합니다."
            contactUrl="https://blog.naver.com/junghoon7771/2230401001351"
            registrationInfo="0000"
            phoneNumber="00-0000-0000"
            address="서울특별시 서초구 서초대로 00길 00, 0000호"
          />
          <div className="flex justify-between items-center px-1 mb-3">
            <h2 className="text-h2 font-semibold mb-2 text-text_sub2">
              포토폴리오
            </h2>
            <p className="text-body3_m text-text_sub cursor-pointer">
              전체보기
            </p>
          </div>
          <PortfolioSection data={[]} />
          <div className="flex justify-between items-center px-1 mb-3 mt-10">
            <h2 className="text-h2 font-semibold mb-2 text-text_sub2">
              고객 리뷰
            </h2>
            <p className="text-body3_m text-text_sub cursor-pointer">
              전체보기
            </p>
          </div>
          <ReviewSection data={[]} />
        </>
      )}
      {activeTab === "포토폴리오" && <Portfolio portfolios={[]} />}
      {activeTab === "고객후기" && <Review />}
    </>
  );
};

export default MainSection;
