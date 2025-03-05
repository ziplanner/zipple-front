import React from "react";
import Image from "next/image";
import BasicBadge from "../badge/basicBadge";

interface ServiceCardProps {
  image: string;
  title: string;
  tags: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, title, tags }) => {
  return (
    <div className="bg-white w-[241px] md:w-[333px] flex flex-col">
      <div className="w-full md:h-[200px] overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          width={241}
          height={150}
          className="md:w-[333px] md:h-[200px] object-cover"
        />
      </div>

      <div className="flex flex-row justify-between items-center px-0.5 pt-2 md:pt-4">
        <div className="flex gap-1 md:gap-2">
          {tags.map((tag, index) => (
            <BasicBadge
              key={index}
              status={index === 0 ? "enable" : "outlined"}
              text={tag}
            />
          ))}
        </div>

        {/* 서비스 제목 */}
        <h3 className="text-mobile_h4 md:text-h3_r text-text">{title}</h3>
      </div>
    </div>
  );
};

export default ServiceCard;
