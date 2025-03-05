import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carousel_01 from "@/app/image/carousel_01.svg";
import carousel_02 from "@/app/image/carousel_01.svg";
import carousel_03 from "@/app/image/carousel_01.svg";

const images = [carousel_01, carousel_02, carousel_03];

const MainCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
      {/* 이미지 */}
      <Image
        src={images[currentIndex]}
        alt="carousel"
        className="w-full h-full object-cover"
      />

      {/* 텍스트 & 컨트롤러 */}
      <div className="absolute inset-0 flex justify-center items-center px-4 sm:px-6">
        <div className="max-w-[1040px] w-full mx-auto text-white text-left">
          <p className="text-mobile_body4_r md:text-body1_sb uppercase mb-2 md:mb-4">
            NEW
          </p>
          <h1
            className="text-mobile_h3_s md:text-h1_s leading-tight 
          md:leading-snug mt-1 sm:mt-2"
          >
            똑똑한 내 집 마련, <br />
            집플에서 시작!
          </h1>
          <p className="mt-1 md:mt-2 text-mobile_body3_m md:text-h3_r">
            집플 베타서비스 오픈
          </p>

          {/* 컨트롤러 */}
          <div className="mt-4 md:mt-12 flex items-center space-x-2 sm:space-x-3">
            <span
              className="py-0.5 md:py-1 text-center w-[40px] md:w-[50px] bg-white/60 text-black 
            rounded-full text-mobile_body4_r md:text-body3_m"
            >
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={prevSlide}
              className="p-1 md:p-1.5 bg-white/60 rounded-full hover:bg-white/50 transition"
            >
              <ChevronLeft className="w-2.5 h-2.5 md:w-5 md:h-5 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1 md:p-1.5 bg-white/60 rounded-full hover:bg-white/50 transition"
            >
              <ChevronRight className="w-2.5 h-2.5 md:w-5 md:h-5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
