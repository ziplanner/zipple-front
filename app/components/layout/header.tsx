"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Bell, User, Menu } from "lucide-react";
import logo from "@/app/image/icon/logo_main.svg";
import logo_icon from "@/app/image/icon/logo_icon.svg";
import PrimaryBtn from "../button/primaryBtn";
import { motion } from "framer-motion";
import LoginModal from "../modal/loginModal";
import MobileLoginModal from "../modal/mobileLoginModal";
import AlertWithBtn from "../alert/alertwithBtn";
import { getUserInfo } from "@/app/api/user/api";
import {
  useAuthStore,
  useUserInfoStore,
} from "@/app/providers/userStoreProvider";

const Header = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, signOut } = useAuthStore((state) => state);
  const { userInfo, setUserInfo, clearUserInfo } = useUserInfoStore(
    (state) => state
  );

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isMobileLoginModalOpen, setIsMobileLoginModalOpen] =
    useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isLoggedIn = !!accessToken;

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsAlertOpen(true);
  };

  const confirmLogout = async () => {
    sessionStorage.removeItem("accessToken");
    signOut();
    clearUserInfo();
    setIsAlertOpen(false);
    router.push("/");
  };

  const handleMypageClick = () => {
    console.log("이거 누른거니...?");
    router.push("/mypage");
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      console.log("유저 정보 가져오기:", data);
      setUserInfo(data);

      // roleName이 "미등록"이고 현재 페이지가 "/signup"이 아닐 때 Alert 표시
      if (data.roleName === "미등록" && pathname !== "/signup") {
        setShowAlert(true);
      }
    } catch (err) {
      console.error("유저 정보 가져오기 실패:", err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken]);

  useEffect(() => {
    if (pathname === "/mypage") {
      setShowAlert(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!modalRef.current) return;
      if (modalRef.current.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full bg-white md:h-16 shadow-md flex justify-center px-4 md:px-6 lg:px-8">
      <header className="w-full max-w-[1440px] flex justify-between items-center py-3 md:py-4">
        {/* 로고 및 네비게이션 */}
        <div className="flex items-center gap-8 md:gap-12 w-2/3">
          <div onClick={() => handleNavigate("/")} className="cursor-pointer">
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
              <>
                <button
                  className="text-text text-body3_r"
                  onClick={handleMypageClick}
                >
                  마이페이지
                </button>
                <button
                  className="text-text text-body3_r"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </>
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
          <div className="flex gap-5 ml-2">
            {/* 로그인 */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-5">
                {/* 알림 아이콘 */}
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                  {/* 알림 개수 배지 (옵션) */}
                  <span className="absolute top-[-3px] right-[-5px] w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    3
                  </span>
                </div>
                {/* 프로필 + 닉네임 + 로그아웃 */}
                <div
                  className="relative"
                  onClick={() => setIsOpen(!isOpen)}
                  ref={modalRef}
                >
                  {/* 클릭하면 열리고 닫히는 트리거 버튼 */}
                  <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition">
                    {userInfo?.profileUrl ? (
                      <Image
                        src={userInfo.profileUrl}
                        alt={userInfo.nickname}
                        width={28}
                        height={28}
                        className="rounded-full w-7 h-7"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-600" />
                    )}
                    <p className="text-gray-800 font-medium">
                      {userInfo?.nickname}님
                    </p>
                  </div>

                  {/* 드롭다운 메뉴 */}
                  {isOpen && (
                    <div
                      className="absolute right-[-4px] mt-2 w-32 bg-white shadow-lg 
                    rounded-lg overflow-hidden border border-gray-200 z-50"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          setIsOpen(false);
                          // router.push("/favorites");
                        }}
                      >
                        관심 중개사
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={handleMypageClick}
                      >
                        마이페이지
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
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
      {isAlertOpen && (
        <AlertWithBtn
          title="로그아웃"
          message="정말 로그아웃 하시겠습니까?"
          onConfirm={confirmLogout}
          onCancel={() => setIsAlertOpen(false)}
          confirmText="로그아웃"
          cancelText="취소"
        />
      )}

      {showAlert && (
        <AlertWithBtn
          title="회원가입 필요"
          message={"회원가입을 완료하고\n더 많은 서비스를 이용해보세요!"}
          onConfirm={() => {
            setShowAlert(false);
            setTimeout(() => {
              router.push("/signup");
            }, 100);
          }}
          onCancel={() => {
            setShowAlert(false);
            // 추후 미등록 시 접근 불가능한 페이지 도출 필요
            if (pathname.includes("/mypage")) {
              router.back();
            }
          }}
          confirmText="가입하기"
          cancelText="나중에"
        />
      )}
    </div>
  );
};

export default Header;
