"use client";

import React from "react";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import SecondaryBtn from "../button/secondaryBtn";

interface CustomAlertProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AlertWithBtn: React.FC<CustomAlertProps> = ({
  title = "알림",
  message,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[320px] p-6 rounded-xl shadow-lg flex flex-col items-center">
        {/* 제목 */}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        {/* 메시지 */}
        <p className="text-gray-700 text-sm mt-2 text-center">{message}</p>

        {/* 버튼 영역 */}
        <div className="flex justify-between gap-4 w-full mt-4">
          {onCancel && (
            <SecondaryBtn
              text={cancelText}
              onClick={onCancel}
              className="w-1/2"
            />
          )}
          <PrimaryBtn
            text={confirmText}
            onClick={onConfirm}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default AlertWithBtn;
