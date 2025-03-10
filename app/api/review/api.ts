import { REVIEWS } from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 리뷰 조회
export const getReviews = async (agentId: string) => {
  try {
    const response = await axiosInstance.get(`${REVIEWS}/${agentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching agent profile detail:", error);
    throw error;
  }
};

// 리뷰 작성
export const postReview = async (
  agentId: string,
  reviewData: { content: string; starCount: number }
) => {
  try {
    const response = await axiosInstance.post(
      `${REVIEWS}/${agentId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error("Error posting review:", error);
    throw error;
  }
};

// 리뷰 삭제
export const deleteReview = async (reviewId: number) => {
  try {
    const response = await axiosInstance.delete(`${REVIEWS}/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
