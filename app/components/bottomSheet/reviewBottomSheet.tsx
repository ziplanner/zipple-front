"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import Alert from "@/app/components/alert/alert";
import CustomInput from "@/app/components/input/customInput";
import CustomTextarea from "@/app/components/textarea/customTextarea";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import ReactStars from "react-stars";

interface ReviewBottomSheetProps {
  onClose: () => void;
  onSubmit: (data: { title: string; details: string; rating: number }) => void;
}

const ReviewBottomSheet = ({ onClose, onSubmit }: ReviewBottomSheetProps) => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    if (!title.trim()) {
      setAlertMessage("리뷰 제목을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("리뷰 내용을 입력해주세요.");
      return false;
    }
    if (rating === 0) {
      setAlertMessage("별점을 선택해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ title, details, rating });
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

    // 일정 높이 이상 내려가면 닫힘
    if (translateY > 100) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      // 원래 위치로
      if (sheetRef.current) {
        sheetRef.current.style.transform = "translateY(0)";
      }
    }
  };

  // 스크롤 금지
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
        className={`bg-white w-full p-5 shadow-modal rounded-t-2xl transition-transform duration-300
          ${isClosing ? "translate-y-full" : "translate-y-0"}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            리뷰 작성
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
            placeholder={"리뷰 제목을 입력해주세요"}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            label={""}
            name={""}
          />

          {/* 별점 입력 */}
          <h3 className="text-text1 text-mobile_body1_sb">별점 *</h3>
          <div className="flex items-center gap-3 mb-4">
            <ReactStars
              count={5}
              value={rating}
              onChange={(newRating: any) => setRating(newRating)}
              size={30}
              color2="#ffd700"
            />
            <span className="text-text1 text-mobile_body2_m">{rating}점</span>
          </div>

          {/* 내용 입력 */}
          <h3 className="text-text1 text-mobile_body1_sb">내용 *</h3>
          <CustomTextarea
            placeholder="리뷰 내용을 입력해주세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={3000}
            label={""}
            name={""}
            className="mb-4"
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

export default ReviewBottomSheet;
