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
import { Home, Mail, MapPin, Phone, User } from "lucide-react";
import { MdPerson } from "react-icons/md";
import { getGeneralUserInfo, updateGeneralUserInfo } from "@/app/api/user/api";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";
import { withdrawAccount } from "@/app/api/login/api";
import AlertWithBtn from "../alert/alertwithBtn";
import { CATEGORY_LIST } from "@/app/types/category";
import CustomDropdown from "../dropdown/customDropdown";

const GeneralUser = () => {
  const router = useRouter();
  const { userInfo } = useUserInfoStore((state) => state);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDaumLoaded, setIsDaumLoaded] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const [userInfoData, setUserInfoData] = useState({
    name: "",
    generalName: "",
    type: userInfo?.roleName === "일반" ? "일반" : "공인중개사",
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

  const handleResidenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserInfoData((prev) => ({ ...prev, residence: e.target.value }));
  };

  const fetchGeneralUserInfo = async () => {
    try {
      const data = await getGeneralUserInfo();

      setUserInfoData((prev) => ({
        ...prev,
        name: data.name,
        generalName: data.generalName,
        email: data.email,
        address: data.generalAddress,
        residence: data.housingType,
      }));
    } catch (err) {
      console.error("유저 정보 가져오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchGeneralUserInfo();
  }, []);

  const handleSave = async () => {
    try {
      const updatedUserData = {
        generalName: userInfoData.generalName,
        email: userInfoData.email,
        phoneNumber: userInfoData.phone,
        generalAddress: userInfoData.address,
        housingType: userInfoData.residence,
      };

      await updateGeneralUserInfo(updatedUserData);
      alert("정보가 성공적으로 수정되었습니다!");

      setIsEditing(false);
    } catch (error) {
      alert("정보 수정에 실패했습니다.");
      console.error("유저 정보 수정 실패:", error);
    }
  };

  const handleWithdraw = () => {
    setIsAlertOpen(true);
  };

  const confirmWithdraw = async () => {
    setIsAlertOpen(false);
    await withdrawAccount();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfoData({ ...userInfoData, [e.target.name]: e.target.value });
  };

  // 카카오 API 로드 감지
  useEffect(() => {
    const checkDaumAPI = setInterval(() => {
      if (typeof window !== "undefined" && window.daum) {
        setIsDaumLoaded(true);
        clearInterval(checkDaumAPI);
      }
    }, 500); // 0.5초마다 API 확인

    return () => clearInterval(checkDaumAPI);
  }, []);

  // 주소 검색 (카카오 API 사용)
  const handleAddressSearch = () => {
    if (!isDaumLoaded) {
      alert(
        "주소 검색 API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setUserInfoData((prev) => ({ ...prev, address: data.address }));
      },
    }).open();
  };

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
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
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
                value={userInfoData.generalName || "이름 없음"}
                onChange={handleChange}
              />
              <CustomInput
                label="전화번호"
                name="phone"
                value={userInfoData.phone}
                onChange={handleChange}
              />
              <CustomInput
                label="이메일"
                name="email"
                value={userInfoData.email}
                onChange={handleChange}
              />
              <InputWithButton
                label="주소"
                name="address"
                value={userInfoData.address}
                onChange={handleChange}
                buttonText={"검색"}
                onButtonClick={handleAddressSearch}
              />
              <CustomInput
                label="포트폴리오"
                name="portfolio"
                placeholder="포트폴리오 링크 입력"
                value={userInfoData.portfolio}
                onChange={handleChange}
              />
              <CustomDropdown
                label="거주 형태"
                name="residence"
                value={userInfoData.residence}
                onChange={handleResidenceChange}
                options={CATEGORY_LIST.map((category) => ({
                  label: category,
                  value: category,
                }))}
              />
            </>
          ) : (
            <>
              {/* <User size={24} strokeWidth={1.5} />
              <Phone size={20} strokeWidth={1.5} />
              <Mail size={20} strokeWidth={1.5} />
              <MapPin size={20} strokeWidth={1.5} />
              <Home size={20} strokeWidth={1.5} /> */}
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
          )}
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
            onClick={handleWithdraw}
          >
            회원 탈퇴
          </li>
        </ul>
      </div>
      {/* 알림 창 조건부 렌더링 */}
      {isAlertOpen && (
        <AlertWithBtn
          title="회원 탈퇴"
          message="정말 회원 탈퇴를 진행하시겠습니까?"
          onConfirm={confirmWithdraw}
          onCancel={() => setIsAlertOpen(false)}
          confirmText="탈퇴"
          cancelText="취소"
        />
      )}
    </div>
  );
};

export default GeneralUser;
