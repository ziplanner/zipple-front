const SkeletonCard = () => {
  return (
    <div
      className="animate-pulse bg-gray-200 rounded-lg w-full h-32 sm:h-56
    md:h-72 md:w-72"
    />
  );
};

const SkeletonSquare = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md_lg:grid-cols-4 gap-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default SkeletonSquare;
