import React from "react";
import { Edit2, Trash2 } from "lucide-react";

interface TabMenuProps {
  setIsModalOpen: (open: boolean) => void;
  handleTabDelete: () => void;
  handleTabEdit: () => void; // 수정 함수 추가
}

const TabMenu: React.FC<TabMenuProps> = ({
  setIsModalOpen,
  handleTabDelete,
  handleTabEdit, // 수정 함수 전달 받기
}) => {
  return (
    <div
      className="absolute top-full mt-2 right-0 w-28 md:w-40 bg-white
    shadow-lg rounded-md z-50 border text-xs md:text-sm"
    >
      {/* 수정 버튼 */}
      <button
        className="flex items-center w-full px-3 py-1.5 md:px-4 md:py-2 text-gray-700 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          handleTabEdit(); // 수정 버튼 클릭 시 handleTabEdit 호출
          setIsModalOpen(false); // 메뉴 닫기
        }}
      >
        <Edit2 className="w-3 h-3 md:w-4 md:h-4 mr-2" /> 수정
      </button>
      <div className="h-[1px] bg-gray-200" />
      {/* 삭제 버튼 */}
      <button
        className="flex items-center w-full px-3 py-1.5 md:px-4 md:py-2 text-red-600 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          handleTabDelete(); // 삭제 버튼 클릭 시 handleTabDelete 호출
          setIsModalOpen(false); // 메뉴 닫기
        }}
      >
        <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-2" /> 삭제
      </button>
    </div>
  );
};

export default TabMenu;
