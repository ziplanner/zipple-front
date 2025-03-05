import MatchCard from "../card/matchCard";

interface MatchListProps {
  data: any[];
}

const MatchList = ({ data }: MatchListProps) => {
  return (
    <>
      <div className="md:space-y-2">
        {data.map((professional) => (
          <MatchCard key={professional.userId} professional={professional} />
        ))}
      </div>
    </>
  );
};

export default MatchList;
