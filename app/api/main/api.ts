import { MAIN_MATCHING, MAIN_PROFILE_DETAIL } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getMainMatching = async () => {
  try {
    const response = await axiosInstance.get(MAIN_MATCHING);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};

// 공인 중개사 상세 프로필 API
export const getAgentProfileDetail = async (agentId: number) => {
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
