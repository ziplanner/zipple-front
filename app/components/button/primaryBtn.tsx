import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const PrimaryBtn = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 text-white bg-primary rounded-md text-h4_r
      hover:bg-primary_hover active:bg-primary_pressed  ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
