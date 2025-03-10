"use client";

import { useEffect, useState } from "react";
import Portfolio from "@/app/(profile)/profile/content/portfolio";
import Pagination from "@/app/components/pagination/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { getAgentPortfolioList } from "@/app/api/main/api";
import Skeleton from "@/app/components/loading/skeleton";
import { PortfolioItem } from "@/app/types/user";
import ErrorMessage from "@/app/components/loading/errorMessage";
import { formatToKoreanDate } from "@/app/utils/formatToDate";

interface Portfolio {
  portfolioId: number;
  portfolioTitle: string;
  mainImageUrl: string;
  createdAt: string;
}

const PortfolioMainSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = searchParams.get("id");

  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 10;

  useEffect(() => {
    if (!agentId) return;

    setLoading(true);
    setError(null);

    getAgentPortfolioList(agentId, currentPage, pageSize)
      .then((data) => {
        const transformedData: PortfolioItem[] = (data.content || []).map(
          (portfolio: Portfolio) => ({
            portfolioId: portfolio.portfolioId,
            portfolioImage: portfolio.mainImageUrl,
            title: portfolio.portfolioTitle,
            createdAt: formatToKoreanDate(portfolio.createdAt).yyyyDotMmDotDd,
          })
        );

        setPortfolios(transformedData);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        console.error("Error fetching portfolios:", err);
        setError("포트폴리오 데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [agentId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-4 mt-8 mb-12 md:gap-8 md:mt-12 md:mb-20">
      <div className="flex justify-between items-center px-1 border-b pb-2">
        <h2 className="text-mobile_h1_contents_title md:text-h1_contents_title mb-2 text-text_sub2">
          포트폴리오
        </h2>
        <p
          className="text-mobile_body4_r md:text-body3_m text-text_sub cursor-pointer"
          onClick={handleGoBack}
        >
          돌아가기
        </p>
      </div>

      {loading && <Skeleton />}

      {error && <ErrorMessage message={"에러가 발생했습니다."} />}

      <Portfolio portfolios={portfolios} />

      {portfolios.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  );
};

export default PortfolioMainSection;
