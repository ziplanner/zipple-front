import React, { useState, useEffect } from "react";
import { useStepContext } from "@/app/context/stepContext";
import AgentInfo from "../agent/content/agentInfo";
import PrimaryBtn from "@/app/components/button/primaryBtn";

const Step2_AgentSelection = () => {
  const {
    setStep,
    setSelectedOffice,
    selectedOffice,
    setAgentRegistrationNumber,
    setSelectedOfficeOwner,
    setBusinessName,
    setOfficeAddress,
    setOwnerName,
    setPrimaryContactNumber,
  } = useStepContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]); // 필터링된 데이터 상태
  const [data, setData] = useState<any[]>([]); // 전체 중개사무소 목록
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  console.log(selectedOffice);

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

  // 검색 실행
  const handleSearch = () => {
    const results = data.filter(
      (office) =>
        office.중개사무소명.includes(searchQuery) ||
        office.소재지도로명주소.includes(searchQuery)
    );
    setIsOpen(true);
    setFilteredData(results);
  };

  // 엔터 키로 검색
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="animate-fadeIn relative">
      <h3 className="text-center mobile_h3 md:text-h3 mb-3 md:mb-5">
        중개사무소 검색
      </h3>

      {/* 검색 필드 */}
      <div className="md:w-[400px] mx-auto mb-8 flex items-center relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="중개사무소명 또는 주소 검색"
          className="w-full p-3 border rounded-lg mr-2 text-body1_r md:text-h4 focus:outline-none focus:border-searchbarborder" // 포커스시 searchbarborder 색상 적용
        />
        <button
          className="bg-primary text-white py-3 px-6 rounded-lg whitespace-nowrap text-body1_sb md:text-h4_sb"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      {/* 검색 결과 드롭다운 */}
      {filteredData.length > 0 && searchQuery && isOpen && (
        <div
          className="absolute z-10 w-full md:w-[400px] bg-white border border-gray-300 top-20 md:top-24
          rounded-lg shadow-md max-h-60 overflow-y-auto custom-scrollbar mt-2 left-1/2 transform -translate-x-1/2"
        >
          <ul>
            {filteredData.map((office, index) => (
              <li
                key={index}
                className="p-2 md:p-3 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedOfficeOwner(office.대표자명);
                  setOwnerName(office.대표자명 || "정보 없음");
                  setAgentRegistrationNumber(office.개설등록번호);
                  setBusinessName(office.중개사무소명);
                  setOfficeAddress(office.소재지도로명주소);
                  setSelectedOffice(office);
                  setPrimaryContactNumber(office.전화번호);
                  setIsOpen(false);
                }}
              >
                <p className="text-mobile_body1_sb md:text-h4_sb">
                  {office.중개사무소명}
                </p>
                <p className="text-mobile_body2_r md:text-body2_m text-text_sub4">
                  {office.소재지도로명주소}
                </p>
                <p className="text-mobile_body2_r md:text-body2_m mt-1.5 text-text_sub3">
                  ☎ {office.전화번호 || "번호 없음"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 선택된 중개사무소 정보 표시 */}
      {selectedOffice ? (
        <AgentInfo selectedOffice={selectedOffice} />
      ) : (
        <div className="min-h-[200px]" />
      )}

      {/* 이전 및 다음 버튼 */}
      <div className="flex justify-between mt-8">
        <button
          className="text-gray-500 hover:underline text-mobile_body2_r md:text-h4_r"
          onClick={() => setStep(1)}
        >
          이전
        </button>
        <PrimaryBtn
          text={"다음"}
          onClick={() => {
            setStep(3); // 선택된 중개사무소로 다음 단계로 이동
          }}
        />
      </div>
    </div>
  );
};

export default Step2_AgentSelection;
