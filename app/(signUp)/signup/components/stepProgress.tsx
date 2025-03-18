import { useStepContext } from "@/app/context/stepContext";
import React from "react";

const StepProgress = () => {
  const { step } = useStepContext();

  return (
    <div className="flex flex-wrap justify-between items-center mb-20 md:mb-24">
      {/* Mobile (md 이하) Design */}
      <div className="flex md:hidden justify-between w-full">
        {["Step 1", "Step 2", "Step 3", "Step 4"].map((label, index) => (
          <div key={index} className="flex items-center space-x-2">
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
                className={`w-12 h-[2px] transition-all
                ${step > index + 1 ? "bg-primary" : "bg-gray-300"}
              `}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop (md 이상) Design */}
      <div className="hidden md:flex flex-wrap justify-between items-center w-full">
        {["Step 1", "Step 2", "Step 3", "Step 4"].map((label, index) => (
          <div key={index} className="flex items-center space-x-6">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold text-white transition-all
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
                className={`w-24 h-[4px] transition-all
                ${step > index + 1 ? "bg-primary" : "bg-gray-300"}
              `}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
