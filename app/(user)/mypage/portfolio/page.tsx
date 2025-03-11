"use client";

import { useState, useEffect } from "react";
import Portfolio from "@/app/(profile)/profile/content/portfolio";
import Pagination from "@/app/components/pagination/pagination";
import { useRouter } from "next/navigation";
import PortfolioModal from "@/app/components/modal/portfolioModal";
import PortfolioBottomSheet from "@/app/components/bottomSheet/portfolioBottomSheet";
import useResponsive from "@/app/hook/useResponsive";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";
import Alert from "@/app/components/alert/alert";
import { createMyPortfolio, getMyPortfolio } from "@/app/api/mypage/api";

const PortfolioPage = () => {
  const router = useRouter();
  const isMd = useResponsive("md");
  const { userInfo } = useUserInfoStore((state) => state);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await getMyPortfolio();

      // 데이터 변환: portfolioTitle → title, mainImageUrl → portfolioImage
      const transformedPortfolios = data.content.map((portfolio: any) => ({
        portfolioId: portfolio.portfolioId,
        title: portfolio.portfolioTitle,
        content: portfolio.portfolioContent,
        portfolioImage: portfolio.mainImageUrl,
        createdAt: portfolio.createdAt,
      }));

      setPortfolios(transformedPortfolios);
      console.log("포트폴리오 목록", transformedPortfolios);
    } catch (error) {
      console.error("포트폴리오 목록 불러오기 실패:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    router.push("/mypage");
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-4 mt-8 mb-12 md:gap-8 md:mt-12 md:mb-20">
      {/* Breadcrumb */}
      <div className="flex flex-row items-center text-text_sub2">
        <p
          className="text-mobile_body3_m md:text-body2_r cursor-pointer hover:underline"
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
          {userInfo?.nickname}님의 포트폴리오
        </h2>
        <p
          className="text-body3_r md:text-body3_m text-text_sub cursor-pointer"
          onClick={handleOpenModal}
        >
          + 포트폴리오 추가
        </p>
      </div>

      {/* 포트폴리오 리스트 */}
      <Portfolio portfolios={portfolios} />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(portfolios.length / 10)}
        onPageChange={handlePageChange}
      />

      {/* 모달/바텀시트 */}
      {isModalOpen &&
        (isMd ? (
          <PortfolioModal
            onClose={handleCloseModal}
            onPortfolioCreated={loadPortfolios}
          />
        ) : (
          <PortfolioBottomSheet
            onClose={handleCloseModal}
            onPortfolioCreated={loadPortfolios}
          />
        ))}

      {/* Alert 표시 (등록 성공/실패) */}
      {alertMessage && <Alert message={alertMessage} />}
    </div>
  );
};

export default PortfolioPage;
