"use client";

import Image from "next/image";
import logo from "@/app/image/icon/logo_main.svg";
import logoIcon from "@/app/image/icon/logo_icon.svg";
import kakoBtn from "@/app/image/kakao/complete/ko/kakao_login_large_wide.png";
import close from "@/app/image/icon/close.svg";
import useScreenHeight from "@/app/hook/useScreenHeight";

interface LoginDialogProps {
  onClose: () => void;
}

const MobileLoginModal = ({ onClose }: LoginDialogProps) => {
  const isSmallScreen = useScreenHeight(740);

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
      className="fixed top-0 left-0 w-full h-full bg-background z-50 flex flex-col 
      items-center pt-[46px] pb-10 px-4 md:hidden bg-white"
    >
      <div className="flex flex-col flex-grow items-center w-full">
        <Image
          src={close}
          alt={"close"}
          width={24}
          height={24}
          onClick={onClose}
          className="cursor-pointer self-end"
        />
        <div
          className={`flex items-center justify-center gap-2 mb-10 ${
            isSmallScreen ? "mt-16" : "mt-24"
          }`}
        >
          <Image src={logoIcon} alt={"logo"} width={24} height={27} />
          <Image src={logo} alt={"logo"} width={130} height={28} />
        </div>
      </div>
      <h1 className="text-mobile_h1_contents_title text-text1 mb-4">로그인</h1>
      <p className="text-mobile_h4_r text-subtext1 text-center mb-8">
        복잡하고 어려운 집을 찾는 과정
        <br />
        집플과 함께 하세요!
      </p>
      <Image
        src={kakoBtn}
        alt={"kakao"}
        width={390}
        onClick={handleLoginClick}
        className="cursor-pointer"
      />
    </div>
  );
};

export default MobileLoginModal;
