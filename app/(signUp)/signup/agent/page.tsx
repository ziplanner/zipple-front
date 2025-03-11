"use client";

import Image from "next/image";
import bg1 from "@/app/image/background/bg1.svg";
import bg2 from "@/app/image/background/bg2.svg";
import MainSection from "./content/mainSection";

const AgentPage = () => {
  return (
    <div className="relative min-h-screen pt-16 pb-24 md:pt-20 md:pb-36 bg-bg_sub overflow-hidden">
      {/* 배경 이미지 컨테이너 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bg1}
          alt="Background Left"
          className="absolute top-[-40px] lg:top-[-60px] left-[-50px] w-[300px] md:w-[450px] lg:w-[550px]"
        />
        <Image
          src={bg2}
          alt="Background Right"
          className="absolute top-56 md:top-32 lg:top-20 right-[-100px] w-[400px] md:w-[500px] lg:w-[700px]"
        />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative">
        <MainSection />
      </div>
    </div>
  );
};

export default AgentPage;
