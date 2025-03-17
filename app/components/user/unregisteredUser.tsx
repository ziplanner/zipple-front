import { useState } from "react";
import Image from "next/image";
import test10 from "@/app/image/test/test10.png";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";

const UnregisteredUser = () => {
  const router = useRouter();
  const { userInfo } = useUserInfoStore((state) => state);

  const [userInfoData, setUserInfoData] = useState({
    name: userInfo?.nickname || "",
    generalName: userInfo?.nickname || "",
    type: "미등록",
    phone: "010-1234-5678",
    email: "",
    address: "",
    portfolio: "",
    residence: "",
    activities: [
      { name: "찜 목록 관리", url: "/wishlist" },
      { name: "집플래너", url: "/house-planner" },
      { name: "후기 관리", url: "/reviews" },
    ],
    community: [
      { name: "작성글", url: "/community/posts" },
      { name: "작성 댓글", url: "/community/comments" },
    ],
  });

  return (
    <div className="flex flex-col gap-6 md:flex-row pt-8 rounded-lg w-full pb-40">
      <div className="relative w-full md:w-1/4">
        {/* Left Content */}
        <div className="flex flex-col items-center mt-8">
          <div
            className="lg:w-64 lg:h-64 md:w-52 md:h-52 md:max-h-72 md:max-w-72
        max-h-44 max-w-44 rounded-lg overflow-hidden"
          >
            <Image
              src={test10}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="mt-4 text-h4_sb md:text-h3">
            {userInfoData.generalName}
          </h2>
          {/* 회원 유형 + 인증 배지 */}
          <div className="flex items-center gap-2">
            <p className="text-gray-600">{userInfoData.type}</p>

            {/* 개업(대표)회원 및 공인중개사 회원에게만 체크 배지 표시 */}
            {userInfoData.type !== "일반회원" && (
              <span className="bg-primary text-white text-10 px-0.5 py-0.5 rounded-full flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col w-full md:w-3/4 md:p-6 p-4 bg-white rounded-lg">
        <h3 className="flex mt-4 text-h3 text-text">
          <div className="flex justify-between w-full">
            <div className="flex pb-2 pl-3">
              <div className="flex gap-3 items-center">
                <FaUser />
                <h3 className="text-h4_sb md:text-h2 text-text rounded-t-lg inline-block">
                  나의 정보
                </h3>
              </div>
            </div>
          </div>
        </h3>
        <div className="mt-2 border-t pt-4 flex flex-col gap-6">
          <>
            <div className="flex flex-row items-center gap-1 ml-4">
              <p className="text-gray-600 text-body1_sb">
                <MdPerson />
              </p>
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {userInfoData.generalName}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <p className="text-gray-600 text-body1_sb">
                {/* 📞 전화번호 */}
                <FaPhone />
              </p>
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {userInfoData.phone}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <p className="text-gray-600 text-body1_sb">
                <FaEnvelope />
                {/* 📧 이메일 */}
              </p>
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {userInfoData.email}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <p className="text-gray-600 text-body1_sb">
                {/* 📍 주소 */}
                <FaMapMarkerAlt />
              </p>
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {userInfoData.address}
              </p>
            </div>
            <div className="flex flex-row items-center gap-1 ml-4">
              <p className="text-gray-600 text-body1_sb">
                {/* 🏠 거주 형태 */}
                <FaHome />
              </p>
              <p className="text-mobile_body2_r md:text-body1_r pl-5">
                {userInfoData.residence}
              </p>
            </div>
          </>
        </div>
        <h3 className="mt-16 text-h4_sb md:text-h2 text-text rounded-t-lg p-2 pl-3 inline-block">
          활동 정보
        </h3>
        <ul className="border-t pt-3 ml-3">
          {userInfoData.activities.map((activity, index) => (
            <li
              key={index}
              className="py-2 cursor-pointer text-body3_m md:text-body1_m text-text_sub4 hover:underline"
              onClick={() => router.push(activity.url)}
            >
              {activity.name}
            </li>
          ))}
        </ul>
        {/* <h3
          className="mt-16 text-h3 text-text bg-selectedoption_default
  rounded-t-lg p-1.5 px-3 w-fit"
        >
          커뮤니티
        </h3> */}
        {/* <h3
          className="mt-16 text-h3 text-text bg-selectedoption_default
  rounded-t-lg p-1.5 pl-3 inline-block"
        >
          커뮤니티
        </h3> */}
        <h3 className="mt-16 text-h4_sb md:text-h2 text-text rounded-t-lg p-2 pl-3 inline-block">
          커뮤니티
        </h3>
        <ul className="border-t pt-3 ml-3">
          {userInfoData.community.map((item, index) => (
            <li
              key={index}
              className="py-2 cursor-pointer text-body3_m md:text-body1_m text-text_sub4 hover:underline"
              onClick={() => router.push(item.url)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <h3 className="mt-16 text-h4_sb md:text-h2 text-text rounded-t-lg p-2 pl-3 inline-block">
          서비스
        </h3>
        <ul className="border-t pt-3 ml-3">
          <li className="py-2 cursor-pointer text-body3_m md:text-body1_m text-text_sub4 hover:underline">
            문의하기
          </li>
          <li
            className="py-2 cursor-pointer text-body3_m md:text-body1_m text-text_sub4 hover:underline"
            onClick={() => {}}
          >
            회원 탈퇴
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UnregisteredUser;
