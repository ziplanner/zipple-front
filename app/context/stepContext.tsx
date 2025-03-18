import React, { createContext, useState, useContext } from "react";

interface StepContextType {
  step: number;
  setStep: (step: number) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedOffice: any;
  setSelectedOffice: (office: any) => void;
  selectedOfficeOwner: any;
  setSelectedOfficeOwner: (owner: any) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;

  // Additional properties as per schema
  email: string;
  setEmail: (email: string) => void;

  foreigner: string;
  setForeigner: (foreigner: string) => void;

  birthday: string;
  setBirthday: (birthday: string) => void;

  agentType: string;
  setAgentType: (agentType: string) => void;

  agentSpecialty: string;
  setAgentSpecialty: (agentSpecialty: string) => void;

  businessName: string;
  setBusinessName: (businessName: string) => void;

  agentRegistrationNumber: string;
  setAgentRegistrationNumber: (agentRegistrationNumber: string) => void;

  primaryContactNumber: string;
  setPrimaryContactNumber: (primaryContactNumber: string) => void;

  officeAddress: string;
  setOfficeAddress: (officeAddress: string) => void;

  ownerName: string;
  setOwnerName: (ownerName: string) => void;

  ownerContactNumber: string;
  setOwnerContactNumber: (ownerContactNumber: string) => void;

  agentName: string;
  setAgentName: (agentName: string) => void;

  agentContactNumber: string;
  setAgentContactNumber: (agentContactNumber: string) => void;

  singleHousehold: boolean;
  setSingleHousehold: (singleHousehold: boolean) => void;

  introductionTitle: string;
  setIntroductionTitle: (introductionTitle: string) => void;

  introductionContent: string;
  setIntroductionContent: (introductionContent: string) => void;

  externalLink: string;
  setExternalLink: (externalLink: string) => void;

  messageVerify: boolean;
  setMessageVerify: (messageVerify: boolean) => void;

  marketingAgree: boolean;
  setMarketingAgree: (marketingAgree: boolean) => void;

  businessLicense: File | null;
  setBusinessLicense: (file: File | null) => void;
  brokerLicense: File | null;
  setBrokerLicense: (file: File | null) => void;
  agentCertificate: File | null;
  setAgentCertificate: (file: File | null) => void;

  profileImage: File | null;
  setProfileImage: (file: File | null) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("대표 공인중개사");
  const [selectedOffice, setSelectedOffice] = useState<any>(null);
  const [selectedOfficeOwner, setSelectedOfficeOwner] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  // Additional fields as per schema
  const [email, setEmail] = useState<string>("");
  const [foreigner, setForeigner] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [agentType, setAgentType] = useState<string>("");
  const [agentSpecialty, setAgentSpecialty] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [agentRegistrationNumber, setAgentRegistrationNumber] =
    useState<string>("");
  const [primaryContactNumber, setPrimaryContactNumber] = useState<string>("");
  const [officeAddress, setOfficeAddress] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerContactNumber, setOwnerContactNumber] = useState<string>("");
  const [agentName, setAgentName] = useState<string>("");
  const [agentContactNumber, setAgentContactNumber] = useState<string>("");
  const [singleHousehold, setSingleHousehold] = useState<boolean>(true);
  const [introductionTitle, setIntroductionTitle] = useState<string>("");
  const [introductionContent, setIntroductionContent] = useState<string>("");
  const [externalLink, setExternalLink] = useState<string>("");
  const [messageVerify, setMessageVerify] = useState<boolean>(false);
  const [marketingAgree, setMarketingAgree] = useState<boolean>(false);

  // 파일 업로드
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [brokerLicense, setBrokerLicense] = useState<File | null>(null);
  const [agentCertificate, setAgentCertificate] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  return (
    <StepContext.Provider
      value={{
        step,
        setStep,
        selectedType,
        setSelectedType,
        selectedOffice,
        setSelectedOffice,
        selectedOfficeOwner,
        setSelectedOfficeOwner,
        phoneNumber,
        setPhoneNumber,
        verificationCode,
        setVerificationCode,
        email,
        setEmail,
        foreigner,
        setForeigner,
        birthday,
        setBirthday,
        agentType,
        setAgentType,
        agentSpecialty,
        setAgentSpecialty,
        businessName,
        setBusinessName,
        agentRegistrationNumber,
        setAgentRegistrationNumber,
        primaryContactNumber,
        setPrimaryContactNumber,
        officeAddress,
        setOfficeAddress,
        ownerName,
        setOwnerName,
        ownerContactNumber,
        setOwnerContactNumber,
        agentName,
        setAgentName,
        agentContactNumber,
        setAgentContactNumber,
        singleHousehold,
        setSingleHousehold,
        introductionTitle,
        setIntroductionTitle,
        introductionContent,
        setIntroductionContent,
        externalLink,
        setExternalLink,
        messageVerify,
        setMessageVerify,
        marketingAgree,
        setMarketingAgree,
        businessLicense,
        setBusinessLicense,
        brokerLicense,
        setBrokerLicense,
        agentCertificate,
        setAgentCertificate,
        profileImage,
        setProfileImage,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};
