import React from "react";
import Image, { StaticImageData } from "next/image";
import PrimaryLargeBtn from "../button/primaryLargeBtn";
import ColorBadge from "../badge/colorBadge";
import { tokenColorMapping } from "@/app/utils/badgeColor";
import testImg from "@/app/image/test/baby.png";
import { FaStar } from "react-icons/fa";

const badges = [
  { text: "대표", color: "C_TOKEN_3" },
  { text: "1인 가구 전문가", color: "C_TOKEN_7" },
];

const UserCard = () => {
  return (
    <div className="p-4 w-[244px]">
      {/* 프로필 사진 */}
      <div className="justify-self-center min-w-[180px] min-h-[180px] mb-3">
        <Image
          src={testImg}
          alt={"user"}
          width={180}
          height={180}
          className="w-[180px] h-[180px] rounded-full object-cover border-2 border-border"
        />
      </div>

      {/* 이름 및 직업 */}
      <h2 className="text-center text-text text-h4 mt-2">권수연</h2>
      <p className="text-center text-text_sub3 text-body3_r">공인중개사</p>

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

      <div className="mt-10 flex flex-col items-center space-y-3">
        <PrimaryLargeBtn
          text={"프로필 수정하기"}
          onClick={() => {}}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default UserCard;
