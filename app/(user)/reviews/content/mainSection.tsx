"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!agentId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getReviews(agentId);
      setReviews(data);
      console.log("📌 최신 리뷰 데이터:", data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("후기 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 초기 및 리뷰 업데이트 시 최신 데이터 가져오기
  useEffect(() => {
    fetchReviews();
  }, [agentId]);

  const handleWriteClick = () => {
    setIsReviewOpen(true);
  };

  const handleClose = () => {
    setIsReviewOpen(false);
  };

  // 리뷰 등록 후 최신 데이터 다시 불러오기
  const handleReviewSubmit = async (reviewData: {
    content: string;
    starCount: number;
  }) => {
    console.log("리뷰 데이터 제출:", reviewData);
    setIsReviewOpen(false);
    setAlertMessage("리뷰가 성공적으로 등록되었습니다!");

    // 최신 리뷰 다시 불러오기 (서버에서 가져옴)
    await fetchReviews();

    // 일정 시간 후 알림 메시지 숨기기
    setTimeout(() => {
      setAlertMessage(null);
    }, 1500);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col min-h-[300px] md:min-h-[500px] gap-4 mt-8 mb-12 md:gap-8 md:mt-12 md:mb-20">
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
                <div className="min-h-screen flex justify-center items-center">
                  <p className="text-center text-gray-500 text-mobile_body2_m md:text-body1_m">
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

      {/* 알림 메시지 */}
      {alertMessage && <Alert message={alertMessage} duration={1500} />}
    </div>
  );
};

export default ReviewMainSection;
