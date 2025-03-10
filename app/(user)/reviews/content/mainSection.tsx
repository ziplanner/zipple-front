"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/components/pagination/pagination";
import ReviewCard from "@/app/components/review/reviewCard";
import { getReviews } from "@/app/api/review/api";
import Skeleton from "@/app/components/loading/skeleton";

interface ReviewDetail {
  reviewId: number;
  profileUrl: string;
  nickname: string;
  starCount: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const ReviewMainSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = searchParams.get("id");

  const [reviews, setReviews] = useState<ReviewDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //   const totalPages = 3;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!agentId) return;

    setLoading(true);
    setError(null);

    getReviews(agentId)
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error("🚨 Error fetching reviews:", err);
        setError("후기 데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [agentId]);

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
          고객 후기
        </h2>
        <p
          className="text-mobile_body4_r md:text-body3_m text-text_sub cursor-pointer"
          onClick={handleGoBack}
        >
          돌아가기
        </p>
      </div>

      {loading && <Skeleton />}

      <div className="w-full">
        <div className="md:space-y-6 space-y-4">
          {reviews.length > 0
            ? reviews.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  name={review.nickname}
                  imageUrl={review.profileUrl}
                  title="고객님의 리뷰"
                  description={review.content}
                  rating={review.starCount}
                  date={review.createdAt}
                />
              ))
            : !loading && (
                <div className="min-h-screen">
                  <p className="text-center text-gray-500 mt-10 text-mobile_body2_m md:text-body1_m">
                    리뷰가 없습니다.
                  </p>
                </div>
              )}
        </div>
      </div>

      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default ReviewMainSection;
