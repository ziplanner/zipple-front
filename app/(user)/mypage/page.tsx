"use client";

import { useEffect, useState } from "react";
import GeneralUser from "@/app/components/user/generalUser";
import AgentUser from "@/app/components/user/agentUser";
import Alert from "@/app/components/alert/alert";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";
import LoadingSpinner from "@/app/components/loading/loadingSpinner";
import { getGeneralUserInfo } from "@/app/api/user/api";

const MyPage = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { userInfo } = useUserInfoStore((state) => state);

  useEffect(() => {
    const message = localStorage.getItem("signupSuccessMessage");
    if (message) {
      setAlertMessage(message);
      localStorage.removeItem("signupSuccessMessage");
    }
  }, []);

  if (!userInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      {alertMessage && <Alert message={alertMessage} />}

      {userInfo.roleName === "GENERAL" ? <GeneralUser /> : <AgentUser />}
    </div>
  );
};

export default MyPage;
