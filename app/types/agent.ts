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

// === v-world ===
// API 응답 인터페이스
export interface RealtorApiResponse {
  result: {
    featureCollection: {
      features: Array<{
        properties: RealtorSearchResult;
      }>;
    };
  };
}

export interface RealtorSearchParams {
  ldCode?: string; // 시군구코드
  bsnmCmpnm?: string; // 사업자상호
  brkrNm?: string; // 중개업자명
  jurirno?: string; // 등록번호
  brkrAsortCode?: string; // 중개업자종별코드
  crqfcNo?: string; // 자격증번호
  ofcpsSeCode?: string; // 직위구분코드
  format?: "xml" | "json";
  numOfRows?: number;
  pageNo?: number;
}

export interface RealtorSearchResult {
  ldCode: string; // 시군구코드
  ldCodeNm: string; // 시군구명
  jurirno: string; // 등록번호
  bsnmCmpnm: string; // 사업자상호
  brkrNm: string; // 중개업자명
  brkrAsortCode: string; // 중개업자종별코드
  brkrAsortCodeNm: string; // 중개업자종별명
  crqfcNo: string; // 자격증번호
  crqfcAcqdt: string; // 자격증취득일
  ofcpsSeCode: string; // 직위구분코드
  ofcpsSeCodeNm: string; // 직위구분명
  lastUpdtDt: string; // 데이터기준일자
}
