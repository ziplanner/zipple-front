"use client";

import PortfolioCard from "@/app/components/card/portfolioCard";
import { PortfolioItem } from "@/app/types/user";

interface PortfolioProps {
  portfolios: PortfolioItem[];
}

const Portfolio = ({ portfolios }: PortfolioProps) => {
  return (
    <>
      {portfolios.length > 0 ? (
        <div
          className="flex w-full flex-col gap-3 md:gap-4 md:flex-row md:flex-wrap
          md:grid md:grid-cols-2 lg:grid-cols-4"
        >
          <PortfolioCard data={portfolios} />
        </div>
      ) : (
        <div className="min-h-[300px] md:min-h-[500px]">
          <p className="text-center text-gray-500 mt-10 text-mobile_body2_m md:text-body1_m">
            포토폴리오가 없습니다.
          </p>
        </div>
      )}
    </>
  );
};

export default Portfolio;
