import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MatchLeftMenu from "@/app/components/menu/matchLeftMenu";
import Pagination from "@/app/components/pagination/pagination";
import useResponsive from "@/app/hook/useResponsive";
import MobileMatchTopMenu from "@/app/components/menu/mobileMatchTopMenu";
import { getCategoryMatching } from "@/app/api/main/api";
import Skeleton from "@/app/components/loading/skeleton";
import { CATEGORY_LIST } from "@/app/types/category";
import MatchList from "@/app/components/list/mtachList";

const MatchMainSection = () => {
  const isMdUp = useResponsive("md");
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = searchParams.get("category") || "전체";

  const [matchListData, setMatchListData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      `/match?category=${encodeURIComponent(activeCategory)}&page=${page}`
    );
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    router.push(`/match?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data;
        if (activeCategory === "전체") {
          data = await getCategoryMatching("", currentPage, pageSize);
        } else {
          data = await getCategoryMatching(
            activeCategory,
            currentPage,
            pageSize
          );
        }
        console.log("조회된 데이터:", data);
        setMatchListData(data.matching);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("데이터 조회 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, currentPage]);

  return (
    <div className="md:py-12 py-6">
      <div className={`flex ${isMdUp ? "flex-row" : "flex-col"}`}>
        {/* Left Side Menu (PC) / Top Menu (Mobile) */}
        <div className="flex flex-col">
          {isMdUp ? (
            <MatchLeftMenu
              categories={CATEGORY_LIST}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />
          ) : (
            <MobileMatchTopMenu
              categories={CATEGORY_LIST}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
            />
          )}
        </div>

        {/* Main Content */}
        <div
          className="w-full md:ml-0 lg:ml-6 md:mt-5"
          style={{ minHeight: isMdUp ? "500px" : "300px" }}
        >
          {isLoading ? (
            <Skeleton />
          ) : matchListData.length > 0 ? (
            <MatchList data={matchListData} />
          ) : (
            <div
              className="flex justify-center items-center h-full text-gray-500
            text-mobile_body2_m md:text-body1_m pt-10 md:pt-0"
            >
              해당하는 매물이 없습니다.
            </div>
          )}

          {/* Pagination (데이터 없을 때도 아래에 유지) */}
          <div className="mt-6 flex justify-center">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchMainSection;
