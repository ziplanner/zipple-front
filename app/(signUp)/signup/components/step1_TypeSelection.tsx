import { useStepContext } from "@/app/context/stepContext";
import React from "react";

const Step1_TypeSelection = () => {
  const { selectedType, setSelectedType, setStep } = useStepContext();

  return (
    <div className="animate-fadeIn">
      <h3 className="text-center text-mobile_h3 md:text-h3 mb-2 md:mb-3">
        유형 선택
      </h3>
      <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-12">
        {["대표 공인중개사", "소속 공인중개사"].map((type) => (
          <button
            key={type}
            className={`flex-1 py-3 text-center transition-all duration-300 ${
              selectedType === type
                ? "bg-primary text-white shadow-md scale-105"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <div className="flex justify-end">
        <button
          className="bg-primary text-white py-2 px-6 rounded-lg"
          onClick={() => setStep(2)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1_TypeSelection;
