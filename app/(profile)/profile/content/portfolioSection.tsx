import PortfolioCard from "@/app/components/card/portfolioCard";
import { PORTFOLIO_DATA } from "@/app/data/portfolio";

const PortfolioSection = () => {
  return (
    <div className="flex flex-col">
      <div
        className="flex w-full flex-col gap-3 md:gap-4 md:flex-row md:flex-wrap
          md:grid md:grid-cols-2 lg:grid-cols-3"
      >
        <PortfolioCard data={PORTFOLIO_DATA.slice(0, 6)} />
      </div>
    </div>
  );
};

export default PortfolioSection;
