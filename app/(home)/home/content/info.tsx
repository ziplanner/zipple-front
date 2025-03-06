import InfoCard from "@/app/components/card/infoCard";

const infoCards = [
  {
    title: "믿을 수 있는 전문가",
    description: "검증 받은 공인중개사와 <br/> 생활 전문가를 연결해드립니다.",
  },
  {
    title: "만족스러운 결과",
    description: "집플매니저가 진행 상황을 <br/> 간결하게 정리하여 전달합니다.",
  },
  {
    title: "1:1 집플래너",
    description: "서비스 신청 완료 후 <br/> 집플 매니저가 배정됩니다.",
  },
];

const Info = () => {
  return (
    <div className="flex w-full bg-bg_sub py-12 md:pt-20 md:pb-32">
      <div className="max-w-[1040px] mx-auto md:px-5 px-4">
        {/* 제목 및 설명 */}
        <div className="flex flex-col items-start gap-1 md:gap-3 mb-6 md:mb-10 text-center md:text-left">
          <h1 className="text-mobile_h2_s md:text-h1_s">
            내게 필요한 전문가들이 한 곳에!
          </h1>
          <p className="text-h4 md:text-h3">
            복잡하고 어려운 집을 찾는 과정, 집플과 함께 하세요!
          </p>
        </div>

        {/* 카드들 (반응형) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
          {infoCards.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
