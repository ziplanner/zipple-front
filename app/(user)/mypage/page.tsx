"use client";

import { useEffect, useState } from "react";
import GeneralUser from "@/app/components/user/generalUser";
import AgentUser from "@/app/components/user/agentUser";
import Alert from "@/app/components/alert/alert";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";
import LoadingSpinner from "@/app/components/loading/loadingSpinner";
import AlertWithBtn from "@/app/components/alert/alertwithBtn";
import { useRouter } from "next/navigation";

const MyPage = () => {
  const router = useRouter();
  const { userInfo } = useUserInfoStore((state) => state);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showSignupAlert, setShowSignupAlert] = useState<boolean>(false);

  useEffect(() => {
    const message = localStorage.getItem("signupSuccessMessage");
    if (message) {
      setAlertMessage(message);
      localStorage.removeItem("signupSuccessMessage");
    }
    if (userInfo?.roleName === "미등록") {
      setShowSignupAlert(true);
    }
  }, [userInfo]);

  if (!userInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      {alertMessage && <Alert message={alertMessage} />}

      {userInfo.roleName === "GENERAL" ? <GeneralUser /> : <AgentUser />}
      {/* 미등록 회원 Alert */}
      {showSignupAlert && (
        <AlertWithBtn
          title="회원가입 필요"
          message="회원가입이 완료되지 않았습니다. 가입을 완료해주세요."
          onConfirm={() => router.push("/signup")}
          confirmText="가입하기"
        />
      )}
    </div>
  );
};

export default MyPage;
