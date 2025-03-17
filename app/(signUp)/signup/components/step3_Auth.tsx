import React, { useState } from "react";
import AuthModal from "@/app/components/modal/authModal";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import { useStepContext } from "@/app/context/stepContext";

const Step3_Auth = () => {
  const { selectedType, setStep, selectedOfficeOwner } = useStepContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  return (
    <div className="animate-fadeIn">
      <h3 className="text-center text-mobile_h3 md:text-h3 mt-12 md:mt-16 mb-4">
        본인 인증
      </h3>
      <div className="flex justify-center">
        <PrimaryBtn text="인증하기" onClick={() => setIsAuthModalOpen(true)} />
      </div>

      {/* 본인 인증 모달 */}
      {isAuthModalOpen && (
        <AuthModal
          type={selectedType}
          selectedOfficeOwner={selectedOfficeOwner}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {/* 이전 & 다음 버튼 */}
      <div className="flex justify-between mt-8">
        <button
          className="text-gray-500 hover:underline"
          onClick={() => setStep(2)}
        >
          이전 단계로 돌아가기
        </button>
        <PrimaryBtn text="다음" onClick={() => setStep(4)} />
      </div>
    </div>
  );
};

export default Step3_Auth;
