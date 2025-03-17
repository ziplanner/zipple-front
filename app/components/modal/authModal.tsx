import React, { useState, useEffect } from "react";
import Image from "next/image";
import closeIcon from "@/app/image/icon/close.svg";
import PrimaryBtn from "../button/primaryBtn";
import InputWithButton from "../input/inputWithButton";
import CustomInput from "../input/customInput";
import { sendSms, validateSchoolAuthCode } from "@/app/api/sms/api";

interface AuthModalProps {
  type: string; // "대표 공인중개사" | "소속 공인중개사"
  selectedOfficeOwner: string | null;
  onClose: () => void;
}

const AuthModal = ({ type, selectedOfficeOwner, onClose }: AuthModalProps) => {
  const [name, setName] = useState<string>(selectedOfficeOwner || "");
  const [birthDate, setBirthDate] = useState<string>("");
  const [nationality, setNationality] = useState<"내국인" | "외국인">("내국인");

  // 본인 휴대폰 인증
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isAgentCodeSent, setIsAgentCodeSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(180);

  // 대표자 휴대폰 인증 (소속 공인중개사 전용)
  const [repPhoneNumber, setRepPhoneNumber] = useState<string>("");
  const [repVerificationCode, setRepVerificationCode] = useState<string>("");
  const [isRepCodeSent, setIsRepCodeSent] = useState<boolean>(false);
  const [repTimer, setRepTimer] = useState<number>(180);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isCodeSent && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [isCodeSent, timer]);

  useEffect(() => {
    let repCountdown: NodeJS.Timeout;
    if (isRepCodeSent && repTimer > 0) {
      repCountdown = setInterval(() => setRepTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(repCountdown);
  }, [isRepCodeSent, repTimer]);

  // 🔹 휴대폰 인증 요청
  const handleVerificationRequest = async () => {
    if (!phoneNumber.trim()) return alert("휴대폰 번호를 입력해주세요.");

    try {
      await sendSms(phoneNumber);
      setIsCodeSent(true);
      setTimer(180);
    } catch (error) {
      console.error("SMS 발송 실패:", error);
      alert("SMS 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleRepVerificationRequest = async () => {
    if (!repPhoneNumber.trim()) return alert("대표자 번호를 입력해주세요.");

    try {
      await sendSms(repPhoneNumber);
      setIsAgentCodeSent(true);
      setRepTimer(180);
    } catch (error) {
      console.error("대표자 SMS 발송 실패:", error);
      alert("대표자 SMS 발송에 실패했습니다.");
    }
  };

  // 🔹 인증번호 검증
  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim()) return alert("인증번호를 입력해주세요.");

    try {
      await validateSchoolAuthCode(phoneNumber, verificationCode);
      alert("본인 인증 성공!");
    } catch (error) {
      console.error("인증 실패:", error);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  const handleRepVerificationSubmit = async () => {
    if (!repVerificationCode.trim())
      return alert("대표자 인증번호를 입력해주세요.");

    try {
      await validateSchoolAuthCode(repPhoneNumber, repVerificationCode);
      alert("대표자 인증 성공!");
    } catch (error) {
      console.error("대표자 인증 실패:", error);
      alert("대표자 인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="bg-white p-6 md:p-8 shadow-modal rounded-2xl w-[500px] md:w-[600px]">
        {/* 모달 헤더 */}
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">
            {type === "대표 공인중개사" ? "대표자 인증" : "본인 인증"}
          </h1>
          <Image
            src={closeIcon}
            alt="닫기"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-gray-200 mb-5" />

        <div className="flex flex-row gap-4">
          <CustomInput
            label="이름"
            name="name"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            disabled={type === "대표 공인중개사"}
          />
          <CustomInput
            label="생년월일"
            name="birthDate"
            placeholder="8자리 입력"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 내/외국인 선택 */}
        <div className="mb-4">
          <label className="text-text1 text-body1_m">내/외국인</label>
          <div className="flex gap-4 mt-1">
            {["내국인", "외국인"].map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="nationality"
                  value={option}
                  checked={nationality === option}
                  onChange={() => setNationality(option as "내국인" | "외국인")}
                  className="accent-primary"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* 휴대폰 인증 */}
        <InputWithButton
          label="휴대폰 번호"
          name="phoneNumber"
          placeholder="번호 입력"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          buttonText="인증받기"
          onButtonClick={handleVerificationRequest}
          className="w-full"
        />

        {isCodeSent && (
          <>
            <InputWithButton
              label=""
              name="verificationCode"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              buttonText="인증하기"
              onButtonClick={handleVerificationSubmit}
              className="w-full"
            />
            <div
              className="w-full py-2.5 bg-selectedoption_default 
          text-body3_r text-primary text-center rounded-lg mt-3"
            >
              해당 번호로 인증번호를 발송하였습니다.
              <br />
              인증번호가 도착하지 않았다면 재전송 버튼을 눌러주세요.
              <br />
              <span className="text-red-500 font-semibold">
                {Math.floor(timer / 60)}분 {timer % 60}초 남음
              </span>
            </div>
          </>
        )}

        {/* 대표자 인증 (소속 공인중개사 전용) */}
        {type === "소속 공인중개사" && (
          <>
            <InputWithButton
              label="대표자 번호"
              name="repPhoneNumber"
              placeholder="번호 입력"
              value={repPhoneNumber}
              onChange={(e) => setRepPhoneNumber(e.target.value)}
              buttonText="인증받기"
              onButtonClick={handleRepVerificationRequest}
              className="w-full"
            />
          </>
        )}
        {isAgentCodeSent && (
          <>
            <InputWithButton
              label=""
              name="verificationCode"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              buttonText="인증하기"
              onButtonClick={handleVerificationSubmit}
              className="w-full"
            />
            <div
              className="w-full py-2.5 bg-selectedoption_default 
          text-body3_r text-primary text-center rounded-lg mt-3"
            >
              해당 번호로 인증번호를 발송하였습니다.
              <br />
              인증번호가 도착하지 않았다면 재전송 버튼을 눌러주세요.
              <br />
              <span className="text-red-500 font-semibold">
                {Math.floor(timer / 60)}분 {timer % 60}초 남음
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
