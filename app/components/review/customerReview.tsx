import { ReviewItem } from "@/app/types/user";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const CustomerReview = ({
  nickname,
  profileUrl,
  content,
  starCount,
  createdAt,
  updatedAt,
  reviewId,
}: ReviewItem) => {
  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < starCount);

  return (
    <div
      className="flex flex-row w-full gap-2.5 bg-white border rounded-lg p-3 md:p-6 max-w-lg mx-auto
    shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-300 mb-1 border-border"
    >
      <div className="flex flex-col md:gap-3 gap-2">
        <div className="flex flex-row items-center gap-2 md:gap-3.5">
          {/* 프로필 이미지 */}
          <div className="mb-0 md:min-w-[48px] md:min-h-[48px] min-w-[36px] min-h-[36px]">
            <Image
              src={profileUrl}
              alt={"profile"}
              width={36}
              height={36}
              className="md:w-12 md:h-12 h-[36px] w-[36px] rounded-full object-cover"
            />
          </div>

          {/* 텍스트 및 별 */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-1.5">
              <p className="text-mobile_body2_m md:text-body1_m font-semibold text-text">
                {nickname}
              </p>
              <p className="text-[10px] md:text-body4_r text-text_sub3">
                고객님의 리뷰
              </p>
            </div>
            <div className="flex gap-1 md:text-body3_r text-mobile_body4_r">
              {stars.map((isFilled, index) =>
                isFilled ? (
                  <FaStar key={index} className="text-star" />
                ) : (
                  <FaRegStar key={index} className="text-star" />
                )
              )}
            </div>
          </div>
        </div>

        {/* Title and Description */}
        {/* <div className=""> */}
        {/* <h3 className="text-h3 text-text line-clamp-2">{title}</h3> */}
        <p className="text-mobile_body3_r md:text-body2_r text-text_sub4 mt-1 line-clamp-2">
          {content}
        </p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CustomerReview;
