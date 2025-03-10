"use client";

import React, { useEffect, useState } from "react";
import MatchLeftMenu from "@/app/components/menu/matchLeftMenu";
import Pagination from "@/app/components/pagination/pagination";
import MatchList from "@/app/components/list/mtachList";
import useResponsive from "@/app/hook/useResponsive";
import MobileMatchTopMenu from "@/app/components/menu/mobileMatchTopMenu";
import { getCategoryMatching, getMainMatching } from "@/app/api/main/api";
import Skeleton from "@/app/components/loading/skeleton";
import { CATEGORY_LIST } from "@/app/types/category";

const MatchPage = () => {
  const isMdUp = useResponsive("md");

  const [matchListData, setMatchListData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(
    CATEGORY_LIST[0]
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data;
        if (activeCategory === "전체") {
          data = await getMainMatching(currentPage, pageSize);
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
        {/* Left Side Menu */}
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
        <div className="w-full md:ml-0 lg:ml-6 md:mt-5">
          {isLoading ? <Skeleton /> : <MatchList data={matchListData} />}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
