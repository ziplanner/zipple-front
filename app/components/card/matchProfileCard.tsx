import React, { useState } from "react";
import ColorBadge from "../badge/colorBadge";
import { MdFavorite } from "react-icons/md";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
interface ProfileCardProps {
  professional: {
    id: string;
    profileImage: string | StaticImageData;
    name: string;
    company: string;
    title: string;
    portfolioCount: number;
    reviewCount: number;
    area: string;
    description: string;
  };
}

const MatchProfileCard = ({ professional }: ProfileCardProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(true);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleProfileClick = () => {
    router.push(`/profile?id=${professional.id}`);
  };

  return (
    <div
      className="flex items-start px-4 pt-0 pb-6 border-b-2 border-border gap-5 cursor-pointer"
      onClick={handleProfileClick}
    >
      {/* 프로필 이미지 및 하트 버튼 */}
      <div className="relative w-32 h-32 min-w-[128px] min-h-[128px]">
        <Image
          src={professional.profileImage}
          alt={professional.name}
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover border-2 border-border"
        />
        <div
          className="absolute bottom-0 right-0 p-1 cursor-pointer text-point"
          onClick={handleLikeClick}
        >
          {isLiked ? (
            <MdFavorite size={32} />
          ) : (
            <MdFavorite size={32} className="text-border" />
          )}
        </div>
      </div>

      {/* 프로필 텍스트 및 배지 */}
      <div className="flex flex-row justify-between w-full h-32 py-1.5">
        {/* 왼쪽 텍스트 */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-row items-center gap-2 text-primary font-medium text-[13px]">
            <p>{professional.area}</p> |
            <p>포토폴리오 {professional.portfolioCount}개</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 mb-1">
              <h2 className="text-[20px] font-bold text-text">
                {professional.name}
              </h2>
              <p className="text-[12px] font-medium text-text_sub">
                [{professional.company}]
              </p>
            </div>
            <div>
              <p className="text-[15px] font-medium text-text">
                {professional.title}
              </p>
              <p className="text-sub3 text-[13px] font-normal">
                {professional.description}
              </p>
            </div>
          </div>
        </div>

        {/* 오른쪽 배지와 버튼 */}
        <div className="flex flex-col justify-between text-end h-full">
          <p className="text-text_sub text-[13px] font-normal">
            후기 {professional.reviewCount}건
          </p>
          <div>
            <div className="flex gap-2">
              <ColorBadge
                text="1인 가구 전문가"
                color="C_TOKEN_2"
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

export default MatchProfileCard;
