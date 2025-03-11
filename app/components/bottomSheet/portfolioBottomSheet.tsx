"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import img_delete from "@/app/image/icon/img_delete.svg";
import Alert from "@/app/components/alert/alert";
import CustomInput from "@/app/components/input/customInput";
import InputWithButton from "@/app/components/input/inputWithButton";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import RoundPlusBtn from "@/app/components/button/roundPlusBtn";
import CustomTextarea from "@/app/components/textarea/customTextarea";
import { createMyPortfolio } from "@/app/api/mypage/api";

interface PortfolioBottomSheetProps {
  onClose: () => void;
  onPortfolioCreated: () => void;
}

const MAX_IMAGES = 10;

const PortfolioBottomSheet = ({
  onClose,
  onPortfolioCreated,
}: PortfolioBottomSheetProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const sheetRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    if (!title.trim()) {
      setAlertMessage("포트폴리오 제목을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("포트폴리오 내용을 입력해주세요.");
      return false;
    }
    if (uploadedImages.length === 0 && !portfolioFile && !portfolioUrl.trim()) {
      setAlertMessage("사진, 파일, URL 중 하나를 등록해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("portfolioTitle", title);
    formData.append("portfolioContent", details);

    uploadedImages.forEach((image) => {
      formData.append("portfolioImages", image);
    });

    if (portfolioFile) {
      formData.append("portfolioFile", portfolioFile);
    }

    if (portfolioUrl.trim()) {
      formData.append("portfolioUrl", portfolioUrl.trim());
    }

    try {
      await createMyPortfolio(formData);
      setAlertMessage("포트폴리오가 성공적으로 등록되었습니다.");
      onPortfolioCreated();
      setTimeout(() => {
        setAlertMessage(null);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("포트폴리오 등록 실패:", error);
      setAlertMessage("포트폴리오 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="background"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end duration-300"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
    >
      <div
        ref={sheetRef}
        className={`bg-white w-full p-5 max-h-[75vh] overflow-y-auto shadow-modal rounded-t-2xl transition-transform duration-300
    ${isClosing ? "translate-y-full" : "translate-y-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            포트폴리오 등록
          </h1>
          <button onClick={onClose}>
            <Image src={close} alt="닫기" width={24} height={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
          {/* 제목 입력 */}
          <h3 className="text-text1 text-mobile_body1_sb">제목 *</h3>
          <CustomInput
            value={title}
            placeholder={"포트폴리오 제목을 입력해주세요"}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            label={""}
            name={""}
          />

          {/* 내용 입력 */}
          <h3 className="text-text1 text-mobile_body1_sb">내용 *</h3>
          <CustomTextarea
            placeholder="포트폴리오 내용을 입력해주세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={3000}
            label={""}
            name={""}
            className="mb-4"
          />

          {/* 이미지 업로드 */}
          <h3 className="text-text1 text-mobile_body1_sb">이미지 업로드</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <p className="text-sm">{image.name}</p>
                <button
                  onClick={() =>
                    setUploadedImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute top-0 right-0 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))}
            {uploadedImages.length < MAX_IMAGES && (
              <RoundPlusBtn
                onClick={() => imageInputRef.current?.click()}
                className="p-1.5"
              />
            )}
          </div>

          {/* 파일 업로드 */}
          <InputWithButton
            label="파일 업로드"
            name="file"
            value={portfolioFile ? portfolioFile.name : ""}
            onChange={() => {}}
            buttonText="첨부"
            onButtonClick={() => fileInputRef.current?.click()}
            className="mt-4"
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => setPortfolioFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* 등록 버튼 */}
        <div className="flex items-center justify-end mt-6 pb-1">
          <PrimaryBtn text="등록하기" onClick={handleSubmit} />
        </div>

        {alertMessage && <Alert message={alertMessage} />}
      </div>
    </div>
  );
};

export default PortfolioBottomSheet;
