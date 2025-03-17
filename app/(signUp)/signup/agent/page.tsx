"use client";

import MainSection from "./content/mainSection";

const AgentPage = () => {
  return (
    <div className="relative min-h-screen pt-16 pb-24 md:pt-20 md:pb-36 bg-bg_sub overflow-hidden">
      {/* 메인 컨텐츠 */}
      <div>
        <MainSection />
      </div>
    </div>
  );
};

export default AgentPage;
