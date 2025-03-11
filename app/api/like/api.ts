import { LIKE } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 좋아요 등록
export const likeAgent = async (agentId: string) => {
  try {
    const response = await axiosInstance.post(`${LIKE}/${agentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting like:", error);
    throw error;
  }
};

// 좋아요 삭제
export const unlikeAgent = async (agentId: string) => {
  try {
    const response = await axiosInstance.delete(`${LIKE}/${agentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting like:", error);
    throw error;
  }
};
