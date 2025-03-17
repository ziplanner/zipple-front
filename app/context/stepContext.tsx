import React, { createContext, useState, useContext } from "react";

interface StepContextType {
  step: number;
  setStep: (step: number) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedOffice: any;
  setSelectedOffice: (office: any) => void;
  phoneNumber: string;
  setPhoneNumber: (number: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("대표 공인중개사");
  const [selectedOffice, setSelectedOffice] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

  return (
    <StepContext.Provider
      value={{
        step,
        setStep,
        selectedType,
        setSelectedType,
        selectedOffice,
        setSelectedOffice,
        phoneNumber,
        setPhoneNumber,
        verificationCode,
        setVerificationCode,
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
