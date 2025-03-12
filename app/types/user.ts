import { StaticImageData } from "next/image";

export interface UserProfileData {
  profileUrl: string;
  title: string; // 포트폴리오 제목
  email: string; // 이메일
  externalLink: string; // 외부 링크 (예: GitHub, 개인 웹사이트)
  agentName: string; // 중개사 이름
  businessName: string; // 부동산 상호명
  agentSpecialty: string; // 전문 분야 (예: 아파트, 주택 등)
  agentRegistrationNumber: string; // 중개사 등록번호
  ownerName: string; // 대표자 이름
  starRating: number; // 별점
  ownerContactNumber: string; // 대표 연락처
  officeAddress: string; // 사무실 주소
  portfolios: PortfolioItem[]; // 포트폴리오 리스트
  reviews: ReviewItem[]; // 리뷰 리스트
}

// 포트폴리오 아이템 타입 정의
export interface PortfolioItem {
  portfolioId: number; // 포토폴리오 ID
  portfolioImage: string | StaticImageData; // 포트폴리오 이미지 URL
  title: string; // 포트폴리오 제목
  createdAt: string; // 생성 날짜
}

// 리뷰 아이템 타입 정의
export interface ReviewItem {
  reviewId: number; // 리뷰 ID
  profileUrl: string; // 프로필 이미지 URL
  nickname: string; // 닉네임
  content: string; // 리뷰 내용
  starCount: number; // 별점
  createdAt: string; // 생성 날짜
  updatedAt: string; // 업데이트 날짜
}

export interface GeneralBasicInfo {
  generalName: string;
  email: string;
  phoneNumber: string;
  generalAddress: string;
  housingType: string;
}

export interface AgentBasicInfo {
  email: string;
  agentType: string;
  phoneNumber: string;
  externalLink: string;
  title: string;
  content: string;
}

export interface AgentInfo {
  email: string;
  agentType: string;
  agentSpecialty: string;
  businessName: string;
  agentRegistrationNumber: string;
  primaryContactNumber: string;
  officeAddress: string;
  ownerName: string;
  ownerContactNumber: string;
  agentName: string;
  agentContactNumber: string;
  singleHouseholdExpertRequest: boolean;
  agentOfficeRegistrationCertificate: string;
  businessRegistrationCertification: string;
  agentLicense: string;
  agentImage: string;
  title: string;
  content: string;
  externalLink: string;
}

export interface GeneralSignupData {
  generalName: string;
  generalNumber: string;
  generalAddress: string;
  housingType: string;
  marketingNotificationTerms: boolean;
}
