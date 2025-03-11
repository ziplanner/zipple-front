"use client";

import { Suspense } from "react";
import ReviewMainSection from "./content/mainSection";

const ReviewPage = () => {
  return (
    <Suspense>
      <ReviewMainSection />
    </Suspense>
  );
};
export default ReviewPage;
