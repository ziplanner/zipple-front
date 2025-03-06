import React from "react";

const TermsPage = () => {
  return (
    <div className="w-full flex justify-center items-center bg-bg_sub pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:px-5">
        {/* 제목 및 설명 */}
        <div className="flex flex-col items-start gap-2 md:gap-3 mb-6 md:mb-12 pl-4 md:pl-6">
          <h1 className="md:text-h1_s text-mobile_h2_s">집플 이용약관</h1>
          <p className="md:text-h3 text-mobile_h4">
            집플에서 제공하는 다양한 주거, 상업 공간 맞춤형 서비스를 경험하세요.
          </p>
        </div>

        {/* 약관 내용 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 1장 (목적)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            이 약관은 '집플'(이하 "회사")이 운영하는 웹, 모바일 앱 서비스를
            포함한 인터넷 전자상거래 관련 서비스(이하 "서비스")를 이용하여
            이용자 및 회원의 권리, 의무 및 책임사항을 규정하는 것을 목적으로
            합니다. 또한 본 서비스는 주거, 상업 공간 등 다양한 목적에 맞는
            맞춤형 서비스를 제공하여, 불편한 주택 계약과 이사, 청소 등 복잡한
            과정을 쉽게 해결할 수 있도록 돕습니다.
          </p>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 2장 (정의)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            1. "집플 서비스"란 회사가 제공하는 모든 주거, 상업 공간 서비스 및
            그와 관련된 기능을 포함한 서비스를 의미합니다.
            <br />
            2. "이용자"는 회사의 서비스에 접근하여 이용하는 모든 사람을
            의미하며, "회원"은 회사의 서비스를 통해 회원가입을 완료한 사람을
            의미합니다.
          </p>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 3장 (서비스 제공)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub">
            1. <strong>집플의 맞춤형 서비스</strong>: 집플은 이용자에게 각종
            주거 및 상업 공간 관련 서비스를 제공합니다. 서비스는 이용자의 요구에
            맞춰 제공되며, 일정과 금액에 대한 정보를 투명하게 제공합니다. <br />
            2. 서비스 패키지: 집플은 다음과 같은 패키지를 제공합니다.
          </p>

          {/* Move the unordered list outside of the <p> tag */}
          <ul className="list-disc pl-6 mb-6 text-text_sub">
            <li>
              1인 가구(알뜰형 패키지): 대학생 및 사회초년생을 위한 부동산 중개
              및 이사 서비스.
            </li>
            <li>
              2인 이상(실속형 패키지) 스탠다드: 주택 및 빌라에 적합한 부동산
              중개, 이사, 청소, 인테리어 서비스.
            </li>
            <li>
              패밀리(올인원 패키지) 프리미엄: 가족 단위 맞춤형 서비스로, 부동산
              중개, 포장 이사, 입주 청소, 인테리어 시공 등 모든 서비스 제공.
            </li>
          </ul>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 4장 (이용자의 의무)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            1. 이용자는 제공되는 서비스에 대해 정확한 정보를 제공해야 하며, 본
            약관을 준수해야 합니다.
            <br />
            2. 서비스 이용 중 발생한 문제에 대한 책임은 이용자에게 있습니다.
          </p>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 5장 (전문가 신청 및 등록)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            1. 집플은 다양한 분야의 전문가를 등록할 수 있는 기능을 제공합니다.{" "}
            <br />
            2. <strong>전문가 등록</strong>: 한 분야의 전문가라면 누구나 등록할
            수 있으며, 원스톱으로 가격 제안을 하고, 예상 금액을 제시하는 등의
            절차를 통해 서비스를 제공합니다.
          </p>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 6장 (서비스 금액 및 결제)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            1. 서비스 금액은 이용자가 선택한 패키지에 따라 달라지며, 서비스 제공
            전에 예상 금액을 제공하고 확인받은 후 결제가 이루어집니다.
            <br />
            2. 결제는 제공되는 서비스의 최종 확정 후 이루어지며, 가격 정보는
            투명하게 제공됩니다.
          </p>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 7장 (면책조항)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            1. 회사는 천재지변이나 불가항력적인 사유로 인해 서비스 제공이
            불가능할 경우 책임을 지지 않습니다.
            <br />
            2. 서비스 이용 중 발생하는 모든 문제에 대한 책임은 이용자에게
            있습니다.
          </p>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 8장 (서비스 변경 및 종료)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            1. 회사는 서비스 제공의 내용 및 방식을 변경할 수 있으며, 변경 사항은
            사전 고지합니다.
            <br />
            2. 서비스 종료 시 이용자에게 적절한 대체 서비스를 제공하거나, 해당
            서비스가 종료된 사실을 통지합니다.
          </p>

          <h2 className="md:text-h3 text-mobile_body1_sb mb-2 text-text_sub2">
            제 9장 (분쟁 해결)
          </h2>
          <p className="md:text-h4_r text-mobile_body3_r text-text_sub mb-6">
            1. 회사와 이용자 간의 분쟁은 상호 협의를 통해 해결하도록 합니다.
            <br />
            2. 협의가 이루어지지 않을 경우, 관할 법원에 소송을 제기하여
            해결합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
