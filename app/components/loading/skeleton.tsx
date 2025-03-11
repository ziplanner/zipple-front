const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-28 md:h-40" />
  );
};

const Skeleton = () => {
  return (
    <div className="grid gap-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default Skeleton;
