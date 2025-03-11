"use client";

import { Suspense } from "react";
import PortfolioMainSection from "./content/mainSection";

const PotofolioPage = () => {
  return (
    <Suspense>
      <PortfolioMainSection />
    </Suspense>
  );
};
export default PotofolioPage;
