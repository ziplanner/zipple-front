"use client";

import AgentUser from "@/app/components/user/agentUser";
import GeneralUser from "@/app/components/user/generalUser";

const MyPage = () => {
  return (
    <div className="w-full">
      <AgentUser />
      {/* <GeneralUser /> */}
    </div>
  );
};

export default MyPage;
