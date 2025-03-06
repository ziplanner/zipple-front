import { Suspense } from "react";
import MainSection from "./content/mainSection";

const PortfolioDetailPage = () => {
  return (
    <Suspense>
      <MainSection />
    </Suspense>
  );
};

export default PortfolioDetailPage;
