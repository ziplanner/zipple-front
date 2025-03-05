"use client";

import { useState } from "react";
import Portfolio from "@/app/(profile)/profile/content/portfolio";
import Pagination from "@/app/components/pagination/pagination";
import { useRouter } from "next/navigation";
import PortfolioModal, {
  PortfolioModalProps,
} from "@/app/components/modal/portfolioModal";

const PortfolioPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    router.push("/mypage");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPortfolio: PortfolioModalProps["onSubmit"] = (data) => {
    console.log("포트폴리오 데이터 제출:", data);
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="flex flex-col gap-4 mt-8 mb-12 md:gap-8 md:mt-12 md:mb-20">
      {/* Breadcrumb (경로 뎁스 표시) */}
      <div className="flex flex-row items-center text-text_sub2">
        <p
          className="text-mobile_body4_r md:text-body3_m cursor-pointer"
          onClick={handleGoBack}
        >
          마이페이지
        </p>
        <span className="mx-2"> &gt; </span>
        <p className="text-mobile_body4_r md:text-body3_m">포트폴리오 관리</p>
      </div>

      {/* 헤더 및 추가 버튼 */}
      <div className="flex justify-between items-center px-1 border-b pb-2">
        <h2 className="text-mobile_h1_contents_title md:text-h1_contents_title mb-2 text-text_sub2">
          김이름님의 포트폴리오
        </h2>
        <p
          className="text-body3_r md:text-body3_m text-text_sub cursor-pointer"
          onClick={handleOpenModal}
        >
          + 포토폴리오 추가
        </p>
      </div>

      {/* 포트폴리오 리스트 */}
      <Portfolio />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 포트폴리오 모달 */}
      {isModalOpen && (
        <PortfolioModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitPortfolio}
        />
      )}
    </div>
  );
};

export default PortfolioPage;
