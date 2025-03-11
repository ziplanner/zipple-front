import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import img_delete from "@/app/image/icon/img_delete.svg";
import Alert from "../alert/alert";
import CustomInput from "../input/customInput";
import InputWithButton from "../input/inputWithButton";
import PrimaryBtn from "../button/primaryBtn";
import RoundPlusBtn from "../button/roundPlusBtn";
import CustomTextarea from "../textarea/customTextarea";
import { createMyPortfolio } from "@/app/api/mypage/api";

export interface PortfolioModalProps {
  onClose: () => void;
  onPortfolioCreated: () => void;
}

const MAX_IMAGES = 10;

const PortfolioModal = ({
  onClose,
  onPortfolioCreated,
}: PortfolioModalProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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

  const handleImageDelete = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const maxFileSize = 100 * 1024 * 1024;
      const allowedExtensions = ["image/png", "image/jpeg"];
      const newFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > maxFileSize) {
          setAlertMessage("파일 용량은 100MB를 초과할 수 없습니다.");
          return;
        }
        if (!allowedExtensions.includes(file.type)) {
          setAlertMessage("png, jpg 파일만 업로드 가능합니다.");
          return;
        }

        newFiles.push(file);
      }

      setUploadedImages((prev) => [...prev, ...newFiles].slice(0, MAX_IMAGES));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPortfolioFile(file);
    }
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

      setTimeout(() => {
        setAlertMessage(null);
        onPortfolioCreated();
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
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
    >
      <div className="bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col">
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">포트폴리오 등록</h1>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={onClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-menuborder" />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="flex text-text1 text-h3 mt-[22px]">
            제목 <span className="text-point text-body1_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder={"포트폴리오 제목을 입력해주세요"}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            label={""}
            name={""}
          />
          <h3 className="flex text-text1 text-h3 mt-[22px]">
            내용 <span className="text-point text-body1_m pl-1">*</span>
          </h3>
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
          <label className="text-body2_r text-text_sub4 mb-1">이미지</label>
          <div className="flex flex-wrap gap-2 items-center">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <p className="text-sm">{image.name}</p>
                <button
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 translate-x-1/5 translate-y-1/5 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))}
            {uploadedImages.length < MAX_IMAGES && (
              <RoundPlusBtn onClick={triggerFileInput} className="p-3" />
            )}
          </div>

          {/* 파일 업로드 */}
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />

          <InputWithButton
            label="파일 업로드"
            name="file"
            value={portfolioFile ? portfolioFile.name : ""}
            onChange={() => {}}
            buttonText="첨부"
            onButtonClick={() => fileInputRef.current?.click()}
            className="mt-4"
          />
        </div>

        <div className="flex items-center justify-end mt-6 pb-1">
          <PrimaryBtn text="등록하기" onClick={handleSubmit} />
        </div>
      </div>

      {alertMessage && <Alert message={alertMessage} />}
    </div>
  );
};

export default PortfolioModal;
