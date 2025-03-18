"use client";

import { useEffect, useState } from "react";
import GeneralUser from "@/app/components/user/generalUser";
import AgentUser from "@/app/components/user/agentUser";
import Alert from "@/app/components/alert/alert";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";
import LoadingSpinner from "@/app/components/loading/loadingSpinner";
import UnregisteredUser from "@/app/components/user/unregisteredUser";

const MyPage = () => {
  const { userInfo } = useUserInfoStore((state) => state);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const message = localStorage.getItem("signupSuccessMessage");
    if (message) {
      setAlertMessage(message);
      localStorage.removeItem("signupSuccessMessage");
    }
  }, [userInfo]);

  if (!userInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      {alertMessage && <Alert message={alertMessage} />}

      {userInfo.roleName === "미등록" ? (
        <UnregisteredUser />
      ) : userInfo.roleName === "일반" ? (
        <GeneralUser />
      ) : (
        <AgentUser />
      )}
    </div>
  );
};

export default MyPage;
