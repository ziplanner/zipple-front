"use client";

import ProfileCard from "@/app/components/card/profileCard";
import { useSearchParams } from "next/navigation";
import { PROFESSIONALS } from "@/app/data/match";

const Profile = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const professional = PROFESSIONALS.find((pro) => pro.id === id);

  if (!professional) {
    return (
      <div className="text-center text-red-500">
        해당 중개사를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center min-h-screen">
      <ProfileCard
        profileImage={professional.profileUrl}
        name={professional.name}
        jobTitle={professional.title}
        badges={[
          { text: "대표", color: "C_TOKEN_3" },
          { text: "1인 가구 전문가", color: "C_TOKEN_7" },
        ]}
        reviewCount={professional.reviewCount}
        scores={[
          { label: "친절해요", value: 95, rank: 5, emoji: "😊" },
          { label: "믿음이 가요", value: 80, rank: 12, emoji: "💖" },
          { label: "또 만나고 싶어요", value: 85, rank: 10, emoji: "🤝" },
        ]}
        isAvailable={true}
        isLiked={false}
      />
    </div>
  );
};

export default Profile;
