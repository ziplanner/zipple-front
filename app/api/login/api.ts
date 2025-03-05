import axios from "axios";
import { REISSUE, LOGOUT, KAKAO_LOGIN } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const refreshAccessToken = async () => {
  const response = await axios.post(REISSUE, {}, { withCredentials: true });
  return response.data.accessToken;
};

export const getTokenWithCode = async (code: string) => {
  const url = KAKAO_LOGIN;

  // console.log("🔍 Sending request to:", url);
  // console.log("📌 Request body:", { authorizationCode: code });

  try {
    const { data } = await axiosInstance.post(url, { authorizationCode: code });

    return data;
  } catch (err: any) {
    return { accessToken: "", isFirstLogin: false };
  }
};

export const logout = async (accessToken: string, refreshToken: string) => {
  try {
    await axiosInstance.post(
      LOGOUT,
      { accessToken, refreshToken },
      { withCredentials: true }
    );

    sessionStorage.removeItem("accessToken");

    // 로그인 페이지로 리디렉트
    window.location.href = "/home";
  } catch (err) {
    console.error("로그아웃 실패:", err);
  }
};
