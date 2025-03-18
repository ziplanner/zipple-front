import {
  AgentBasicInfo,
  AgentInfo,
  GeneralBasicInfo,
  GeneralSignupData,
  ModifyAgentBasicInfo,
  ModifyAgentInfo,
} from "@/app/types/user";
import {
  AGENT_REGISTER,
  GENERAL_REGISTER,
  MYPAGE_AGENT,
  MYPAGE_AGENT_ALL,
  MYPAGE_AGENT_DETAIL,
  MYPAGE_GENERAL,
  USER,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";
import { AgentSignupData } from "@/app/types/agent";

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
export const updateAgentBasicInfo = async (userData: ModifyAgentBasicInfo) => {
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

// 중개사 상세 정보 수정
export const updateAgentDetailInfo = async (userData: ModifyAgentInfo) => {
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

// 공인중개사 회원가입 요청 함수
export const signupAgent = async (
  agentData: AgentSignupData,
  certificationFiles: File[],
  agentImage: File | null
): Promise<any> => {
  try {
    const formData = new FormData();

    // ✅ JSON 데이터 (agentUserRequest)
    formData.append(
      "agentUserRequest",
      new Blob([JSON.stringify(agentData)], { type: "application/json" })
    );

    // ✅ 필수 인증 문서 파일 배열 추가 (중개등록증, 사업자등록증, 공인중개사 자격증)
    certificationFiles.forEach((file) => {
      formData.append("agentCertificationDocuments", file);
    });

    // ✅ 공인중개사 본인 인증 사진 추가
    if (agentImage) {
      formData.append("agentImage", agentImage);
    }

    // ✅ API 요청 실행
    const response = await axiosInstance.post(AGENT_REGISTER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("공인중개사 회원가입 요청 실패:", error);
    throw error;
  }
};
