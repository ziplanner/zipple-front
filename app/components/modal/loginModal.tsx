import React from "react";
import Image from "next/image";
import logo from "@/app/image/icon/logo_main.svg";
import logoIcon from "@/app/image/icon/logo_icon.svg";
import kakoBtn from "@/app/image/kakao/complete/ko/kakao_login_large_wide.png";
import close from "@/app/image/icon/close.svg";

interface LoginDialogProps {
  onClose: () => void;
}

/**
 *
 * @param onClose 모달 닫힘 함수
 * @returns
 */
const LoginModal = ({ onClose }: LoginDialogProps) => {
  const handleLoginClick = () => {
    const location = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
    const clientId = process.env.NEXT_PUBLIC_KAKAO_AUTH_API_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
    // const redirectUri = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;
    const respoinseType = "code";

    const requestUrl =
      location +
      "?" +
      "client_id=" +
      clientId +
      "&redirect_uri=" +
      redirectUri +
      "&response_type=" +
      respoinseType;
    window.location.href = requestUrl;
  };
  return (
    <div
      className="hidden md:flex fixed inset-0 !ml-[-20px] z-50 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative justify-items-center bg-white w-[430px] px-5 pb-9 pt-[72px] bg-background rounded-2xl">
        <div className="absolute top-4 right-4">
          <Image
            src={close}
            alt={"close"}
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          <Image
            src={logoIcon}
            alt={"logo"}
            width={24}
            height={27}
            className="mb-10"
          />
          <Image
            src={logo}
            alt={"logo"}
            width={130}
            height={28}
            className="mb-10"
          />
        </div>
        <h3 className="text-text1 text-h1_contents_title mb-4">로그인</h3>
        <p className="text-subtext1 text-h4_r mb-8 text-center">
          복잡하고 어려운 집을 찾는 과정
          <br />
          집플과 함께 하세요!
        </p>
        <Image
          src={kakoBtn}
          alt={"카카오 로그인 버튼"}
          width={390}
          onClick={handleLoginClick}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default LoginModal;
