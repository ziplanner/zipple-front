"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { MdBookmark } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

interface MainRecruitmentCardProps {
  title: string;
  date: string;
  description: string;
  imageUrl: string | StaticImageData;
  //   isScrap: boolean;
  id: number;
}

interface CardProps {
  data: MainRecruitmentCardProps[];
}

const PortfolioCard = ({ data }: CardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [cardData, setCardData] = useState<MainRecruitmentCardProps[]>(data);

  //   const toggleScrap = (
  //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //     index: number
  //   ) => {
  //     e.stopPropagation();
  //     setCardData((prevData) =>
  //       prevData.map((item, idx) =>
  //         idx === index ? { ...item, isScrap: !item.isScrap } : item
  //       )
  //     );
  //   };

  if (cardData.length === 0) {
    return null;
  }

  const handleRouter = (id: number) => {
    // router.push(`/portfolio/detail?id=${id}`);

    if (pathname.includes("/user")) {
      router.push(`/portfolio/detail`);
    } else {
      router.push(`/portfolio/detail?id=${id}`);
    }
  };

  return (
    <>
      {cardData.map((item, index) => (
        <div
          key={index}
          className="flex gap-1.5 md:flex-col cursor-pointer pb-3"
          onClick={() => handleRouter(item.id)}
        >
          <div className="relative lg:min-w-[200px] w-full aspect-square">
            <Image
              src={item.imageUrl}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-default"
            />
          </div>
          <div className="flex flex-col w-full">
            <h3
              className="flex flex-wrap max-w-[166px] text-text1
            text-mobile_body1_sb md:text-h3"
            >
              {item.title}
            </h3>
            <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
              {item.description}
            </p>
            <p className="text-text_sub mt-2.5 text-mobile_body3_m md:body3_m">
              {item.date}
            </p>
          </div>
          {/* <button
                onClick={(e) => toggleScrap(e, index)}
                className="focus:outline-none"
              >
                {item.isScrap ? (
                  <MdBookmark className="text-[#D1F75D] w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <MdBookmark className="text-[#E3E3E3] w-5 h-5 md:w-6 md:h-6" />
                )}
              </button> */}
        </div>
      ))}
    </>
  );
};

export default PortfolioCard;
