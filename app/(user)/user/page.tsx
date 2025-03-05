"use client";

import UserProfile from "@/app/components/user/userProfile";
import test10 from "@/app/image/test/test10.png";

const User = () => {
  return (
    <div className="flex w-full pt-10">
      <UserProfile
        name="Jeremy Rose"
        location="New York, NY"
        imageUrl={test10}
        primaryWork="Spotify New York"
        secondaryWork="Metropolitan Museum"
        phoneNumber="+1 123 456 7890"
        address="525 E 68th Street, New York, NY 10651-78"
        email="hello@jeremymrose.com"
        website="www.jeremymrose.com"
        birthday="June 5, 1992"
        gender="Male"
        rating={4}
        role={""}
        field={""}
        description={"안녕하세요 저는 공인중개사입니다."}
        contactUrl="https://blog.naver.com/junghoon7771/2230401001351"
        registrationInfo={"33557419011"}
      />
    </div>
  );
};

export default User;
