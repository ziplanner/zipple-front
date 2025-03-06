"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Shortcut from "@/app/components/card/shortcutCard";
import ServiceCard from "@/app/components/card/serviceCard";
import useResponsive from "@/app/hook/useResponsive";

import movingImage from "@/app/image/service/service_card01.svg";
import lawyerImage from "@/app/image/service/service_card02.svg";
import interiorImage from "@/app/image/service/service_card03.svg";

const services = [
  { image: movingImage, title: "이사/입주청소", tags: ["전문분야", "이사"] },
  { image: lawyerImage, title: "법무사 매칭", tags: ["전문분야", "법무사"] },
  {
    image: interiorImage,
    title: "인테리어시공",
    tags: ["전문분야", "인테리어"],
  },
  { image: movingImage, title: "추가 서비스 1", tags: ["전문분야", "이사"] },
  { image: lawyerImage, title: "추가 서비스 2", tags: ["전문분야", "법무사"] },
];

const PopularService = () => {
  const isMd = useResponsive("md");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 3;
  const cardWidth = 333;
  const maxIndex = Math.max(0, services.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="pb-20 max-w-[1040px] mx-auto px-4">
      {/* Shortcut Cards */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-6">
        <Shortcut
          color="blue"
          title="클린한 부동산 생활 솔루션, 집플"
          description="이용 가이드 바로가기"
          onClick={() => {}}
        />
        <Shortcut
          color="black"
          title="집플에서 새로운 고객을 만나보세요"
          description="전문가 등록 바로가기"
          onClick={() => {}}
        />
      </div>

      {/* 타이틀 & 버튼 */}
      <div className="flex justify-between items-center mt-12 md:mt-16">
        <h1 className={isMd ? "md:text-h1_s" : "text-mobile_h2_s"}>
          집플 인기 서비스
          <br />
          TOP5
        </h1>
        <div className="hidden gap-2 self-end">
          <button
            onClick={prevSlide}
            className="p-2"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2"
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* md 이상: 캐러셀 / md 이하: 스크롤 */}
      <div className="relative mt-1 md:mt-6 max-w-full overflow-hidden">
        {/* md 이하: 가로 스크롤 */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory 
          md:space-x-4 space-x-2 no-scrollbar"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="snap-start md:flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* md 이상: 캐러셀 */}
        {/* <div
          className="hidden md:flex transition-transform duration-500 ease-in-out justify-start overflow-hidden"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + 20)}px)`,
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-shrink-0 mr-5 last:mr-0"
              style={{ width: `${cardWidth}px` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default PopularService;
