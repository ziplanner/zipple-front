import React, { useState, useEffect } from "react";
import Image from "next/image";
import close from "@/app/image/icon/close.svg";
import PrimaryBtn from "../button/primaryBtn";
import InputWithButton from "../input/inputWithButton";

// 🔹 JSON 데이터 타입 정의 (전체 데이터)
interface BrokerOffice {
  중개사무소명: string;
  개설등록번호: string;
  개업공인중개사종별구분: string;
  소재지도로명주소: string;
  소재지지번주소: string;
  전화번호: string;
  개설등록일자: string;
  공제가입유무: string;
  대표자명: string;
  위도: string;
  경도: string;
  중개보조원수: string;
  소속공인중개사수: string;
  홈페이지주소: string;
  데이터기준일자: string;
  제공기관코드: string;
  제공기관명: string;
}

interface AgentSearchModalProps {
  onClose: () => void;
  onSelect: (selectedOffice: BrokerOffice) => void;
}

const AgentSearchModal: React.FC<AgentSearchModalProps> = ({
  onClose,
  onSelect,
}) => {
  const [data, setData] = useState<BrokerOffice[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<BrokerOffice[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 🔹 JSON 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/broker_offices.json");

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("올바른 JSON 파일이 아닙니다.");
        }

        const jsonData = await response.json();
        console.log("Fetched Data:", jsonData);

        let recordsArray = jsonData.records;
        if (!Array.isArray(recordsArray)) {
          throw new Error("JSON 데이터의 records 필드가 배열이 아닙니다.");
        }

        setData(recordsArray);
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Error loading JSON:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 검색 실행
  const handleSearch = () => {
    if (!Array.isArray(data)) {
      console.error("검색을 실행할 수 없습니다. 데이터가 배열이 아닙니다.");
      return;
    }

    const results = data.filter(
      (office) =>
        office.소재지도로명주소.includes(searchQuery) ||
        office.중개사무소명.includes(searchQuery)
    );
    setFilteredData(results);
  };

  return (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
    >
      <div className="bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col">
        {/* 모달 헤더 */}
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
            공인중개사 검색
          </h1>
          <Image
            src={close}
            alt="닫기"
            width={20}
            height={20}
            onClick={onClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-menuborder" />

        {/* 검색 필드 */}
        <div className="flex gap-2">
          <InputWithButton
            label={""}
            name={""}
            placeholder="지역명 또는 중개사무소명 검색"
            value={searchQuery}
            buttonText={"검색"}
            onChange={(e) => setSearchQuery(e.target.value)}
            onButtonClick={handleSearch}
          />
        </div>

        {/* 검색 결과 리스트 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar max-h-60">
          {filteredData.length > 0 ? (
            <ul className="bg-white p-2 md:p-4 rounded-md w-full">
              {filteredData.map((office, index) => (
                <li
                  key={index}
                  className="flex flex-col gap-0.5 border-b p-2 cursor-pointer hover:bg-gray-100 mt-2"
                  onClick={() => onSelect(office)}
                >
                  <p className="text-mobile_body1_sb md:text-h3">
                    {office.중개사무소명}
                  </p>
                  <p className="text-mobile_body2_r md:text-h4_r text-text_sub4">
                    {office.소재지도로명주소}
                  </p>
                  <p className="text-mobile_body2_r md:text-h4_r mt-1">
                    ☎ {office.전화번호 || "번호 없음"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-mobile_body2_m md:text-h4 text-gray-500 text-center py-10 md:py-16">
              검색 결과가 없습니다.
            </p>
          )}
        </div>

        {/* 모달 푸터 */}
        <div className="hidden md:flex items-center justify-end mt-6 pb-1">
          <PrimaryBtn text="닫기" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AgentSearchModal;
