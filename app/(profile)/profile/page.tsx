import { Suspense } from "react";
import Profile from "./content/profile";
import MainSection from "./content/mainSection";

const ProfilePage = () => {
  return (
    <Suspense>
      <div className="flex flex-row gap-8 mt-12 mb-20">
        <Profile />
        <div className="flex flex-col">
          <MainSection />
        </div>
      </div>
    </Suspense>
  );
};

export default ProfilePage;
