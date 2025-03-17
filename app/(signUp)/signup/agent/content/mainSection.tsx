import React, { useState, useEffect, useRef } from "react";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import InputWithButton from "@/app/components/input/inputWithButton";
import AgentInfo from "./agentInfo";
import FileUploadModal from "@/app/components/modal/fileUploadModal";
import AuthModal from "@/app/components/modal/authModal";

export interface BrokerOffice {
  중개사무소명: string;
  개설등록번호: string;
  소재지도로명주소: string;
  전화번호: string;
  대표자명: string;
  홈페이지주소: string;
}

const MainSection = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<BrokerOffice[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("대표 공인중개사");
  const [filteredData, setFilteredData] = useState<BrokerOffice[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<BrokerOffice | null>(
    null
  );
  const [name, setName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedOfficeName, setSelectedOfficeName] = useState<string | null>(
    null
  );
  const [selectedOfficeOwner, setSelectedOfficeOwner] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/broker_offices.json");
        const jsonData = await response.json();
        const records = jsonData.records || [];
        setData(records);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (!Array.isArray(data)) return;
    if (searchQuery.trim() === "") {
      setFilteredData([]);
    } else {
      const results = data.filter(
        (office) =>
          office.소재지도로명주소
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          office.중개사무소명.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  // 🔹 선택 시 리스트 닫기 & 대표자명 업데이트
  const handleSelectOffice = (office: BrokerOffice) => {
    setSelectedOffice(office);
    setFilteredData([]); // 리스트 닫기
    setSearchQuery(""); // 검색어 초기화
    setName(office.대표자명 || ""); // 대표자명 자동 입력
  };

  // 🔹 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilteredData([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-screen-md px-4 mx-auto relative">
      <h1 className="text-h1_contents_title mb-12 md:mb-16">
        공인중개사 회원 가입
      </h1>

      {/* 🔹 유형 선택 버튼 */}
      <h3 className="text-center text-mobile_h3 md:text-h3 mb-2 md:mb-3">
        유형 선택
      </h3>
      <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-12">
        {["대표 공인중개사", "소속 공인중개사"].map((type) => (
          <button
            key={type}
            className={`flex-1 py-2.5 md:py-3 text-center text-gray-600 text-mobile_body2_m md:text-body1_m
              transition-all ease-in-out duration-300 relative ${
                selectedType === type
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-white hover:bg-gray-100"
              }`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 🔹 검색 입력 필드 */}
      <h3 className="text-center text-mobile_h3 md:text-h3_r mb-3 md:mb-5">
        중개사무소 정보
      </h3>
      <div className="relative">
        <InputWithButton
          label={""}
          name={""}
          placeholder="지역명 또는 중개사무소명 검색"
          value={searchQuery}
          buttonText={"검색"}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch();
          }}
          onButtonClick={handleSearch}
          className={"md:w-[400px]"}
        />

        {/* 🔹 검색 결과 드롭다운 */}
        {filteredData.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto custom-scrollbar z-50"
          >
            <ul>
              {filteredData.map((office, index) => (
                <li
                  key={index}
                  className="p-3 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectOffice(office)}
                >
                  <p className="text-h3">{office.중개사무소명}</p>
                  <p className="text-h4_r text-gray-500">
                    {office.소재지도로명주소}
                  </p>
                  <p className="text-h4_r mt-1">
                    ☎ {office.전화번호 || "번호 없음"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 🔹 선택된 공인중개사 정보 */}
      {selectedOffice && <AgentInfo selectedOffice={selectedOffice} />}

      {/* 🔹 본인 인증 */}

      <h3 className="text-center text-mobile_h3 md:text-h3 mt-12 md:mt-16 mb-4">
        본인 인증
      </h3>
      <div className="flex justify-center">
        <PrimaryBtn text="인증하기" onClick={() => setIsAuthModalOpen(true)} />
      </div>

      {/* 🔹 서류 첨부 버튼 */}
      <h3 className="text-center text-mobile_h3 md:text-h3 mt-12 md:mt-16 mb-4">
        서류 첨부
      </h3>
      <div className="flex justify-center">
        <PrimaryBtn text="첨부하기" onClick={() => setIsModalOpen(true)} />
      </div>
      {/* 🔹 본인 인증 모달 */}
      {isAuthModalOpen && (
        <AuthModal
          type={selectedType}
          selectedOfficeName={selectedOfficeName}
          selectedOfficeOwner={selectedOfficeOwner}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
      {/* 🔹 서류 첨부 모달 */}
      {isModalOpen && (
        <FileUploadModal
          type={selectedType}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MainSection;
