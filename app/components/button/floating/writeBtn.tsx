"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import useResponsive from "@/app/hook/useResponsive";

interface FloatingWriteButtonProps {
  onClick: () => void;
}

const FloatingWriteButton = ({ onClick }: FloatingWriteButtonProps) => {
  const isMd = useResponsive("md");

  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  useEffect(() => {
    // 3초 후 툴팁 자동 사라짐
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-16 ${isMd ? "right-12" : "right-4"} z-50`}>
      {/* 버튼을 감싸는 relative 컨테이너 */}
      <div className="relative">
        {/* 말풍선 툴팁 */}
        {showTooltip && (
          <div
            className="absolute -top-12 left-[-20px] md:left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm 
            px-3 py-2 rounded-lg shadow-lg animate-fadeIn whitespace-nowrap"
          >
            리뷰를 작성해주세요!
            {/* 뾰족한 삼각형 추가 */}
            <div
              className="absolute top-full left-[82%] md:left-1/3 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent
              border-r-8 border-r-transparent border-t-8 border-t-gray-800"
            />
          </div>
        )}

        {/* 글쓰기 버튼 */}
        <button
          onClick={onClick}
          className="flex items-center gap-2 bg-primary text-white p-4 rounded-full shadow-lg 
          hover:bg-primary-dark transition-all duration-300 hover:scale-105"
        >
          <Pencil className="w-5 h-5" />
          {isMd && <span className="text-sm font-medium">리뷰 쓰기</span>}
        </button>
      </div>
    </div>
  );
};

export default FloatingWriteButton;
