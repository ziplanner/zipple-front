"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoginLoading from "./loginLoading";
import { getTokenWithCode } from "@/app/api/login/api";
import { authStore } from "@/app/stores/userStore";

export default function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return;

    getTokenWithCode(kakaoCode)
      .then((res) => {
        // Zustand store에 저장 (refreshToken이 있다면 포함)
        authStore
          .getState()
          .signIn(res.accessToken, res.refreshToken || "", res.isRegistered);

        // sessionStorage에도 저장
        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", res.accessToken);
        }

        // axiosInstance의 Authorization 헤더는 인터셉터에서 자동 추가되므로 직접 설정 불필요
        router.replace(res.isRegistered ? "/" : "/");
      })
      .catch(() => {
        router.replace("/");
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen">
      <LoginLoading />
    </div>
  );
}
