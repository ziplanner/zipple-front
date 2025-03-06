"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { REVIEW } from "@/app/data/review";
import Pagination from "@/app/components/pagination/pagination";
import ReviewCard from "@/app/components/review/reviewCard";

const ReviewPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-4 mt-8 mb-12 md:gap-8 md:mt-12 md:mb-20">
      <div className="flex justify-between items-center px-1 border-b pb-2">
        <h2 className="text-mobile_h1_contents_title md:text-h1_contents_title mb-2 text-text_sub2">
          Jeremy Rose님의 고객 후기
        </h2>
        <p
          className="text-mobile_body4_r md:text-body3_m text-text_sub cursor-pointer"
          onClick={handleGoBack}
        >
          돌아가기
        </p>
      </div>
      <div className="w-full">
        <div className="md:space-y-6 space-y-4">
          {REVIEW.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              imageUrl={review.imageUrl}
              title={review.title}
              description={review.description}
              rating={review.rating}
              date={review.date}
            />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReviewPage;
