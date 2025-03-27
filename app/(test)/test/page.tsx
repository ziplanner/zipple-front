"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BrokerOffice, RealtorSearchResult } from "@/app/types/agent";
import useResponsive from "@/app/hook/useResponsive";
import KakaoMapModal from "@/app/components/modal/kakaoMapModal";
import { FaMapMarkerAlt } from "react-icons/fa";
import MultiAddressKakaoMapModal from "@/app/components/modal/mulitAdressKakaoMapModal";
import { getCategoryMatching } from "@/app/api/main/api";

interface PaginationInfo {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export default function RealtorSearchComponent() {
  const isMdUp = useResponsive("md");
  const [realtors, setRealtors] = useState<RealtorSearchResult[]>([]);
  const [brokerOffices, setBrokerOffices] = useState<BrokerOffice[]>([]);
  const [searchType, setSearchType] = useState("bsnmCmpnm");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isMultiMapOpen, setIsMultiMapOpen] = useState<boolean>(false);
  const [multiAdress, setMultiAdress] = useState<any[]>([
    { address: "서울특별시 강남구 테헤란로 123", name: "동찌부동산" },
    {
      address: "서울특별시 서초구 남부순환로335길 35 , 3층[303호](서초동)",
      name: "집중공인중개사무소",
    },
    {
      address: "인천광역시 미추홀구 독배로 449",
      name: "무지개부동산공인중개사무소",
    },
  ]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationInfo>({
    numOfRows: 10,
    pageNo: 1,
    totalCount: 0,
  });

  const totalPages = Math.ceil(pagination.totalCount / pagination.numOfRows);

  const handleSearch = async (pageNumber: number = 1) => {
    try {
      const response = await axios.get("/api/realtors", {
        params: {
          searchType,
          searchValue,
          pageNo: pageNumber,
          numOfRows: pagination.numOfRows,
        },
      });

      const brokerData = response.data?.EDBrokers;

      if (brokerData) {
        setRealtors(brokerData.field || []);
        setPagination({
          numOfRows: Number(brokerData.numOfRows),
          pageNo: Number(brokerData.pageNo),
          totalCount: Number(brokerData.totalCount),
        });
      }
    } catch (error) {
      console.error("검색 중 오류:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    handleSearch(newPage);
  };

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

        setBrokerOffices(recordsArray);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto py-6 md:py-12">
      <div className="flex mb-6">
        <div
          className="flex items-center gap-2 px-2.5 py-2.5 bg-selectedoption_default
          text-body3_r text-primary text-center rounded-lg mt-3"
          onClick={() => {
            setIsMultiMapOpen(true);
          }}
        >
          <FaMapMarkerAlt className="text-lg md:text-2xl" />
          <p className="text-base md:text-lg">등록된 중개사 전체보기</p>
        </div>
      </div>
      {/* 검색 영역 */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="w-full flex gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border border-gray-300 rounded-lg p-1.5 md:p-2 text-sm md:text-base"
          >
            <option value="bsnmCmpnm">사업자상호</option>
            <option value="brkrNm">중개업자명</option>
          </select>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="검색어 입력"
            className={`border border-gray-300 rounded-lg p-1.5 md:p-2 text-sm md:text-base
            ${isMdUp ? "" : "w-full"}`}
          />
        </div>
        <button
          onClick={() => handleSearch()}
          className={`bg-blue-500 whitespace-nowrap text-white px-6 py-2 rounded-lg mt-4 md:mt-0
            ${isMdUp ? "" : "w-full"} text-sm md:text-base`}
        >
          검색
        </button>
      </div>

      {/* 중개업자 리스트 */}
      <div className="space-y-6  min-h-36">
        {realtors.map((realtor, index) => {
          const additionalInfo = brokerOffices.find(
            (office) => office.중개사무소명 === realtor.bsnmCmpnm
          );

          return (
            <div
              key={index}
              className="border border-gray-300 text-sm md:text-lg p-6 rounded-lg
      shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex flex-col space-y-3">
                <p className="font-semibold text-gray-800">
                  중개업자명:{" "}
                  <span className="font-normal">{realtor.brkrNm}</span>
                </p>
                <p className="text-gray-600">
                  사업자상호:{" "}
                  <span className="font-medium">{realtor.bsnmCmpnm}</span>
                </p>
                <p className="text-gray-600">
                  중개업자 구분:{" "}
                  <span className="font-medium">{realtor.brkrAsortCodeNm}</span>
                </p>
                <p className="text-gray-600">
                  등록번호:{" "}
                  <span className="font-medium">{realtor.jurirno}</span>
                </p>
                <p className="text-gray-600">
                  자격증번호:{" "}
                  <span className="font-medium">{realtor.crqfcNo}</span>
                </p>
                <p className="text-gray-600">
                  자격증 취득일:{" "}
                  <span className="font-medium">{realtor.crqfcAcqdt}</span>
                </p>
                <p className="text-gray-600">
                  직위구분명:{" "}
                  <span className="font-medium">{realtor.ofcpsSeCodeNm}</span>
                </p>
                <p className="text-gray-600">
                  데이터 기준일자:{" "}
                  <span className="font-medium">{realtor.lastUpdtDt}</span>
                </p>
                <p className="text-gray-600">
                  지역: <span className="font-medium">{realtor.ldCodeNm}</span>
                </p>

                {additionalInfo && (
                  <>
                    <div className="text-gray-600">
                      소재지 주소:{" "}
                      <div>
                        <span className="font-medium">
                          {additionalInfo.소재지도로명주소}
                        </span>{" "}
                        &nbsp;
                        <div className="flex gap-1 items-center">
                          <FaMapMarkerAlt className="text-blue-500" />
                          {additionalInfo?.소재지도로명주소 && (
                            <button
                              onClick={() =>
                                setSelectedAddress(
                                  additionalInfo.소재지도로명주소
                                )
                              }
                              className="text-blue-500 hover:underline"
                            >
                              지도 보기
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      전화번호:{" "}
                      <span className="font-medium">
                        {additionalInfo.전화번호}
                      </span>
                    </p>
                    {/* {additionalInfo.홈페이지주소 && (
                      <p className="text-gray-600">
                        홈페이지:{" "}
                        <a
                          href={additionalInfo.홈페이지주소}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {additionalInfo.홈페이지주소}
                        </a>
                      </p>
                    )} */}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xs md:text-sm">
          총 {pagination.totalCount}건 ({pagination.pageNo} / {totalPages}{" "}
          페이지)
        </p>
        <div className="flex space-x-2">
          {pagination.pageNo > 1 && (
            <button
              onClick={() => handlePageChange(pagination.pageNo - 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-xs md:text-sm"
            >
              이전
            </button>
          )}
          {pagination.pageNo < totalPages && (
            <button
              onClick={() => handlePageChange(pagination.pageNo + 1)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-xs md:text-sm"
            >
              다음
            </button>
          )}
        </div>
      </div>
      {selectedAddress && (
        <KakaoMapModal
          address={selectedAddress}
          onClose={() => setSelectedAddress(null)}
        />
      )}
      {isMultiMapOpen && (
        <MultiAddressKakaoMapModal
          addresses={multiAdress}
          onClose={() => {
            setIsMultiMapOpen(false);
          }}
        />
      )}
    </div>
  );
}
