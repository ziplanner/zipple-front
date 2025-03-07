"use client";

import { useEffect, useState } from "react";
import AgentUser from "@/app/components/user/agentUser";
import Alert from "@/app/components/alert/alert";

const MyPage = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    // 회원가입 완료 메시지 확인 후 표시
    const message = localStorage.getItem("signupSuccessMessage");
    if (message) {
      setAlertMessage(message);
      localStorage.removeItem("signupSuccessMessage");
    }
  }, []);

  return (
    <div className="w-full">
      {alertMessage && <Alert message={alertMessage} />} <AgentUser />
    </div>
  );
};

export default MyPage;
