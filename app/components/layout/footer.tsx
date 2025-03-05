"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleTermsClick = () => {
    router.push("/terms");
  };

  return (
    <footer className="w-full bg-bg_footer pt-12 md:pt-20 pb-12 md:pb-[70px]">
      <div className="w-full mx-auto max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        <div className="flex flex-col md:flex-row justify-between border-b border-sub pb-6 md:pb-8">
          {/* 회사 소개 */}
          <div className="flex flex-col gap-10 md:gap-20">
            <div>
              <h2 className="text-[18px] md:text-xl text-white font-bold">
                Zipple
              </h2>
              <p className="text-mobile_body2_sb md:text-body1_sb text-sub mt-2 leading-relaxed">
                번거로운 이사 절차를 한방에, 위스돔 주거 이동 솔루션 ‘집플래너’
              </p>
            </div>
            <div className="flex flex-row gap-1.5 text-10 md:text-xs text-sub font-extralight">
              <p className="cursor-pointer" onClick={handleTermsClick}>
                이용약관
              </p>
              <span>|</span>
              <p>개인정보처리방침</p>
            </div>
          </div>

          <div className="flex flex-row gap-10">
            {/* 집플 정보 */}
            <div className="md:flex hidden flex-col gap-4">
              <h3 className="text-base font-semibold text-white">집플 정보</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-white">
                <p>서비스 소개</p>
                <p>중개사매칭</p>
                <p>생활서비스</p>
                <p>집플래너</p>
                <p>커뮤니티</p>
              </ul>
            </div>
            {/* 고객 안내 */}
            <div className="md:flex hidden flex-col gap-4">
              <h3 className="text-base font-semibold text-white">고객 안내</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-white">
                <p>공지사항</p>
                <p>이용안내</p>
                <p>자주 묻는 질문</p>
              </ul>
            </div>
            {/* 고객 센터 */}
            <div className="md:flex hidden flex-col gap-4 mt-5 md:mt-0">
              <h3 className="text-base font-semibold text-white">고객 센터</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-white">
                <p className="text-base">02-6925-3400</p>
                <p>평일 09:00 - 18:00</p>
                <p>점심시간(평일) : 12:00 - 13:00 </p>
                <p>
                  주말/공휴일 : 일부 서비스 한하여 <br /> 문의 및 상담 가능
                </p>
              </ul>
            </div>
          </div>
        </div>

        {/* 하단 회사 정보 */}
        <div className="mt-5 pt-2 md:mt-8 md:pt-4 font-extralight text-start text-10 md:text-xs text-sub">
          <p>
            집플 테크리티 | 대표 오준영 | 서울시 서초구 서초대로 50길 75, 401호
          </p>
          <p>개인정보책임관리자: 오준영 | 사업자등록번호: 792-29-01583</p>
          <p>고객센터: 02-6925-3400 | 비즈니스 문의: admin@zipple.co.kr</p>
          <p className="mt-2.5">© 2023, zipple. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
