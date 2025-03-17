"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import general from "@/app/image/signUp/general.svg";
import agent from "@/app/image/signUp/agent.svg";
import life from "@/app/image/signUp/life.svg";
import bg1 from "@/app/image/background/bg1.svg";
import bg2 from "@/app/image/background/bg2.svg";
import SignupCard from "@/app/components/card/signupCard";
import AgentSection from "./content/agentSection";
import GeneralSection from "./content/generalSection";
import { useRouter } from "next/navigation";

const CARD_DATA = [
  {
    id: 1,
    imageUrl: general,
    text: "서비스를 이용하고 싶다면",
    color: "#FED709",
    btnText: "일반 회원가입",
    role: "general",
  },
  {
    id: 2,
    imageUrl: agent,
    text: "부동산 서비스를 제공하고 싶다면",
    color: "#6CB357",
    btnText: "공인중개사 회원가입",
    role: "agent",
  },
  {
    id: 3,
    imageUrl: life,
    text: "생활 서비스를 제공하고 싶다면",
    color: "#3772F7",
    btnText: "생활전문가 회원가입",
    role: "life",
  },
];

const Signup = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 🔹 role 선택 시 해당 섹션으로 스크롤 이동
  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    console.log("🔹 선택한 role:", role);
    if (role === "general") {
      router.push("/signup/general");
    } else if (role === "agent") {
      router.push("/signup/agent");
    } else {
      router.push("/signup");
    }

    // ✅ role이 변경될 때, 다음 렌더링에서 스크롤 이동 실행
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // 작은 딜레이 추가하여 자연스러운 동작 유도
  };

  return (
    <div className="relative min-h-screen pt-16 pb-28 md:pt-24 md:pb-36 bg-bg_sub overflow-hidden">
      {/* 배경 이미지 */}
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

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-4 items-center mb-12 md:mb-16 relative z-10">
        <h1 className="text-mobile_h1_contents_title md:text-h2_large_bold text-text_sub2">
          ZIPPLE과 어떤 경험을 함께 하실 건가요?
        </h1>
        <p className="text-center text-mobile_body1_m md:text-h4 text-text_sub4">
          집플회원이 되어 다양한 서비스를 제공 받아보고, <br />
          집플과 함께 성장할 파트너를 모집합니다.
        </p>
      </div>

      {/* 카드 영역 */}
      <div className="flex flex-wrap gap-4 md_md:gap-3 md:gap-4 md_lg:gap-8 justify-center relative z-10">
        {CARD_DATA.map((item) => (
          <SignupCard
            key={item.id}
            imageUrl={item.imageUrl}
            text={item.text}
            color={item.color}
            btnText={item.btnText}
            role={item.role}
            onSelectRole={handleSelectRole}
          />
        ))}
      </div>

      {/* 선택된 섹션을 표시하는 영역 */}
      {/* <div ref={sectionRef} className="w-full pt-20 md:pt-32 md:px-5 px-4">
        {selectedRole === "agent" && <AgentSection />}
        {selectedRole === "general" && <GeneralSection />}
        {selectedRole === "life" && <LifeSection />}
      </div> */}
    </div>
  );
};

export default Signup;
