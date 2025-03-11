import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const PrimaryBtn = ({
  text,
  onClick,
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`px-3 py-1.5 md:px-4 md:py-2 text-white bg-primary rounded-md text-mobile_body2_r
        md:text-h4_r hover:bg-primary_hover active:bg-primary_pressed  
        ${disabled ? "opacity-50" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
