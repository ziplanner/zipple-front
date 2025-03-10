"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoginLoading from "./loginLoading";
import { getTokenWithCode } from "@/app/api/login/api";
import axiosInstance from "@/app/api/axiosInstance";
import HeaderToken from "@/app/api/headerToken";
import { useAuthStore } from "@/app/providers/userStoreProvider";

export default function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuthStore((state) => state);

  useEffect(() => {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return;

    getTokenWithCode(kakaoCode)
      .then((res) => {
        signIn(res.accessToken, res.isRegistered);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", res.accessToken);
        }

        HeaderToken.set(res.accessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `${res.accessToken}`;

        router.replace(res.isRegistered ? "/" : "/");
      })
      .catch(() => {
        router.replace("/");
      });
  }, [searchParams, router, signIn]);

  return (
    <div className="min-h-screen">
      <LoginLoading />
    </div>
  );
}
