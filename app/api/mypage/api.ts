import { MYPAGE_AGENT_PORTFOLIO } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 포토폴리오 조회
export const getMyPortfolio = async (page: number = 1, size: number = 10) => {
  try {
    const response = await axiosInstance.get(`${MYPAGE_AGENT_PORTFOLIO}`, {
      params: { page: page - 1, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 포토폴리오 생성
export const createMyPortfolio = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      MYPAGE_AGENT_PORTFOLIO,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("포트폴리오 생성 중 오류 발생:", error);
    throw error;
  }
};

// 포트폴리오 삭제
export const deletePortfolio = async (portfolioId: string) => {
  try {
    const response = await axiosInstance.delete(
      `${MYPAGE_AGENT_PORTFOLIO}/${portfolioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// 포트폴리오 수정
export const updatePortfolio = async (
  portfolioId: string,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.put(
      `${MYPAGE_AGENT_PORTFOLIO}/${portfolioId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("포트폴리오 수정 중 오류 발생:", error);
    throw error;
  }
};
