import { MAIN_MATCHING } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getMainMatching = async () => {
  try {
    const response = await axiosInstance.get(MAIN_MATCHING);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
