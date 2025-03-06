const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <h1 className="text-white text-h3 md:text-h1_contents_title">
          로딩 중...
        </h1>
      </div>
    </div>
  );
};

export default LoadingSpinner;
