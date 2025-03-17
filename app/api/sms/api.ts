import { SMS_SEND, SMS_VERIFY } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 학교 이메일 인증 요청 (이메일 발송)
export const sendSchoolAuthEmail = async (email: string) => {
  try {
    const { data } = await axiosInstance.post(SMS_SEND, { email });
    return data;
  } catch (err) {
    console.error("학교 인증 이메일 발송 실패:", err);
    throw err;
  }
};

// 학교 인증 코드 검증
export const validateSchoolAuthCode = async (
  phoneNumber: string,
  code: string
) => {
  try {
    const { data } = await axiosInstance.post(SMS_VERIFY, {
      phoneNumber,
      code,
    });
    console.log("학교 인증 코드 검증 성공:", data);
    return data;
  } catch (err) {
    console.error("학교 인증 코드 검증 실패:", err);
    throw err;
  }
};
