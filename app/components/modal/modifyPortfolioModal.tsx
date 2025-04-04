import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import img_delete from "@/app/image/icon/img_delete.svg";
import Alert from "../alert/alert";
import CustomInput from "../input/customInput";
import CustomTextarea from "../textarea/customTextarea";
import PrimaryBtn from "../button/primaryBtn";
import RoundPlusBtn from "../button/roundPlusBtn";
import { updatePortfolio } from "@/app/api/mypage/api";

export interface ModifyPortfolioModalProps {
  onClose: () => void;
  onPortfolioUpdated: () => void;
  portfolio: {
    id: string;
    title: string;
    content: string;
    url: string;
    existingImages: { name: string; url: string }[];
  };
}

const MAX_IMAGES = 10;

const ModifyPortfolioModal = ({
  onClose,
  onPortfolioUpdated,
  portfolio,
}: ModifyPortfolioModalProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>(portfolio.title);
  const [details, setDetails] = useState<string>(portfolio.content);
  const [portfolioUrl, setPortfolioUrl] = useState<string>(portfolio.url || "");
  const [newUploadedImages, setNewUploadedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(
    portfolio.existingImages
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const totalImageCount = newUploadedImages.length + existingImages.length;

  const triggerFileInput = () => {
    imageInputRef.current?.click();
  };

  const handleNewImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: File[] = [];
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
      }
      setNewUploadedImages((prev) =>
        [...prev, ...newImages].slice(0, MAX_IMAGES - existingImages.length)
      );
    }
  };

  const handleNewImageDelete = (index: number) => {
    setNewUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExistingImageDelete = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 유효성 검사 함수
  const validateForm = () => {
    // 제목과 내용, 링크는 필수값
    if (!title.trim()) {
      setAlertMessage("포트폴리오 제목을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("포트폴리오 내용을 입력해주세요.");
      return false;
    }
    if (!portfolioUrl.trim()) {
      setAlertMessage("포트폴리오 링크를 입력해주세요.");
      return false;
    }

    // URL 형식 유효성 검사
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    if (!urlPattern.test(portfolioUrl.trim())) {
      setAlertMessage("올바른 URL을 입력해주세요.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("portfolioTitle", title);
    formData.append("portfolioContent", details);

    // 기존 이미지들을 fetch해서 File로 변환 후 추가
    for (const image of existingImages) {
      try {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const file = new File([blob], image.name, { type: blob.type });
        formData.append("portfolioImages", file);
      } catch (err) {
        console.error("기존 이미지 파일 변환 실패:", err);
      }
    }

    // 새로 업로드한 이미지 추가
    newUploadedImages.forEach((file) => {
      formData.append("portfolioImages", file);
    });

    if (portfolioUrl.trim()) {
      formData.append("portfolioLink", portfolioUrl.trim());
    }

    try {
      await updatePortfolio(portfolio.id, formData);
      setAlertMessage("포트폴리오가 성공적으로 수정되었습니다.");
      setTimeout(() => {
        onPortfolioUpdated();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("포트폴리오 수정 실패:", error);
      setAlertMessage("포트폴리오 수정 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col">
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">포트폴리오 수정</h1>
          <Image
            src={close}
            alt="닫기"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>

        <div className="h-[1px] bg-menuborder" />

        <div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
          <h3 className="flex text-text1 text-h3 mt-[22px]">
            제목 <span className="text-point text-body1_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="포트폴리오 제목을 입력해주세요"
            className="mb-4"
            label=""
            name=""
          />

          <h3 className="flex text-text1 text-h3 mt-[22px]">
            내용 <span className="text-point text-body1_m pl-1">*</span>
          </h3>
          <CustomTextarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="포트폴리오 내용을 입력해주세요."
            maxLength={3000}
            label=""
            name=""
            className="mb-4"
          />

          <h3 className="flex text-text1 text-h3 mt-[22px]">이미지</h3>
          <div className="flex flex-wrap gap-2 items-center mt-2">
            {/* 기존 이미지 미리보기 */}
            {existingImages.map((image, index) => (
              <div key={`existing-${index}`} className="relative">
                <Image
                  src={image.url}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
                <p className="text-sm">{image.name}</p>
                <button
                  onClick={() => handleExistingImageDelete(index)}
                  className="absolute top-0 right-0 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))}

            {/* 새로 업로드한 이미지 미리보기 */}
            {newUploadedImages.map((image, index) => (
              <div key={`new-${index}`} className="relative">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
                <p className="text-sm">{image.name}</p>
                <button
                  onClick={() => handleNewImageDelete(index)}
                  className="absolute top-0 right-0 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))}

            {totalImageCount < MAX_IMAGES && (
              <RoundPlusBtn onClick={triggerFileInput} className="p-3" />
            )}
          </div>

          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            multiple
            accept="image/*"
            onChange={handleNewImageUpload}
          />

          <h3 className="flex text-text1 text-h3 mt-[22px]">링크</h3>
          <CustomInput
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="URL을 등록해주세요."
            className="mb-4"
            label=""
            name=""
          />
        </div>

        <div className="flex items-center justify-end mt-6 pb-1">
          <PrimaryBtn text="수정하기" onClick={handleSubmit} />
        </div>

        {alertMessage && <Alert message={alertMessage} />}
      </div>
    </div>
  );
};

export default ModifyPortfolioModal;
