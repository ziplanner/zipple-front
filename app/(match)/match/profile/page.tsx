"use client";

import { Suspense } from "react";
import MainSection from "./content/mainSection";

const ProfilePage = () => {
  return (
    <Suspense>
      <MainSection />
    </Suspense>
  );
};

export default ProfilePage;
