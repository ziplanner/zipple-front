import React from "react";

type CustomTextareaProps = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  maxLength?: number;
};

const CustomTextarea = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  className,
  maxLength,
}: CustomTextareaProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-body2_r text-text_sub4 mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full p-2 border border-searchbarborder rounded-lg resize-none text-body1_r text-subtext1 
                  focus:outline-none focus:ring-1 focus:ring-selectedoption_pressed transition-all 
                  min-h-[20vh] max-h-[40vh]"
      />
    </div>
  );
};

export default CustomTextarea;
