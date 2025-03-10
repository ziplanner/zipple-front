import UserProfile from "@/app/components/user/userProfile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAgentProfileDetail } from "@/app/api/main/api";
import ReviewModal from "@/app/components/modal/reviewModal";
import FloatingWriteButton from "@/app/components/button/floating/writeBtn";
import useResponsive from "@/app/hook/useResponsive";
import ReviewBottomSheet from "@/app/components/bottomSheet/reviewBottomSheet";
import { UserProfileData } from "@/app/types/user";

const MainSection = () => {
  const isMd = useResponsive("md");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

  const handleWriteClick = () => {
    setIsReviewOpen(true);
  };

  const handleClose = () => {
    setIsReviewOpen(false);
  };

  const handleReviewSubmit = (reviewData: {
    // title: string;
    content: string;
    starCount: number;
  }) => {
    console.log("리뷰 데이터 제출:", reviewData);
    setIsReviewOpen(false);
  };

  useEffect(() => {
    if (id) {
      getAgentProfileDetail(id)
        .then((data) => {
          setUserProfile(data);
          console.log(data);
        })
        .catch((error) =>
          console.error("Error fetching agent profile:", error)
        );
    }
  }, [id]);

  return (
    <div className="flex w-full pt-10">
      <UserProfile userProfile={userProfile} agentId={id} />
      {/* 글쓰기 버튼 */}
      <FloatingWriteButton onClick={handleWriteClick} />

      {/* 리뷰 모달 */}
      {isReviewOpen &&
        (isMd ? (
          <ReviewModal
            onClose={handleClose}
            onSubmit={handleReviewSubmit}
            agentId={id || ""}
          />
        ) : (
          <ReviewBottomSheet
            onClose={handleClose}
            onSubmit={handleReviewSubmit}
            agentId={id || ""}
          />
        ))}
    </div>
  );
};

export default MainSection;
