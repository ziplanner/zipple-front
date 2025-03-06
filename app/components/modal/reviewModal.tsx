import React, { useState, useEffect } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import Alert from "../alert/alert";
import CustomInput from "../input/customInput";
import CustomTextarea from "../textarea/customTextarea";
import PrimaryBtn from "../button/primaryBtn";
import ReactStars from "react-stars";

export interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; details: string; rating: number }) => void;
}

const ReviewModal = ({ onClose, onSubmit }: ReviewModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
          <h1 className="text-text1 text-h1_contents_title">리뷰 작성</h1>
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
          {/* 제목 입력 */}
          <h3 className="flex text-text1 text-h3 mt-[22px]">
            제목 <span className="text-point text-body1_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder={"리뷰 제목을 입력해주세요"}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            label={""}
            name={""}
          />

          {/* 별점 입력 */}
          <h3 className="flex text-text1 text-h3 mt-[22px]">
            별점 <span className="text-point text-body1_m pl-1">*</span>
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <ReactStars
              count={5}
              value={rating}
              onChange={(newRating: any) => setRating(newRating)}
              size={30}
              color2="#ffd700"
            />
            <span className="text-text1 text-body1_m">{rating}점</span>
          </div>

          {/* 내용 입력 */}
          <h3 className="flex text-text1 text-h3 mt-[22px]">
            내용 <span className="text-point text-body1_m pl-1">*</span>
          </h3>
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
      </div>

      {alertMessage && <Alert message={alertMessage} />}
    </div>
  );
};

export default ReviewModal;
