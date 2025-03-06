import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const TransparentLargeBtn = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`px-5 py-3 rounded-md text-h4_sb 
       text-primary border border-primary active:bg-selectedoption_hover
        bg-selectedoption_default hover:bg-selectedoption_hover ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TransparentLargeBtn;
