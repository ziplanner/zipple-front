"use client";

import { REVIEW } from "@/app/data/review";
import { useState } from "react";
import Pagination from "@/app/components/pagination/pagination";
import ReviewItem from "@/app/components/review/reviewItem";

const Review = () => {
  return (
    <>
      <div className="w-full">
        <div className="space-y-6">
          {REVIEW.map((review, index) => (
            <ReviewItem
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
    </>
  );
};

export default Review;
