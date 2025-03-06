import UserProfile from "@/app/components/user/userProfile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import defaultProfileImage from "@/app/image/test/test_image.jpg";
import { getAgentProfileDetail } from "@/app/api/main/api";
import { StaticImageData } from "next/image";
import ReviewModal from "@/app/components/modal/reviewModal";
import FloatingWriteButton from "@/app/components/button/floating/writeBtn";
import useResponsive from "@/app/hook/useResponsive";
import ReviewBottomSheet from "@/app/components/bottomSheet/reviewBottomSheet";

// 백엔드 수정되면, 변경할 것.
interface UserProfileData {
  name: string;
  imageUrl: string | StaticImageData;
  work: string;
  phoneNumber: string;
  address: string;
  email: string;
  website: string;
  rating: number;
  field: string;
  description: string;
  contactUrl: string;
  registrationInfo: string;
}

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
    title: string;
    details: string;
    rating: number;
  }) => {
    console.log("리뷰 데이터 제출:", reviewData);
    setIsReviewOpen(false);
  };

  useEffect(() => {
    if (id) {
      getAgentProfileDetail(Number(id))
        .then((data) => setUserProfile(data))
        .catch((error) =>
          console.error("Error fetching agent profile:", error)
        );
    }
  }, [id]);

  return (
    <div className="flex w-full pt-10">
      <UserProfile
        name={userProfile?.name || ""}
        imageUrl={userProfile?.imageUrl || defaultProfileImage}
        work={userProfile?.work || ""}
        phoneNumber={userProfile?.phoneNumber || ""}
        address={userProfile?.address || ""}
        email={userProfile?.email || ""}
        website={userProfile?.website || ""}
        rating={userProfile?.rating || 0}
        field={userProfile?.field || ""}
        description={userProfile?.description || ""}
        contactUrl={userProfile?.contactUrl || ""}
        registrationInfo={userProfile?.registrationInfo || ""}
      />
      {/* 글쓰기 버튼 */}
      <FloatingWriteButton onClick={handleWriteClick} />

      {/* 리뷰 모달 */}
      {isReviewOpen &&
        (isMd ? (
          <ReviewModal onClose={handleClose} onSubmit={handleReviewSubmit} />
        ) : (
          <ReviewBottomSheet
            onClose={handleClose}
            onSubmit={handleReviewSubmit}
          />
        ))}
    </div>
  );
};

export default MainSection;
