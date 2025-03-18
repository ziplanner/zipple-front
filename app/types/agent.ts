export interface BrokerOffice {
  중개사무소명: string;
  개설등록번호: string;
  소재지도로명주소: string;
  전화번호: string;
  대표자명: string;
  홈페이지주소: string;
}

export interface AgentSignupData {
  email: string;
  foreigner: "L" | "F";
  birthday: string;
  agentType: "소속" | "개업";
  agentSpecialty: string;
  businessName: string;
  agentRegistrationNumber: string;
  primaryContactNumber: string;
  officeAddress: string;
  ownerName: string;
  ownerContactNumber: string;
  agentName: string;
  agentContactNumber: string;
  singleHousehold: boolean;
  introductionTitle: string;
  introductionContent: string;
  externalLink: string;
  messageVerify: boolean;
  marketingAgree: boolean;
}
export interface BrokerOffice {
  중개사무소명: string;
  개설등록번호: string;
  소재지도로명주소: string;
  전화번호: string;
  대표자명: string;
  홈페이지주소: string;
}
