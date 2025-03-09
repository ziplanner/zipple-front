import { MAIN_MATCHING, MAIN_PROFILE_DETAIL } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 매칭 전체 조회
export const getMainMatching = async () => {
  try {
    const response = await axiosInstance.get(MAIN_MATCHING);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};

// 매칭 카테고리 별 조회
export const getCategoryMatching = async (category: string) => {
  try {
    const response = await axiosInstance.get(`${MAIN_MATCHING}/${category}`);
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
