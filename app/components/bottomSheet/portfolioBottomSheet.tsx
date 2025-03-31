import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import img_delete from "@/app/image/icon/img_delete.svg";
import Alert from "@/app/components/alert/alert";
import CustomInput from "@/app/components/input/customInput";
import CustomTextarea from "@/app/components/textarea/customTextarea";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import RoundPlusBtn from "@/app/components/button/roundPlusBtn";
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

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<
    { name: string; url: string }[]
  >([]);
  const [portfolioUrl, setPortfolioUrl] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const sheetRef = useRef<HTMLDivElement>(null);

  // 이미지 삭제 함수
  const handleImageDelete = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 이미지 파일 선택 함수
  const triggerFileInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  // 이미지 업로드 처리 함수
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: { name: string; url: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileUrl = URL.createObjectURL(file);
        newImages.push({ name: file.name, url: fileUrl });
      }
      setUploadedImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));
    }
  };

  // 유효성 검사 함수
  const validateForm = () => {
    // 제목과 내용이 필수값
    if (!title.trim()) {
      setAlertMessage("포트폴리오 제목을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("포트폴리오 내용을 입력해주세요.");
      return false;
    }

    // 링크가 존재하면, URL 형식 유효성 검사 추가
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

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 2000); // 0.5초 후 alertMessage를 null로 초기화

      // 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  // 제출 함수
  const handleSubmit = async () => {
    // 유효성 검사
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("portfolioTitle", title);
    formData.append("portfolioContent", details);

    // 이미지를 폼 데이터에 추가
    uploadedImages.forEach((image) => {
      formData.append("portfolioImages", image.url); // 이미지 URL로 전송
    });

    // 링크를 폼 데이터에 추가
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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end duration-300"
      // onClick={(e) =>
      //   (e.target as HTMLDivElement).id === "background" && onClose()
      // }
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
          <h3 className="text-text1 text-mobile_body1_sb">이미지 업로드 *</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image.url}
                  alt={image.name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
                <p className="text-sm">{image.name}</p>
                <button
                  onClick={() => handleImageDelete(index)}
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
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />

          {/* 링크 입력 */}
          <h3 className="text-text1 text-mobile_body1_sb">링크</h3>
          <CustomInput
            value={portfolioUrl}
            placeholder={"URL을 등록해주세요."}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            className="mb-4"
            label={""}
            name={""}
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
