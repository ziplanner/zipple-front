import {
  AgentBasicInfo,
  AgentInfo,
  GeneralBasicInfo,
  GeneralSignupData,
} from "@/app/types/user";
import {
  GENERAL_REGISTER,
  MYPAGE_AGENT,
  MYPAGE_AGENT_ALL,
  MYPAGE_AGENT_DETAIL,
  MYPAGE_GENERAL,
  USER,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";

// 유저 정보 조회
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(USER);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};

// 일반 유저 정보 조회
export const getGeneralUserInfo = async () => {
  try {
    const response = await axiosInstance.get(MYPAGE_GENERAL);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};

// 일반 유저 정보 수정
export const updateGeneralUserInfo = async (userData: GeneralBasicInfo) => {
  try {
    const response = await axiosInstance.put(MYPAGE_GENERAL, userData);

    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

// 중개사 정보 조회
export const getAgentInfo = async () => {
  try {
    const response = await axiosInstance.get(MYPAGE_AGENT);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};

// 중개사 기본 정보 수정
export const updateAgentBasicInfo = async (userData: AgentBasicInfo) => {
  try {
    const response = await axiosInstance.put(MYPAGE_AGENT, userData);

    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

// 중개사 상세 정보 조회
export const getAgentDetailInfo = async () => {
  try {
    const response = await axiosInstance.get(MYPAGE_AGENT_ALL);
    return response.data;
  } catch (error) {
    console.error("Error fetching main matching info:", error);
    throw error;
  }
};

// 중개사 기본 정보 수정
export const updateAgentDetailInfo = async (userData: AgentInfo) => {
  try {
    const response = await axiosInstance.put(MYPAGE_AGENT_DETAIL, userData);

    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

// 일반 유저 정보 추가
export const signupGeneral = async (data: GeneralSignupData) => {
  try {
    const response = await axiosInstance.post(GENERAL_REGISTER, data);
    return response.data;
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error;
  }
};
