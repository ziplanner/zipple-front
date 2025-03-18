import PrimaryBtn from "@/app/components/button/primaryBtn";
import { useStepContext } from "@/app/context/stepContext";
import { UserCheck, Users } from "lucide-react"; // lucide-react 아이콘

const Step1_TypeSelection = () => {
  const { selectedType, setSelectedType, setStep } = useStepContext();

  return (
    <div className="animate-fadeIn">
      <h3 className="text-center text-mobile_h1_contents_title md:text-h1_contents_title mb-5 md:mb-10">
        유형 선택
      </h3>
      <div className="flex gap-4 justify-center mb-12">
        {["대표 공인중개사", "소속 공인중개사"].map((type) => (
          <button
            key={type}
            className={`flex w-full min-h-[140px] md:min-w-[300px] md:min-h-[150px] border-2 flex-col items-center justify-center text-gray-700 p-4 md:p-6 rounded-lg transition-all duration-300 ${
              selectedType === type
                ? "bg-selectedoption_default border-primary shadow-lg scale-105"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
            onClick={() => setSelectedType(type)}
          >
            {/* 아이콘을 선택된 상태에 따라 표시 */}
            <div className="mb-4 md:mb-6">
              {type === "대표 공인중개사" ? (
                <UserCheck className="text-[50px] md:text-[80px]" />
              ) : (
                <Users className="text-[50px] md:text-[80px]" />
              )}
            </div>
            <p className="text-center text-mobile_body1_m md:text-h3_r">
              {type}
            </p>
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <div className="flex justify-end">
        <PrimaryBtn text={"다음"} onClick={() => setStep(2)} />
      </div>
    </div>
  );
};

export default Step1_TypeSelection;
