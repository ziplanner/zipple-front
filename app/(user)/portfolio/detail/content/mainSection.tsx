"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { MdLink } from "react-icons/md";
import { getAgentPortfolioDetail } from "@/app/api/main/api";
import defaultImage from "@/app/image/test/test_image.jpg";

interface PortfolioDetailProps {
  title: string;
  content: string | null;
  portfolioList: string[];
  externalLink?: string;
}

const MainSection = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [portfolio, setPortfolio] = useState<PortfolioDetailProps>({
    title: "",
    content: null,
    portfolioList: [],
    externalLink: "",
  });

  useEffect(() => {
    if (id) {
      getAgentPortfolioDetail(Number(id))
        .then((data) => {
          console.log("📌 API 데이터:", data);
          setPortfolio({
            title: data.title || "제목 없음",
            content: data.content ?? "포트폴리오 내용이 없습니다.",
            portfolioList:
              data.portfolioList.length > 0
                ? data.portfolioList
                : [defaultImage],
            externalLink: data.externalLink || "",
          });
        })
        .catch((error) => console.error("❌ 데이터 조회 실패:", error));
    }
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % portfolio.portfolioList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + portfolio.portfolioList.length) %
        portfolio.portfolioList.length
    );
  };

  return (
    <div className="mx-auto p-4 mt-8 mb-12 md:mt-12 md:mb-20">
      {/* 타이틀 */}
      <h1 className="text-mobile_h1_contents_title md:text-h1_contents_title">
        {portfolio.title}
      </h1>

      {/* 🔗 외부 링크 */}
      {portfolio.externalLink && (
        <div className="inline-flex items-center mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-md">
          <MdLink className="w-5 h-5 mr-2 text-gray-600" />
          <a
            href={portfolio.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {portfolio.externalLink}
          </a>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:gap-6 mt-6">
        {/* 📌 메인 이미지 */}
        <div
          className="relative w-full aspect-square cursor-pointer"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <Image
            src={portfolio.portfolioList[currentImageIndex] || defaultImage}
            alt="포트폴리오 이미지"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>

        {/* 📌 상세 설명 */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <p className="text-gray-700 text-mobile_body3_r md:text-h4_r whitespace-pre-line">
            {portfolio.content}
          </p>
        </div>
      </div>

      {/* 📌 이미지 확대 모달 */}
      {isImageViewerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setIsImageViewerOpen(false)}
          >
            ✖
          </button>
          <button
            className="absolute left-5 md:left-10 text-white text-2xl p-3 bg-black/40 rounded-full"
            onClick={prevImage}
          >
            <FaChevronLeft />
          </button>
          <Image
            src={portfolio.portfolioList[currentImageIndex] || defaultImage}
            alt="포트폴리오 확대 이미지"
            width={800}
            height={500}
            className="rounded-lg max-w-[90%] md:max-w-[70%] max-h-[80vh]"
          />
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-md">
            {currentImageIndex + 1} / {portfolio.portfolioList.length}
          </div>
          <button
            className="absolute right-5 md:right-10 text-white text-2xl p-3 bg-black/40 rounded-full"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default MainSection;
