import React from "react";

type CustomDropdownProps = {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

const CustomDropdown = ({
  label,
  name,
  value,
  options,
  onChange,
  className,
}: CustomDropdownProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-mobile_body2_r md:text-body2_r text-text_sub4 mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-searchbarborder p-1.5 md:p-2.5 rounded-lg focus:outline-none focus:ring-1
        focus:ring-selectedoption_pressed transition-all text-mobile_body3_r md:text-body2_r bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
