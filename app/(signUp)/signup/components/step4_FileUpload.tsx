import React, { useState } from "react";
import FileUploadModal from "@/app/components/modal/fileUploadModal";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import { useStepContext } from "@/app/context/stepContext";

const Step4_FileUpload = () => {
  const { selectedType, setStep } = useStepContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="animate-fadeIn">
      <h3 className="text-center text-mobile_h3 md:text-h3 mt-12 md:mt-16 mb-4">
        서류 첨부
      </h3>
      <div className="flex justify-center">
        <PrimaryBtn text="첨부하기" onClick={() => setIsModalOpen(true)} />
      </div>

      {/* 서류 첨부 모달 */}
      {isModalOpen && (
        <FileUploadModal
          type={selectedType}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* 이전 & 제출 버튼 */}
      <div className="flex justify-between mt-8">
        <button
          className="text-gray-500 hover:underline"
          onClick={() => setStep(3)}
        >
          이전 단계로 돌아가기
        </button>
        <PrimaryBtn text="제출하기" onClick={() => console.log("제출 완료")} />
      </div>
    </div>
  );
};

export default Step4_FileUpload;
