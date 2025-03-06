"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  FaLink,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import defaultImage1 from "@/app/image/test/apt7.png";
import defaultImage2 from "@/app/image/test/apt8.png";
import defaultImage3 from "@/app/image/test/baby.png";
import defaultImage4 from "@/app/image/test/apt10.png";
import defaultImage5 from "@/app/image/test/test12.png";
import { MdLink } from "react-icons/md";
import { profile } from "console";

interface PortfolioDetailProps {
  title: string;
  details: string;
  images: string[] | StaticImageData[];
  file?: string;
  url?: string;
}

const PortfolioDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [portfolio, setPortfolio] = useState<PortfolioDetailProps>({
    title: "일등 공인중개사의 포트폴리오",
    details:
      "안녕하세요, 저는 10년 이상의 경력을 가진 공인중개사입니다. 주요 업무는 아파트, 주택, 상업용 부동산 중개이며, 고객의 니즈를 철저하게 분석하여 맞춤형 매물을 제공합니다.\n\n" +
      "📌 주요 경력 및 성과\n" +
      "- 2014년부터 부동산 중개업 종사\n" +
      "- 누적 거래 건수 500건 이상\n" +
      "- 전세/매매 계약 성공률 98%\n" +
      "- 법률 및 세무 상담 제공\n" +
      "- 1:1 맞춤 컨설팅 진행 (부동산 투자, 대출, 리모델링 컨설팅 포함)\n\n" +
      "📊 주요 활동 및 서비스\n" +
      "🔹 아파트 및 주택 중개\n" +
      "- 용인, 수지, 기흥 지역의 아파트 및 주택 매매 전문\n" +
      "- 최신 부동산 트렌드 분석을 통한 실거주 및 투자 추천\n" +
      "- 부동산 가격 변동 데이터 제공\n\n" +
      "🏆 주요 성과 및 고객 후기\n" +
      "- '최소 3개월 걸릴 줄 알았던 아파트 매매 계약을 2주 만에 성사시켜 주셨습니다!' - 고객 김OO\n\n" +
      "📞 문의 및 상담 예약\n" +
      "- 사무실 주소: 용인시 수지구 ○○동 ○○빌딩 3층\n" +
      "- 전화번호: 010-1234-5678\n" +
      "- 홈페이지: www.smartrealty.com\n\n" +
      "💡 신속하고 정확한 상담을 원하신다면 언제든지 연락 주세요!" +
      "💡 신속하고 정확한 상담을 원하신다면 언제든지 연락 주세요!" +
      "💡 신속하고 정확한 상담을 원하신다면 언제든지 연락 주세요!" +
      "💡 신속하고 정확한 상담을 원하신다면 언제든지 연락 주세요!" +
      "💡 신속하고 정확한 상담을 원하신다면 언제든지 연락 주세요!",
    images: [
      defaultImage1,
      defaultImage2,
      defaultImage3,
      defaultImage4,
      defaultImage5,
    ],
    file: "https://example.com/sample.pdf",
    url: "https://example.com",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState<boolean>(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % portfolio.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + portfolio.images.length) % portfolio.images.length
    );
  };

  return (
    <div className="mx-auto p-4 mt-8 mb-12 md:mt-12 md:mb-20">
      {/* 타이틀 & 다운로드/링크 */}
      <h1 className="text-mobile_h1_contents_title md:text-h1_contents_title">
        {portfolio.title}
      </h1>
      {/* 📌 링크 & 다운로드 버튼 */}
      <div className="flex flex-row justify-start md:justify-end gap-3 mb-5">
        <div className="flex flex-row gap-3">
          {/* Portfolio URL */}
          {portfolio.url && (
            <div
              className="inline-flex rounded-sm md:text-body3_m items-center mt-4
            text-token_4 bg-token_4_bg md:whitespace-nowrap overflow-hidden
            md:overflow-visible text-ellipsis text-mobile_body4_r py-1 px-2 md:px-3 max-w-fit"
            >
              <MdLink className="md:w-5 md:h-5 w-4 h-4 text-token_4 flex-shrink-0" />
              &nbsp;&nbsp;&nbsp;
              <span className="truncate md:whitespace-nowrap">
                {portfolio.url}
              </span>
            </div>
          )}
          {/* File Download */}
          {portfolio.file && (
            <div
              className="inline-flex rounded-sm md:text-body3_m items-center mt-4
          bg-token_3_bg md:whitespace-nowrap overflow-hidden text-token_3
            md:overflow-visible text-ellipsis text-mobile_body4_r py-1 px-2 md:px-3 max-w-fit"
            >
              <a
                href={portfolio.file}
                download
                className="flex items-center hover:underline"
              >
                <FaDownload className="md:w-4 md:h-4 w-3 h-3 flex-shrink-0" />
              </a>
              <span className="truncate md:whitespace-nowrap pl-3">
                파일 다운로드
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-6">
        <div
          className="relative w-full max-h-[600px] md:w-1/2 aspect-square cursor-pointer flex flex-col items-center"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <Image
            src={portfolio.images[currentImageIndex]}
            alt="포트폴리오 이미지"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        {/* {portfolio.images.length > 0 && (
            <span className="md:text-body4_r text-mobile_body4_r text-text_sub">
              사진을 클릭하면 상세하게 확인하실 수 있습니다.
            </span>
          )} */}
        {/* 📌 상세 설명 */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <p className="text-gray-700 text-mobile_body3_r md:text-h4_r whitespace-pre-line">
            {portfolio.details}
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
            src={portfolio.images[currentImageIndex]}
            alt="포트폴리오 확대 이미지"
            width={800}
            height={500}
            className="rounded-lg max-w-[90%] md:max-w-[70%] max-h-[80vh]"
          />
          {/* 📌 이미지 개수 표시 (확대 시에만 보이도록 변경) */}
          <div
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black/60 text-white 
        text-sm px-3 py-1 rounded-md"
          >
            {currentImageIndex + 1} / {portfolio.images.length}
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

export default PortfolioDetailPage;
