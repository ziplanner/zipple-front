import React, { useState } from "react";
import Image from "next/image";
import {
  FaStar,
  FaRegStar,
  FaPhoneAlt,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import ReviewSection from "@/app/(profile)/profile/content/reviewSection";
import PortfolioSection from "@/app/(profile)/profile/content/portfolioSection";
import { MdLink, MdLocationOn } from "react-icons/md";
import { useRouter } from "next/navigation";
import { UserProfileData } from "@/app/types/user";
import defaultProfileImage from "@/app/image/test/test_image.jpg";
import LoadingSpinner from "../loading/loadingSpinner";

interface UserProfileProps {
  userProfile: UserProfileData | null;
  agentId: string | null;
  activeTab: "reviews" | "portfolio";
  setActiveTab: (tab: "reviews" | "portfolio") => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userProfile,
  agentId,
  activeTab,
  setActiveTab,
}) => {
  const router = useRouter();

  if (!userProfile) {
    return <LoadingSpinner />;
  }

  const {
    profileUrl,
    externalLink,
    agentName,
    email,
    businessName,
    agentSpecialty,
    agentRegistrationNumber,
    ownerName,
    starRating,
    ownerContactNumber,
    officeAddress,
    portfolios = [],
    reviews = [],
  } = userProfile;

  const stars = Array(5)
    .fill(false)
    .map((_, index) => index < starRating);

  const handleAllClick = () => {
    router.push(`/${activeTab}?id=${agentId}`);
  };

  return (
    <div className="w-full flex justify-center items-center mb-40">
      <div className="w-full flex flex-col justify-between h-full">
        {/* Profile Header */}
        <div className="flex md:flex-row flex-col md:items-center md:mb-8">
          <div
            className="lg:w-64 lg:h-64 md:w-64 md:h-64 md:max-h-64 md:max-w-64
          max-h-56 max-w-56 rounded-lg overflow-hidden mr-10"
          >
            <Image
              src={profileUrl || defaultProfileImage}
              alt="Profile"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col lg:h-80 md:h-64 py-1 justify-between">
            <div>
              <h1 className="mt-3 md:mt-0 md:text-h1_contents_title lg:text-h1_m text-mobile_h2_large text-text">
                {agentName}
              </h1>
              <p className="text-mobile_body3_r md:text-body3_r lg:text-body2_r text-gray-500">
                {businessName} [{agentSpecialty}]
              </p>
            </div>
            <div
              className="inline-flex rounded-sm md:text-body3_m items-center
    text-token_4 bg-token_4_bg md:whitespace-nowrap overflow-hidden mt-3 md:mt-0
    md:overflow-visible text-ellipsis text-mobile_body4_r py-1 px-2 md:px-3 max-w-fit"
            >
              <MdLink className="md:w-5 md:h-5 w-4 h-4 text-token_4 flex-shrink-0" />
              &nbsp;&nbsp;&nbsp;
              <span className="truncate md:whitespace-nowrap">
                {externalLink}
              </span>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col mt-6 mb-5 md:mt-0 md:mb-0">
              <h3
                className="text-mobile_h4_sb md:text-body1_m text-text_sub2 mb-1
              lg:text-h3_r lg:mt-3"
              >
                Ratings
              </h3>
              <div className="flex gap-2 items-center">
                <div className="flex space-x-1 md:text-body3_m lg:text-body1_m text-mobile_body4_r">
                  {stars.map((isFilled, index) =>
                    isFilled ? (
                      <FaStar key={index} className="text-star" />
                    ) : (
                      <FaRegStar key={index} className="text-star" />
                    )
                  )}
                </div>
                {reviews.length > 0 && (
                  <p className="md:text-body4_r text-[10px] text-sub3">
                    + {reviews.length}
                  </p>
                )}
              </div>
            </div>
            <div
              className="lg:space-y-2 space-y-1 lg:mt-6 lg:mb-4 text-mobile_body3_r
              md:text-body3_m lg:text-body2_m text-text_sub4
              border-b border-gray-200 pb-6 md:pb-0 md:border-none"
            >
              <div className="flex items-center">
                <p className="w-20">등록번호:</p>
                <p>{agentRegistrationNumber}</p>
              </div>
              <div className="flex items-center">
                <p className="w-20">전화번호:</p>
                <p>{ownerContactNumber}</p>
              </div>
              <div className="flex items-center gap-3">
                <MdLocationOn className="text-gray-400" />
                <p>{officeAddress}</p>
              </div>
            </div>
          </div>
        </div>
        {/* User Info */}
        <div className="flex flex-col md:flex-row gap-8 md:mt-5 mt-6">
          <div className="flex flex-col md:w-[256px] lg:w-[256px]">
            {/* Contact Section */}
            <div className="mb-6">
              <h3 className="text-text_sub2 text-mobile_h4_sb md:text-h3 lg:text-h2 mb-1">
                Contact
              </h3>
              <div className="flex items-center space-x-4 mt-2">
                <FaPhoneAlt className="text-primary" />
                <p className="text-mobile_body3_r md:text-body2_m text-gray-700">
                  {ownerContactNumber}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <FaEnvelope className="text-primary" />
                <p className="text-mobile_body3_r md:text-body2_m text-gray-700">
                  {email || ""}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <FaLink className="text-primary" />
                <p className="text-mobile_body3_r md:text-body2_m text-gray-700">
                  <a
                    href={externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {externalLink}
                  </a>
                </p>
              </div>
            </div>
            {/* Work Section */}
            <div className="border-t border-gray-200 pt-6 mb-6 md:w-[256px] lg:w-[256px]">
              <h3 className="text-text_sub2 text-mobile_h4_sb md:text-h3 lg:text-h2 mb-1">
                Work
              </h3>
              {/* <p className="text-mobile_body3_r md:text-body2_m text-gray-700">
                <strong>{businessName}</strong>
              </p> */}
              <p className="text-mobile_body3_r md:text-body2_m text-gray-600">
                {businessName}
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex w-full flex-col mt-5 md:mt-0">
            <div className="flex items-center md:items-start justify-between w-full">
              <div className="flex md:space-x-6 space-x-4">
                <button
                  className={`${
                    activeTab === "portfolio"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600"
                  } lg:text-h3_r md:text-h4 text-mobile_body2_m`}
                  onClick={() => setActiveTab("portfolio")}
                >
                  포트폴리오
                </button>
                <button
                  className={`${
                    activeTab === "reviews"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-600"
                  } lg:text-h3_r md:text-h4 text-mobile_body2_m`}
                  onClick={() => setActiveTab("reviews")}
                >
                  고객 리뷰
                </button>
              </div>
              <p
                className="md:text-body3_m text-10 text-text_sub cursor-pointer"
                onClick={handleAllClick}
              >
                전체보기
              </p>
            </div>

            <div className="gap-6">
              {activeTab === "portfolio" && (
                <div className="pt-4">
                  <PortfolioSection
                    data={
                      Array.isArray(portfolios) ? portfolios.slice(0, 6) : []
                    }
                  />
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="pt-4">
                  <ReviewSection
                    data={Array.isArray(reviews) ? reviews.slice(0, 4) : []}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
