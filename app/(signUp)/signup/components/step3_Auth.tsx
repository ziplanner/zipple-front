import React, { useState, useEffect } from "react";
import { useStepContext } from "@/app/context/stepContext";
import PrimaryBtn from "@/app/components/button/primaryBtn";
import InputWithButton from "@/app/components/input/inputWithButton";
import CustomInput from "@/app/components/input/customInput";
import { sendSms, validateSchoolAuthCode } from "@/app/api/sms/api";
import Alert from "@/app/components/alert/alert";
import { FaUpload } from "react-icons/fa";
import defaultProfile from "@/app/image/noImage/default_profile.png";
import Image from "next/image";
import { User } from "lucide-react";
import TransparentBtn from "@/app/components/button/transparentBtn";

const Step3_Auth = () => {
  const {
    selectedType,
    setStep,
    ownerName,
    setOwnerName,
    setAgentName,
    email,
    setEmail,
    foreigner,
    setForeigner,
    birthday,
    setBirthday,
    agentContactNumber,
    setAgentContactNumber,
    ownerContactNumber,
    setOwnerContactNumber,
    profileImage,
    setProfileImage,
  } = useStepContext();

  console.log(ownerName);

  const [name, setName] = useState<string>(
    selectedType === "대표 공인중개사" ? ownerName : ""
  );

  useEffect(() => {
    if (selectedType === "소속 공인중개사") {
      setAgentName(name);
    }
  }, [selectedType, name]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [codeVerification, setCodeVerification] = useState<boolean>(false);
  const [repCodeVerification, setRepCodeVerification] =
    useState<boolean>(false);
  const [phoneVerificationMessage, setPhoneVerificationMessage] = useState<
    string | null
  >(null);
  const [phoneTimer, setPhoneTimer] = useState<number>(180);

  const [repVerificationCode, setRepVerificationCode] = useState<string>("");
  const [isRepCodeSent, setIsRepCodeSent] = useState<boolean>(false);
  const [repVerificationMessage, setRepVerificationMessage] = useState<
    string | null
  >(null);
  const [repTimer, setRepTimer] = useState<number>(180);

  const [phoneSentMessage, setPhoneSentMessage] = useState<string | null>(null);
  const [phoneSentMessage2, setPhoneSentMessage2] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isCodeSent && phoneTimer > 0) {
      const countdown = setInterval(() => {
        setPhoneTimer((prev) => prev - 1); // 타이머 값 감소
      }, 1000);
      return () => clearInterval(countdown); // 타이머 종료
    }
  }, [isCodeSent, phoneTimer]);

  useEffect(() => {
    if (isRepCodeSent && repTimer > 0) {
      const repCountdown = setInterval(() => {
        setRepTimer((prev) => prev - 1); // 타이머 값 감소
      }, 1000);
      return () => clearInterval(repCountdown); // 타이머 종료
    }
  }, [isRepCodeSent, repTimer]);

  // 🔹 휴대폰 인증 요청
  const handleVerificationRequest = async () => {
    try {
      await sendSms(agentContactNumber);
      setIsCodeSent(true);
      setPhoneTimer(180); // 타이머 갱신
      setPhoneSentMessage(
        "인증번호가 발송되었습니다. 인증번호를 입력해주세요."
      );
      setPhoneVerificationMessage(null);
    } catch (error) {
      console.error("SMS 발송 실패:", error);
      setPhoneSentMessage(null);
      setPhoneVerificationMessage(
        "SMS 발송에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  // 🔹 대표자 휴대폰 인증 요청
  const handleRepVerificationRequest = async () => {
    if (!ownerContactNumber.trim())
      return setRepVerificationMessage("대표자 번호를 입력해주세요.");

    try {
      await sendSms(ownerContactNumber);
      setIsRepCodeSent(true);
      setRepTimer(180); // 타이머 갱신
      setPhoneSentMessage2(
        "인증번호가 발송되었습니다. 인증번호를 입력해주세요."
      );
      setRepVerificationMessage(null);
    } catch (error) {
      console.error("대표자 SMS 발송 실패:", error);
      setPhoneSentMessage2(null);
      setRepVerificationMessage("대표자 SMS 발송에 실패했습니다.");
    }
  };

  // 🔹 본인 인증 번호 검증
  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim())
      return setPhoneVerificationMessage("인증번호를 입력해주세요.");

    try {
      const response = await validateSchoolAuthCode(
        agentContactNumber,
        verificationCode
      );
      if (response === "인증 번호가 일치하지 않습니다.") {
        setCodeVerification(false);
        setPhoneVerificationMessage("인증번호가 올바르지 않습니다.");
      } else {
        setCodeVerification(true);
        setPhoneVerificationMessage(null);
        setPhoneSentMessage("본인 인증 성공!");
      }
    } catch (error) {
      setCodeVerification(false);
      setPhoneVerificationMessage("인증번호가 올바르지 않습니다.");
    }
  };

  // 🔹 대표자 인증 번호 검증
  const handleRepVerificationSubmit = async () => {
    if (!repVerificationCode.trim())
      return setRepVerificationMessage("대표자 인증번호를 입력해주세요.");

    try {
      const response = await validateSchoolAuthCode(
        ownerContactNumber,
        repVerificationCode
      );
      if (response === "인증 번호가 일치하지 않습니다.") {
        setRepCodeVerification(false);
        setRepVerificationMessage("대표자 인증번호가 올바르지 않습니다.");
      } else {
        setRepVerificationMessage(null);
        setRepCodeVerification(true);
        setPhoneSentMessage2("대표자 인증 성공!");
      }
    } catch (error) {
      setRepCodeVerification(false);
      setRepVerificationMessage("대표자 인증번호가 올바르지 않습니다.");
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<File | null>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]; // File 객체를 가져옴
      setFile(file); // 상태 업데이트

      // 파일을 읽어서 미리보기 업데이트
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 미리보기 업데이트
      };
      reader.readAsDataURL(file); // 파일을 base64 URL로 읽음
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    fileInput?.click(); // 파일 input 클릭 트리거
  };

  // 🔹 모든 필드 작성 및 인증을 하지 않았을 경우에는 alert 컴포넌트 표출
  const handleNextStep = () => {
    if (selectedType === "대표 공인중개사") {
      if (
        !email ||
        !ownerContactNumber ||
        !birthday ||
        !isRepCodeSent ||
        !repCodeVerification ||
        !profileImage
      ) {
        setAlertMessage("모든 필드를 입력하고 인증을 완료해야 합니다.");
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
        return;
      }
    }

    if (selectedType === "소속 공인중개사") {
      if (
        !email ||
        !birthday ||
        !ownerContactNumber ||
        !agentContactNumber ||
        !isRepCodeSent ||
        !codeVerification ||
        !profileImage
      ) {
        setAlertMessage("모든 필드를 입력하고 인증을 완료해야 합니다.");
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000);
        return;
      }
    }
    setStep(4);
  };

  return (
    <div className="animate-fadeIn">
      <h3 className="text-center mobile_h3 md:text-h3 mb-4 md:mb-5">
        본인 인증
      </h3>
      {/* 프로필 사진 업로드 */}
      <div className="flex mb-4 md:mb-6">
        {profileImage ? (
          <>
            {/* 업로드된 이미지 미리보기 */}
            <div
              className="flex flex-col items-center justify-center text-gray-600 cursor-pointer"
              onClick={handleButtonClick}
            >
              <Image
                src={imagePreview || defaultProfile}
                alt="Profile"
                className="mb-2 w-[141px] h-[168px] md:w-[168px] md:h-56 object-cover"
                width={141}
                height={168}
              />
            </div>
          </>
        ) : (
          <div
            className="flex flex-col items-center justify-center text-gray-600 w-[141px] h-[168px]
          md:w-[168px] md:h-56 border border-gray-500 bg-white"
            onClick={handleButtonClick}
          >
            <User className="mb-2 text-2xl" />
            <span>본인 프로필 사진</span>
          </div>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, setProfileImage)}
        />
      </div>
      {/* <TransparentBtn
        text={"이미지 업로드"}
        onClick={handleButtonClick}
        className="mt-2 mb-4"
      /> */}

      {/* 이름 입력 */}
      <div className="flex flex-row gap-4 flex-wrap">
        <CustomInput
          label="이름"
          name="name"
          placeholder="이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-[48%]"
          disabled={selectedType === "대표 공인중개사"}
        />
        <CustomInput
          label="생년월일"
          name="birthday"
          placeholder="8자리 입력"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="w-full md:w-[48%]"
        />
      </div>
      {/* 이메일 입력 */}
      <CustomInput
        label="이메일"
        name="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-4 md:mt-6"
      />
      {/* 내/외국인 선택 */}
      <div className="mb-4 mt-4 md:mt-6">
        <label className="text-mobile_body2_r md:text-body2_r text-text_sub4">
          내/외국인
        </label>
        <div className="flex gap-4 mt-2">
          {[
            { label: "내국인", value: "L" },
            { label: "외국인", value: "F" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer text-mobile_body2_r md:text-body2_r"
            >
              <input
                type="radio"
                name="foreigner"
                value={option.value}
                checked={foreigner === option.value}
                onChange={() => setForeigner(option.value)}
                className="accent-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* 휴대폰 인증 */}
      {selectedType === "소속 공인중개사" && (
        <InputWithButton
          label="휴대폰 번호"
          name="agentContactNumber"
          placeholder="번호 입력"
          value={agentContactNumber}
          onChange={(e) => setAgentContactNumber(e.target.value)}
          buttonText="인증받기"
          onButtonClick={handleVerificationRequest}
          className="w-full md:mt-6"
        />
      )}

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
          {phoneVerificationMessage && (
            <div className="text-red-500 text-mobile_body3_r md:text-body3_r">
              {phoneVerificationMessage}
            </div>
          )}
          {phoneSentMessage && (
            <div className="w-full py-2.5 bg-selectedoption_default text-body3_r text-primary text-center rounded-lg mt-3">
              {phoneSentMessage}
              <br />
              {phoneSentMessage !== "본인 인증 성공!" && phoneTimer > 0 && (
                <span className="text-red-500 font-semibold">
                  {Math.floor(phoneTimer / 60)}분 {phoneTimer % 60}초 남음
                </span>
              )}
            </div>
          )}
        </>
      )}

      {/* 대표자 인증 */}
      <InputWithButton
        label="대표자 번호"
        name="ownerContactNumber"
        placeholder="번호 입력"
        value={ownerContactNumber}
        onChange={(e) => setOwnerContactNumber(e.target.value)}
        buttonText="인증받기"
        onButtonClick={handleRepVerificationRequest}
        className="w-full mt-4 md:mt-6"
      />

      {isRepCodeSent && (
        <>
          <InputWithButton
            label=""
            name="verificationCode"
            placeholder="인증번호 입력"
            value={repVerificationCode}
            onChange={(e) => setRepVerificationCode(e.target.value)}
            buttonText="인증하기"
            onButtonClick={handleRepVerificationSubmit}
            className="w-full"
          />
          {repVerificationMessage && (
            <div className="text-red-500 text-mobile_body3_r md:text-body3_r">
              {repVerificationMessage}
            </div>
          )}
          {phoneSentMessage2 && (
            <div className="w-full py-2.5 bg-selectedoption_default text-body3_r text-primary text-center rounded-lg mt-3">
              {phoneSentMessage2}
              <br />
              {phoneSentMessage2 !== "대표자 인증 성공!" && repTimer > 0 && (
                <span className="text-red-500 font-semibold">
                  {Math.floor(repTimer / 60)}분 {repTimer % 60}초 남음
                </span>
              )}
            </div>
          )}
        </>
      )}

      {/* 이전 및 다음 버튼 */}
      <div className="flex justify-between mt-8 md:mt-20">
        <button
          className="text-gray-500 hover:underline text-mobile_body2_r md:text-h4_r"
          onClick={() => setStep(2)}
        >
          이전
        </button>
        <PrimaryBtn text="다음" onClick={handleNextStep} />
      </div>
      {alertMessage && <Alert message={alertMessage} duration={1500} />}
    </div>
  );
};

export default Step3_Auth;
