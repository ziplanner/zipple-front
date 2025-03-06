import MatchCard from "../card/matchCard";

interface MatchListProps {
  data: any[];
}

const MatchList = ({ data }: MatchListProps) => {
  return (
    <>
      <div className="md:space-y-2">
        {data.map((professional, index) => (
          <MatchCard key={index} professional={professional} />
        ))}
      </div>
    </>
  );
};

export default MatchList;
