import {
  FaUser,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import { MdBusiness } from "react-icons/md";
import { BrokerOffice } from "./mainSection";

interface AgentInfoProps {
  selectedOffice: BrokerOffice;
}

const AgentInfo = ({ selectedOffice }: AgentInfoProps) => {
  return (
    <>
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex gap-3 items-center border-b pb-2">
          <MdBusiness />
          <h3 className="text-mobile_h2 md:text-h2">공인중개사 정보</h3>
        </div>

        <div className="text-mobile_body1_r md:text-h4_r mt-4 flex flex-col gap-4">
          {[
            {
              icon: <FaUser className="text-gray-600" />,
              text: selectedOffice.중개사무소명,
            },
            {
              icon: <FaHome className="text-gray-600" />,
              text: selectedOffice.개설등록번호,
            },
            {
              icon: <FaMapMarkerAlt className="text-gray-600" />,
              text: selectedOffice.소재지도로명주소,
            },
            {
              icon: <FaPhone className="text-gray-600" />,
              text: selectedOffice.전화번호 || "번호 없음",
            },
            {
              icon: <FaUser className="text-gray-600" />,
              text: selectedOffice.대표자명 || "정보 없음",
            },
            {
              icon: <FaGlobe className="text-gray-600" />,
              text: selectedOffice.홈페이지주소 ? (
                <a
                  href={selectedOffice.홈페이지주소}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex-wrap"
                >
                  {selectedOffice.홈페이지주소}
                </a>
              ) : (
                "홈페이지 없음"
              ),
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              {item.icon}
              <p>&nbsp; {item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AgentInfo;
