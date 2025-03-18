"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PortfolioItem } from "@/app/types/user";
import defaultImage from "@/app/image/test/test_image.jpg";

interface portfolioData {
  data: PortfolioItem[];
}

const PortfolioCard = ({ data }: portfolioData) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRouter = (id: number) => {
    // router.push(`/portfolio/detail?id=${id}`);

    // if (pathname.includes("/mypage")) {
    //   router.push(`/portfolio/detail`);
    // } else {
    router.push(`/portfolio/detail?id=${id}`);
    // }
  };

  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex gap-1.5 md:flex-col cursor-pointer pb-3"
          onClick={() => handleRouter(item.portfolioId)}
        >
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={item.portfolioImage || defaultImage}
              alt={item.title || "이미지"}
              width={500} // 원하는 이미지 크기
              height={500} // 정사각형 유지
              sizes="100vw"
              className="object-cover w-full h-full rounded-xl"
              unoptimized
            />
          </div>

          <div className="flex flex-col w-full">
            <h3
              className="flex flex-wrap max-w-[166px] text-text1
            text-mobile_body1_sb md:text-h3"
            >
              {item.title}
            </h3>
            {/* <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
              {item.description}
            </p> */}
            <p className="text-text_sub mt-2.5 text-mobile_body3_m md:body3_m">
              {item.createdAt}
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
