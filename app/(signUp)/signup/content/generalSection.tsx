import React, { useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import CustomInput from "@/app/components/input/customInput";
import { signupGeneral } from "@/app/api/user/api";
import Alert from "@/app/components/alert/alert";
import { CATEGORY_LIST } from "@/app/types/category";
import CustomDropdown from "@/app/components/dropdown/customDropdown";
import TransparentLargeBtn from "@/app/components/button/transparentLargeBtn";
import AddressSearch from "@/app/components/search/addressSearch";

const GeneralSection = () => {
  const [formData, setFormData] = useState({
    generalName: "",
    generalNumber: "",
    generalAddress: "",
    housingType: "",
    marketingNotificationTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 전화번호 자동 하이픈
  const formatPhoneNumber = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 7)
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
      3,
      7
    )}-${onlyNumbers.slice(7, 11)}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "generalNumber") {
      setFormData((prev) => ({
        ...prev,
        generalNumber: formatPhoneNumber(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      marketingNotificationTerms: e.target.checked,
    }));
  };

  const handleAddressChange = (address: string) => {
    setFormData((prev) => ({
      ...prev,
      generalAddress: address,
    }));
  };

  // 유효성 검사 (전화번호 형식 포함)
  const isPhoneNumberValid = /^\d{3}-\d{3,4}-\d{4}$/.test(
    formData.generalNumber
  );
  const isFormValid =
    Object.values(formData).every((value) => value !== "" && value !== false) &&
    isPhoneNumberValid;

  const handleSignup = async () => {
    if (!isFormValid) {
      setAlertMessage(
        "입력한 정보를 확인해주세요. (전화번호 형식: 010-0000-0000)"
      );
      return;
    }

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
    <div className="w-full flex justify-center">
      <div className="max-w-screen-md w-full px-4 md:px-6">
        <div className="flex flex-col w-full p-6 md:p-8 bg-white rounded-lg shadow-md">
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
            <AddressSearch
              value={formData.generalAddress}
              onChange={handleAddressChange}
            />
            <CustomDropdown
              label="주거 형태"
              name="housingType"
              value={formData.housingType}
              onChange={handleChange}
              options={CATEGORY_LIST.map((category) => ({
                label: category,
                value: category,
              }))}
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
        </div>

        {/* 회원가입 버튼 (모든 필수 입력값이 입력되면 노출) */}
        {isFormValid && (
          <div className="w-full flex justify-center">
            <TransparentLargeBtn
              text="회원가입 완료하기 →"
              onClick={handleSignup}
              className="md:mt-16 mt-10"
            />
          </div>
        )}

        {/* 회원가입 성공/실패 알림 */}
        {alertMessage && <Alert message={alertMessage} />}
      </div>
    </div>
  );
};

export default GeneralSection;
