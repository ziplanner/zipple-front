import { useState, useEffect } from "react";
import Image from "next/image";
import test10 from "@/app/image/test/test10.png";
import { useRouter } from "next/navigation";
import CustomInput from "../input/customInput";
import InputWithButton from "../input/inputWithButton";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

const AgentUser = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDaumLoaded, setIsDaumLoaded] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    name: "김이름",
    type: "공인중개사",
    phone: "010-1245-1445",
    email: "abcdefg@gmail.com",
    address: "서울 동대문구 천호대로 405 장한평역[5호선] 집플빌딩",
    portfolio: "https://blog.naver.com/junghoon777/223041001351",
    residence: "103호 아파트",
    joinDate: "2023.04.01",
    activities: [
      { name: "포토폴리오 관리", url: "/mypage/portfolio" },
      { name: "후기 보기", url: "/reviews" },
      { name: "집플래너 서비스", url: "/house-planner" },
    ],
    community: [
      { name: "작성글 확인", url: "/community/posts" },
      { name: "작성 댓글 확인", url: "/community/comments" },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const checkDaumAPI = setInterval(() => {
      if (typeof window !== "undefined" && window.daum) {
        setIsDaumLoaded(true);
        clearInterval(checkDaumAPI);
      }
    }, 500);

    return () => clearInterval(checkDaumAPI);
  }, []);

  const handleAddressSearch = () => {
    if (!isDaumLoaded) {
      alert(
        "주소 검색 API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setUserInfo((prev) => ({ ...prev, address: data.address }));
      },
    }).open();
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row pt-8 rounded-lg w-full pb-40">
      {/* === 좌측 사이드바 (메뉴 전용, 배경 있음) === */}
      <div className="relative w-full md:w-1/4">
        {/* 프로필 이미지 */}
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
          <h2 className="mt-4 text-h4_sb md:text-h3">{userInfo.name}</h2>
          {/* 회원 유형 + 승인 배지 */}
          <div className="flex items-center gap-2">
            <p className="text-gray-600">{userInfo.type}</p>

            {/* 개업(대표)회원 및 공인중개사 회원에게만 체크 배지 표시 */}
            {userInfo.type !== "일반회원" && (
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

        {/* 메뉴 (배경 있는 부분) */}
        {/* <div className="hidden md:block bg-white shadow-lg rounded-lg p-4 mt-12">
          <ul className="text-sm text-gray-700">
            <li className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded">
              <FaUser className="mr-2 text-gray-600" /> 나의 정보
            </li>
            <li className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded">
              <FaMapMarkerAlt className="mr-2 text-gray-600" /> 포트폴리오 관리
            </li>
            <li className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded">
              <FaHome className="mr-2 text-gray-600" /> 후기 보기
            </li>
            <li className="flex items-center p-3 cursor-pointer hover:bg-gray-100 rounded">
              <IoMdNotificationsOutline className="mr-2 text-gray-600" />{" "}
              집플래너 서비스
            </li>
          </ul>
        </div> */}
      </div>

      {/* === 메인 콘텐츠 (배경 없음) === */}
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
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1 text-body3_sb bg-white border border-text_sub3 rounded shadow-sm"
            >
              {isEditing ? "저장" : "수정"}
            </button>
          </div>
        </h3>

        <div className="mt-2 border-t pt-4 flex flex-col gap-6">
          {isEditing ? (
            <>
              <CustomInput
                label="이름"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
              />
              <CustomInput
                label="전화번호"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
              />
              <CustomInput
                label="이메일"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
              <InputWithButton
                label="주소"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                buttonText="검색"
                onButtonClick={handleAddressSearch}
              />
              <CustomInput
                label="거주 형태"
                name="residence"
                value={userInfo.residence}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <div className="flex flex-row items-center gap-1 ml-4">
                <p className="text-gray-600 text-body1_sb">
                  <MdPerson />
                </p>
                <p className="text-mobile_body2_r md:text-body1_r pl-5">
                  {userInfo.name}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1 ml-4">
                <p className="text-gray-600 text-body1_sb">
                  {/* 📞 전화번호 */}
                  <FaPhone />
                </p>
                <p className="text-mobile_body2_r md:text-body1_r pl-5">
                  {userInfo.phone}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1 ml-4">
                <p className="text-gray-600 text-body1_sb">
                  <FaEnvelope />
                  {/* 📧 이메일 */}
                </p>
                <p className="text-mobile_body2_r md:text-body1_r pl-5">
                  {userInfo.email}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1 ml-4">
                <p className="text-gray-600 text-body1_sb">
                  {/* 📍 주소 */}
                  <FaMapMarkerAlt />
                </p>
                <p className="text-mobile_body2_r md:text-body1_r pl-5">
                  {userInfo.address}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1 ml-4">
                <p className="text-gray-600 text-body1_sb">
                  {/* 🏠 거주 형태 */}
                  <FaHome />
                </p>
                <p className="text-mobile_body2_r md:text-body1_r pl-5">
                  {userInfo.residence}
                </p>
              </div>
            </>
          )}
        </div>

        <h3 className="mt-16 text-h4_sb md:text-h2 text-text rounded-t-lg p-2 pl-3 inline-block">
          활동 정보
        </h3>
        <ul className="border-t pt-3 ml-3">
          {userInfo.activities.map((activity, index) => (
            <li
              key={index}
              className="py-2 cursor-pointer text-body3_m md:text-body1_m text-text_sub4 hover:underline"
              onClick={() => router.push(activity.url)}
            >
              {activity.name}
            </li>
          ))}
        </ul>

        <h3 className="mt-16 text-h4_sb md:text-h2 text-text rounded-t-lg p-2 pl-3 inline-block">
          커뮤니티
        </h3>
        <ul className="border-t pt-3 ml-3">
          {userInfo.community.map((item, index) => (
            <li
              key={index}
              className="py-2 cursor-pointer text-body3_m md:text-body1_m text-text_sub4 hover:underline"
              onClick={() => router.push(item.url)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgentUser;
