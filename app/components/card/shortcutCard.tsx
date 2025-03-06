interface ShortcutProps {
  color: "blue" | "black";
  title: string;
  description: string;
  onClick: () => void;
}

const Shortcut = ({ color, title, description, onClick }: ShortcutProps) => {
  return (
    <div
      className={`flex w-full pl-6 py-6 md:pl-9 md:py-8 items-start flex-col gap-1.5 rounded-[10px]
        text-white cursor-pointer ${
          color === "blue" ? `bg-primary` : `bg-black`
        }`}
      onClick={onClick}
    >
      <h3 className="text-mobile_h2 md:text-h2">{title}</h3>
      <p className="text-mobile_body2_m md:text-body2_m">{description}</p>
    </div>
  );
};

export default Shortcut;
