import React from "react";

type CustomInputProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
};

const CustomInput = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  className,
  disabled = false,
}: CustomInputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-mobile_body2_r md:text-body2_r text-text_sub4 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`border border-searchbarborder p-1.5 md:p-2 rounded-lg focus:outline-none focus:ring-1
        focus:ring-selectedoption_pressed transition-all text-mobile_body3_r md:text-body2_r
        ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
      />
    </div>
  );
};

export default CustomInput;
