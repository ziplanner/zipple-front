import React, { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { useStepContext } from "@/app/context/stepContext";
import CustomDropdown from "@/app/components/dropdown/customDropdown";
import { specializationOptions } from "@/app/types/category";
import TermsAgreement from "./termsAreement";
import Image from "next/image";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import { signupAgent } from "@/app/api/user/api";
import { AgentSignupData } from "@/app/types/agent";
import { useRouter } from "next/navigation";

const Step4_FileUpload = () => {
  const router = useRouter();

  const {
    selectedType,
    setStep,
    setBusinessLicense,
    setBrokerLicense,
    setAgentCertificate,
    businessLicense,
    brokerLicense,
    agentCertificate,
    email,
    foreigner,
    birthday,
    agentType,
    agentSpecialty,
    businessName,
    agentRegistrationNumber,
    primaryContactNumber,
    officeAddress,
    ownerName,
    ownerContactNumber,
    agentName,
    agentContactNumber,
    singleHousehold,
    introductionTitle,
    introductionContent,
    externalLink,
    messageVerify,
    marketingAgree,
    profileImage,
    setAgentSpecialty,
  } = useStepContext();

  // 파일 선택 버튼을 위한 useRef
  const fileInputRefs = {
    businessLicense: useRef<HTMLInputElement>(null),
    brokerLicense: useRef<HTMLInputElement>(null),
    agentCertificate: useRef<HTMLInputElement>(null),
  };

  // 파일 미리보기 및 이름 상태
  const [filePreviews, setFilePreviews] = useState({
    businessLicensePreview: null as string | null,
    brokerLicensePreview: null as string | null,
    agentCertificatePreview: null as string | null,
  });

  // 파일 업로드 처리
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<File | null>,
    fileType:
      | "businessLicensePreview"
      | "brokerLicensePreview"
      | "agentCertificatePreview"
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      event.target.value = ""; // 동일한 파일을 다시 선택할 수 있도록 초기화
      setFile(file);

      // 이미지 파일이면 미리보기 생성
      if (file.type.startsWith("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFilePreviews((prev) => ({
            ...prev,
            [fileType]: reader.result as string,
          }));
        };
      } else {
        setFilePreviews((prev) => ({
          ...prev,
          [fileType]: null, // PDF 등은 미리보기 없음
        }));
      }
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // 숫자만 남기기
    const cleaned = phone.replace(/\D/g, "");

    // 휴대폰 번호 형식 적용
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
    return phone; // 변환 불가능하면 원본 반환
  };

  const handleSubmit = async () => {
    const agentType: "소속" | "개업" =
      selectedType === "대표 공인중개사" ? "개업" : "소속";

    try {
      // ✅ 전화번호 변환
      const formattedPrimaryContact = formatPhoneNumber(primaryContactNumber);
      const formattedOwnerContact = formatPhoneNumber(ownerContactNumber);
      const formattedAgentContact = formatPhoneNumber(agentContactNumber);

      // ✅ API 요청을 위한 데이터 구성 (foreigner 타입 변환)
      const agentData: AgentSignupData = {
        email,
        foreigner: foreigner as "L" | "F",
        birthday,
        agentType,
        agentSpecialty,
        businessName,
        agentRegistrationNumber,
        // primaryContactNumber: formattedPrimaryContact,
        primaryContactNumber: formattedOwnerContact,
        officeAddress,
        ownerName,
        ownerContactNumber: formattedOwnerContact,
        agentName,
        agentContactNumber: formattedAgentContact,
        singleHousehold,
        introductionTitle,
        introductionContent,
        externalLink,
        messageVerify,
        marketingAgree,
      };

      // ✅ 업로드된 파일 리스트 구성
      const certificationFiles = [
        businessLicense,
        brokerLicense,
        agentCertificate,
      ].filter(Boolean) as File[];
      const agentImage = profileImage as File | null;

      console.log("agentData >>>", agentData);
      console.log("certificationFiles >>>", certificationFiles);
      console.log("agentImage >>>", agentImage);

      // ✅ API 호출
      const response = await signupAgent(
        agentData,
        certificationFiles,
        agentImage
      );
      console.log("✅ 공인중개사 회원가입 성공:", response);
      router.push("/");
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* 전문분야 선택 */}
      <div>
        <h3 className="text-center text-mobile_h3 md:text-h3 mt-12 md:mt-16 mb-4">
          전문분야 선택
        </h3>
        <CustomDropdown
          label="전문분야 선택"
          name="specialization"
          value={agentSpecialty}
          options={specializationOptions}
          onChange={(e) => setAgentSpecialty(e.target.value)}
        />
      </div>

      <h3 className="text-center text-mobile_h3 md:text-h3 mt-12 md:mt-16 mb-4 md:mb-8">
        서류 첨부
      </h3>
      <div className="grid gap-6">
        {selectedType === "대표 공인중개사" ? (
          <>
            {/* 사업자등록증 & 중개등록증 */}
            <div className="flex gap-6 mb-6 items-center">
              {/* 사업자등록증 */}
              <div className="flex-1">
                <h3 className="text-text_sub4 text-mobile_body1_m md:text-body1_m mb-2">
                  사업자등록증
                </h3>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer relative bg-white"
                  onClick={() => fileInputRefs.businessLicense.current?.click()}
                  style={{ aspectRatio: "210 / 297", width: "100%" }}
                >
                  {filePreviews.businessLicensePreview ? (
                    <Image
                      src={filePreviews.businessLicensePreview}
                      alt="Business License Preview"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      width={210}
                      height={297}
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-600">
                      <FaUpload className="mb-2 text-2xl" />
                      <span className="text-text_sub3 text-mobile_body3_r md:text-body2_r">
                        사업자등록증 업로드
                      </span>
                    </div>
                  )}
                  <input
                    ref={fileInputRefs.businessLicense}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setBusinessLicense,
                        "businessLicensePreview"
                      )
                    }
                  />
                </div>
              </div>

              {/* 세로 구분선 */}
              <div className="w-[1px] h-full bg-gray-400 opacity-50"></div>

              {/* 중개등록증 */}
              <div className="flex-1">
                <h3 className="text-text_sub4 text-mobile_body1_m md:text-body1_m mb-2">
                  중개등록증
                </h3>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer relative bg-white"
                  onClick={() => fileInputRefs.brokerLicense.current?.click()}
                  style={{ aspectRatio: "210 / 297", width: "100%" }}
                >
                  {filePreviews.brokerLicensePreview ? (
                    <Image
                      src={filePreviews.brokerLicensePreview}
                      alt="Broker License Preview"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      width={210}
                      height={297}
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-600">
                      <FaUpload className="mb-2 text-2xl" />
                      <span className="text-text_sub3 text-mobile_body3_r md:text-body2_r">
                        중개등록증 업로드
                      </span>
                    </div>
                  )}
                  <input
                    ref={fileInputRefs.brokerLicense}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setBrokerLicense,
                        "brokerLicensePreview"
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            {/* 공인중개사 자격증 */}
            <h3 className="text-text_sub4 text-mobile_body1_m md:text-body1_m mb-2">
              공인중개사 자격증
            </h3>
            <div
              className="border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer relative bg-white"
              onClick={() => fileInputRefs.agentCertificate.current?.click()}
              style={{ aspectRatio: "210 / 297", width: "50%" }}
            >
              {filePreviews.agentCertificatePreview ? (
                <Image
                  src={filePreviews.agentCertificatePreview}
                  alt="Agent Certificate Preview"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  width={210}
                  height={297}
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-600">
                  <FaUpload className="mb-2 text-2xl" />
                  <span className="text-text_sub3 text-mobile_body3_r md:text-body2_r">
                    공인중개사 자격증 업로드
                  </span>
                </div>
              )}
              <input
                ref={fileInputRefs.agentCertificate}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(
                    e,
                    setAgentCertificate,
                    "agentCertificatePreview"
                  )
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* 이용약관 동의 */}
      <TermsAgreement className="mt-12 md:mt-16 mb-4" />

      {/* 이전 & 제출 버튼 */}
      <div className="flex justify-between mt-8 text-mobile_body2_r md:text-h4_r">
        <button
          className="text-gray-500 hover:underline"
          onClick={() => setStep(3)}
        >
          이전
        </button>
        <PrimaryBtn text={"제출하기"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Step4_FileUpload;
