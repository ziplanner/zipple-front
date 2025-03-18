import { useStepContext } from "@/app/context/stepContext";
import React from "react";
import Step1_TypeSelection from "../../components/step1_TypeSelection";
import Step2_AgentSelection from "../../components/step2_AgentSelection";
import StepProgress from "../../components/stepProgress";
import Step3_Auth from "../../components/step3_Auth";
import Step4_FileUpload from "../../components/step4_FileUpload";

const MainSection = () => {
  const { step } = useStepContext();

  return (
    <div className="max-w-screen-md px-4 mx-auto relative">
      {/* 🔹 상단 진행 바 (Progress Bar) */}
      <StepProgress />

      {/* 🔹 현재 Step에 따라 다른 컴포넌트 렌더링 */}
      {step === 1 && <Step1_TypeSelection />}
      {step === 2 && <Step2_AgentSelection />}
      {step === 3 && <Step3_Auth />}
      {step === 4 && <Step4_FileUpload />}
    </div>
  );
};

export default MainSection;
