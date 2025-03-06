import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const SecondaryBtn = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`px-3 py-1.5 md:px-4 md:py-2 text-primary bg-white rounded-md text-mobile_body2_r
        md:text-h4_r  ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SecondaryBtn;
