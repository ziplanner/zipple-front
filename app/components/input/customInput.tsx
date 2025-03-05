import React from "react";

type CustomInputProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const CustomInput = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  className,
}: CustomInputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-body2_r text-text_sub4 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-searchbarborder p-2 rounded-lg focus:outline-none focus:ring-1
        focus:ring-selectedoption_pressed transition-all"
      />
    </div>
  );
};

export default CustomInput;
