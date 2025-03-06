import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // 최대 표시할 페이지 수
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      {/* 이전 페이지 버튼 */}
      <button
        className={`p-2 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-6 h-6 text-text" />
      </button>

      {/* 페이지 번호 */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2.5 py-1 rounded-full text-sm font-semibold transition ${
            page === currentPage
              ? "bg-token_bg2 text-text_sub4"
              : "text-text_sub hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        className={`p-2 transition ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-6 h-6 text-text" />
      </button>
    </div>
  );
};

export default Pagination;
