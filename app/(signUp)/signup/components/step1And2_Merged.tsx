import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { useStepContext } from "@/app/context/stepContext";
import AgentInfo from "../agent/content/agentInfo"; // 중개사무소 정보 컴포넌트
import { UserCheck, Users } from "lucide-react";

const Step1And2_Merged = () => {
  const {
    selectedType,
    setSelectedType,
    setStep,
    selectedOffice,
    setSelectedOffice,
    setAgentRegistrationNumber,
    setSelectedOfficeOwner,
    setBusinessName,
    setOfficeAddress,
    setOwnerName,
  } = useStepContext();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]); // 전체 중개사무소 목록
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [brokerLicense, setBrokerLicense] = useState<File | null>(null);
  const [agentCertificate, setAgentCertificate] = useState<File | null>(null);

  // 🔹 JSON 데이터 불러오기 (중개사무소 목록)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/broker_offices.json");
        const jsonData = await response.json();
        let recordsArray = jsonData.records;
        setData(recordsArray);
      } catch (error) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Error loading JSON:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 검색 기능
  const handleSearch = () => {
    const results = data.filter(
      (office) =>
        office.중개사무소명.includes(searchQuery) ||
        office.소재지도로명주소.includes(searchQuery)
    );
    setIsOpen(true);
    setFilteredData(results);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Step 1 - 타입 선택 */}
      <h3 className="text-center text-mobile_h1_contents_title md:text-h1_contents_title mb-5 md:mb-10">
        유형 선택
      </h3>
      <div className="flex gap-4 justify-center mb-12">
        {["대표 공인중개사", "소속 공인중개사"].map((type) => (
          <button
            key={type}
            className={`flex w-full min-h-[140px] md:min-w-[300px] md:min-h-[150px] border-2 flex-col items-center justify-center text-gray-700 p-4 md:p-6 rounded-lg transition-all duration-300 ${
              selectedType === type
                ? "bg-selectedoption_default border-primary shadow-lg scale-105"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
            onClick={() => setSelectedType(type)}
          >
            <div className="mb-4 md:mb-6">
              {type === "대표 공인중개사" ? (
                <UserCheck className="text-[50px] md:text-[80px]" />
              ) : (
                <Users className="text-[50px] md:text-[80px]" />
              )}
            </div>
            <p className="text-center text-mobile_body1_m md:text-h3_r">
              {type}
            </p>
          </button>
        ))}
      </div>

      {/* Step 2 - 중개사무소 검색 */}
      {selectedType && (
        <>
          <h3 className="text-center mobile_h3 md:text-h3 mb-3 md:mb-5">
            중개사무소 검색
          </h3>
          <div className="md:w-[400px] mx-auto mb-8 flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="중개사무소명 또는 주소 검색"
              className="w-full p-3 border rounded-lg mr-2 text-body1_r md:text-h4 focus:outline-none focus:border-searchbarborder"
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
            <div className="absolute z-10 w-full md:w-[400px] bg-white border border-gray-300 top-20 md:top-24 rounded-lg shadow-md max-h-60 overflow-y-auto custom-scrollbar mt-2 left-1/2 transform -translate-x-1/2">
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
          {/* 중개사무소 정보 표시 */}
          {selectedOffice && <AgentInfo selectedOffice={selectedOffice} />}
        </>
      )}

      {/* 이전 & 다음 버튼 */}
      <div className="flex justify-between mt-8">
        <button
          className="text-gray-500 hover:underline text-body1_r md:text-h4_r"
          onClick={() => setStep(1)}
        >
          이전
        </button>
        <button
          className="bg-primary text-white py-2 px-6 rounded-lg text-body1_sb md:text-h4_sb"
          onClick={() => setStep(3)}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step1And2_Merged;
