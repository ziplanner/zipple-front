import React from "react";
import Image from "next/image";
import ReactStars from "react-stars";

interface ReviewProps {
  name: string;
  imageUrl: string;
  title: string;
  description: string;
  rating: number;
  date: string;
}

const ReviewCard = ({
  name,
  imageUrl,
  title,
  description,
  rating,
  date,
}: ReviewProps) => {
  return (
    <div
      className="flex flex-row w-full gap-1.5 md:gap-2.5 bg-white border rounded-lg p-3 md:p-6 mx-auto
    shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-300 mb-1 border-border"
    >
      <div className="flex w-full flex-col md:gap-3 gap-2">
        <div className="flex flex-row items-center gap-2 md:gap-3.5">
          {/* 프로필 이미지 */}
          <div className="mb-0 md:min-w-[48px] md:min-h-[48px] min-w-[36px] min-h-[36px]">
            <Image
              src={imageUrl}
              alt={name}
              width={36}
              height={36}
              className="md:w-12 md:h-12 h-[36px] w-[36px] rounded-full object-cover"
            />
          </div>
          <div className="flex flex-row w-full justify-between">
            {/* 텍스트 및 별 */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <p className="text-body1_m font-semibold text-text">{name}</p>
                <p className="text-[10px] md:text-body4_r text-text_sub3">
                  고객님의 리뷰
                </p>
              </div>
              {/* ✅ react-stars 적용 */}
              <ReactStars
                count={5} // 최대 별 개수
                value={rating} // 별점 값 (소수점 포함 가능)
                size={20} // 별 크기 조정
                color2={"#facc15"} // ⭐ 활성화된 별 색상 (Tailwind yellow-400)
                color1={"#e5e7eb"} // ⬜ 비활성화된 별 색상 (Tailwind gray-300)
                edit={false} // 별점을 수정할 수 없도록 설정 (읽기 전용)
                half={true} // ✅ 반 개 별(0.5 단위) 지원
              />
            </div>
            <p className="text-body4_r text-sub3">{date}</p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col mt-6">
          <h3 className="text-mobile_h3 md:text-h3 text-text line-clamp-2">
            {title}
          </h3>
          <p className="text-mobile_body3_r md:text-body2_r text-text_sub4 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
