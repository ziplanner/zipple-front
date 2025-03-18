import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaGlobe,
} from "react-icons/fa";
import { MdBusiness } from "react-icons/md";
import AgentSearchModal from "@/app/components/modal/agentSearchModal";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import TransparentLargeBtn from "@/app/components/button/transparentLargeBtn";
import { useRouter } from "next/navigation";
import { BrokerOffice } from "@/app/types/agent";

const AgentSection = () => {
  const router = useRouter();
  const [selectedOffice, setSelectedOffice] = useState<BrokerOffice | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 🔹 공인중개사 선택 시 상태 업데이트
  const handleSelectOffice = (office: BrokerOffice) => {
    setSelectedOffice(office);
    setIsModalOpen(false);
  };

  const handleCompleteSignup = () => {
    localStorage.setItem("signupSuccessMessage", "회원가입이 완료되었습니다.");
    router.push("/mypage");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-mobile_h1_contents_title md:text-h1_contents_title mb-6 md:mb-12">
        공인중개사 선택
      </h1>

      {/* 🔹 선택된 공인중개사 정보 표시 */}
      {selectedOffice && (
        <div className="flex flex-col max-w-screen-md md:w-3/4 p-4 md:p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between w-full border-b pb-2">
            <div className="flex pb-2 pl-3">
              <div className="flex gap-3 items-center">
                <MdBusiness />
                <h3 className="text-h4_sb md:text-h2 text-text rounded-t-lg inline-block">
                  공인중개사 정보
                </h3>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 mb-1.5 text-body3_sb bg-white border border-text_sub3 rounded shadow-sm"
            >
              다시 검색하기
            </button>
          </div>
          <div className="mt-6 md:mt-8 flex flex-col gap-4 md:gap-6">
            <div className="flex flex-row items-center gap-1 ml-4">
              <FaUser className="text-gray-600" />
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {selectedOffice.중개사무소명}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <FaHome className="text-gray-600" />
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {selectedOffice.개설등록번호}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <FaMapMarkerAlt className="text-gray-600" />
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {selectedOffice.소재지도로명주소}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <FaPhone className="text-gray-600" />
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {selectedOffice.전화번호 || "번호 없음"}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <FaUser className="text-gray-600" />
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {selectedOffice.대표자명 || "정보 없음"}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <FaGlobe className="text-gray-600" />
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {selectedOffice.홈페이지주소 ? (
                  <a
                    href={selectedOffice.홈페이지주소}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {selectedOffice.홈페이지주소}
                  </a>
                ) : (
                  "홈페이지 없음"
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 공인중개사 검색 버튼 */}
      {!selectedOffice && (
        <PrimaryBtn
          text={"공인중개사 검색"}
          onClick={() => {
            console.log("🔹 버튼 클릭됨");
            setIsModalOpen(true);
          }}
        />
      )}
      {!selectedOffice && <div className="h-[50vh]" />}
      {selectedOffice && (
        <TransparentLargeBtn
          text={"회원가입 완료하기 ->"}
          onClick={handleCompleteSignup}
          className="md:mt-16 mt-10"
        />
      )}

      {/* 🔹 검색 모달 */}
      {isModalOpen && (
        <AgentSearchModal
          onClose={() => {
            console.log("🔹 모달 닫힘");
            setIsModalOpen(false);
          }}
          onSelect={(office) => {
            console.log("🔹 선택된 공인중개사:", office);
            handleSelectOffice(office);
          }}
        />
      )}
    </div>
  );
};

export default AgentSection;
