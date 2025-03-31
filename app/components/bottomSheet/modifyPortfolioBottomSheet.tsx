import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import img_delete from "@/app/image/icon/img_delete.svg";
import Alert from "@/app/components/alert/alert";
import CustomInput from "@/app/components/input/customInput";
import CustomTextarea from "@/app/components/textarea/customTextarea";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import RoundPlusBtn from "@/app/components/button/roundPlusBtn";
import { updatePortfolio } from "@/app/api/mypage/api";

interface ModifyPortfolioBottomSheetProps {
  onClose: () => void;
  onPortfolioUpdated: () => void;
  portfolio: {
    id: string;
    title: string;
    content: string;
    url?: string;
    images: { name: string; url: string }[];
  };
}

const MAX_IMAGES = 10;

const ModifyPortfolioBottomSheet = ({
  onClose,
  onPortfolioUpdated,
  portfolio,
}: ModifyPortfolioBottomSheetProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>(portfolio.title);
  const [details, setDetails] = useState<string>(portfolio.content);
  const [portfolioUrl, setPortfolioUrl] = useState<string>(portfolio.url || "");

  const [existingImages, setExistingImages] = useState(portfolio.images);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const totalImageCount = existingImages.length + newImages.length;

  const handleExistingImageDelete = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNewImageDelete = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const added = Array.from(files).slice(0, MAX_IMAGES - totalImageCount);
      setNewImages((prev) => [...prev, ...added]);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setAlertMessage("포트폴리오 제목을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("포트폴리오 내용을 입력해주세요.");
      return false;
    }
    if (portfolioUrl.trim()) {
      const urlPattern =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
      if (!urlPattern.test(portfolioUrl)) {
        setAlertMessage("올바른 URL을 입력해주세요.");
        return false;
      }
    }
    return true;
  };

  // 기존 이미지 URL → File 변환 헬퍼
  const urlToFile = async (url: string, name: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], name, { type: blob.type });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("portfolioTitle", title);
    formData.append("portfolioContent", details);

    // 기존 이미지들을 File로 변환해서 추가
    for (const image of existingImages) {
      try {
        const file = await urlToFile(image.url, image.name);
        formData.append("portfolioImages", file);
      } catch (err) {
        console.error("기존 이미지 파일 변환 실패:", err);
      }
    }

    // 새 이미지 추가
    newImages.forEach((file) => {
      formData.append("portfolioImages", file);
    });

    if (portfolioUrl.trim()) {
      formData.append("portfolioUrl", portfolioUrl.trim());
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
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end duration-300">
      <div
        className={`bg-white w-full p-5 max-h-[75vh] overflow-y-auto shadow-modal rounded-t-2xl transition-transform duration-300 ${
          isClosing ? "translate-y-full" : "translate-y-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            포트폴리오 수정
          </h1>
          <button onClick={onClose}>
            <Image src={close} alt="닫기" width={24} height={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
          <h3 className="text-text1 text-mobile_body1_sb">제목 *</h3>
          <CustomInput
            value={title}
            placeholder="포트폴리오 제목을 입력해주세요"
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            label=""
            name=""
          />

          <h3 className="text-text1 text-mobile_body1_sb">내용 *</h3>
          <CustomTextarea
            placeholder="포트폴리오 내용을 입력해주세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={3000}
            label=""
            name=""
            className="mb-4"
          />

          <h3 className="text-text1 text-mobile_body1_sb">이미지 업로드 *</h3>
          <div className="flex flex-wrap gap-2 items-center mt-2">
            {existingImages.map((image, index) => (
              <div key={`existing-${index}`} className="relative">
                <Image
                  src={image.url}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="object-cover rounded"
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

            {newImages.map((file, index) => (
              <div key={`new-${index}`} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
                <p className="text-sm">{file.name}</p>
                <button
                  onClick={() => handleNewImageDelete(index)}
                  className="absolute top-0 right-0 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))}

            {totalImageCount < MAX_IMAGES && (
              <RoundPlusBtn
                onClick={() => imageInputRef.current?.click()}
                className="p-1.5"
              />
            )}
          </div>

          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />

          <h3 className="text-text1 text-mobile_body1_sb">링크</h3>
          <CustomInput
            value={portfolioUrl}
            placeholder="URL을 등록해주세요."
            onChange={(e) => setPortfolioUrl(e.target.value)}
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

export default ModifyPortfolioBottomSheet;
