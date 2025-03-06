import React from "react";
import { MdLink } from "react-icons/md";

interface ProfileInfoProps {
  name: string;
  role: string;
  field: string;
  description: string;
  contactUrl: string;
  registrationInfo: string;
  phoneNumber: string;
  address: string;
}

const ProfileInfo = ({
  name,
  role,
  field,
  description,
  contactUrl,
  registrationInfo,
  phoneNumber,
  address,
}: ProfileInfoProps) => {
  return (
    <div className="mb-12">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-text">{name}</h2>
      </div>
      <p className="mt-2 text-h4_r text-text_sub4">{description}</p>

      {/* Contact URL */}
      <div className="flex flex-row items-center text-center mt-3">
        <div
          className={`flex flex-row rounded-sm text-[13px] font-medium py-1 px-3
        text-token_4 bg-token_4_bg whitespace-nowrap`}
        >
          <MdLink className="w-5 h-5 text-token_4" />
          &nbsp;&nbsp;&nbsp;
          <span>{contactUrl}</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-2 mt-7 text-text_sub2">
        <div className="flex items-center">
          <p className="w-20 text-body1_sb">근무형태:</p>
          <p>{role}</p>
        </div>
        <div className="flex items-center">
          <p className="w-20 text-body1_sb">전문분야:</p>
          <p>{field}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 mt-6 mb-4 text-body2_m text-text_sub4">
        <div className="flex items-center">
          <p className="w-20">등록번호:</p>
          <p>{registrationInfo}</p>
        </div>
        <div className="flex items-center">
          <p className="w-20">전화번호:</p>
          <p>{phoneNumber}</p>
        </div>
        <div className="flex items-center">
          <p className="w-20">주소:</p>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
