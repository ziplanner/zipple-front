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

interface PortfolioBottomSheetProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    details: string;
    images: string[];
    file?: File | null;
    url?: string;
  }) => void;
}

const MAX_IMAGES = 10;

const PortfolioBottomSheet = ({
  onClose,
  onSubmit,
}: PortfolioBottomSheetProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const startY = useRef(0);
  const currentY = useRef(0);
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

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        title,
        details,
        images: uploadedImages,
        file: portfolioFile,
        url: portfolioUrl.trim() || undefined,
      });
      onClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    currentY.current = e.touches[0].clientY;
    const translateY = Math.max(0, currentY.current - startY.current);

    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const handleTouchEnd = () => {
    const translateY = currentY.current - startY.current;

    if (translateY > 100) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transform = "translateY(0)";
      }
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
                <Image
                  src={image}
                  alt={`Uploaded ${index}`}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-[100px] h-[100px]"
                />
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
              <label className="flex w-[100px] h-[100px] justify-center items-center">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={() => {}}
                />
                <RoundPlusBtn
                  onClick={() => imageInputRef.current?.click()}
                  className="p-1.5"
                  btnSize="small"
                />
              </label>
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
            onChange={() => {}}
          />

          {/* URL 입력 */}
          <CustomInput
            label="URL 등록"
            name="url"
            placeholder="포트폴리오 URL 입력"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            className="mt-4"
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
