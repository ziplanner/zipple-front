import React, { useState } from "react";
import ColorBadge from "../badge/colorBadge";
import { MdFavorite } from "react-icons/md";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaRegStar, FaStar, FaUserCircle } from "react-icons/fa";
import { likeAgent, unlikeAgent } from "@/app/api/like/api";

interface ProfileCardProps {
  professional: {
    agentId: string;
    profileUrl: string | StaticImageData;
    company: string;
    reviewCount: number;
    likeCount: number;
    liked: boolean;
    starRating: number;
    description: string;
    agentName: string;
    agentSpecialty: string;
    portfolioCount: number;
    title: string;
    singleHouseholdExpert: boolean;
  };
}

const MatchCard = ({ professional }: ProfileCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [liked, setLiked] = useState<boolean>(professional.liked);
  const [likeCountValue, setLikeCountValue] = useState<number>(
    professional.likeCount
  );

  const handleGoToProfile = () => {
    if (pathname.includes("/service")) {
      router.push(`/user`);
    } else {
      router.push(`/match/profile?id=${professional.agentId}`);
    }
  };

  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < professional.starRating);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지

    try {
      if (liked) {
        await unlikeAgent(professional.agentId);
        setLikeCountValue((prev) => prev - 1);
      } else {
        await likeAgent(professional.agentId);
        setLikeCountValue((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
    }
  };

  return (
    <div
      className="w-full shadow-sm md:p-3 p-2 relative cursor-pointer md:py-4 py-2"
      onClick={handleGoToProfile}
    >
      <div className="flex flex-row md:gap-5 gap-3 flex-nowrap">
        <div className="lg:w-36 lg:h-36 md:h-32 md:w-32 w-24 h-24 flex-shrink-0">
          <div
            className="relative lg:w-36 lg:h-36 md:h-32 md:w-32 w-24 h-24 overflow-hidden
          flex items-center justify-center bg-gray-200 rounded-xl"
          >
            {professional.profileUrl ? (
              <Image
                src={professional.profileUrl}
                alt="프로필"
                fill
                className="object-cover rounded-xl"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-6xl" />
            )}
          </div>
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex w-full flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col pt-1">
                <div className="flex flex-row items-center gap-2 text-primary text-[10px] md:text-body3_m">
                  <p>{professional.agentSpecialty}</p> |
                  <p>포토폴리오 {professional.portfolioCount}개</p>
                </div>
                <div className="flex flex-col mt-3">
                  <div className="flex items-center flex-row md:gap-2 gap-1">
                    <h3 className="md:text-h2 text-mobile_h4 text-text">
                      {professional.agentName}
                    </h3>
                    <p className="text-text_sub md:text-body3_r text-[9px]">
                      [{professional.company}]
                    </p>
                  </div>
                  <p className="text-mobile_body3_r md:text-h4 text-text_sub4">
                    {professional.title}
                  </p>
                  <p className="md:block hidden md:text-body3_r text-mobile_body4_r text-sub3">
                    {professional.description}
                  </p>
                </div>
              </div>
              {/* 우측 상단 하트 아이콘 */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col gap-1 items-center">
                  <MdFavorite
                    className={`md:text-h1_contents_title text-mobile_h1_contents_title cursor-pointer ${
                      liked ? "text-point" : "text-sub3"
                    }`}
                    onClick={handleLike}
                  />
                  <p className="text-body4_r text-text_sub4">
                    {likeCountValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-1 mt-2">
              <div className="flex gap-1 md:text-body3_m text-mobile_body4_r">
                {stars.map((isFilled, index) =>
                  isFilled ? (
                    <FaStar key={index} className="text-star" />
                  ) : (
                    <FaRegStar key={index} className="text-star" />
                  )
                )}
              </div>
              {professional.reviewCount > 0 && (
                <p className="md:text-body4_r text-[10px] text-sub3">
                  + {professional.reviewCount}
                </p>
              )}
            </div>
            <div className="sm_md:flex flex-row gap-2 hidden">
              <ColorBadge
                text="1인 가구 전문가"
                color="C_TOKEN_7"
                border={"rounded"}
              />
              <ColorBadge text="대표" color="C_TOKEN_4" border={"rounded"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
