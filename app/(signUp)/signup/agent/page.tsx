"use client";

import { StepProvider } from "@/app/context/stepContext";
import MainSection from "./content/mainSection";

const AgentPage = () => {
  return (
    <StepProvider>
      <div
        className="bg-bg_sub4 relative min-h-screen pt-16 pb-24 md:pt-20 md:pb-36 
      overflow-hidden"
      >
        {/* 메인 컨텐츠 */}
        <div>
          <MainSection />
        </div>
      </div>
    </StepProvider>
  );
};

export default AgentPage;
