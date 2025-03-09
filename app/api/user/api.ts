import { MYPAGE_GENERAL, USER } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 유저 정보 조회
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(USER);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};

// 일반 유저 정보 조회
export const getGeneralUserInfo = async () => {
  try {
    const response = await axiosInstance.get(MYPAGE_GENERAL);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};
