import CustomerReview from "@/app/components/review/customerReview";
import { REVIEW } from "@/app/data/review";
import { ReviewItem } from "@/app/types/user";

interface ReviewDataProps {
  data: ReviewItem[];
}

const ReviewSection = ({ data }: ReviewDataProps) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-mobile_body2_m md:text-body1_m">
        리뷰가 없습니다.
      </p>
    );
  }

  return (
    <div className="flex w-full">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-3">
        {data.map((review, index) => (
          <CustomerReview
            key={review.reviewId}
            nickname={review.nickname}
            profileUrl={review.profileUrl}
            content={review.content}
            starRating={review.starRating || 4}
            reviewId={review.reviewId}
            createdAt={review.createdAt}
            updatedAt={review.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
