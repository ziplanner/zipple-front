import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { MdFavorite } from "react-icons/md";
import PrimaryLargeBtn from "../button/primaryLargeBtn";
import ColorBadge from "../badge/colorBadge";
import { tokenColorMapping } from "@/app/utils/badgeColor";
import Alert from "../alert/alert";

interface ProfileCardProps {
  profileImage: string | StaticImageData;
  name: string;
  jobTitle: string;
  badges: { text: string; color: string }[];
  reviewCount: number;
  scores: { label: string; value: number; rank: number; emoji: string }[];
  isAvailable: boolean;
  isLiked: boolean;
}

const ProfileCard = ({
  profileImage,
  name,
  jobTitle,
  badges,
  reviewCount,
  scores,
  isAvailable,
  isLiked: initialIsLiked,
}: ProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleCopyClick = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("복사 실패", error);
      });
  };

  return (
    // <div className="p-4 w-[244px] bg-white shadow-md rounded-lg">
    <div className="p-4 w-[244px] ">
      {/* 프로필 사진 */}
      <div className="relative justify-self-center min-w-[180px] min-h-[180px] mb-3">
        <Image
          src={profileImage}
          alt={name}
          width={180}
          height={180}
          className="w-[180px] h-[180px] rounded-full object-cover border-2 border-border"
        />
        {/* 하트 버튼 */}
        <div
          className="absolute bottom-0 right-0 p-1 cursor-pointer text-point"
          onClick={handleLikeClick}
        >
          {isLiked ? (
            <MdFavorite size={32} className="text-point" />
          ) : (
            <MdFavorite size={32} className="text-border" />
          )}
        </div>
      </div>

      {/* 이름 및 직업 */}
      <h2 className="text-center text-text text-h4 mt-2">{name}</h2>
      <p className="text-center text-text_sub3 text-body3_r">{jobTitle}</p>

      {/* 배지 */}
      <div className="flex justify-center gap-2 mt-3">
        {badges.map((badge, index) => (
          <ColorBadge
            key={index}
            text={badge.text}
            color={badge.color as keyof typeof tokenColorMapping}
            border="rounded"
          />
        ))}
      </div>

      {/* 후기 수 */}
      {/* <p className="text-center text-text_sub mt-2 text-body4_r">
        후기 {reviewCount}건
      </p> */}

      {/* 고정된 점수 항목 (믿음이 가요, 친절해요) */}
      <div className="mt-16 space-y-3">
        {scores.map((score, index) => (
          <div key={index} className="flex flex-col justify-between gap-0.5">
            <div className="flex  justify-between">
              <span className="text-body3_m text-text_sub">
                {score.label} {score.emoji}
              </span>
              <span className="text-body4_r text-primary">
                (상위 {score.rank}%)
              </span>
            </div>

            <div className="w-full bg-disable rounded-full h-2">
              <div
                className="h-2 bg-primary rounded-full"
                style={{ width: `${score.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className="mt-10 flex flex-col items-center space-y-3">
        <div
          className={`px-5 py-[11px] rounded-md text-h4_sb w-full text-center
       text-primary border border-primary bg-selectedoption_default cursor-pointer`}
          onClick={() => {
            handleCopyClick("010 - 0204 - 5679");
          }}
        >
          010 - 0204 - 5679
        </div>
        <PrimaryLargeBtn
          text={"후기 작성"}
          onClick={() => {}}
          className="w-full"
        />
      </div>
      {showAlert && <Alert message="전화번호가 복사되었습니다!" />}
    </div>
  );
};

export default ProfileCard;
