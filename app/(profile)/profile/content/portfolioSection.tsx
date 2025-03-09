import PortfolioCard from "@/app/components/card/portfolioCard";
import { PortfolioItem } from "@/app/types/user";

interface PortfolioDataProps {
  data: PortfolioItem[];
}

const PortfolioSection = ({ data }: PortfolioDataProps) => {
  // 데이터가 없을 경우 렌더링하지 않음
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">포트폴리오가 없습니다.</p>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className="flex w-full flex-col gap-3 md:gap-4 md:flex-row md:flex-wrap
          md:grid md:grid-cols-3 lg:grid-cols-3 lx:grid-cols-4"
      >
        <PortfolioCard data={data} />
      </div>
    </div>
  );
};

export default PortfolioSection;
