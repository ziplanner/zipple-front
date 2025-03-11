import React, { useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import CustomInput from "@/app/components/input/customInput";
import { signupGeneral } from "@/app/api/user/api";
import Alert from "@/app/components/alert/alert";

const GeneralSignupPage = () => {
  const [formData, setFormData] = useState({
    generalName: "",
    generalNumber: "",
    generalAddress: "",
    housingType: "",
    marketingNotificationTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 🔹 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 체크박스 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      marketingNotificationTerms: e.target.checked,
    }));
  };

  // 🔹 모든 필수 필드가 입력되었는지 확인
  const isFormValid = Object.values(formData).every(
    (value) => value !== "" && value !== false
  );

  // 🔹 회원가입 요청
  const handleSignup = async () => {
    if (!isFormValid) return;

    try {
      setIsSubmitting(true);
      await signupGeneral(formData);
      setAlertMessage("회원가입이 완료되었습니다!");
    } catch (error) {
      setAlertMessage("회원가입 중 오류가 발생했습니다.");
      console.error("회원가입 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-sm px-4 mx-auto">
      <div className="flex flex-col w-full p-6 bg-white rounded-lg shadow-md">
        <h3 className="flex text-h4_sb text-text border-b pb-2">
          <FaUser className="mr-2" /> 회원 정보
        </h3>

        <div className="mt-4 flex flex-col gap-4">
          <CustomInput
            label="이름"
            name="generalName"
            value={formData.generalName}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
          />
          <CustomInput
            label="전화번호"
            name="generalNumber"
            value={formData.generalNumber}
            onChange={handleChange}
            placeholder="010-0000-0000"
          />
          <CustomInput
            label="주소"
            name="generalAddress"
            value={formData.generalAddress}
            onChange={handleChange}
            placeholder="주소를 입력하세요"
          />
          <CustomInput
            label="주거 형태"
            name="housingType"
            value={formData.housingType}
            onChange={handleChange}
            placeholder="예: 아파트, 빌라 등"
          />

          {/* 마케팅 알림 동의 체크박스 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.marketingNotificationTerms}
              onChange={handleCheckboxChange}
            />
            <label className="text-body2_r text-gray-600">
              마케팅 알림 수신에 동의합니다.
            </label>
          </div>
        </div>

        {/* 🔹 가입 버튼 (모든 필수 입력값이 입력되면 활성화) */}
        <div className="mt-6">
          <PrimaryBtn
            text="가입하기"
            onClick={handleSignup}
            disabled={!isFormValid || isSubmitting}
            className={isFormValid ? "" : "opacity-50 cursor-not-allowed"}
          />
        </div>
      </div>

      {/* 🔹 회원가입 성공/실패 알림 */}
      {alertMessage && <Alert message={alertMessage} />}
    </div>
  );
};

export default GeneralSignupPage;
