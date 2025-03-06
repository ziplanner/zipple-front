import { tokenColorMapping } from "@/app/utils/badgeColor";
import React from "react";

interface ColorBadgeProps {
  text: string;
  color: keyof typeof tokenColorMapping;
  border?: "basic" | "rounded";
}

const ColorBadge = ({ text, color, border = "basic" }: ColorBadgeProps) => {
  const colorStyles = tokenColorMapping[color];

  return (
    <div className="flex items-center text-center">
      <div
        className={`${
          border === "basic" ? "rounded-sm" : "rounded-2xl"
        } text-mobile_body4_r md:text-body3_m font-medium md:py-1 md:px-3 px-2 py-0.5
            ${colorStyles.bg} ${colorStyles.text} whitespace-nowrap`}
      >
        {text}
      </div>
    </div>
  );
};

export default ColorBadge;
