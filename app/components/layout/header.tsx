"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Bell, User, Menu } from "lucide-react";
import logo from "@/app/image/icon/logo_main.svg";
import logo_icon from "@/app/image/icon/logo_icon.svg";
import PrimaryBtn from "../button/primaryBtn";
import { motion } from "framer-motion";
import LoginModal from "../modal/loginModal";
import MobileLoginModal from "../modal/mobileLoginModal";
import { useUserStore } from "@/app/providers/user-store-provider";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, signOut } = useUserStore((state) => state);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isMobileLoginModalOpen, setIsMobileLoginModalOpen] =
    useState<boolean>(false);

  const isLoggedIn = !!accessToken;

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full bg-white md:h-16 shadow-md flex justify-center px-4 md:px-6 lg:px-8">
      <header className="w-full max-w-[1440px] flex justify-between items-center py-3 md:py-4">
        {/* 로고 및 네비게이션 */}
        <div className="flex items-center gap-8 md:gap-12 w-2/3">
          <div
            onClick={() => handleNavigate("/home")}
            className="cursor-pointer"
          >
            <Image
              src={logo}
              alt="logo"
              width={65}
              height={14}
              className="md:w-[75px] md:h-[16px]"
            />
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex-row gap-6 lg:gap-8 text-body3_m md:text-body2_m lg:text-body1_m font-medium md:flex hidden">
            {[
              { name: "중개사매칭", path: "/match" },
              { name: "생활서비스", path: "/service" },
              { name: "커뮤니티", path: "/community" },
            ].map((item) => (
              <p
                key={item.path}
                className={`cursor-pointer hover:text-primary transition-colors ${
                  pathname.includes(item.path)
                    ? "text-primary font-semibold"
                    : ""
                }`}
                onClick={() => handleNavigate(item.path)}
              >
                {item.name}
              </p>
            ))}
            <p
              className={`flex items-center gap-[3px] cursor-pointer hover:text-primary transition-colors ${
                pathname.includes("/planner")
                  ? "text-primary font-semibold"
                  : ""
              }`}
              onClick={() => handleNavigate("/planner")}
            >
              <Image
                src={logo_icon}
                alt="logo"
                width={16}
                height={18}
                className="md:w-[18px] md:h-[20px]"
              />
              집플래너
            </p>
          </nav>
        </div>

        {/* 햄버거 메뉴 */}
        <div className="md:hidden flex items-center gap-3">
          <motion.div
            initial={{ rotate: 0 }}
            // animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Menu
              className="w-6 h-6 text-text cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </motion.div>
        </div>

        {/* 모바일 메뉴 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`absolute top-12 left-0 w-full bg-white shadow-md flex flex-col items-center 
              py-5 gap-5 md:hidden text-body2_r border-t border-gray-200 ${
                isMenuOpen ? "block" : "hidden"
              }`}
        >
          {[
            { name: "중개사매칭", path: "/match" },
            { name: "생활서비스", path: "/service" },
            { name: "커뮤니티", path: "/community" },
            { name: "집플래너", path: "/planner" },
            { name: "알림", path: "/notification" },
          ].map((item) => (
            <p
              key={item.path}
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleNavigate(item.path)}
            >
              {item.name}
            </p>
          ))}

          {/* 로그인/회원가입 버튼 */}
          <div className="w-full border-t border-gray-200 mt-2 pt-4 flex flex-col items-center gap-4">
            {isLoggedIn ? (
              <button className="text-text text-body3_r">로그아웃</button>
            ) : (
              <button
                className="text-text text-body3_r"
                onClick={() => setIsMobileLoginModalOpen(true)}
              >
                로그인
              </button>
            )}
            {!isLoggedIn && (
              <button className="text-primary text-body3_r">회원가입</button>
            )}
          </div>
        </motion.div>

        {/* 알림 */}
        <div className="hidden md:flex items-center gap-3 md:gap-5">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-text cursor-pointer" />
          <div className="flex gap-5 ml-2">
            {/* 로그인 */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button className="text-text">로그아웃</button>
                <User className="w-8 h-8 text-text cursor-pointer" />
              </div>
            ) : (
              <button
                className="text-text"
                onClick={() => setIsLoginModalOpen(true)}
              >
                로그인
              </button>
            )}
            {!isLoggedIn && <PrimaryBtn text={"회원가입"} onClick={() => {}} />}
          </div>
        </div>
      </header>
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
      {isMobileLoginModalOpen && (
        <MobileLoginModal onClose={() => setIsMobileLoginModalOpen(false)} />
      )}
    </div>
  );
};

export default Header;
