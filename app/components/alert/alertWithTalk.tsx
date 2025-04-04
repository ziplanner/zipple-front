"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import logo from "@/app/image/icon/logo_icon.svg";

interface AlertWithTalkPops {
  title?: string;
  message1?: string;
  message2?: string;
  description?: string;
  onClose: () => void;
}

const AlertWithTalk = ({
  title,
  message1,
  message2,
  description,
  onClose,
}: AlertWithTalkPops) => {
  const handleKakaoClick = () => {
    window.open("https://pf.kakao.com/_FxmWYG", "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[320px] p-6 rounded-xl shadow-lg relative flex flex-col items-center">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* 말풍선 로고 영역 */}
        {/* <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
          <Image src={logo} alt="logo" width={32} height={32} />
        </div> */}
        {/* <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center">
          <Image src={logo} alt="logo" width={28} height={28} />
        </div> */}

        {/* 타이틀 */}
        <h2 className="text-lg font-semibold text-gray-900 mt-1">
          {title || "문의하기"}
        </h2>

        {/* 메시지 */}
        <p className="text-gray-700 text-sm mt-3 mb-6 text-center">
          {message1 || "궁금한 점이 있다면"}
          <br />
          {message2 || "카카오톡 채널로 편하게 문의해주세요!"}
        </p>

        {/* 카카오톡 연결 버튼 */}
        <div className="flex flex-col items-center space-y-4">
          {/* 말풍선 로고 */}
          {/* <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center">
            <Image src={logo} alt="logo" width={28} height={28} />
          </div> */}
          {/* 버튼 */}
          <button
            onClick={handleKakaoClick}
            className="bg-[#FEE500] text-black font-semibold py-3 px-4 rounded-lg w-full flex items-center justify-center
            gap-2 shadow-md hover:brightness-95 transition mb-2"
          >
            <MessageCircle size={18} />
            {description || "채널톡 바로가기"}
          </button>
        </div>

        {/* 하단 안내 문구 */}
        {/* <p className="text-xs text-gray-500 mt-3 mb-3 text-center">
          평일 오전 10시 ~ 오후 6시 상담 가능
        </p> */}
      </div>
    </div>
  );
};

export default AlertWithTalk;
