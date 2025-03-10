const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-40"></div>
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
