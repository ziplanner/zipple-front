"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaHeadset } from "react-icons/fa";
import Image from "next/image";
import logo from "@/app/image/icon/logo_main.svg"; // Replace with the correct path to your logo

const Footer = () => {
  const router = useRouter();

  const handleTermsClick = () => {
    router.push("/terms");
  };

  return (
    <footer className="w-full bg-[#2A2F3C] pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="w-full mx-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-6 md:px-8">
        {/* 로고와 회사 소개, 정보 섹션을 가로로 정렬 */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* 로고 및 회사 소개 */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h1 className="font-black text-[44px] md:text-[52px] text-bg_sub">
              ZIPPLE
            </h1>
            {/* <div className="flex justify-center md:justify-start">
              <Image
                src={logo}
                alt="Zipple Logo"
                width={180}
                height={60}
                className="w-36 md:w-44"
              />
            </div> */}
            <p className="hidden md:block text-[14px] md:text-[16px] text-gray-300 text-center md:text-left mt-[-14px] leading-relaxed font-light">
              번거로운 이사 절차를 한방에, 위스돔 주거 이동 솔루션 ‘집플래너’
            </p>

            {/* 이용 약관 */}
            <div className="flex flex-row gap-3 text-[12px] md:text-xs text-gray-400 font-light">
              <p
                className="cursor-pointer hover:text-white transition-all duration-300"
                onClick={handleTermsClick}
              >
                이용약관
              </p> 
              <span>|</span>
              <p className="hover:text-white transition-all duration-300">
                개인정보처리방침
              </p>
            </div>
          </div>

          {/* 정보 섹션 */}
          <div className="hidden md:flex flex-col md:flex-row gap-6 md:gap-16 mt-8 md:mt-0">
            {/* 집플 정보 */}
            <div className="flex flex-col gap-4 md:w-1/3">
              <h3 className="text-lg font-semibold text-white">집플 정보</h3>
              <ul className="flex flex-col gap-2.5 font-light text-xs text-gray-300">
                <li>서비스 소개</li>
              </ul>
            </div>

            {/* 고객 안내 */}
            <div className="flex flex-col gap-4 md:w-1/3">
              <h3 className="text-lg font-semibold text-white">고객 안내</h3>
              <ul className="flex flex-col gap-2.5 font-light text-xs text-gray-300">
                <li>공지사항</li>
                <li>이용안내</li>
                <li>자주 묻는 질문</li>
              </ul>
            </div>

            {/* 고객 센터 */}
            <div className="flex flex-col gap-4 md:w-1/3 mt-5 md:mt-0">
              <h3 className="flex items-center text-lg font-semibold text-white">
                <FaHeadset className="mr-2" /> 고객 센터
              </h3>
              <ul className="flex flex-col whitespace-nowrap font-light gap-2.5 text-xs text-gray-300">
                <li className="text-base font-medium">02-6925-3400</li>
                <li>평일 09:00 - 18:00</li>
                <li>점심시간(평일) : 12:00 - 13:00</li>
                <li>
                  주말/공휴일 : 일부 서비스 한하여 <br /> 문의 및 상담 가능
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-6 md:mt-8 gap-4">
          <p className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-bg_sub hover:bg-white transition-all duration-300" />
          <p className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-bg_sub hover:bg-white transition-all duration-300" />
          <p className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-bg_sub hover:bg-white transition-all duration-300" />
          <p className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-bg_sub hover:bg-white transition-all duration-300" />
          <p className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-bg_sub hover:bg-white transition-all duration-300" />
        </div>

        {/* 하단 회사 정보 */}
        <div className="flex flex-col itemss-center mt-6 md:mt-8 font-light text-center text-[10px] md:text-[12px] text-gray-500 gap-1">
          <div className="font-light text-[12px] md:text-[12px] text-gray-400">
            집플 테크리티 &nbsp; | &nbsp; 대표: 오준영 &nbsp; | &nbsp; 서울시
            서초구 서초대로 50길 75, 401호
          </div>
          <div className="font-light text-[10px] md:text-[12px] text-gray-400">
            개인정보책임관리자: 오준영 &nbsp; | &nbsp; 사업자등록번호:
            792-29-01583 &nbsp; | &nbsp; 비즈니스 문의: admin@zipple.co.kr
          </div>
          <div className="mt-2 text-[9px] md:text-[11px] text-gray-400">
            © 2023, zipple. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
