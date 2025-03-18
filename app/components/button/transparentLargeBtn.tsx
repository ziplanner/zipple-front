import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const TransparentLargeBtn = ({
  text,
  onClick,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`px-3 py-1.5 md:px-5 md:py-3 rounded-md text-mobile_body2_sb md:text-h4_sb border
        ${
          disabled
            ? "bg-gray-300 bg-opacity-60 border-gray-500 text-gray-500 cursor-not-allowed"
            : "text-primary  border-primary active:bg-selectedoption_hover bg-selectedoption_default hover:bg-selectedoption_hover"
        } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default TransparentLargeBtn;
