import UserProfile from "@/app/components/user/userProfile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import defaultProfileImage from "@/app/image/test/test_image.jpg";
import { getAgentProfileDetail } from "@/app/api/main/api";
import { StaticImageData } from "next/image";

// 백엔드 수정되면, 변경할 것.
interface UserProfileData {
  name: string;
  imageUrl: string | StaticImageData;
  work: string;
  phoneNumber: string;
  address: string;
  email: string;
  website: string;
  rating: number;
  field: string;
  description: string;
  contactUrl: string;
  registrationInfo: string;
}

const MainSection = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    if (id) {
      getAgentProfileDetail(Number(id))
        .then((data) => setUserProfile(data))
        .catch((error) =>
          console.error("Error fetching agent profile:", error)
        );
    }
  }, [id]);

  return (
    <UserProfile
      name={userProfile?.name || ""}
      imageUrl={userProfile?.imageUrl || defaultProfileImage}
      work={userProfile?.work || ""}
      phoneNumber={userProfile?.phoneNumber || ""}
      address={userProfile?.address || ""}
      email={userProfile?.email || ""}
      website={userProfile?.website || ""}
      rating={userProfile?.rating || 0}
      field={userProfile?.field || ""}
      description={userProfile?.description || ""}
      contactUrl={userProfile?.contactUrl || ""}
      registrationInfo={userProfile?.registrationInfo || ""}
    />
  );
};

export default MainSection;
