import axios from "axios";
import { refreshAccessToken } from "./login/api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  // 쿠키 인증 활성화
  withCredentials: true,
});

let accessToken = "";
if (typeof window !== "undefined") {
  accessToken = sessionStorage.getItem("accessToken") || "";
}

// 요청 인터셉터 (모든 요청에 accessToken 자동 추가)
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

// 응답 인터셉터 (401 발생 시 refreshToken 사용)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          throw new Error("토큰 재발급 실패");
        }

        // ✅ 새 토큰을 저장하고 axiosInstance의 기본 헤더도 업데이트
        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", newAccessToken);
        }
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        // ✅ 기존 요청을 새로운 토큰으로 다시 보냄
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("🚨 RefreshToken 만료됨. 로그인 페이지로 이동.");

        if (typeof window !== "undefined") {
          sessionStorage.removeItem("accessToken");
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 클라이언트에서만 accessToken을 설정할 수 있도록 수정
export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("accessToken", token);
  }
};

export default axiosInstance;
