import React, { useState, useEffect } from "react";
import Image from "next/image";
import closeIcon from "@/app/image/icon/close.svg";
import PrimaryBtn from "../button/primaryBtn";

interface FileUploadModalProps {
  type: string;
  onClose: () => void;
}

const FileUploadModal = ({ type, onClose }: FileUploadModalProps) => {
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [brokerLicense, setBrokerLicense] = useState<File | null>(null);
  const [agentCertificate, setAgentCertificate] = useState<File | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log("서류 첨부 완료:", {
      사업자등록증: businessLicense ? businessLicense.name : "없음",
      중개등록증: brokerLicense ? brokerLicense.name : "없음",
      "공인중개사 자격증": agentCertificate ? agentCertificate.name : "없음",
    });

    // 실제 서버 업로드 로직 추가 가능 (ex: FormData 활용)
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="bg-white p-6 md:p-8 shadow-modal rounded-2xl w-[500px] md:w-[600px]">
        {/* 모달 헤더 */}
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">서류 첨부</h1>
          <Image
            src={closeIcon}
            alt="닫기"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-gray-200 mb-5" />

        {/* 파일 업로드 영역 */}
        <div className="grid gap-6">
          {type === "대표 공인중개사" ? (
            <>
              {/* 사업자등록증 */}
              <div>
                <h3 className="text-text1 text-body1_m mb-2">사업자등록증</h3>
                <label className="border border-gray-300 rounded-md p-10 text-center cursor-pointer block">
                  {businessLicense ? (
                    <p className="text-green-600">{businessLicense.name}</p>
                  ) : (
                    "+ 파일 추가"
                  )}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setBusinessLicense)}
                  />
                </label>
              </div>

              {/* 중개등록증 */}
              <div>
                <h3 className="text-text1 text-body1_m mb-2">중개등록증</h3>
                <label className="border border-gray-300 rounded-md p-10 text-center cursor-pointer block">
                  {brokerLicense ? (
                    <p className="text-green-600">{brokerLicense.name}</p>
                  ) : (
                    "+ 파일 추가"
                  )}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setBrokerLicense)}
                  />
                </label>
              </div>
            </>
          ) : (
            <div>
              {/* 공인중개사 자격증 */}
              <h3 className="text-text1 text-body1_m mb-2">
                공인중개사 자격증
              </h3>
              <label className="border border-gray-300 rounded-md p-10 text-center cursor-pointer block">
                {agentCertificate ? (
                  <p className="text-green-600">{agentCertificate.name}</p>
                ) : (
                  "+ 파일 추가"
                )}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setAgentCertificate)}
                />
              </label>
            </div>
          )}
        </div>

        {/* 첨부 버튼 */}
        <div className="flex justify-center mt-6">
          <PrimaryBtn text="첨부하기" onClick={handleUpload} />
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
