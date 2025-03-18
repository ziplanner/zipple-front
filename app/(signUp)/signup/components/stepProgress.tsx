import { useStepContext } from "@/app/context/stepContext";
import React from "react";

const StepProgress = () => {
  const { step } = useStepContext();

  return (
    <div className="flex justify-between items-center md:mb-24 mb-20">
      {["Step 1", "Step 2", "Step 3", "Step 4"].map((label, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold transition-all
                ${
                  step > index + 1
                    ? "bg-primary"
                    : step === index + 1
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }
              `}
          >
            {step > index + 1 ? "✔️" : index + 1}
          </div>
          {index < 3 && (
            <div
              className={`w-16 h-[3px] transition-all 
                ${step > index + 1 ? "bg-primary" : "bg-gray-300"}
              `}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
