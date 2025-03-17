import React, { useState } from "react";
import InputWithButton from "@/app/components/input/inputWithButton";
import { useStepContext } from "@/app/context/stepContext";

const Step2_AgentSelection = () => {
  const { setStep, setSelectedOffice } = useStepContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="animate-fadeIn">
      <h3 className="text-center text-mobile_h3 md:text-h3 mb-3 md:mb-5">
        중개사무소 검색
      </h3>
      <InputWithButton
        label={""}
        name={""}
        placeholder="중개사무소명 검색"
        value={searchQuery}
        buttonText={"검색"}
        onChange={(e) => setSearchQuery(e.target.value)}
        onButtonClick={() => console.log("검색")}
        className={"md:w-[400px]"}
      />

      {/* 선택 후 다음 단계로 이동 */}
      <div className="flex justify-between mt-8">
        <button
          className="text-gray-500 hover:underline"
          onClick={() => setStep(1)}
        >
          이전
        </button>
        <button
          className="bg-primary text-white py-2 px-6 rounded-lg"
          onClick={() => {
            setSelectedOffice({ name: "선택된 사무소" });
            setStep(3);
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step2_AgentSelection;
