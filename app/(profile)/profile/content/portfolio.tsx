"use client";

import { PORTFOLIO_DATA } from "@/app/data/portfolio";
import PortfolioCard from "@/app/components/card/portfolioCard";

const Portfolio = () => {
  return (
    <>
      <div
        className="flex w-full flex-col gap-3 md:gap-4 md:flex-row md:flex-wrap
          md:grid md:grid-cols-2 lg:grid-cols-4"
      >
        <PortfolioCard data={PORTFOLIO_DATA} />
      </div>
    </>
  );
};

export default Portfolio;
