import CustomerReview from "@/app/components/review/customerReview";
import { REVIEW } from "@/app/data/review";

const ReviewSection = () => {
  return (
    <div className="flex w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-3">
        {REVIEW.slice(0, 4).map((review, index) => (
          <CustomerReview
            key={index}
            name={review.name}
            imageUrl={review.imageUrl}
            title={review.title}
            description={review.description}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
