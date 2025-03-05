import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const TransparentBtn = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-h4
       text-primary border border-primary active:bg-selectedoption_hover
        bg-selectedoption_default hover:bg-selectedoption_hover ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TransparentBtn;
