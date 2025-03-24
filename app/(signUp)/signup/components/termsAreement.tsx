import React, { useState } from "react";
import { useStepContext } from "@/app/context/stepContext";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

interface TermsAgreementProps {
  className?: string;
}

const TermsAgreement = ({ className }: TermsAgreementProps) => {
  const { setMessageVerify, marketingAgree, setMarketingAgree } =
    useStepContext();

  // ✅ 기본 상태를 false로 설정
  const [termsAgree, setTermsAgree] = useState<boolean>(false);
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(false);
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [ageAgree, setAgeAgree] = useState<boolean>(false);

  // 필수 항목이 모두 동의되었는지 확인하는 함수
  const checkAllAgreed = (
    terms: boolean,
    privacy: boolean,
    service: boolean,
    age: boolean
  ) => terms && privacy && service && age;

  // ✅ 개별 동의 상태 업데이트 함수
  const handleAgreeChange = (
    stateUpdater: React.Dispatch<React.SetStateAction<boolean>>,
    newState: boolean
  ) => {
    stateUpdater(newState);

    // 필수 항목이 모두 동의되었는지 확인하여 `setMessageVerify` 상태 변경
    if (checkAllAgreed(newState, privacyAgree, serviceAgree, ageAgree)) {
      setMessageVerify(true);
    } else {
      setMessageVerify(false);
    }
  };

  // ✅ 전체 동의 처리
  const handleSelectAll = () => {
    const newState = !(
      termsAgree &&
      privacyAgree &&
      serviceAgree &&
      ageAgree &&
      marketingAgree
    );

    setTermsAgree(newState);
    setPrivacyAgree(newState);
    setServiceAgree(newState);
    setAgeAgree(newState);
    setMarketingAgree(newState); // ✅ 마케팅 동의도 함께 변경

    setMessageVerify(newState); // 전체 동의 상태에 따라 `setMessageVerify` 변경
  };

  return (
    <div className={`${className} bg-white p-6 rounded-lg shadow-lg`}>
      <h3 className="text-center text-mobile_h3 md:text-h3 mb-5">약관 동의</h3>

      {/* ✅ 전체 동의 버튼 */}
      <div
        className="flex items-center gap-3 mb-6 cursor-pointer"
        onClick={handleSelectAll}
      >
        <div className="flex items-center gap-2">
          {termsAgree &&
          privacyAgree &&
          serviceAgree &&
          ageAgree &&
          marketingAgree ? (
            <FaCheckCircle className="text-green-500 md:text-h3 text-mobile_h4" />
          ) : (
            <FaCircle className="text-gray-300 md:text-h3 text-mobile_h4" />
          )}
          <span className="md:text-h3_r text-mobile_h4">
            전체 약관에 동의합니다.
          </span>
        </div>
      </div>

      <hr className="border-t border-gray-300 mb-6" />

      {/* ✅ 개별 동의 항목 */}
      {[
        {
          label: "(필수) 이용약관에 동의합니다.",
          state: termsAgree,
          setter: setTermsAgree,
        },
        {
          label: "(필수) 개인정보 처리방침에 동의합니다.",
          state: privacyAgree,
          setter: setPrivacyAgree,
        },
        {
          label: "(필수) 집플 서비스 운영 정책에 동의합니다.",
          state: serviceAgree,
          setter: setServiceAgree,
        },
        {
          label: "(필수) 만 14세 이상입니다.",
          state: ageAgree,
          setter: setAgeAgree,
        },
      ].map(({ label, state, setter }, index) => (
        <div
          key={index}
          className="flex items-center gap-3 mb-4 cursor-pointer w-full justify-between"
          onClick={() => handleAgreeChange(setter, !state)}
        >
          <div className="flex items-center gap-2">
            {state ? (
              <FaCheckCircle className="text-green-500 md:text-h3 text-mobile_h4" />
            ) : (
              <FaCircle className="text-gray-300 md:text-h3 text-mobile_h4" />
            )}
            <span className="md:text-body1_r text-mobile_body2_r">{label}</span>
          </div>
          <p
            className="underline md:text-body1_r text-mobile_body2_r text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              alert("약관 보기");
            }}
          >
            보기
          </p>
        </div>
      ))}

      {/* ✅ 마케팅 알림 동의 */}
      <div
        className="flex items-center gap-3 mb-4 cursor-pointer w-full justify-between"
        onClick={() => setMarketingAgree(!marketingAgree)}
      >
        <div className="flex items-center gap-2">
          {marketingAgree ? (
            <FaCheckCircle className="text-green-500 md:text-h3 text-mobile_h4" />
          ) : (
            <FaCircle className="text-gray-300 md:text-h3 text-mobile_h4" />
          )}
          <span className="md:text-body1_r text-mobile_body2_r">
            (선택) 마케팅 알림 수신 동의
          </span>
        </div>
        <p
          className="underline md:text-body1_r text-mobile_body2_r text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            alert("약관 보기");
          }}
        >
          보기
        </p>
      </div>
    </div>
  );
};

export default TermsAgreement;
