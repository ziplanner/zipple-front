import loginIcon from "@/app/image/icon/logo_icon.svg";
import Image from "next/image";

const LoginLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-5">
        <Image
          src={loginIcon}
          alt="login"
          width={96}
          height={108}
          className="h-[120px] w-[135px]"
        />
        <h1 className="text-white text-h3 md:text-h1_contents_title">
          ZIPPLE 로그인 중⋯
        </h1>
      </div>
    </div>
  );
};

export default LoginLoading;
