import Image from "next/image";
import { Suspense } from "react";
import SignInPageContent from "./(auth)/auth/kakao/content/pageContent";
import LoginLoading from "./(auth)/auth/kakao/content/loginLoading";

export default function Home() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <SignInPageContent />
    </Suspense>
  );
}
