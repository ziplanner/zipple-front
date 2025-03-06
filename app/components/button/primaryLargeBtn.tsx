import React from "react";

interface ButtonProps {
  status?: "inactive" | "active";
  text: string;
  onClick: () => void;
  className?: string;
}

const PrimaryLargeBtn = ({
  text,
  onClick,
  className,
  status = "active",
}: ButtonProps) => {
  return (
    <button
      className={`px-5 py-3 rounded-md text-h4_sb
       ${
         status === "active"
           ? "bg-primary hover:bg-primary_hover active:bg-primary_pressed text-white"
           : "bg-disable hover:bg-disable_hover active:bg-disable_pressed text-text"
       }  ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryLargeBtn;
