"use client";

import Image from "next/image";
import plus from "@/app/image/icon/plus.svg";

export interface ButtonProps {
  onClick: () => void;
  className?: string;
  imageSize?: number;
}

interface RoundVectorBtnProp extends ButtonProps {
  btnSize?: "small" | "large";
}

const RoundPlusBtn = ({
  imageSize = 36,
  className,
  onClick,
}: RoundVectorBtnProp) => {
  return (
    <button
      className={`${className} bg-white flex justify-center items-center border border-menuborder
    bg-background hover:bg-hover active:bg-pressed rounded-full cursor-pointer`}
      onClick={onClick}
    >
      <Image src={plus} alt={"plus"} width={imageSize} height={imageSize} />
    </button>
  );
};

export default RoundPlusBtn;
