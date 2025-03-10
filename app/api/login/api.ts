import axios from "axios";
import { REISSUE, LOGOUT, KAKAO_LOGIN } from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { authStore } from "@/app/stores/userStore";

export const refreshAccessToken = async () => {
  const { refreshToken, signOut } = authStore.getState();

  if (!refreshToken) {
    console.warn("저장된 refreshToken이 없습니다. 로그아웃 처리");
    signOut();
    window.location.href = "/";
    return null;
  }

  try {
    const response = await axios.post(REISSUE, { refreshToken });

    if (response.data.isLogout) {
      console.warn("RefreshToken이 만료됨. 로그아웃 처리.");
      signOut();
      window.location.href = "/";
      return null;
    }

    return response.data.accessToken;
  } catch (error) {
    console.error("토큰 갱신 실패");
    signOut();
    window.location.href = "/";
    return null;
  }
};

export const getTokenWithCode = async (code: string) => {
  const url = KAKAO_LOGIN;

  // console.log("Sending request to:", url);
  // console.log("Request body:", { authorizationCode: code });

  try {
    const { data } = await axiosInstance.post(url, { authorizationCode: code });

    return data;
  } catch (err: any) {
    return { accessToken: "", isFirstLogin: false };
  }
};

export const patchLogout = async () => {
  try {
    console.log("🚀 로그아웃 요청 시작");

    const response = await axiosInstance.patch(LOGOUT);
    console.log("로그아웃 응답:", response);

    if (response.status === 200) {
      console.log("로그아웃 성공, 토큰 삭제");
      sessionStorage.removeItem("accessToken");

      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (err) {
    console.error("로그아웃 실패:", err);
  }
};
function getAuthState(): { refreshToken: any } {
  throw new Error("Function not implemented.");
}
