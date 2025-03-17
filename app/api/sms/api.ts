import { SMS_SEND, SMS_VERIFY } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 🔹 휴대폰 인증번호 요청
export const sendSms = async (phoneNumber: string) => {
  try {
    const { data } = await axiosInstance.post(SMS_SEND, { to: phoneNumber });
    return data;
  } catch (err) {
    console.error("SMS 인증번호 발송 실패:", err);
    throw err;
  }
};

// 🔹 인증번호 검증
export const validateSchoolAuthCode = async (
  phoneNumber: string,
  code: string
) => {
  try {
    const { data } = await axiosInstance.post(SMS_VERIFY, {
      phoneNumber,
      code,
    });
    return data;
  } catch (err) {
    console.error("인증번호 검증 실패:", err);
    throw err;
  }
};
