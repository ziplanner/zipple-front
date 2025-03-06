"use client";

import React, { useState } from "react";

interface ToggleBtnProps {
  buttons: { text: string; path: string }[]; // 버튼 배열
  onTabChange: (tab: string) => void; // 탭 전환 처리 함수
  classname?: string;
}

const ToggleButton = ({ buttons, onTabChange, classname }: ToggleBtnProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number, path: string) => {
    setActiveIndex(index);
    onTabChange(path); // URL 변경 없이 상태로 탭을 전환
  };

  return (
    <div className={`flex items-center gap-2 ${classname}`}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleToggle(index, button.path)}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            activeIndex === index
              ? "bg-selectedoption_default border-selectedoption_border text-primary"
              : "text-sub border-sub"
          } transition duration-300`}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
