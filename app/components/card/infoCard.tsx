interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard = ({ title, description }: InfoCardProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="sm:w-full md_md:w-[333px] md:h-[170px] p-4 md:p-8 bg-white rounded-[10px]">
        <h3 className="text-primary text-mobile_h2 md:text-h2 mb-3 md:mb-7">
          {title}
        </h3>
        <p
          className="text-text_sub text-mobile_body2_r md:text-h4_r"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

export default InfoCard;
