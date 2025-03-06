"use client";

import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const specialPaths = ["/home", "/terms"];
  const backgroundPaths = ["/mypage"];

  const isSpecialComponent =
    pathname === "/" || specialPaths.some((path) => pathname.includes(path));

  const isBackgroundComponent = backgroundPaths.some((path) =>
    pathname.includes(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`sticky top-0 z-50 bg-white`}>
        <Header />
      </header>
      <main
        className={`flex-grow flex justify-center items-center 
            ${isBackgroundComponent && "bg-bg_sub2"} 
            `}
      >
        <div
          className={`w-full ${
            !isSpecialComponent
              ? "max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5"
              : ""
          } `}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
