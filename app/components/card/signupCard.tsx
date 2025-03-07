import Image, { StaticImageData } from "next/image";

interface SignupCardProps {
  imageUrl: string | StaticImageData;
  text: string;
  color: string;
  btnText: string;
  role: string;
  onSelectRole: (role: string) => void; // 🔥 부모에 role 전달할 콜백 추가
}

const SignupCard = ({
  imageUrl,
  text,
  color,
  btnText,
  role,
  onSelectRole,
}: SignupCardProps) => {
  // const handleRouter = () => {
  //   router.push(`/signup/${role}`);
  // };

  return (
    <div
      className="flex flex-col items-center justify-between text-center bg-white shadow-lg 
      rounded-xl pb-3.5 pt-8 md:pb-8 md:pt-14 transition-all duration-300 hover:shadow-xl border
      lg:w-[320px] lg:h-[320px] md:w-[260px] md:h-[260px] w-[300px] h-[210px]"
    >
      <Image
        alt="role"
        src={imageUrl}
        className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100px] object-contain"
      />
      <div className="flex flex-col gap-2.5 md_lg:gap-5">
        <p className="text-text_sub4 text-mobile_body3_m md:text-body2_m">
          {text}
        </p>
        <button
          className="text-white text-mobile_body3_m md:text-body2_m py-2 px-5 md:py-2.5 md:px-6 md_lg:py-3 md_lg:px-8 
        rounded-lg transition hover:opacity-80"
          style={{ backgroundColor: color }}
          onClick={() => onSelectRole(role)}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default SignupCard;
