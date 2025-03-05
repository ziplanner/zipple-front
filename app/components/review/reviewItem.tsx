import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ReviewProps {
  name: string;
  imageUrl: string | StaticImageData;
  title: string;
  description: string;
  rating: number;
  date: string;
}

const ReviewItem = ({
  name,
  imageUrl,
  title,
  description,
  rating,
  date,
}: ReviewProps) => {
  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < rating);

  return (
    <div
      className="flex items-start px-4 pt-0 pb-6 border-b-2 border-border gap-5 cursor-pointer"
      //   className="flex flex-row w-full gap-2.5 bg-white border rounded-lg p-6 max-w-lg mx-auto
      // shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-300 mb-1 border-border"
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-row items-center gap-3.5">
          {/* 프로필 이미지 */}
          <div className="mb-0 min-w-[48px] min-h-[48px]">
            <Image
              src={imageUrl}
              alt={name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-row w-full justify-between">
            {/* 텍스트 및 별 */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <p className="text-body1_m font-semibold text-text">{name}</p>
                <p className="text-body4_r text-text_sub3">고객님의 리뷰</p>
              </div>
              <div className="flex gap-1">
                {stars.map((isFilled, index) =>
                  isFilled ? (
                    <FaStar key={index} className="text-star" />
                  ) : (
                    <FaRegStar key={index} className="text-star" />
                  )
                )}
              </div>
            </div>
            <p className="text-body4_r text-sub3">{date}</p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col mt-6">
          <h3 className="text-h3 text-text line-clamp-2">{title}</h3>
          <p className="text-body2_r text-text_sub4 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
