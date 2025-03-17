import {
  MAIN_MATCHING,
  MAIN_MATCHING_CATEGORY,
  MAIN_PORTFOLIO,
  MAIN_PROFILE_DETAIL,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 매칭 카테고리 별 조회
export const getCategoryMatching = async (
  category?: string,
  page: number = 1,
  size: number = 10
) => {
  try {
    const response = await axiosInstance.get(`${MAIN_MATCHING_CATEGORY}`, {
      params: { category, page: page - 1, size },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching category matching info for category: ${category}`,
      error
    );
    throw error;
  }
};

// 공인 중개사 상세 프로필 API
export const getAgentProfileDetail = async (agentId: string) => {
  try {
    const response = await axiosInstance.get(
      `${MAIN_PROFILE_DETAIL}/${agentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching agent profile detail:", error);
    throw error;
  }
};

// 공인중개사 포토폴리오 상세
export const getAgentPortfolioDetail = async (portfolioId: number) => {
  try {
    const response = await axiosInstance.get(
      `${MAIN_PORTFOLIO}/${portfolioId}/detail`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching agent profile detail:", error);
    throw error;
  }
};

// 공인중개사 포트폴리오 리스트 조회
export const getAgentPortfolioList = async (
  agentId: string,
  page: number = 1,
  size: number = 10
) => {
  try {
    const response = await axiosInstance.get(`${MAIN_PORTFOLIO}/${agentId}`, {
      params: { page: page - 1, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching agent portfolio list:", error);
    throw error;
  }
};
