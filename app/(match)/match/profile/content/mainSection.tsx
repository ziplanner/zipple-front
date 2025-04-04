import UserProfile from "@/app/components/user/userProfile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAgentProfileDetail } from "@/app/api/main/api";
import ReviewModal from "@/app/components/modal/reviewModal";
import FloatingWriteButton from "@/app/components/button/floating/writeBtn";
import useResponsive from "@/app/hook/useResponsive";
import ReviewBottomSheet from "@/app/components/bottomSheet/reviewBottomSheet";
import { UserProfileData } from "@/app/types/user";
import Alert from "@/app/components/alert/alert";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";

const MainSection = () => {
  const isMd = useResponsive("md");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { userInfo } = useUserInfoStore((state) => state);

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"reviews" | "portfolio">(
    "portfolio"
  );

  const handleWriteClick = () => {
    setIsReviewOpen(true);
  };

  const handleClose = () => {
    setIsReviewOpen(false);
  };

  const handleReviewSubmit = async (reviewData: {
    content: string;
    starCount: number;
  }) => {
    console.log("리뷰 데이터 제출:", reviewData);
    setIsReviewOpen(false);
    setAlertMessage("리뷰가 성공적으로 등록되었습니다!");

    // 리뷰 등록 후 activeTab을 "reviews"로 변경
    setActiveTab("reviews");

    // 일정 시간 후 알림 메시지 숨기기
    setTimeout(() => {
      setAlertMessage(null);
    }, 1500);
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
    <div className="flex w-full pt-10 relative">
      <UserProfile
        userProfile={userProfile}
        agentId={id}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 리뷰 모달 */}
      {isReviewOpen &&
        (isMd ? (
          <div className="fixed inset-0 z-50">
            <ReviewModal
              onClose={handleClose}
              onSubmit={handleReviewSubmit}
              agentId={id || ""}
            />
          </div>
        ) : (
          <div className="fixed inset-0 z-50">
            <ReviewBottomSheet
              onClose={handleClose}
              onSubmit={handleReviewSubmit}
              agentId={id || ""}
            />
          </div>
        ))}

      {/* 글쓰기 버튼 */}
      {userInfo?.userId !== id && (
        <div className="fixed bottom-5 right-5 z-40">
          <FloatingWriteButton onClick={handleWriteClick} />
        </div>
      )}

      {/* 알림 메시지 */}
      {alertMessage && <Alert message={alertMessage} duration={1500} />}
    </div>
  );
};

export default MainSection;
