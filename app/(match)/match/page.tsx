"use client";

import { Suspense } from "react";
import MainSection from "./content/mainSection";

const MatchPage = () => {
  return (
    <Suspense>
      <MainSection />
    </Suspense>
  );
};

export default MatchPage;
