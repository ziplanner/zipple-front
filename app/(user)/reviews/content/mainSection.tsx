"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/components/pagination/pagination";
import ReviewCard from "@/app/components/review/reviewCard";
import { getReviews } from "@/app/api/review/api";
import Skeleton from "@/app/components/loading/skeleton";
import Alert from "@/app/components/alert/alert";
import ReviewBottomSheet from "@/app/components/bottomSheet/reviewBottomSheet";
import FloatingWriteButton from "@/app/components/button/floating/writeBtn";
import ReviewModal from "@/app/components/modal/reviewModal";
import useResponsive from "@/app/hook/useResponsive";

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
  const isMd = useResponsive("md");
  const searchParams = useSearchParams();
  const agentId = searchParams.get("id");

  const [reviews, setReviews] = useState<ReviewDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //   const totalPages = 3;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleWriteClick = () => {
    setIsReviewOpen(true);
  };

  const handleClose = () => {
    setIsReviewOpen(false);
  };

  const handleReviewSubmit = (reviewData: {
    content: string;
    starCount: number;
  }) => {
    console.log("리뷰 데이터 제출:", reviewData);
    setIsReviewOpen(false);

    setAlertMessage("리뷰가 성공적으로 등록되었습니다!");

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    if (!agentId) return;

    setLoading(true);
    setError(null);

    getReviews(agentId)
      .then((data) => {
        setReviews(data);
        console.log(data);
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
      {/* 글쓰기 버튼 */}
      <FloatingWriteButton onClick={handleWriteClick} />

      {/* 리뷰 모달 */}
      {isReviewOpen &&
        (isMd ? (
          <ReviewModal
            onClose={handleClose}
            onSubmit={handleReviewSubmit}
            agentId={agentId || ""}
          />
        ) : (
          <ReviewBottomSheet
            onClose={handleClose}
            onSubmit={handleReviewSubmit}
            agentId={agentId || ""}
          />
        ))}
      {alertMessage && <Alert message={alertMessage} duration={1500} />}
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default ReviewMainSection;
