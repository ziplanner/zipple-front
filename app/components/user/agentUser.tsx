import { useState, useEffect } from "react";
import Image from "next/image";
import test10 from "@/app/image/test/test10.png";
import { useRouter } from "next/navigation";
import CustomInput from "../input/customInput";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLink,
  FaMapMarkerAlt,
  FaHome,
  FaIdBadge,
  FaPen,
} from "react-icons/fa";
import {
  updateAgentBasicInfo,
  updateAgentDetailInfo,
  getAgentInfo,
  getAgentDetailInfo,
} from "@/app/api/user/api";
import { useUserInfoStore } from "@/app/providers/userStoreProvider";

const AgentUser = () => {
  const router = useRouter();
  const { userInfo } = useUserInfoStore((state) => state);
  const [isDaumLoaded, setIsDaumLoaded] = useState<boolean>(false);
  const [isEditingBasic, setIsEditingBasic] = useState<boolean>(false);
  const [isEditingDetail, setIsEditingDetail] = useState<boolean>(false);
  const [basicInfo, setBasicInfo] = useState({
    agentName: "",
    ownerName: "",
    agentType: "",
    phoneNumber: "",
    email: "",
    createAt: "",
  });

  const [ect, setEct] = useState({
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

  const [detailInfo, setDetailInfo] = useState({
    email: "",
    agentType: "",
    agentSpecialty: "",
    businessName: "",
    agentRegistrationNumber: "",
    primaryContactNumber: "",
    officeAddress: "",
    ownerName: "",
    ownerContactNumber: "",
    agentName: "",
    agentContactNumber: "",
    singleHouseholdExpertRequest: false,
    agentOfficeRegistrationCertificate: "",
    businessRegistrationCertification: "",
    agentLicense: "",
    agentImage: "",
    title: "",
    content: "",
    externalLink: "",
  });

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveBasicInfo = async () => {
    try {
      const updatedData = {
        email: basicInfo.email || "",
        agentType: basicInfo.agentType || "소속",
        phoneNumber: basicInfo.phoneNumber || "",
        externalLink: detailInfo.externalLink || "",
        title: detailInfo.title || "",
        content: detailInfo.content || "",
      };

      await updateAgentBasicInfo(updatedData);
      setIsEditingBasic(false);
      alert("기본 정보가 저장되었습니다.");
    } catch (err) {
      console.error("기본 정보 저장 실패:", err);
      alert("기본 정보 저장 중 오류가 발생했습니다.");
    }
  };

  const handleSaveDetailInfo = async () => {
    try {
      const updatedData = {
        businessName: detailInfo.businessName,
        agentRegistrationNumber: detailInfo.agentRegistrationNumber,
        primaryContactNumber: detailInfo.primaryContactNumber,
        officeAddress: detailInfo.officeAddress,
        singleHouseholdExpertRequest: detailInfo.singleHouseholdExpertRequest,
        ownerName: detailInfo.ownerName,
      };

      await updateAgentDetailInfo(updatedData);

      setIsEditingDetail(false);
      alert("상세 정보가 저장되었습니다.");
    } catch (err) {
      console.error("상세 정보 저장 실패:", err);
      alert("상세 정보 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    // 기본 정보 로드
    getAgentInfo()
      .then((data) => {
        setBasicInfo((prev) => ({
          ...prev,
          agentName: data.agentName,
          ownerName: data.ownerName,
          agentType: data.agentType,
          phoneNumber: data.phoneNumber,
          email: data.email,
          createAt: data.createAt,
        }));
      })
      .catch((err) => console.error("Error fetching basic info:", err));

    // 상세 정보 로드
    getAgentDetailInfo()
      .then((data) => {
        console.log("중개사 정보 >>>", data);
        setDetailInfo({
          email: data.email,
          agentType: data.agentType,
          agentSpecialty: data.agentSpecialty,
          businessName: data.businessName,
          agentRegistrationNumber: data.agentRegistrationNumber,
          primaryContactNumber: data.primaryContactNumber,
          officeAddress: data.officeAddress,
          ownerName: data.ownerName,
          ownerContactNumber: data.ownerContactNumber,
          agentName: data.agentName,
          agentContactNumber: data.agentContactNumber,
          singleHouseholdExpertRequest: data.singleHouseholdExpertRequest,
          agentOfficeRegistrationCertificate:
            data.agentOfficeRegistrationCertificate,
          businessRegistrationCertification:
            data.businessRegistrationCertification,
          agentLicense: data.agentLicense,
          agentImage: data.agentImage,
          title: data.title,
          content: data.content,
          externalLink: data.externalLink,
        });
      })
      .catch((err) => console.error("Error fetching detail info:", err));
  }, []);

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
        setBasicInfo((prev) => ({ ...prev, address: data.address }));
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
              src={detailInfo.businessRegistrationCertification || test10}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              width={176}
              height={176}
            />
          </div>
          <h2 className="mt-4 text-h4_sb md:text-h3">{userInfo?.nickname}</h2>
          {/* 회원 유형 + 승인 배지 */}
          <div className="flex items-center gap-2">
            <p className="text-gray-600">{userInfo?.roleName}</p>

            {/* 개업(대표)회원 및 공인중개사 회원에게만 체크 배지 표시 */}
            {userInfo?.roleName !== "일반" && (
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

      {/* === 메인 콘텐츠 (배경 없음) === */}
      <div className="flex w-3/4 flex-col gap-12">
        <div className="flex flex-col w-full md:p-6 p-4 bg-white rounded-lg">
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
                onClick={() => {
                  if (isEditingBasic) {
                    handleSaveBasicInfo();
                  } else {
                    setIsEditingBasic(true);
                  }
                }}
                className="px-3 py-1 text-body3_sb bg-white border border-text_sub3 rounded shadow-sm"
              >
                {isEditingBasic ? "저장" : "수정"}
              </button>
            </div>
          </h3>

          <div className="mt-2 border-t pt-4 flex flex-col gap-6">
            {isEditingBasic ? (
              <>
                <CustomInput
                  label="전화번호"
                  name="phoneNumber"
                  value={basicInfo.phoneNumber}
                  onChange={handleBasicChange}
                />
                <CustomInput
                  label="이메일"
                  name="email"
                  value={basicInfo.email}
                  onChange={handleBasicChange}
                />
                <CustomInput
                  label="첨부링크"
                  name="externalLink"
                  value={detailInfo.externalLink}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="한 줄 소개"
                  name="title"
                  value={detailInfo.title}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="자기소개"
                  name="content"
                  value={detailInfo.content}
                  onChange={handleDetailChange}
                />
              </>
            ) : (
              <>
                <div className="flex flex-row items-center gap-1 ml-4">
                  <p className="text-gray-600 text-body1_sb">
                    {/* 📞 전화번호 */}
                    <FaPhone />
                  </p>
                  <p className="text-mobile_body2_r md:text-body1_r pl-5">
                    {basicInfo.phoneNumber}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1 ml-4">
                  <p className="text-gray-600 text-body1_sb">
                    <FaEnvelope />
                    {/* 📧 이메일 */}
                  </p>
                  <p className="text-mobile_body2_r md:text-body1_r pl-5">
                    {basicInfo.email}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1 ml-4">
                  <p className="text-gray-600 text-body1_sb">
                    <FaLink />
                    {/* 📧 이메일 */}
                  </p>
                  <p className="text-mobile_body2_r md:text-body1_r pl-5">
                    {detailInfo.externalLink}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1 ml-4">
                  <p className="text-gray-600 text-body1_sb">
                    <FaIdBadge /> {/* 자기소개 제목 */}
                  </p>
                  <p className="text-mobile_body2_r md:text-body1_r pl-5">
                    {detailInfo.title}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-1 ml-4">
                  <p className="text-gray-600 text-body1_sb">
                    <FaPen /> {/* 자기소개 내용 */}
                  </p>
                  <p className="text-mobile_body2_r md:text-body1_r pl-5">
                    {detailInfo.content}
                  </p>
                </div>
              </>
            )}
          </div>

          <h3 className="mt-16 text-h4_sb md:text-h2 text-text rounded-t-lg p-2 pl-3 inline-block">
            활동 정보
          </h3>
          <ul className="border-t pt-3 ml-3">
            {ect.activities.map((activity, index) => (
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
            {ect.community.map((item, index) => (
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
        <div className="flex flex-col w-full md:p-6 p-4 bg-white rounded-lg">
          <h3 className="flex mt-4 text-h3 text-text">
            <div className="flex justify-between w-full">
              <div className="flex pb-2 pl-3">
                <div className="flex gap-3 items-center">
                  <FaUser />
                  <h3 className="text-h4_sb md:text-h2 text-text rounded-t-lg inline-block">
                    부동산 정보
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  if (isEditingDetail) {
                    handleSaveDetailInfo();
                  } else {
                    setIsEditingDetail(true);
                  }
                }}
                className="px-3 py-1 text-body3_sb bg-white border border-text_sub3 rounded shadow-sm"
              >
                {isEditingDetail ? "저장" : "수정"}
              </button>
            </div>
          </h3>
          <div className="mt-2 border-t pt-4 flex flex-col gap-4">
            {isEditingDetail ? (
              <>
                <CustomInput
                  label="부동산명"
                  name="businessName"
                  value={detailInfo.businessName}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="중개사 전문 분야"
                  name="agentSpecialty"
                  value={detailInfo.agentSpecialty}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="등록번호"
                  name="agentRegistrationNumber"
                  value={detailInfo.agentRegistrationNumber}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="대표 전화번호"
                  name="primaryContactNumber"
                  value={detailInfo.primaryContactNumber}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="소유자 이름"
                  name="ownerName"
                  value={detailInfo.ownerName}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="소유자 연락처"
                  name="ownerContactNumber"
                  value={detailInfo.ownerContactNumber}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="사무소 주소"
                  name="officeAddress"
                  value={detailInfo.officeAddress}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="중개사 이름"
                  name="agentName"
                  value={detailInfo.agentName}
                  onChange={handleDetailChange}
                />
                <CustomInput
                  label="중개사 연락처"
                  name="agentContactNumber"
                  value={detailInfo.agentContactNumber}
                  onChange={handleDetailChange}
                />
              </>
            ) : (
              <div
                className="mt-2 pt-4 flex flex-col gap-6
              text-mobile_body2_r md:text-body1_r pl-5"
              >
                <p>부동산명: {detailInfo.businessName}</p>
                <p>중개사 전문 분야: {detailInfo.agentSpecialty}</p>
                <p>등록번호: {detailInfo.agentRegistrationNumber}</p>
                <p>대표 전화번호: {detailInfo.primaryContactNumber}</p>
                <p>소유자 이름: {detailInfo.ownerName}</p>
                <p>소유자 연락처: {detailInfo.ownerContactNumber}</p>
                <p>사무소 주소: {detailInfo.officeAddress}</p>
                <p>중개사 이름: {detailInfo.agentName}</p>
                <p>중개사 연락처: {detailInfo.agentContactNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentUser;
