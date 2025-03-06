"use client";

import { useState } from "react";
import FloatingWriteButton from "@/app/components/button/floating/writeBtn";
import UserProfile from "@/app/components/user/userProfile";
import ReviewModal from "@/app/components/modal/reviewModal";
import ReviewBottomSheet from "@/app/components/bottomSheet/reviewBottomSheet";
import test10 from "@/app/image/test/test10.png";
import useResponsive from "@/app/hook/useResponsive";

const User = () => {
  const isMd = useResponsive("md");
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

  return (
    <div className="flex w-full pt-10">
      <UserProfile
        name="Jeremy Rose"
        imageUrl={test10}
        phoneNumber="+1 123 456 7890"
        address="525 E 68th Street, New York, NY 10651-78"
        email="hello@jeremymrose.com"
        website="www.jeremymrose.com"
        rating={4}
        field={""}
        description={"안녕하세요 저는 공인중개사입니다."}
        contactUrl="https://blog.naver.com/junghoon7771/2230401001351"
        registrationInfo={"33557419011"}
        work={""}
      />

      {/* 글쓰기 버튼 */}
      <FloatingWriteButton onClick={handleWriteClick} />

      {/* 모달/바텀시트 */}
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

export default User;
