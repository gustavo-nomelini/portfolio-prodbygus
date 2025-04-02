import Skeleton from '../Skeleton';

const HeroSkeleton = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center z-10">
        <div className="animate-pulse">
          {/* Skeleton for title */}
          <div className="flex flex-col items-center">
            <Skeleton className="h-8 w-96 sm:w-[480px] max-w-full mb-4" />
            <Skeleton className="h-8 w-80 sm:w-[400px] max-w-full mb-4" />
            <div className="mt-8">
              <Skeleton className="h-12 w-60 max-w-full mb-2" />
              <Skeleton className="h-12 w-40 max-w-full" />
            </div>
          </div>

          {/* Skeleton for paragraph */}
          <div className="max-w-2xl mx-auto mt-8">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-11/12 mb-2" />
            <Skeleton className="h-6 w-4/5" />
          </div>

          {/* Skeleton for buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <Skeleton className="h-14 w-36 md:w-44 rounded-md" />
            <Skeleton className="h-14 w-36 md:w-44 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
